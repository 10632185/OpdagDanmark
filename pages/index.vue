<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
    <img src="../public/img/opdagDanmarkHeroimg.jpeg" alt="" />

    <div class="hero-banner-overlay"></div>

    <h1 class="pacifico">Opdag vores smukke land</h1>

    <p>Find tusinde af oplevelser og begivenheder her!</p>
  </section>

  <div class="pageWrapper">
    <section class="sectionSpacing">
      <h2 class="sectionTitle">Tilbud</h2>

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

    <section class="sectionSpacing">
      <img
        class="forsideKlubDanmarkImg"
        src="../public/img/klubDanmark.webp"
        alt=""
      />

      <h2 class="forsideKlubDanmarkTitel">KlubDanmark</h2>

      <p class="klubDanmarkText">
        I KlubDanmark giver virksomhederne de penge til dig.
        <br />

        Derfor kan du i OpdagDanmarks fordelsklub spare penge på 500+ oplevelser
        over hele landet.
        <br />

        Bliv medlem i dag og få fordele og besparelser hos nogle af Danmarks
        bedste oplevelser samt adgang til over 450+ digitale cykel- og
        vandreruter.
      </p>

      <div class="forsideButtonWrapper">
        <button class="forsideButtonPrimary">Bliv Medlem</button>
      </div>
      <h2 class="sectionTitle">Få blandt andet disse tilbud</h2>

      <div class="sliderWrapper">
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="4"
          :space-between="25"
          :loop="true"
          :navigation="{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }"
          :pagination="{
            clickable: true,
          }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 4,
            },
          }"
          class="klubDanmarkSlider"
        >
          <SwiperSlide v-for="tilbud in kdtilbud" :key="tilbud.id">
            <div class="forsideCard">
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
          </SwiperSlide>
        </Swiper>

        <div class="custom-prev">←</div>

        <div class="custom-next">→</div>
      </div>
    </section>

    <section class="newsletterSection">
      <img
        class="newsletterBg"
        src="../public/img/nyhedsBrevTilmelding.png"
        alt=""
      />

      <div class="newsletterOverlay"></div>

      <div class="newsletterCard">
        <h2>Nyhedsbrev</h2>

        <p>
          Få vores gratis nyhedsbrev med inspiration til nye oplevelser i
          Danmark, afstemninger med Danmarks Bedste og meget mere.
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
.pageWrapper {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding-inline: 40px;
}

.sectionSpacing {
  margin-top: 80px;
}

.sectionTitle {
  font-size: 2rem;
  margin-bottom: 30px;
}

.hero-banner {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
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

  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.25));

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
  bottom: 90px;
  font-size: 4.5rem;
}

.hero-banner p {
  position: absolute;
  bottom: 45px;
  font-size: 1.4rem;
}

.forsideProducts {
  width: 100%;
}

.forsideGrid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

  gap: 24px;
}

.forsideCard {
  background: white;

  border-radius: 24px;

  overflow: hidden;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);

  transition: 0.3s ease;
}

.forsideCard:hover {
  transform: translateY(-6px);
}

.forsideCardImage {
  width: 100%;
  height: 230px;
  object-fit: cover;
}

.forsideCardContent {
  padding: 18px;
}

