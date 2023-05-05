interface Color {
  colorId: number
  colorName: string
  colorValue: string
}

type CustomizeThemeState = {
  miniSidebar: boolean
  darkTheme: boolean
  primaryColor: Color
  mainSidebar: boolean
}

export const useCustomizeThemeStore = () => {
  const state = useState<CustomizeThemeState>('customize_theme_State', () => ({
    miniSidebar: false,
    darkTheme: false,
    primaryColor: {
      colorId: 2,
      colorName: 'grey',
      colorValue: '#344767'
    },
    mainSidebar: true
  }))
  return {
    state,
    setMiniSideBar: setMiniSideBar(state),
    showErrorMessage: setPrimaryColor(state)
  }
}
const setMiniSideBar = (state: Ref<CustomizeThemeState>) => {
  return (miniSidebar: boolean) => {
    state.value.miniSidebar = miniSidebar
  }
}

const setPrimaryColor = (state: Ref<CustomizeThemeState>) => {
  return (primaryColor: Color) => {
    state.value.primaryColor = primaryColor
  }
}

// export const useCustomizeThemeStore = defineStore({
//   id: 'customizeTheme',
//   state: (): State => ({
//     miniSidebar: false,
//     darkTheme: false,
//     primaryColor: {
//       colorId: 2,
//       colorName: 'grey',
//       colorValue: '#344767'
//     },
//     mainSidebar: isMobile() ? false : true
//   }),

//   persist: {
//     enabled: true,
//     strategies: [{ storage: localStorage, paths: ['darkTheme'] }]
//   },

//   getters: {},
//   actions: {
//     setMiniSideBar(payload: boolean) {
//       this.miniSidebar = payload
//     },
//     setPrimaryColor(payload: Color) {
//       this.primaryColor = payload
//     }
//   }
// })
