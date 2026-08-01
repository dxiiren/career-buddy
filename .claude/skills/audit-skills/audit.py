# audit-skills/audit.py
# Verify every skill folder under .claude/skills/ has a valid SKILL.md, is
# registered in README.md, that README.md / CLAUDE.md reference only skills that
# exist on disk, that no SKILL.md pins an unsupported model or carries a BOM, and
# that no skill file hardcodes a secret. Read-only -- never edits any file.
#
# Pure stdlib, ASCII-only, no network.
# Usage: python .claude/skills/audit-skills/audit.py
#
# Sections emitted:
#   NO_SKILL_MD:   a skill-looking subdir of .claude/skills/ with no SKILL.md
#   FRONTMATTER:   SKILL.md missing/empty description:, or name: != folder name
#   BAD_MODEL:     a SKILL.md whose model: is not exactly {sonnet, opus}
#   SKILL_BOM:     a SKILL.md saved with a UTF-8 BOM (breaks the loader)
#   MISSING:       skills present on disk but absent from README.md
#   ORPHANED:      README/CLAUDE entries with no matching skill folder
#   CRED_EXPOSURE: a skill file hardcoding a secret instead of a KEY / env var
# Ends with a PASS/FAIL summary. Exit 1 if ANY section is non-empty, else 0.
import argparse
import glob
import os
import re
import sys

SKILLS_DIR = ".claude/skills"
README = ".claude/skills/README.md"
CLAUDE_MD = "CLAUDE.md"

ALLOWED_MODELS = {"sonnet", "opus"}
# Helper dirs that are not skills (no SKILL.md expected). Dot-dirs and any dir
# whose name starts with "_" are also treated as non-skill helpers.
NON_SKILL_DIRS = {"_shared"}

# --- CRED_EXPOSURE ----------------------------------------------------------
# Doctrine: a skill NEVER hardcodes a secret. This scan flags a credential-looking
# ASSIGNMENT whose value is a concrete literal -- not a placeholder, an env-var /
# ${...} ref, or a KEY name. This skill's own dir is exempt (its audit.py + SKILL.md
# necessarily contain credential-pattern examples).
CRED_SCAN_EXTS = (".md", ".py", ".yml", ".yaml", ".xml", ".txt", ".json",
                  ".sh", ".ps1", ".env", ".properties", ".stub", ".ts", ".cjs")
CRED_SKIP_SUBPATHS = ("_shared/config/", "audit-skills/")
# non-secret literals sanctioned for fixtures/docs (extend rather than weaken scan).
# "pat"/"oauth"/"seat" are auth-TYPE descriptors used in setup-mcp/registry.json
# (e.g. `"secret": "PAT"`), not actual secret values.
CRED_ALLOW_LITERALS = {"changeme", "example", "password", "your-password",
                       "pat", "oauth", "seat"}
# uppercase env assignment ending in a secret word (NUXT_CV_DOWNLOAD_PASSWORD=...)
CRED_ENV_RE = re.compile(r'([A-Z][A-Z0-9_]*(?:PASSWORD|PASS|SECRET|TOKEN|APIKEY))\s*=\s*(.+)$')
# lowercase/keyword assignment (password: x, pwd = y, api_key: z, token: z)
CRED_ASSIGN_RE = re.compile(
    r'(?i)\b(passwd|password|pwd|secret|token|api[_-]?key|apikey)\b'
    r'[`"\']?\s*[:=]\s*(.+)$')
# connection string with an inline password: scheme://user:pass@host
CRED_CONNSTR_RE = re.compile(r'://[^:/\s"\'`]+:([^@/\s"\'`]+)@')
# A credential-looking NAME assigned an UNQUOTED value is a variable/expression or
# prose, not a hardcoded secret -- keyword assignments must be a QUOTED literal to
# count. Env assignments + connection strings are judged on a bare token.
CRED_QUOTED_RE = re.compile(r'''^\s*(["'`])(.*?)\1''')
# A value is SAFE (a reference/placeholder, not a hardcoded secret) if it matches:
# an env-var / template ref, an UPPER_SNAKE credential KEY name, or a file path.
CRED_SAFE_RE = re.compile(
    r'([<{]|\$\{|\{\{|process\.env|import\.meta\.env|os\.environ|getenv|'
    r'runtimeConfig|useRuntimeConfig|'
    r'[A-Z][A-Z0-9]*_(?:PASS|PASSWORD|TOKEN|KEY|SECRET)|[/\\]|'
    r'\.(?:txt|file|enc|json|key|env|properties)\b)')
CRED_SAFE_WORDS = {
    "", "admin", "xxx", "xxxx", "changeme", "redacted", "example", "none",
    "null", "true", "false", "todo", "tbd", "plaintext", "here", "undefined",
}


