<script setup>
const { data: posts, pending, error } = useFetch('/api/posts')
</script>

<template>
  <div>
    <h1>WordPress Posts</h1>

    <p v-if="pending">Loading...</p>

    <p v-else-if="error">
      Kunne ikke hente data fra WordPress
    </p>

    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <h2 v-html="post.title.rendered"></h2>

        <p v-if="post.acf?.hero_description">
          {{ post.acf.hero_description }}
        </p>

        <img
          v-if="post.acf?.hero_img?.url"
          :src="post.acf.hero_img.url"
          alt=""
        />
      </div>
    </div>
  </div>
</template>