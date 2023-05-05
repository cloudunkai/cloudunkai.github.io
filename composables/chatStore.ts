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
    saveApiKey: saveApiKey(state),
    getApiKey: getApiKey(state)
  }
}

const saveApiKey = (state: Ref<chatState>) => {
  return (inputKey: String) => {
    state.value.apiKey = inputKey
  }
}

const config = useRuntimeConfig()
// TODO: ここでAPIキーを取得する process.env.NUXT_API_KEY は使えない
const getApiKey = (state: Ref<chatState>) => () => {
  return state.value.apiKey || config.public.apiKey
}