def read_text(path):
    # utf-8-sig strips a stray BOM if a file was saved with one.
    with open(path, encoding="utf-8-sig", errors="replace") as f:
        return f.read()


def default_root():
    here = os.path.abspath(__file__)
    return os.path.abspath(os.path.join(os.path.dirname(here), "..", "..", ".."))


def candidate_dirs(root):
    # Every subdir of .claude/skills/ that looks like a skill (not a helper).
    base = os.path.join(root, SKILLS_DIR)
    dirs = []
    if not os.path.isdir(base):
        return dirs
    for name in sorted(os.listdir(base)):
        if not os.path.isdir(os.path.join(base, name)):
            continue
        if name.startswith(".") or name.startswith("_") or name in NON_SKILL_DIRS:
            continue
        dirs.append(name)
    return dirs


def discover_disk_skills(root):
    # A skill is a subdir of .claude/skills/ that contains a SKILL.md.
    skills = {}
    for skill_md in sorted(glob.glob(os.path.join(root, SKILLS_DIR, "*", "SKILL.md"))):
        name = os.path.basename(os.path.dirname(skill_md))
        skills[name] = skill_md
    return skills


def parse_frontmatter(skill_md_path):
    # Return the simple key: value pairs of the YAML frontmatter (between the
    # first two '---' lines). Single-line scalars -- enough for name/description/model.
    text = read_text(skill_md_path)
    lines = text.split("\n")
    fm = {}
    if not lines or lines[0].strip() != "---":
        return fm
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            break
        m = re.match(r'^([A-Za-z][A-Za-z_-]*):\s*(.*)$', lines[i])
        if m:
            fm[m.group(1)] = m.group(2).strip()
    return fm


def scan_skill_bom(disk):
    # RAW-byte BOM check. read_text() uses utf-8-sig and would silently hide it.
    hits = []
    for name in sorted(disk):
        try:
            with open(disk[name], "rb") as f:
                if f.read(3) == b"\xef\xbb\xbf":
                    hits.append(name)
        except OSError:
            pass
    return hits


def scan_frontmatter_and_model(disk):
    # description: present + non-empty; name: (when present) == folder; model: valid.
    fm_issues = []
    bad_model = []
    for name in sorted(disk):
        fm = parse_frontmatter(disk[name])
        if not fm:
            fm_issues.append(name + " (no frontmatter block)")
        else:
            desc = fm.get("description", "").strip().strip('"').strip("'")
            if not desc:
                fm_issues.append(name + " (missing/empty description:)")
            fm_name = fm.get("name", "").strip()
            if fm_name and fm_name != name:
                fm_issues.append(name + " (name: '" + fm_name + "' != folder)")
        model = fm.get("model")
        if model is None:
            bad_model.append(name + " (no model: line)")
        elif model not in ALLOWED_MODELS:
            bad_model.append(name + " (model: " + model + ")")
    return fm_issues, bad_model


def _cred_literal(value, require_quote):
    """Extract the literal token to judge, or None if it is not a hardcoded literal."""
    v = value.strip()
    m = CRED_QUOTED_RE.match(v)
    if m:
        return m.group(2)
    if require_quote:
        return None
    tok = v.strip("`\"' ,;|")
    return tok.split()[0] if tok else ""


def _cred_literal_safe(tok):
    """True if the literal is a reference/placeholder/known non-secret, not a leak."""
    if tok is None:
        return True
    low = tok.strip("`\"' ,;|").lower()
    if not low or low in CRED_SAFE_WORDS or low in CRED_ALLOW_LITERALS:
        return True
    if not any(c.isalnum() for c in low):  # pure punctuation -> placeholder
        return True
    if low.startswith(("your", "replace", "<", "{", "$", "...")):
        return True
    return bool(CRED_SAFE_RE.search(tok))


def scan_cred_exposure(root):
    """Return [(relpath:line, snippet)] for each hardcoded-credential hit under
    .claude/skills/ (excluding this skill's own dir + any _shared/config store)."""
    hits = []
    base = os.path.join(root, SKILLS_DIR)
    for dp, _dirs, fs in os.walk(base):
        if "__pycache__" in dp:
            continue
        for f in sorted(fs):
            if not f.endswith(CRED_SCAN_EXTS):
                continue
            rel = os.path.relpath(os.path.join(dp, f), root).replace("\\", "/")
            if any(skip in rel for skip in CRED_SKIP_SUBPATHS):
                continue
            try:
                text = read_text(os.path.join(dp, f))
            except OSError:
                continue
            for i, line in enumerate(text.split("\n"), 1):
                tok, matched = None, False
                # (regex, value-group, require_quote): keyword assignments must be a
                # quoted literal; env + connection strings judge a bare token.
                for rx, grp, rq in ((CRED_ENV_RE, 2, False), (CRED_ASSIGN_RE, 2, True),
                                    (CRED_CONNSTR_RE, 1, False)):
                    m = rx.search(line)
                    if m:
                        matched = True
                        tok = _cred_literal(m.group(grp), rq)
                        break
                if matched and not _cred_literal_safe(tok):
                    hits.append((rel + ":" + str(i), line.strip()[:100]))
    return hits


