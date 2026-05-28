<script setup>
const route = useRoute();

const {
  data: post,
  pending,
  error,
  refresh,
} = await useAsyncData(
  () => `danmarksbedste-${route.params.id}`, // KEY MUST BE A FUNCTION
  async () => {
    const id = route.params.id;

    const item = await $fetch(
      `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/danmarksbedste/${id}`,
    );

    let billede = null;

    if (item.acf?.billede) {
      const media = await $fetch(
        `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${item.acf.billede}`,
      );
      billede = media.source_url;
    }

    return { ...item, billede };
  },
);

watchEffect(() => {
  console.log("brodtekst:", post.value?.acf?.brodtekst);
  console.log("full acf:", post.value?.acf);
});
</script>

<template>
  <section class="single-wrapper" v-if="post && post.acf">
    <div
      class="single-hero"
      :style="{ backgroundImage: 'url(' + post.billede + ')' }"
    ></div>

    <div class="single-content">
      <h1>{{ post.acf.titel }}</h1>
      <p class="date">{{ post.acf.dato }}</p>
      <p class="brodtekst">{{ post.acf.brodtekst }}</p>
    </div>
  </section>
</template>

<style scoped>
.single-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.single-hero {
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  margin-bottom: 2rem;
}

.single-content h1 {
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
}

.date .brodtekst {
  color: #666;
  margin-bottom: 1.5rem;
}
</style>
