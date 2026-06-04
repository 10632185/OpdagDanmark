<script setup>

// useHead bruges til at sætte metadata in på siden, hvilket vil vise "Eventkalender - OpdagDanmark" i browser fanen.
useHead({
  title: 'Eventkalender - OpdagDanmark'
})

import { ref, onMounted, computed } from "vue";
// ref er reaktive værdier (Vue opdaterer UI når .value ændrer sig). onMounted kører når komponenten er færdig med at loade og computed viser hvilke værdier der automatisk opdateres når deres afhængigheder ændrer sig.

// Her filtrere vi for region og kategori og hvor "Alle" betyder ingen filtrering er sat til.
const activeRegion = ref("Alle");
const activeCategory = ref("Alle");

// events viser alle oplevelser hentet fra WordPress hvor loading viser true mens data hentes og error viser det modsatte hvis noget går galt.
const events = ref([]);
const loading = ref(true);
const error = ref(false);

// regionCounts og categoryCounts tæller hvor mange events der findes i hver region og kategori.
const regionCounts = ref({});
const categoryCounts = ref({});

  // Første tjek spørg om der overhovedet findes en dato? Hvis raw fx er null, undefined eller en tom string, giver det ingen mening at prøve at formatere den og derfor returnerer vi bare værdien som den er.
const formatDate = (raw) => {
  if (!raw) return raw;

  // Hvis datoen har bindestreger vil den formatere det fra "YYYY-MM-DD".
  if (raw.includes("-")) {
    const [y, m, d] = raw.split("-"); 
    // Her bruger vi .split til og splitte datoen i år, måned, dag.
    return `${d}.${m}.${y}`; 
    // Også vil vi så få det returneret i dansk format til "DD-MM-YYYY".
  }

  // Ellers antager vi formatet "YYYYMMDD". Den måde som .Slice fungere på er at den tager det lange 8 cifret tal og "slicer/skær" det på fra de førstm 0-4 tal og derfra 4-6 tal som er 2 og de sidste 2 fra 6-8 tal... det vil så blive returneret som "DD-MM-YYYY" i en reverse order.
  const y = raw.slice(0, 4);
  const m = raw.slice(4, 6);
  const d = raw.slice(6, 8);
  return `${d}.${m}.${y}`;
};


// onMounted kører når komponenten er klar. Her henter vi alle events fra WordPress og kører igennem dem.
onMounted(async () => {
  try {
    // Vores Fetch henter alle oplevelser fra WordPress API'et.
    const items = await $fetch(
      "http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/oplevelser",
    );

    // Promise.all sikrer at vi venter på ALLE async-opgaver i map.
    const resolved = await Promise.all(
      items.map(async (OP) => {
        let image = null;

        // Hvis der findes et billede-id i ACF, henter vi billedets URL.
        if (OP.acf?.billede) {
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${OP.acf.billede}`,
          );
          image = media.source_url;
        };

        // Returnerer et nyt objekt med kun de felter vi skal bruge ellers hvis den ikke kan finde en værdi eller hvis vi ikke trækker indholdet ind korrekt vil den display en Error som fx. "Ukendt Title".
         return {
          title: OP.acf?.overskift || "Ukendt titel",
          region: OP.acf?.region || "Ukendt region",
          category: OP.acf?.kategori || "Ukendt kategori",
          date: OP.acf?.dato || "Ukendt dato",
          location: OP.acf?.adresse || "Ukendt adresse",
          image,
        };
      }),
    );

events.value = resolved.sort((a, b) => new Date(b.date) - new Date(a.date));
// Vi sorterer alle events efter dato, så de nyeste kommer først. resolved.sort(indholdet) sorterer arrayet "resolved" direkte hvor (a, b) er to events der sammenlignes new Date(b.date) og new Date(a.date)... Hvis b er nyere end a vil resultatet vise positivt med mindre b kommer før a og det samme omvendt.

// new Date(...) laver dato-strengen om til et rigtigt Date-objekt, så JavaScript kan sammenligne dem korrekt. Kort sagt viser denne linje at events bliver vist i rækkefølgen fra nyeste til ældst.


    // Tæller hvor mange events der findes pr. region og kategori.
    const rCounts = {};
    const cCounts = {};

    for (const e of events.value) {
      rCounts[e.region] = (rCounts[e.region] || 0) + 1;
      cCounts[e.category] = (cCounts[e.category] || 0) + 1;
    }

    regionCounts.value = rCounts;
    categoryCounts.value = cCounts;

  } catch {
    // Hvis noget går galt under fetch, sætter vi error til true.
    error.value = true;

  } finally {
    // Uanset hvad, stopper vi loading når alt er færdigt.
    loading.value = false;
  }
});


// filteredEvents filtrerer events baseret på valgte filtre. Hvis "Alle" er valgt, filtreres der ikke på den del.
const filteredEvents = computed(() =>
  events.value.filter(
    (e) =>
      (activeRegion.value === "Alle" || e.region === activeRegion.value) &&
      (activeCategory.value === "Alle" || e.category === activeCategory.value),
  ),
);


// Denne computed tæller kun kategorier indenfor den valgte region.
const filteredCategoryCounts = computed(() => {
  const counts = {};

  // Starter alle kategorier på 0.
  for (const cat in categoryCounts.value) {
    counts[cat] = 0;
  }

  // Tæller kun events der matcher den valgte category.
  for (const e of events.value) {
    if (activeRegion.value === "Alle" || e.region === activeRegion.value) {
      counts[e.category] = (counts[e.category] || 0) + 1;
    }
  }

  return counts;
});


// Nulstiller begge filtre tilbage til "Alle" hvilket viser.
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
            @click="activeRegion = activeRegion === region ? 'Alle' : region"
          >
            {{ region }} <span>{{ count }}</span>
          </li>
        </ul>

        <h3>TYPER</h3>
        <ul>
          <li
            v-for="(count, cat) in filteredCategoryCounts"
            :key="cat"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = activeCategory === cat ? 'Alle' : cat"
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
          <div class="date-badge">{{ formatDate(e.date) }}</div>
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

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 200px 1fr;
    gap: 20px;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 600px) {
  .events-page {
    padding: 20px;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    padding-right: 0;
    margin-bottom: 20px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card img {
    height: 200px;
  }
}
</style>
