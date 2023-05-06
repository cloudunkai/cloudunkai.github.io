export default defineEventHandler(async (event) => {
  const param = await readBody(event)
  try {
    const response: any = await $fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + param.apiKey
        },
        body: JSON.stringify({
          messages: param.messages,
          model: param.model
        })
      }
    )
    return response
  } catch (error: any) {
    return error
  }
})
