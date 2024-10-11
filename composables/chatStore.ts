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

const getApiKey = (state: Ref<chatState>) => () => {
  const config = useRuntimeConfig()
  return state.value.apiKey || config.public.apiKey
}
