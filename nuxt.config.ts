export default defineNuxtConfig({
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
    }
  },
  build: {
    transpile: ['vuetify']
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/style.css',
    '@/assets/main.scss',
    'mdi/css/materialdesignicons.min.css'
  ],
  components: true,
  modules: [],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  // runtime config
  runtimeConfig: { apiKey: process.env.API_KEY || '' },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  }
})
