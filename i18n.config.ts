// BETA 8.0.0 SSR: true
import locales from '@/configs/locales'
const messages: any = locales.messages

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ja', // 设置默认语言
  fallbackLocale: 'ja', // 设置回退语言
  messages
}))
