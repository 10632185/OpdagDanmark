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
        <h2 v-html="post.title"></h2>

        <p v-if="post.description">
          {{ post.description }}
        </p>

        <img v-if="post.image" :src="post.image" />
      </div>
    </div>
  </div>
</template>