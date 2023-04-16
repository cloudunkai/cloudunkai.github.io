import dotenv from 'dotenv'
dotenv.config()
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
    transpile: ['vuetify', '@nuxtjs/dotenv']
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/main.scss',
    '@/assets/css/style.css',
    'mdi/css/materialdesignicons.min.css'
  ],
  components: true,
  modules: ['nuxt-chatgpt'],
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
