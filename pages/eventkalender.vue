<script setup>
import { ref, onMounted, computed } from "vue";

const activeRegion = ref("Alle");
const activeCategory = ref("Alle");

const events = ref([]);
const loading = ref(true);
const error = ref(false);

const regionCounts = ref({});
const categoryCounts = ref({});

onMounted(async () => {
  try {
    const items = await $fetch(
      "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/oplevelser",
    );

    const resolved = await Promise.all(
      items.map(async (OP) => {
        let image = null;
        if (OP.acf?.billede) {
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${OP.acf.billede}`,
          );
          image = media.source_url;
        }

        return {
          title: OP.acf?.overskrift || "Ukendt titel",
          region: OP.acf?.region || "Ukendt region",
          category: OP.acf?.kategori || "Ukendt kategori",
          date: OP.acf?.dato || "Ukendt dato",
          location: OP.acf?.adresse || "Ukendt adresse",
          image,
        };
      }),
    );

    events.value = resolved.reverse();

    const rCounts = {};
    const cCounts = {};

    for (const e of events.value) {
      rCounts[e.region] = (rCounts[e.region] || 0) + 1;
      cCounts[e.category] = (cCounts[e.category] || 0) + 1;
    }

    regionCounts.value = rCounts;
    categoryCounts.value = cCounts;
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
});

const filteredEvents = computed(() =>
  events.value.filter(
    (e) =>
      (activeRegion.value === "Alle" || e.region === activeRegion.value) &&
      (activeCategory.value === "Alle" || e.category === activeCategory.value),
  ),
);

const resetFilters = () => {
  activeRegion.value = "Alle";
  activeCategory.value = "Alle";
};
</script>

<template>
  <div class="events-page">
    <div class="layout">
      <aside class="sidebar">
        <button class="reset-btn" @click="resetFilters">Nulstil filter</button>

        <h3>OMRÅDER</h3>
        <ul>
          <li
            v-for="(count, region) in regionCounts"
            :key="region"
            :class="{ active: activeRegion === region }"
            @click="activeRegion = region"
          >
            {{ region }} <span>{{ count }}</span>
          </li>
        </ul>

        <h3>TYPER</h3>
        <ul>
          <li
            v-for="(count, cat) in categoryCounts"
            :key="cat"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }} <span>{{ count }}</span>
          </li>
        </ul>

        <h3>DATO PERIODE</h3>
        <input type="date" />
      </aside>

      <main class="grid">
        <p v-if="loading">Loading...</p>
        <p v-else-if="error">Kunne ikke hente data</p>

        <div v-else v-for="e in filteredEvents" :key="e.title" class="card">
          <div class="date-badge">{{ e.date }}</div>
          <img :src="e.image" alt="" />
          <div class="content">
            <span class="region">{{ e.region }}</span>
            <h2>{{ e.title }}</h2>
            <p class="location">{{ e.location }}</p>
            <p class="category">{{ e.category }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
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

.reset-btn {
  margin-bottom: 20px;
  padding: 10px 12px;
  width: 100%;
  background: #eaeaea;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.reset-btn:hover {
  background: #d33;
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
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.25s ease;
}

.sidebar li:hover {
  background: #e5e5e5;
}

.sidebar li.active {
  background: #d0d0d0;
  font-weight: 700;
  color: #000;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 25px;
}

.card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
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

.date-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ffffffdd;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.content {
  padding: 15px;
}

.region {
  font-size: 14px;
  font-weight: 600;
  color: #444;
}

.location {
  font-size: 14px;
  opacity: 0.8;
}

.category {
  font-size: 13px;
  opacity: 0.7;
  margin-top: 4px;
}
</style>
