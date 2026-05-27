<script setup>
const {
  data: produkter,
  pending,
  error,
} = await useAsyncData("produkter", async () => {
  const produkter = await $fetch(
    "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/produkter",
  );

  return await Promise.all(
    produkter.map(async (produkt) => {
      let billede = null;

      if (produkt.acf?.billede) {
        const media = await $fetch(
          `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${produkt.acf.billede}`,
        );

        billede = media.source_url;
      }

      return {
        ...produkt,
        billede,
      };
    }),
  );
});

const { data: kdtilbud } = await useAsyncData("kdtilbud", async () => {
  const tilbud = await $fetch(
    "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/kdtilbud",
  );

  return await Promise.all(
    tilbud.map(async (tilbudItem) => {
      let billede = null;

      if (tilbudItem.acf?.billede) {
        const media = await $fetch(
          `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${tilbudItem.acf.billede}`,
        );

        billede = media.source_url;
      }

      return {
        ...tilbudItem,
        billede,
      };
    }),
  );
});
</script>

<template>
  <section>
    <div v-for="produkt in produkter" :key="produkt.id" class="vote-card">
      <div
        class="vote-card-image"
        :style="{ backgroundImage: 'url(' + produkt.billede + ')' }"
      >
        <img
          class="vote-badge-img"
          src="../public/img/danmarksBedsteBadges/danmarksBedstePizzaBadge.png"
          alt="badge"
        />
      </div>

      <div class="vote-card-content">
        <h3>{{ produkt.acf?.titel }}</h3>
        <p class="vote-dates">
            
-  {{ produkt.acf?.startdato }} – {{ produkt.acf?.slutdato }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero {
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  width: 100vw;
  height: 260px;
  background-image: url("../public/img/opdagDanmarkHeroimg.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: left;
  padding-bottom: 1rem;
  padding-left: 3rem;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.hero-content p {
  margin-top: 10px;
  font-size: 1.2rem;
  color: white;
  opacity: 0.95;
}

.vote-card {
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  margin: 2rem auto;
  transition: 0.25s ease;
}

.vote-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}

.vote-card-image {
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.vote-badge-img {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 90px;
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
