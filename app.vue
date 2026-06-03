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

<!-- ALL IMAGES FROM - https://www.opdagdanmark.dk/ -->
<!-- ALL ICONS FROM - https://fontawesome.com/-->
<!-- ALL FONTS FROM - https://fonts.google.com/ -->
<!-- LAST ACCESSED - 04/06/2026 -->

<template>
  <div>
    <TheHeader />

    <NuxtPage />

    <TheFooter />
  </div>
</template>