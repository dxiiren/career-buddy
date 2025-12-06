<template>
  <div class="min-h-screen flex flex-col">
    <SharedAppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <SharedAppFooter />
  </div>
</template>
