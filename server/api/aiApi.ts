export default defineEventHandler(async (event) => {
  const param = await readBody(event)
  try {
    const response: any = await $fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + process.env.NUXT_API_KEY
        },
        body: param
      }
    )
    return response
  } catch (error) {}
})
