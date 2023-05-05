// snackbarType 状態管理
type snackbarState = {
  isShow: boolean
  message: string
  type: any
}

export const useSnackbarStore = () => {
  const state = useState<snackbarState>('snackbar_state', () => ({
    isShow: false,
    message: '',
    type: ''
  }))
  return {
    state,
    showMessage: showMessage(state),
    showErrorMessage: showErrorMessage(state)
  }
}

const showMessage = (state: Ref<snackbarState>) => {
  return (message: string) => {
    state.value.isShow = true
    state.value.message = message
    state.value.type = ''
  }
}

const showErrorMessage = (state: Ref<snackbarState>) => {
  return (message: string) => {
    state.value.isShow = true
    state.value.message = message
    state.value.type = 'error'
  }
}
