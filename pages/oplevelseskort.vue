<script setup>
useHead({
  title: "Oplevelseskort - OpdagDanmark",
});

import { ref, onMounted } from "vue";
import FilterBar from "../components/FilterBar.vue";
import ExperienceCard from "../components/ExperienceCard.vue";

// En variabel til at styre hvilken adresse der skal vises på kortet, hvor vi sætter en default værdi til Danmark, så kortet ikke starter helt zoomet ind på et tilfældigt sted i verdenen.
const mapQuery = ref("Denmark");

// ----------------------------------------------------------------
//Skifter imellem timer loader og rigtig pending loader som skal virke på den rigtige webside...
// true  = brug 4 sek timer.
// false = brug pending loader (den rigtige loader).
const useTimerLoader = true;

// Loading logo state smo varer i 4 sekunder...
const showLoading = ref(true);

// Her starter vores simple loading animation som viser et loader logo og teksten "Henter oplevelser..." i 4 sekunder før den viser oplevelserne. Det er en simpel timeout funktion der sætter showLoading til false efter 4 sekunder, og i template delen viser vi enten loaderen eller oplevelserne baseret på værdien af showLoading.

// hvis timerloader er true så starter den timer loaderen som er "fake loader"... hvis den er false så bruger den pending loader som er den rigtige som vil køre igennem det rigtige website og ikke bare 4 sekunder... det er en måde at teste loaderen på uden at skulle vente på rigtige data hver gang...
onMounted(() => {
  if (useTimerLoader) {
    setTimeout(() => {
      showLoading.value = false;
    }, 4000);
  }
});
// ----------------------------------------------------------------

// Vi henter data fra vores WordPress backend via useAsyncData, hvor "oplevelser" bliver vores cache key. En cache key er en unik identifier for det data, vi henter, så Nuxt ved hvordan det skal cache og opdatere dataen. I vores fetch funktion henter vi først alle oplevelser, og derefter laver vi et ekstra loop for at hente billede URL'en for hver oplevelse, da det billede ikke er inkluderet i det første API kald.
const {
  data: oplevelser,
  pending,
  error,
} = await useAsyncData("oplevelser", async () => {
  const items = await $fetch(
    "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/oplevelser",
  );
  // Promise.all bruges her fordi vi skal hente ekstra data efter (billeder) for hver post.
  return await Promise.all(
    items.map(async (OP) => {
      let billede = null;

      // Vi tjekker her om oplevelsen har et billede ID i ACF (Advanced Custom Fields).
      if (OP.acf?.billede) {
        // Her henter vi selve mediet fra WordPress media endpoint. Dette endpoint er også brugt til bl.a. bugfixes.
        const media = await $fetch(
          `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${OP.acf.billede}`,
        );
        // Her gemmer vi vores billede, så vi kan bruge det i vores frontend. Vi bruger source_url feltet, da det indeholder den direkte URL til billedet.
        billede = media.source_url;
      }
      // Til sidst returnerer vi hele objektet samt tilføjer billedet vi har defineret før.
      return {
        ...OP,
        billede,
      };
    }),
  );
});
// Her er vores funktion der opdaterer kortets adresse, når brugeren trykker på en oplevelse.
const pingAddress = (address) => {
  if (!address) return;
  // Efter brugeren så har trykket opdaterer vi vores MapQuery, så kortet reagere og viser den nye lokation.
  mapQuery.value = address;
};
</script>

<template>
  <div class="layout">
    <div class="left">
      <FilterBar />

      <p v-if="error">Kunne ikke hente data</p>

      <!-- HER IMPLEMENTERE VI LOADER ANIMATIONEN SOM BRUGES FRA LOADING AF SIDEN OGSÅ 4 SEK FREMAD... -->
      <!-- Hvis useTimerLoader === true så bruger vi showLoading (4 sek timer)... og hvis useTimerLoader === false så bruger vi pending (rigtig loader)... -->
      <div
        v-if="(useTimerLoader && showLoading) || (!useTimerLoader && pending)"
        class="loading-wrapper"
      >
        <div class="loader"></div>
        <p>Henter oplevelser...</p>
      </div>

      <div v-else class="grid">
        <div
          v-for="OP in [...oplevelser].reverse()"
          :key="OP.id"
          class="card-link fade-in"
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
          mapQuery,
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

.card-link {
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.card-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

/* ------------------------------- */
/* HER STARTER LOADER ANIMATIONEN  */
/* ------------------------------- */
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  opacity: 1;
  animation: fadeIn 0.4s ease forwards;
}

.loader {
  width: 60px;
  height: 60px;
  border: 6px solid #ddd;
  border-top-color: #ff3b3b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* fade in animationen styrer den simple "fade ind" effekt. From betyder starten af animationen er elementet helt gennemsigtigt og to betyder slutningen er 100% synligt... */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Her laver vi fade in animation på cards hvor de kommer ind med en animation fra bunden og går op 6px med transform translateY... og det basic fadeinup med 0.35s */
.fade-in {
  opacity: 0;
  transform: translateY(6px);
  animation: fadeInUp 0.35s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* ------------------------------- */
/* HER SLUTTER LOADER ANIMATIONEN  */
/* ------------------------------- */

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
