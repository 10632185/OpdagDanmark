export default defineEventHandler(async () => {
  const data = await $fetch(
    'http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/posts?_embed'
  )

  return data
})
