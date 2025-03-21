import type { ThemeDefinition } from 'vuetify'

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
  ssr: false,

  typescript: {
    strict: true
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  app: {
    head: {
      title: 'nuxt3-vuetify3-sample',
      htmlAttrs: { lang: 'ja' },
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
    transpile: ['@nuxtjs/dotenv','@nuxtjs/i18n']
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/styles/main.scss',
    '@mdi/font/css/materialdesignicons.css',
    'vue3-lottie/dist/style.css'
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
  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY,
    public: {
      apiKey: process.env.NUXT_API_KEY
    }
  },

  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.ts'
      },
      {
        code: 'ja',
        file: 'ja.ts'
      },
      {
        code: 'zhHans',
        file: 'zhHans.ts'
      }
    ],
    langDir: 'locales/',
    defaultLocale: 'ja'
  },

  compatibilityDate: '2025-03-20'
})
