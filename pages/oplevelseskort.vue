<script setup>
import FilterBar from "../components/FilterBar.vue"
import ExperienceCard from "../components/ExperienceCard.vue"

// FETCH OPLEVELSER + RESOLVE ACF IMAGE
const { data: oplevelser, pending, error } = await useAsyncData(
  "oplevelser",
  async () => {
    const items = await $fetch(
      "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/oplevelser"
    )

    return await Promise.all(
      items.map(async (OP) => {
        let billede = null

        if (OP.acf?.billede) {
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${OP.acf.billede}`
          )
          billede = media.source_url
        }

        return {
          ...OP,
          billede,
        }
      })
    )
  }
);
</script>

<template>
  <div class="layout">

    <div class="left">
      <FilterBar />

      <p v-if="pending">Loading...</p>
      <p v-else-if="error">Kunne ikke hente data</p>

      <div v-else class="grid">
        <NuxtLink
          v-for="OP in [...oplevelser].reverse()"
          :key="OP.id"
          :to="``"
          class="card-link"
        >
          <ExperienceCard
            :title="OP.acf?.overskift"
            :location="OP.acf?.adresse"
            :image="OP.billede"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="right">
      <iframe
        loading="lazy"
        allowfullscreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246767.983!2d8.0!3d56.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253b3e3c5b0a1%3A0xdeb5c4f1a5c2e3f!2sDenmark!5e0!3m2!1sen!2sdk!4v1712345678901"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
/* MAIN LAYOUT */
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* LEFT SIDE — CARDS */
.left {
  width: 45%;
  overflow-y: auto;
  background: #fafafa;
  padding-bottom: 20px;
}

/* RIGHT SIDE — MAP */
.right {
  width: 55%;
  height: 100%;
  overflow: hidden;
}

.right iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
}

/* MOBILE */
@media (max-width: 768px) {
  .layout {
    flex-direction: column-reverse;
    height: auto;
  }

  .left {
    width: 100%;
    height: auto;
  }

  .right {
    width: 100%;
    height: 300px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }
}
</style>
