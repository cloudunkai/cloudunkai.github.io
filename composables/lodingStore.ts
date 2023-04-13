import { Ref } from 'nuxt/dist/app/compat/capi'

// loading 状態管理
type LoadingState = {
  loading: boolean
}

export const useLoadingStore = () => {
  const state = useState<LoadingState>('loading_state', () => ({
    loading: false
  }))
  return {
    state: readonly(state),
    setLoading: setLoading(state)
  }
}

const setLoading = (state: Ref<LoadingState>) => {
  return (loading: boolean) => (state.value.loading = loading)
}
