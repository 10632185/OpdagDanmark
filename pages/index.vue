<script setup>
const { data: produkter, pending, error } = await useFetch(
  'http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/produkter?_embed'
)

const getImageUrl = async (id) => {
  if (!id) return null
  const media = await $fetch(`http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${id}`)
  return media.source_url
}

const produkterWithImages = ref([])

watchEffect(async () => {
  if (!produkter.value) return

  produkterWithImages.value = await Promise.all(
    produkter.value.map(async (produkt) => {
      return {
        ...produkt,
        imageUrl: await getImageUrl(produkt.acf?.billede)
      }
    })
  )
})
</script>

<template>
  <div class="products">

    <p v-if="pending">Loading produkter...</p>

    <p v-else-if="error">Kunne ikke hente produkter</p>

    <div v-else class="grid">
      <div v-for="produkt in produkterWithImages" :key="produkt.id" class="card">

        <img v-if="produkt.imageUrl" :src="produkt.imageUrl" class="card-image" />

        <div class="card-content">
          <h2>{{ produkt.acf?.titel || produkt.title.rendered }}</h2>

          <p class="location">{{ produkt.acf?.lokation }}</p>

          <p v-if="produkt.acf?.pris" class="price">
            {{ produkt.acf.pris }} kr
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.products {
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content h2 {
  font-size: 18px;
  margin: 0;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.price {
  font-weight: bold;
  margin: 0;
}
</style>