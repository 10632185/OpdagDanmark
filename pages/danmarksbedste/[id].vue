<script setup>
const route = useRoute();

const {
  data: post,
  pending,
  error,
  refresh,
} = await useAsyncData(
  () => `danmarksbedste-${route.params.id}`,
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
  <section v-if="post && post.acf" class="event-wrapper">
    <div
      class="event-hero"
      :style="{ backgroundImage: 'url(' + post.billede + ')' }"
    >
      <div class="event-date-badge">
        <span>{{ post.acf.dato }}</span>
      </div>
    </div>

    <div class="event-content">
      <h1 class="event-title">{{ post.acf.titel }}</h1>

      <p class="event-subtitle">
        {{ post.acf.tid || "Tid ikke angivet" }}
      </p>

      <p class="event-description" v-html="post.acf.brodtekst"></p>

      <div class="event-buttons">
        <button class="btn-primary">Tilmeld dig nu</button>
        <button class="btn-secondary">Læs mere</button>
      </div>

      <div class="event-info-box">
        <p><strong>DATO:</strong> {{ post.acf.dato }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.event-hero {
  width: 100%;
  height: 380px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.event-date-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.event-content {
  margin-top: 2rem;
}

.event-title {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
}

.event-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.event-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.event-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: 0.2s ease;
}

.btn-primary {
  background: #dd3333;
  color: white;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  background: white;
  border: 2px solid #dd3333;
  color: #dd3333;
}

.btn-secondary:hover {
  background: #dd3333;
  color: white;
}

.event-info-box {
  background: #f7f7f7;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 1rem;
  line-height: 1.6;
}
</style>
