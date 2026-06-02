<script setup>
import { ref } from "vue"
import FilterBar from "../components/FilterBar.vue"
import ExperienceCard from "../components/ExperienceCard.vue"

const mapQuery = ref("Denmark")

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
)

const pingAddress = (address) => {
  if (!address) return
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
