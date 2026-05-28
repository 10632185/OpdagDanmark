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

<section class="hero-banner">
    <img src="../public/img/opdagDanmarkHeroimg.jpeg" alt="">

    <div class="hero-banner-overlay"></div>

    <h1 class="pacifico">Opdag vores smukke land</h1>
    <p>Find tusinde af oplevelser og begivenheder her!</p>
</section>

  <div class="pageWrapper">
    <section>
      <h2>Tilbud:</h2>

      <div class="forsideProducts">
        <p v-if="pending">Loading produkter...</p>

        <p v-else-if="error">Kunne ikke hente produkter</p>

        <div v-else class="forsideGrid">
          <div
            v-for="produkt in produkter"
            :key="produkt.id"
            class="forsideCard"
          >
            <img
              v-if="produkt.billede"
              :src="produkt.billede"
              class="forsideCardImage"
            />

            <div class="forsideCardContent">
              <h2 class="forsideCardTitle">
                {{ produkt.acf?.titel }}
              </h2>

              <p class="forsideCardLocation">
                {{ produkt.acf?.lokation }}
              </p>

              <p class="forsideCardPrice">{{ produkt.acf?.pris }} kr</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <img
        class="forsideKlubDanmarkImg"
        src="../public/img/klubDanmark.png"
        alt=""
      />

      <h2 class="forsideKlubDanmarkTitel">KlubDanmark</h2>

      <p>
        I KlubDanmark giver virksomhederne de penge til dig.<br />
        Derfor kan du i OpdagDanmarks fordelsklub spare penge på 500+ oplevelser
        over hele landet.<br />
        Bliv medlem i dag og få fordele og besparelser hos nogle af Danmarks
        bedste oplevelser samt adgang til over 450+ digitale cykel- og
        vandreruter.
      </p>

      <h2>Få blandt andet disse tilbud:</h2>

      <div class="forsideGrid">
        <div v-for="tilbud in kdtilbud" :key="tilbud.id" class="forsideCard">
          <img
            v-if="tilbud.billede"
            :src="tilbud.billede"
            class="forsideCardImage"
          />

          <div class="forsideCardContent">
            <h2 class="forsideCardTitle">
              {{ tilbud.acf?.titel }}
            </h2>

            <p>
              {{ tilbud.acf?.lokation }}
            </p>
          </div>
        </div>
      </div>

      <div class="forsideButtonWrapper">
        <button class="forsideButtonPrimary">Bliv Medlem</button>

        <button class="forsideButtonSecondary">Se alle fordele</button>
      </div>
    </section>
    <section class="newsletterSection">
  <img
    class="newsletterBg"
    src="../public/img/nyhedsBrevTilmelding.png"
    alt="Lighthouse background"
  />

  <div class="newsletterOverlay"></div>

  <div class="newsletterCard">
    <h2>Nyhedsbrev</h2>

    <p>
      Få vores gratis nyhedsbrev med inspiration til nye oplevelser i Danmark,
      afstemninger med Danmarks Bedste og meget mere.
    </p>

    <form class="newsletterForm">
      <div class="newsletterRow">
        <input type="text" placeholder="Navn" />
        <input type="text" placeholder="Efternavn" />
      </div>

      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Telefon (+45...)" />
      <input type="text" placeholder="Postnummer" />

      <button type="submit" class="newsletterButton">
        Tilmeld nyhedsbrev
      </button>
    </form>
  </div>
</section>

  </div>
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
    }

    .hero-banner p {
        font-size: 1rem;
        bottom: 35px;
    }
}

.pageWrapper {
  margin-left: 6rem;
  margin-right: 6rem;
}

.forsideProducts {
  padding: 20px;
}

.forsideGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.forsideCard {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.forsideCardImage {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.forsideCardContent {
  padding: 15px;
}

.forsideCardTitle {
  margin: 0 0 10px;
}

.forsideCardLocation {
  color: #666;
  margin: 0 0 8px;
}

.forsideCardPrice {
  font-weight: bold;
  margin: 0;
}

.forsideKlubDanmarkImg {
  width: 80%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
  display: block;
  margin: 0 auto;
}

.forsideKlubDanmarkTitel {
  text-align: center;
}

.forsideButtonWrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.forsideButtonPrimary,
.forsideButtonSecondary {
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  transition: 0.2s ease;
}

.forsideButtonPrimary {
  background: #dd3333;
  color: white;
}

.forsideButtonPrimary:hover {
  opacity: 0.85;
}

.forsideButtonSecondary {
  background: white;
  color: #dd3333;
  border: 2px solid #dd3333;
}

.forsideButtonSecondary:hover {
  background: #dd3333;
  color: white;
}

/* NEWSLETTER SECTION */
.newsletterSection {
  position: relative;
  width: 100%;
  height: 860px;
  margin-block: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
}

.newsletterBg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.newsletterOverlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.newsletterCard {
  position: relative;
  z-index: 2;
  width: 550px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.newsletterCard h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.newsletterCard p {
  font-size: 1rem;
  margin-bottom: 25px;
  color: #444;
}

.newsletterForm {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.newsletterRow {
  display: flex;
  gap: 15px;
}

.newsletterRow input {
  flex: 1;
}

.newsletterForm input {
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.newsletterButton {
  margin-top: 10px;
  padding: 16px;
  background: #dd3333;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.newsletterButton:hover {
  opacity: 0.85;
}

</style>
