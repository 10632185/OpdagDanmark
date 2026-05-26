<script setup>
const emit = defineEmits(["update"])

const filters = [
  "Museer",
  "Legepladser",
  "Bageri",
  "Halloween",
  "Badehoteller"
]

function selectFilter(f) {
  emit("update", f)
}
</script>

<template>
  <div class="filter-bar">
    <input type="text" placeholder="Hvad søger du..." class="search" />

    <div class="tags">
      <button 
        v-for="f in filters" 
        :key="f"
        @click="selectFilter(f)"
      >
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
