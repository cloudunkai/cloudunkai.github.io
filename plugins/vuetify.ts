import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const Lighttheme: ThemeDefinition = {
  dark: false,
  variables: {
    'high-emphasis-opacity': 1
  },
  colors: {
    background: '#f2f5f8',
    surface: '#ffffff',
    primary: '#344767',
    secondary: '#334155',
    accent: '#705CF6',
    error: '#ef476f',
    info: '#2196F3',
    success: '#06d6a0',
    'on-success': '#ffffff',
    warning: '#ffd166'
  }
}

const Darktheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#111b27',
    surface: '#1E293B',
    primary: '#705CF6',
    secondary: '#598EF3',
    accent: '#705CF6',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        light: Lighttheme,
        dark: Darktheme
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
