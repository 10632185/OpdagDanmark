<script setup>
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Pacifico&display=swap",
    },
  ],
})
</script>

<template>
  <div>
    <TheHeader />

    <NuxtPage />

    <TheFooter />
  </div>
</template>