.forsideCardTitle {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.forsideCardLocation {
  color: #666;
  margin-bottom: 10px;
}

.forsideCardPrice {
  font-weight: bold;
}

.forsideKlubDanmarkImg {
  width: 100%;
  max-width: 1200px;

  height: 450px;

  object-fit: cover;

  display: block;

  margin: 0 auto 40px;

  border-radius: 24px;
}

.forsideKlubDanmarkTitel {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
}

.klubDanmarkText {
  max-width: 900px;
  margin: 0 auto 20px;

  text-align: center;

  line-height: 1.8;
}

.sliderWrapper {
  position: relative;
  width: 100%;
  padding-inline: 60px;
}

.klubDanmarkSlider {
  width: 100%;
  padding-bottom: 70px;
}

.klubDanmarkSlider .swiper-slide {
  height: auto;
}

.klubDanmarkSlider .forsideCard {
  height: 100%;
}

.custom-prev,
.custom-next {
  position: absolute;

  top: 45%;
  transform: translateY(-50%);

  width: 54px;
  height: 54px;

  border-radius: 50%;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: bold;

  cursor: pointer;

  z-index: 20;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

  transition: 0.25s ease;
}

.custom-prev:hover,
.custom-next:hover {
  transform: translateY(-50%) scale(1.08);
}

.custom-prev {
  left: -5px;
}

.custom-next {
  right: -5px;
}

.forsideButtonWrapper {
  display: flex;
  justify-content: center;
  gap: 20px;

  margin-block: 30px;
}

.forsideButtonPrimary,
.forsideButtonSecondary {
  padding: 16px 34px;

  border-radius: 14px;

  border: none;

  cursor: pointer;

  font-size: 1rem;

  transition: 0.25s ease;
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
  border: 2px solid #dd3333;
  color: #dd3333;
}

.forsideButtonSecondary:hover {
  background: #dd3333;
  color: white;
}

.newsletterSection {
  position: relative;

  width: 100%;

  min-height: 900px;

  margin-block: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  border-radius: 24px;
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

  width: 100%;
  max-width: 600px;

  background: white;

  padding: 45px;

  border-radius: 24px;

  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);

  text-align: center;
}

.newsletterCard h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.newsletterCard p {
  margin-bottom: 30px;
  line-height: 1.7;
}

.newsletterForm {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.newsletterRow {
  display: flex;
  gap: 16px;
}

.newsletterRow input {
  flex: 1;
}

.newsletterForm input {
  padding: 14px 16px;

  border-radius: 12px;

  border: 1px solid #ccc;

  font-size: 1rem;
}

.newsletterButton {
  padding: 16px;

  border: none;

  border-radius: 14px;

  background: #dd3333;
  color: white;

  font-size: 1rem;

  cursor: pointer;

  transition: 0.25s ease;
}

.newsletterButton:hover {
  opacity: 0.85;
}

@media (max-width: 1024px) {
  .pageWrapper {
    padding-inline: 24px;
  }

  .hero-banner {
    height: 500px;
  }

  .hero-banner h1 {
    font-size: 3.2rem;
  }

  .hero-banner p {
    font-size: 1.2rem;
  }

  .forsideKlubDanmarkImg {
    height: 320px;
  }
}

@media (max-width: 768px) {
  .pageWrapper {
    padding-inline: 16px;
  }

  .sectionSpacing {
    margin-top: 50px;
  }

  .sectionTitle {
    font-size: 1.6rem;
  }

  /* HERO */

  .hero-banner {
    height: 350px;
  }

  .hero-banner h1,
  .hero-banner p {
    margin-left: 20px;
  }

  .hero-banner h1 {
    font-size: 2rem;
    bottom: 80px;
  }

  .hero-banner p {
    font-size: 1rem;
    bottom: 45px;
    width: 90%;
  }

  /* CARD */

  .forsideCardImage {
    height: 210px;
  }

  .forsideKlubDanmarkImg {
    height: 220px;
    border-radius: 18px;
  }

  .forsideKlubDanmarkTitel {
    font-size: 2rem;
  }

  .klubDanmarkText {
    font-size: 0.95rem;
  }

  .sliderWrapper {
    padding-inline: 0;
  }

  .custom-prev,
  .custom-next {
    width: 44px;
    height: 44px;

    top: unset;
    bottom: 0;

    font-size: 20px;
  }

  .custom-prev {
    left: 34%;
  }

  .custom-next {
    right: 34%;
  }

  .forsideButtonWrapper {
    flex-direction: column;
  }

  .forsideButtonPrimary,
  .forsideButtonSecondary {
    width: 100%;
  }

  .newsletterSection {
    min-height: auto;
    padding: 50px 20px;
  }

  .newsletterCard {
    padding: 24px;
    border-radius: 18px;
  }

  .newsletterRow {
    flex-direction: column;
  }
}
</style>
