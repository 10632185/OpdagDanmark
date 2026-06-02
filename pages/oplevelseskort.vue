<script setup>
import { ref } from "vue"
import FilterBar from "../components/FilterBar.vue"
import ExperienceCard from "../components/ExperienceCard.vue"

// En variabel til at styre hvilken adresse der skal vises på kortet, hvor vi sætter en default værdi til Danmark, så kortet ikke starter helt zoomet ind på et tilfældigt sted i verdenen.
const mapQuery = ref("Denmark")

// Vi henter data fra vores WordPress backend via useAsyncData, hvor "oplevelser" bliver vores cache key. En cache key er en unik identifier for det data, vi henter, så Nuxt ved hvordan det skal cache og opdatere dataen. I vores fetch funktion henter vi først alle oplevelser, og derefter laver vi et ekstra loop for at hente billede URL'en for hver oplevelse, da det billede ikke er inkluderet i det første API kald.
const { data: oplevelser, pending, error } = await useAsyncData(
  "oplevelser",
  async () => {
    // Henter alle "oplevelser" fra WordPress REST API
    const items = await $fetch(
      "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/oplevelser"
    )
    // Promise.all bruges her fordi vi skal hente ekstra data efter (billeder) for hver post.
    return await Promise.all(
      items.map(async (OP) => {
        let billede = null

        // Vi tjekker her om oplevelsen har et billede ID i ACF (Advanced Custom Fields).
        if (OP.acf?.billede) {
          // Her henter vi selve mediet fra WordPress media endpoint. Dette endpoint er også brugt til bl.a. bugfixes.
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${OP.acf.billede}`
          )
          // Her gemmer vi vores billede, så vi kan bruge det i vores frontend. Vi bruger source_url feltet, da det indeholder den direkte URL til billedet.
          billede = media.source_url
        }
        // Til sidst returnerer vi hele objektet samt tilføjer billedet vi har defineret før.
        return {
          ...OP,
          billede,
        }
      })
    )
  }
)
// Her er vores funktion der opdaterer kortets adresse, når brugeren trykker på en oplevelse.
const pingAddress = (address) => {
  if (!address) return
  // Efter brugeren så har trykket opdaterer vi vores MapQuery, så kortet reagere og viser den nye lokation.
  mapQuery.value = address
}
</script>

<template>
  <div class="layout">
    <div class="left">
      <FilterBar />

      <p v-if="pending">Loading...</p>
      <p v-else-if="error">Kunne ikke hente data</p>

      <div v-else class="grid">
        <div
          v-for="OP in [...oplevelser].reverse()"
          :key="OP.id"
          class="card-link"
          @click="pingAddress(OP.acf?.adresse)"
        >
          <ExperienceCard
            :title="OP.acf?.overskift"
            :location="OP.acf?.adresse"
            :image="OP.billede"
            :region="OP.acf?.region"
          />
        </div>
      </div>
    </div>

    <div class="right">
      <iframe
        loading="lazy"
        allowfullscreen
        :src="`https://www.google.com/maps?q=${encodeURIComponent(
          mapQuery
        )}&z=6&output=embed`"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left {
  width: 45%;
  overflow-y: auto;
  background: #fafafa;
  padding-bottom: 20px;
}

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
