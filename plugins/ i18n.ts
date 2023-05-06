import { createI18n } from 'vue-i18n'
import locales from '@/configs/locales'
const messages: any = locales.messages

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'ja', // 设置默认语言
    fallbackLocale: 'ja', // 设置回退语言
    messages
  })

  nuxtApp.vueApp.use(i18n)
})
