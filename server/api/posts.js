export default defineEventHandler(async () => {
  const posts = await $fetch(
    'http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/posts?_embed'
  )

  const formattedPosts = await Promise.all(
    posts.map(async (post) => {
      let imageUrl = null

      if (post.acf?.hero_img) {
        try {
          const media = await $fetch(
            `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${post.acf.hero_img}`
          )

          imageUrl = media.source_url
        } catch (err) {
          imageUrl = null
        }
      }

      return {
        id: post.id,
        title: post.title?.rendered || '',
        description: post.acf?.hero_description || '',
        image: imageUrl
      }
    })
  )

  return formattedPosts
})