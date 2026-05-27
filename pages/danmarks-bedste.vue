<script setup>
const {
  data: danmarksbedste,
  pending,
  error,
} = await useAsyncData("danmarksbedste", async () => {
  const items = await $fetch(
    "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/danmarksbedste"
  );

  return await Promise.all(
    items.map(async (DB) => {
      let billede = null;

      if (DB.acf?.billede) {
        const media = await $fetch(
          `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${DB.acf.billede}`
        );

        billede = media.source_url;
      }

      return {
        ...DB,
        billede,
      };
    })
  );
});
</script>

<template>
  <section class="vote-grid">
    <div
      v-for="DB in [...danmarksbedste].reverse()"
      :key="DB.id"
      class="vote-card"
    >
      <div
        class="vote-card-image"
        :style="{ backgroundImage: 'url(' + DB.billede + ')' }"
      >
        <img
          class="vote-badge-img"
          src="../public/img/danmarksBedsteBadges/danmarksBedstePizzaBadge.png"
          alt="badge"
        />
      </div>

      <div class="vote-card-content">
        <h3>{{ DB.acf?.titel }}</h3>
        <p class="vote-dates">
          {{ DB.acf?.dato }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vote-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.vote-card {
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
  transition: 0.25s ease;
}

.vote-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.18);
}

.vote-card-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.vote-badge-img {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 70px;
  height: auto;
  z-index: 5;
}

.vote-card-content {
  padding: 20px;
}

.vote-card-content h3 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
}

.vote-dates {
  margin-top: 8px;
  color: #555;
  font-size: 1rem;
}
</style>
