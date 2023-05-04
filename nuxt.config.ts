import dotenv from 'dotenv'
import type { ThemeDefinition } from 'vuetify'
dotenv.config()

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
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  app: {
    head: {
      title: 'nuxt3-vuetify3-sample',
      htmlAttrs: { lang: 'en' },
      meta: [{ charset: 'utf-8' }],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  build: {
    transpile: ['@nuxtjs/dotenv']
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/main.scss',
    '@/assets/css/style.css',
    '@mdi/font/css/materialdesignicons.css'
  ],
  components: true,
  modules: [
    '@invictus.codes/nuxt-vuetify',
    'nuxt-icon',
    '@nuxtjs/i18n',
    'nuxt-chatgpt'
  ],
  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          light: Lighttheme,
          dark: Darktheme
        }
      }
    }
  },
  chatgpt: {
    apiKey: process.env.NUXT_API_KEY
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  // runtime config
  runtimeConfig: { apiKey: process.env.NUXT_API_KEY },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  }
})
