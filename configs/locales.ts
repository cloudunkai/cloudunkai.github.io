import enMessages from '../i18n/locales/en'
import zhHansMessages from '../i18n/locales/zhHans'
import jaMessages from '../i18n/locales/ja'

const supported = ['ja', 'en', 'zhHans']
let locale = 'ja'

try {
  // get browser default language
  const { 0: browserLang } = navigator.language.split('-')

  if (supported.includes(browserLang)) locale = browserLang
} catch (e) {
  // console.log(e)
}

export default {
  // current locale
  locale,

  // when translation is not available fallback to that locale
  fallbackLocale: 'ja',

  // availabled locales for user selection
  availableLocales: [
    {
      code: 'ja',
      flag: 'jp',
      name: 'japan',
      label: '日本語',
      messages: jaMessages
    },
    {
      code: 'en',
      flag: 'us',
      name: 'united-states',
      label: 'English',
      messages: enMessages
    },
    {
      code: 'zhHans',
      flag: 'cn',
      name: 'china',
      label: '中文',
      messages: zhHansMessages
    }
  ],
  messages: {
    ja: jaMessages,
    en: enMessages,
    zhHans: zhHansMessages
  }
}