def readme_linked_skills(readme_text):
    # Skills registered as table-row links: [name](name/SKILL.md)
    return set(m.group(1) for m in re.finditer(r'\(([a-z0-9][a-z0-9-]*)/SKILL\.md\)', readme_text))


def claude_backticked_tokens(claude_text):
    # Every backticked single-token reference, e.g. `commit`, `audit-skills`.
    return set(re.findall(r'`([a-z0-9][a-z0-9-]*)`', claude_text))


def _print_section(title, rows, empty_msg):
    print("=== " + title + " ===")
    if rows:
        for r in rows:
            print("  X " + r)
    else:
        print("  (none) -- " + empty_msg)


def main():
    parser = argparse.ArgumentParser(
        prog="audit.py",
        description="Audit skills: every skill dir has a valid SKILL.md, is "
                    "registered in README.md, that README/CLAUDE.md reference only "
                    "existing skills, and that no skill hardcodes a secret. Read-only.")
    parser.add_argument("--root", default=None,
                        help="repo root (default: three levels up from this script).")
    args = parser.parse_args()

    root = args.root or default_root()
    disk = discover_disk_skills(root)
    disk_names = set(disk.keys())

    # NO_SKILL_MD: a skill-looking dir with no SKILL.md.
    no_skill_md = sorted(d for d in candidate_dirs(root) if d not in disk_names)

    fm_issues, bad_model = scan_frontmatter_and_model(disk)
    bom_hits = scan_skill_bom(disk)
    cred_hits = scan_cred_exposure(root)

    readme_path = os.path.join(root, README)
    claude_path = os.path.join(root, CLAUDE_MD)
    readme_text = read_text(readme_path) if os.path.isfile(readme_path) else ""
    claude_text = read_text(claude_path) if os.path.isfile(claude_path) else ""

    registered = readme_linked_skills(readme_text)
    claude_tokens = claude_backticked_tokens(claude_text)

    # MISSING: on disk but not linked in README.
    missing = sorted(disk_names - registered)

    # ORPHANED: a README link with no folder, or a CLAUDE.md backticked token that
    # README ALSO links (a confirmed skill name) whose folder is gone.
    orphaned_readme = sorted(registered - disk_names)
    orphaned_claude = sorted((claude_tokens & registered) - disk_names)
    orphaned = sorted(set(orphaned_readme) | set(orphaned_claude))

    _print_section("NO_SKILL_MD (skill-looking dir with no SKILL.md)",
                   no_skill_md, "every skill dir has a SKILL.md")
    _print_section("FRONTMATTER (missing/empty description:, or name: != folder)",
                   fm_issues, "every SKILL.md has a description and a matching name")
    _print_section("BAD_MODEL (model: not in {sonnet, opus})",
                   bad_model, "every model: is sonnet or opus")
    _print_section("SKILL_BOM (SKILL.md saved with a UTF-8 BOM; breaks the loader)",
                   [n + "  -> rewrite without a BOM" for n in bom_hits],
                   "all SKILL.md files are BOM-free")
    _print_section("MISSING (on disk, absent from README.md)",
                   missing, "every skill is registered in README.md")

    print("=== ORPHANED (in README/CLAUDE, no skill folder) ===")
    if orphaned:
        for n in orphaned:
            where = []
            if n in orphaned_readme:
                where.append("README.md")
            if n in orphaned_claude:
                where.append("CLAUDE.md")
            print("  X " + n + "  [" + ", ".join(where) + "]")
    else:
        print("  (none) -- README/CLAUDE reference only existing skills")

    _print_section("CRED_EXPOSURE (hardcoded secret in a skill file; use a KEY / env var)",
                   [loc + "  -> " + snip for loc, snip in cred_hits],
                   "no hardcoded secrets")

    fail = bool(no_skill_md or fm_issues or bad_model or bom_hits or missing
                or orphaned or cred_hits)
    print("")
    print("REGISTERED=" + str(len(registered & disk_names)) + " SKILLS=" + str(len(disk_names)))
    print("RESULT: " + ("FAIL" if fail else "PASS"))
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())
