<script setup>

useHead({
  title: 'Danmarks Bedste - OpdagDanmark'
})

// useAsyncData bruges i Nuxt til at hente data asynkront, før siden vises. Her henter vi data fra vores WordPress endpointet "danmarksbedste".

const {
  data: danmarksbedste,
  pending,
  error,
} = await useAsyncData("danmarksbedste", async () => {
  // 'data' bliver omdøbt til 'danmarksbedste' for nemmere brug i templaten. Her er pending = true mens data hentes og error indeholder "fejl" hvis fetch fejler.

  // Først henter vi selve listen af "danmarksbedste" posts fra WordPress API'et.
  const items = await $fetch(
    "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/danmarksbedste",
  );

  // Promise.all bruges til at vente på ALLE async opgaver i .map bliver færdige, så vi kan returnere en komplet liste med billeder og badges til vores cards.
  return await Promise.all(
    // items.map kører igennem hvert element i listen. For hvert element (DB) henter vi billede og et badge hvis de findes igennem vores wordpress fetching.
    items.map(async (DB) => {
      let billede = null;
      let badge = null;
      // billede starter som null, indtil vi finder et media-id og det samme køre for badge som også starter som null. Hvis der findes et billede i ACF feltet, henter vi media-data fra WordPress.
      if (DB.acf?.billede) {
        const media = await $fetch(
          `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${DB.acf.billede}`,
        );
// Vi gemmer selve billedets URL
        billede = media.source_url; 
      }

      // Samme logik, men for badge feltet.
      if (DB.acf?.badge) {
        const media = await $fetch(
          `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${DB.acf.badge}`,
        );
// Gemmer badge-billedets URL
        badge = media.source_url; 
      }

      // Vi returnerer et nyt objekt, der indeholder alle originale data fra DB (via ...DB som betyder lig indholdet fra DB før på ... plads) som er det hentede billede og hentede badge. Spread-operatoren  ( som er ...) kopierer alle felter fra DB ind i objektet.
      return {
        ...DB,
        billede,
        badge,
      };
    }),
  );
});
</script>

<template>
  <section class="hero-banner">
    <img src="../public/img/DBHero.webp" alt="" />

    <div class="hero-banner-overlay"></div>

    <h1 class="pacifico">Danmarks Bedste</h1>
    <p>Vær med til at afgøre, hvem der fortjener titlen som Danmarks Bedste!</p>
  </section>

  <section class="vote-grid">
    <NuxtLink
      v-for="DB in [...danmarksbedste].reverse()"
      :key="DB.id"
      class="vote-card"
      :to="`/danmarksbedste/${DB.id}`"
    >
      <div
        class="vote-card-image"
        :style="{ backgroundImage: 'url(' + DB.billede + ')' }"
      >
        <img
          v-if="DB.badge"
          class="vote-badge-img"
          :src="DB.badge"
          alt="badge"
        />
      </div>

      <div class="vote-card-content">
        <h3>{{ DB.acf?.titel }}</h3>
        <p class="vote-dates">
          {{ DB.acf?.dato }}
        </p>
      </div>
    </NuxtLink>
  </section>
</template>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;

  display: flex;
  align-items: flex-end;
}

.hero-banner img {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-banner-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0.1) 100%
  );

  box-shadow:
    inset 0 -120px 120px rgba(0, 0, 0, 0.45),
    inset 0 40px 60px rgba(0, 0, 0, 0.15);

  z-index: 1;
}

.hero-banner h1,
.hero-banner p {
  position: relative;
  z-index: 2;

  color: white;
  margin-left: 80px;
}

.hero-banner h1 {
  position: absolute;
  bottom: 70px;

  font-size: 4rem;
  font-weight: 700;
}

.hero-banner p {
  position: absolute;
  bottom: 35px;

  font-size: 1.5rem;
  font-weight: 400;
}

@media (max-width: 768px) {
  .hero-banner {
    height: 350px;
  }

  .hero-banner h1,
  .hero-banner p {
    margin-left: 25px;
  }

  .hero-banner h1 {
    font-size: 2.5rem;
    bottom: 65px;
    margin-bottom: 1.2rem;
  }

  .hero-banner p {
    font-size: 1rem;
    bottom: 35px;
  }
}

.vote-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (max-width: 768px) {
  .vote-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.vote-card {
  width: 100%;
  background: #dd3333;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  transition: 0.25s ease;
  text-decoration: none;
  text-align: center;
}

.vote-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
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
  color: white;
}

.vote-card-content h3 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
}

.vote-dates {
  margin-top: 8px;
  color: white;
  font-size: 1rem;
}
</style>
