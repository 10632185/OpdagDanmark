<script setup>
import { ref } from 'vue'

// STATIC FILTERS (unchanged)
const areas = [
  { name: 'Nordjylland', count: 12 },
  { name: 'Midtjylland', count: 20 },
  { name: 'Syddanmark', count: 12 },
  { name: 'Fyn & Øer', count: 10 },
  { name: 'Sjælland & Øer', count: 247 }
]

const categories = [
  'Natur', 'Kultur', 'Musik', 'Workshop', 'Mad & Drikke'
]

// EVENTS FROM WORDPRESS
const events = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const items = await $fetch(
      "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/oplevelser"
    )

    const resolved = await Promise.all(
      items.map(async (OP) => {
        let image = null

        // Resolve ACF image
        if (OP.acf?.billede) {
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${OP.acf.billede}`
          )
          image = media.source_url
        }

        return {
          title: OP.acf?.overskift || "Ukendt titel",
          category: OP.acf?.region || "Ukendt region",
          date: OP.acf?.dato || "Ukendt dato",
          location: OP.acf?.adresse || "Ukendt adresse",
          image
        }
      })
    )

    events.value = resolved.reverse()
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="events-page">
    <div class="layout">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <h3>OMRÅDER</h3>
        <ul>
          <li v-for="a in areas" :key="a.name">
            {{ a.name }} <span>{{ a.count }}</span>
          </li>
        </ul>

        <h3>KATEGORIER</h3>
        <ul>
          <li v-for="c in categories" :key="c">{{ c }}</li>
        </ul>

        <h3>DATO PERIODE</h3>
        <input type="date" />
      </aside>

      <!-- EVENTS GRID -->
      <main class="grid">
        <p v-if="loading">Loading...</p>
        <p v-else-if="error">Kunne ikke hente data</p>

        <div
          v-else
          v-for="e in events"
          :key="e.title"
          class="card"
        >
          <img :src="e.image" alt="" />

          <div class="content">
            <span class="category">{{ e.category }}</span>
            <h2>{{ e.title }}</h2>
            <p class="location">{{ e.location }}</p>

            <div class="meta">
              <span>{{ e.dato }}</span>
              <span class="price">{{ e.price }}</span>
            </div>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
/* YOUR ORIGINAL STYLING — UNCHANGED */
.events-page {
  padding: 40px;
}

.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 40px;
}

.sidebar {
  border-right: 1px solid #eee;
  padding-right: 20px;
}

.sidebar h3 {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
}

.sidebar ul {
  margin-bottom: 25px;
}

.sidebar li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  cursor: pointer;
  opacity: 0.8;
}

.sidebar li:hover {
  opacity: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 25px;
}

.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: 0.2s;
  width: 400px;
}

.card:hover {
  transform: translateY(-4px);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.content {
  padding: 15px;
}

.category {
  font-size: 13px;
  opacity: 0.7;
}

.location {
  font-size: 14px;
  opacity: 0.8;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: 600;
}

.price {
  color: #008000;
}
</style>
