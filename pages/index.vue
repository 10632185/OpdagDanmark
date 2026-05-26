<script setup>
const { data: produkter, pending, error } = await useAsyncData(
  'produkter',
  async () => {
    const produkter = await $fetch(
      'http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/produkter'
    )

    return await Promise.all(
      produkter.map(async (produkt) => {
        let billede = null

        if (produkt.acf?.billede) {
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${produkt.acf.billede}`
          )

          billede = media.source_url
        }

        return {
          ...produkt,
          billede
        }
      })
    )
  }
)

const { data: kdtilbud } = await useAsyncData(
  'kdtilbud',
  async () => {
    const tilbud = await $fetch(
      'http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/kdtilbud'
    )

    return await Promise.all(
      tilbud.map(async (tilbudItem) => {
        let billede = null

        if (tilbudItem.acf?.billede) {
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${tilbudItem.acf.billede}`
          )

          billede = media.source_url
        }

        return {
          ...tilbudItem,
          billede
        }
      })
    )
  }
)
</script>

<template>
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
            >

            <div class="forsideCardContent">

              <h2 class="forsideCardTitle">
                {{ produkt.acf?.titel }}
              </h2>

              <p class="forsideCardLocation">
                {{ produkt.acf?.lokation }}
              </p>

              <p class="forsideCardPrice">
                {{ produkt.acf?.pris }} kr
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>

    <section>
      <img class="forsideKlubDanmarkImg" src="../public/img/klubDanmark.png" alt="">

      <h2 class="forsideKlubDanmarkTitel">
        KlubDanmark
      </h2>

      <p>
        I KlubDanmark giver virksomhederne de penge til dig.<br>
        Derfor kan du i OpdagDanmarks fordelsklub spare penge på 500+ oplevelser over hele landet.<br>
        Bliv medlem i dag og få fordele og besparelser hos nogle af Danmarks bedste oplevelser samt adgang til over 450+ digitale cykel- og vandreruter.
      </p>

      <h2>Få blandt andet disse tilbud:</h2>

      <div class="forsideGrid">

        <div
          v-for="tilbud in kdtilbud"
          :key="tilbud.id"
          class="forsideCard"
        >

          <img
            v-if="tilbud.billede"
            :src="tilbud.billede"
            class="forsideCardImage"
          >

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
  <button class="forsideButtonPrimary">
    Bliv Medlem
  </button>

  <button class="forsideButtonSecondary">
    Se alle fordele
  </button>
</div>

    </section>
  </div>
</template>

<style scoped>
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
  background: #DD3333;
  color: white;
}

.forsideButtonPrimary:hover {
  opacity: 0.85;
}

.forsideButtonSecondary {
  background: white;
  color: #DD3333;
  border: 2px solid #DD3333;
}

.forsideButtonSecondary:hover {
  background: #DD3333;
  color: white;
}

</style>