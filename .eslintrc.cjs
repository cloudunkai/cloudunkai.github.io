module.exports = {
  root: true, // このファイルをESLintのルート設定ファイルとして設定します
  env: {
    browser: true, // ブラウザ環境で実行されるコードを設定します
    node: true // Node.js環境で実行されるコードを設定します
  },
  parser: 'vue-eslint-parser', // vue-eslint-parserを使用して、Vue.jsの構文解析を行います
  parserOptions: {
    parser: '@typescript-eslint/parser' // TypeScriptの構文解析も行います
  },
  extends: [
    '@nuxtjs/eslint-config-typescript', // Nuxt.js向けのTypeScript設定を適用します
    'plugin:prettier/recommended', // PrettierとESLintの連携設定を適用します
    'prettier' // PrettierとESLintの競合するルールを無効化します
  ],
  plugins: ['vitest', '@typescript-eslint', 'prettier'], // 追加のプラグインはここに記述します
  rules: {
    'vue/multi-word-component-names': 'off', // 複数単語のコンポーネント名のルールを無効化します
    'prettier/prettier': 'off' // Prettierのルールを有効化します
  }
}
