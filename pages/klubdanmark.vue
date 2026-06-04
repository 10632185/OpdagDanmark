<script setup>

useHead({
  title: 'Klub Danmark - OpdagDanmark'
})

//useAsyncData bruger vi i nuxt til at hente vores data server-side, hvor cache resultatet fra "kdtilbud" er vores key-navn, som nuxt bruger til tracking.
const { data: kdtilbud, pending, error } = await useAsyncData(
  "kdtilbud",
  async () => {
    //Her henter vi alle "kdtilbud" fra vores WordPress REST API, hvor vi definerer "per_page=100", som sørger for den får alle vores posts med, da WordPress som standard kun henter 10.
    const tilbud = await $fetch(
      "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/kdtilbud?per_page=100",
    )

    // Vi bruger her promise.all fordi vi skal vise alt data på en gang, og derfor skal vente på at alle vores billeder er hentet, før vi kan vise noget. Hvis vi ikke brugte promise.all ville vi ende i en situation hvor nogle af vores tilbud bliver vist uden billede, fordi de ikke er færdige med at hente endnu.
    return await Promise.all(
      tilbud.map(async (tilbudItem) => {
        let billede = null

        // Her tjekker vi om der er et billede-id i ACF.
        if (tilbudItem.acf?.billede) {
          // Så henter vi billedet fra WordPress endpointet for media, hvor vi bruger det billede-id vi fandt i ACF til at hente det specifikke billede.
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${tilbudItem.acf.billede}`,
          )
          // Her gemmer vi selve billedets URL, så det kan bruges i frontend.
          billede = media.source_url
        }
        // Returnerer hele objektet og tilføjer billedet.
        return {
          ...tilbudItem,
          billede,
        }
      }),
    )
  },
)
</script>

<template>
  <section class="hero-banner">
    <img src="../public/img/klubdanmark.webp" alt="" />

    <div class="hero-banner-overlay"></div>

    <h1 class="pacifico">Klub Danmark</h1>
    <p>Få fordele og besparelser!</p>
  </section>

  <div class="pageWrapper">

    <section class="klubDanmarkIntroSection">
      <p class="klubDanmarkIntro">
        I KlubDanmark sparer du penge hos virksomheder.<br>
        Derfor kan du i OpdagDanmarks fordelsklub spare penge på 500+ oplevelser over hele landet. Fordelene er samlet ét sted, så det bliver nemt at få mere ud af dine oplevelser i Danmark, uanset om du er til kultur, natur eller aktiviteter med venner og familie.<br>
        Bliv medlem i dag og få fordele og besparelser hos nogle af Danmarks bedste oplevelser samt adgang til over 450+ digitale cykel- og vandreruter.<br>
        Det giver dig mulighed for at opdage nye steder og ruter i dit eget tempo, samtidig med at du kan spare penge på oplevelser, du alligevel ville have valgt.
      </p>

      <button class="klubDanmarkButton">Bliv medlem</button>
    </section>

    <section>
      <div class="klubDanmarkProducts">
        <p v-if="pending">Loading tilbud...</p>

        <p v-else-if="error">Kunne ikke hente tilbud</p>

        <div v-else class="klubDanmarkGrid">
          <div
            v-for="tilbud in kdtilbud"
            :key="tilbud.id"
            class="klubDanmarkCard"
          >
            <img
              v-if="tilbud.billede"
              :src="tilbud.billede"
              class="klubDanmarkCardImage"
            />

            <div class="klubDanmarkCardContent">
              <h2 class="klubDanmarkCardTitle">
                {{ tilbud.acf?.titel }}
              </h2>

              <p class="klubDanmarkCardLocation">
                {{ tilbud.acf?.lokation }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>

.klubDanmarkIntroSection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
 }

.klubDanmarkIntro {
  max-width: 750px;
  line-height: 1.6;
}

.klubDanmarkButton {
  background: #dd3333;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.klubDanmarkButton:hover {
  opacity: 0.85;
}

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

  background:
    linear-gradient(
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

.pageWrapper {
  margin-left: 6rem;
  margin-right: 6rem;
}

.klubDanmarkProducts {
  padding: 20px 0;
}

.klubDanmarkGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.klubDanmarkCard {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  height: 100%;
}

.klubDanmarkCardImage {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

.klubDanmarkCardContent {
  padding: 15px;

  display: flex;
  flex-direction: column;
  flex: 1;
}

.klubDanmarkCardTitle {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.4;

  min-height: 68px;
}

.klubDanmarkCardLocation {
  color: #666;
  margin-top: auto;
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .pageWrapper {
    margin-left: 3rem;
    margin-right: 3rem;
  }

  .hero-banner h1 {
    font-size: 3rem;
    margin-left: 40px;
  }

  .hero-banner p {
    margin-left: 40px;
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .pageWrapper {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  .hero-banner {
    height: 350px;
  }

  .hero-banner h1 {
    font-size: 2.2rem;
    bottom: 65px;
    margin-left: 20px;
  }

  .hero-banner p {
    font-size: 1rem;
    bottom: 35px;
    margin-left: 20px;
  }

  .klubDanmarkIntro {
    font-size: 0.95rem;
  }

  .klubDanmarkButton {
    width: 100%;
    text-align: center;
  }
}
</style>