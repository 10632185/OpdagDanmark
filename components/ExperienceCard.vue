<script setup>
defineProps({
  title: String,
  image: String,
  location: String
})
</script>

<template>
  <div class="card">
    <img :src="image" alt="" />
    <h3>{{ title }}</h3>
    <p>{{ location }}</p>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  height: 260px;
  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.card h3 {
  margin: 10px;
  font-size: 1.1rem;
  height: 40px; 
  overflow: hidden;
  text-overflow: ellipsis;
}

.card p {
  margin: 0 10px 12px;
  color: #666;
  height: 20px;
}

</style>
