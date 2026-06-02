<script setup>
// defineEmits bruges til at definere, hvilke events komponenten kan "emitte" (sende op til parent komponentet). Her siger vi, at dette komponent kan sende et event, der hedder "update".
const emit = defineEmits(["update"]);

// Vi opretter et array (liste) med forskellige filtre hvor hvert element i listen er en tekststreng, som er en kategori vi kan filtrere igennem. Denne liste kan f.eks. bruges til at vise knapper eller tags i interfacet.
const filters = [
  "Museer",
  "Legepladser",
  "Bageri",
  "Halloween",
  "Badehoteller",
];

// selectFilter er en funktion, der bliver kaldt, når brugeren vælger et filter. (f) er værdien vi modtager som er navnet på det filter brugeren har klikket på. Når funktionen aktiveres, bruger vi emit til at sende et "update" event op til parent komponentet. Vi sender også selve filter værdien som er (f) med eventet, så vores parent komponent præcist ved, hvilket filter brugeren har valgt og kan opdatere sin state derefter. Kort sagt har vi selectFilter som fortæller vores forældre-komponenten at "Her er det filter brugeren valgte.. gør hvad du skal for at opdele og filtrer det."
function selectFilter(f) {
  emit("update", f);
}
</script>

<template>
  <div class="filter-bar">
    <input type="text" placeholder="Hvad søger du..." class="search" />

    <div class="tags">
            <!-- 
// v-for betyder "lav en knap for hvert element i listen, hvor vi har angivet 5 værdier. (f) er navnet vi giver det enkelte element i listen (fx "Museer") Det svarer tila at for hvert filter kalder det på f. 

:key="f" bruges af Vue til at holde styr på hver knap. Det gør Vue hurtigere og mere stabil, når listen ændrer sig. Her bruger vi selve filter navnet som unik nøgle. @click="selectFilter(f) betyder at "når brugeren klikker på knappen" vil der blevet valgt selectFilter(f) som kalder funktionen og sender f med som argument. Det viser at "Brugeren valgte dette filter" som skal filtreres efter. {{ f }} bruges til at vise data i HTML. Her viser vi navnet på filteret inde i knappen.
-->
      <button v-for="f in filters" :key="f" @click="selectFilter(f)">
        {{ f }}
      </button>

    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  padding: 10px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.search {
  width: 100%;
  padding: 0.625rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags button {
  background: #eee;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
