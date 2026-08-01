# Deployment

> **TL;DR** There is no deployment. This prototype runs locally only — no CI/CD, no hosting
> target, no environment variables. What exists is a production-grade local build
> (`just build` → Nitro `node-server` bundle) you can preview on :8114.

## Honest status

| Aspect | Status |
| --- | --- |
| CI/CD | **None** — no workflow files, nothing runs on push/PR |
| Hosting target | **None** — `careerbuddy.yanasharif.com` appears in SEO metadata only |
| Environment config | **None** — no `.env`, no secrets; all data is mocked client-side |
| Database / backend | **None** |

## The local "production" path

```powershell
just build       # nuxt build → .output/ (client assets + Nitro node-server)
just preview     # serves the built app on http://localhost:8114
```

`just preview` runs `nuxt preview` with `PORT=8114` — the Nitro server reads the port from the
environment. The build also prerenders `/sitemap.xml` and its XSL stylesheet (zeroRuntime
sitemap), so SEO artifacts are baked in at build time.

You can also run the bundle directly, the way a server would:

```powershell
$env:PORT='8114'; node .output/server/index.mjs
```

## If this ever deploys for real

Groundwork that already exists: SSR-ready Nitro output (any Node host, or switch the Nitro
preset), canonical URLs + Open Graph + sitemap + robots rules in `nuxt.config.ts`, PWA assets
(`public/site.webmanifest`, icons), and `robots.txt`. What it would still need: a real
hosting/CI decision, replacing the mock composables with an API layer, and real auth — none of
which belongs in this prototype repo today.

## Related docs

| Doc | Why |
| --- | --- |
| [`../02-setup/getting-started.md`](../02-setup/getting-started.md) | Local run instructions |
| [`../05-reference/commands.md`](../05-reference/commands.md) | Build/preview recipes |
| [`../01-overview/architecture.md`](../01-overview/architecture.md) | Build & patching details |
