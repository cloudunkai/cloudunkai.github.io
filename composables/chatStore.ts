import { Ref } from 'nuxt/dist/app/compat/capi'

type chatState = {
  apiKey: String
  chatHistory: []
  apiKeyDialog: boolean
}

export const useChatStore = () => {
  const state = useState<chatState>('chat_state', () => ({
    apiKey: '',
    chatHistory: [],
    apiKeyDialog: false
  }))
  return {
    state,
    getApiKey: getApiKey(state)
  }
}

const getApiKey = (state: Ref<chatState>) => {
  return () => {
    if (process.env.NUXT_API_KEY) {
      return process.env.NUXT_API_KEY
    } else {
      return state.value.apiKey
    }
  }
}
