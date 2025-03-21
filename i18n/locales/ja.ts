export default {
  common: {
    add: '追加',
    cancel: 'キャンセル',
    description: '説明',
    delete: '削除',
    title: 'タイトル',
    save: '保存',
    faq: 'よくある質問',
    contact: 'お問い合わせ',
    tos: '利用規約',
    policy: '個人情報保護方針'
  },
  login: {
    title: 'サインイン',
    email: 'Eメール',
    password: 'パスワード',
    button: 'サインイン',
    orsign: 'またはでサインイン',
    forgot: 'パスワードをお忘れですか？',
    noaccount: 'アカウントをお持ちではありませんか？',
    create: 'ここで作成します',
    error: 'メールとパスワードの組み合わせが無効です'
  },
  register: {
    title: 'アカウントを作成する',
    username: 'フルネーム',
    email: 'Eメール',
    password: 'パスワード',
    button: 'アカウントを作成する',
    orsign: 'またはでサインアップ',
    agree: 'サインアップすると、',
    account: 'すでにアカウントをお持ちですか？',
    signin: 'サインイン'
  },
  menu: {
    search: '検索（フォーカスするには「ctrl + /」を押します）',
    dashboard: 'ダッシュボード',
    logout: 'ログアウト',
    profile: 'プロフィール',
    blank: '空白ページ',
    pages: 'ページ',
    others: 'その他',
    email: 'Eメール',
    chat: 'チャット',
    todo: 'やること',
    nitori: 'Nitori',
    booking: 'Booking',
    ikea: 'IKEA',
    unsplash: 'Unsplash',
    board: 'タスクボード',
    users: 'ユーザー',
    usersList: 'リスト',
    usersEdit: '編集',
    ecommerce: 'eコマース',
    ecommerceList: '製品',
    ecommerceProductDetails: '製品詳細',
    ecommerceOrders: '注文',
    ecommerceCart: 'カート',
    auth: '認証ページ',
    authLogin: 'サインイン/ログイン',
    authRegister: 'サインアップ/登録',
    authVerify: 'Eメールを確認します',
    authForgot: 'パスワードをお忘れですか',
    authReset: 'パスワードを再設定する',
    errorPages: 'エラーページ',
    errorNotFound: '見つかりません/ 404',
    errorUnexpected: '予期しない/ 500',
    utilityPages: 'ユーティリティページ',
    utilityMaintenance: 'メンテナンス',
    utilitySoon: '近日公開',
    utilityHelp: 'よくある質問/ヘルプ',
    levels: 'メニューレベル',
    disabled: 'メニュー無効',
    docs: 'ドキュメンテーション',
    feedback: 'フィードバック',
    support: 'サポート',
    landingPage: 'ダークモード',
    pricingPage: '価格ページ',
    heroPage: 'Hero',
    featurePage: 'Feature',
    cardPage: 'カードページ',
    teamPage: 'チームページ',
    testimonialPage: 'テストモニアルページ',
    statsPage: 'スターズページ',
    logosPage: 'ロゴスページ',
    callToActionPage: 'アクションページ',
    newsletterPage: 'ニュースレターページ',
    faqPage: 'FAQページ',
    toolbarPage: 'ツールバーページ',
    footerPage: 'フッターページ',
    dataTablePage: 'データテーブルページ',
    colors: 'カラー',
    lottieAnimation: 'Lottie Animation',
    gradient: 'Gradient',
    card: 'カード',
    grids: 'グリッドレイアウト',
    scrollbar: 'スクロールバー',
    waterFall: 'おしゃれスクロール',
    masonry: 'おしゃれスクロール2 ',
    virtualList: 'バーチャルリスト ',
    virtualScroller: 'バーチャルスクロールバー ',
    fakerApiRef: 'Faker Api Ref ',
    charts: 'チャート ',
    echartLine: 'Echart Line ',
    echartBar: 'Echart Bar ',
    echartPie: 'Echart Pie ',
    echartScatter: 'Echart Scatter ',
    echartOthers: 'Echart Others ',
    apexChart: 'ApexChart ',
    data: {
      usersDataPage: 'ユーザーデータ',
      photosDataPage: '写真データ',
      collectionsDataPage: 'コレクションデータ',
      topicsDataPage: 'トピックデータ',
      topicPhotosDataPage: 'トピック写真データ',
      fileUploadPreview: 'ファイルアップロードプレビュー',
      dynamicFormRender: 'Dynamic Form Render',
      customFormGeneration: 'Custom Form Generation'
    },
    chatbot_v1: 'ChatBot v1',
    resume_ai: 'Resume AI',
    // voicebot: 'VoiceBot'
  },
  dashboard: {
    activity: 'アクティビティ',
    weeklySales: '週間売上',
    sales: '売上',
    recentOrders: '最近の注文',
    sources: 'トラフィックソース',
    lastweek: '前週比',
    orders: '注文',
    customers: '顧客',
    tickets: 'サポートチケット',
    viewReport: 'レポートを見る'
  },
  // toolbox
  toolbox: {
    apikey: {
      title: 'API Key'
    },
    chatAssistant: {
      title: 'チャットアシスタント'
    },
    translationAssistant: {
      title: '翻訳アシスタント',
      targetLanguage: '翻訳先の言語',
      translate: '翻訳',
      speech: '音声',
      read: '読む'
    },
    codeAssistant: {
      title: 'コードアシスタント'
    },
    playGround: {
      title: 'プレイグラウンド'
    }
  },

  // コンポーネント
  $vuetify: {
    badge: 'バッジ',
    close: '閉じる',
    dataIterator: {
      noResultsText: '一致するレコードが見つかりません',
      loadingText: 'アイテムを読み込んでいます...'
    },
    dataTable: {
      itemsPerPageText: 'ページあたりの行数：',
      ariaLabel: {
        sortDescending: '降順で並べ替え。',
        sortAscending: '昇順で並べ替え。',
        sortNone: 'ソートされていません。',
        activateNone: 'ソートを解除アクティブ',
        activateDescending: '降順でソートアクティブ',
        activateAscending: '昇順でソートアクティブ'
      },
      sortBy: 'ソート方法'
    },
    dataFooter: {
      itemsPerPageText: 'ページあたりのアイテム数：',
      itemsPerPageAll: 'すべて',
      nextPage: '次のページ',
      prevPage: '前のページ',
      firstPage: '最初のページ',
      lastPage: '最後のページ',
      pageText: '{2}中の{0}-{1}'
    },
    datePicker: {
      itemsSelected: '{0}個選択されました',
      nextMonthAriaLabel: '次の月',
      nextYearAriaLabel: '来年',
      prevMonthAriaLabel: '前月',
      prevYearAriaLabel: '前年'
    },
    noDataText: 'データがありません',
    carousel: {
      prev: '前のビジュアル',
      next: '次のビジュアル',
      ariaLabel: {
        delimiter: 'カルーセルスライド {0}/{1}'
      }
    },
    calendar: {
      moreEvents: 'さらに{0}件'
    },
    fileInput: {
      counter: '{0}ファイル',
      counterSize: '{1}中、{0}ファイル'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    },
    pagination: {
      ariaLabel: {
        wrapper: 'ページネーションナビゲーション',
        next: '次のページ',
        previous: '前のページ',
        page: '{0}ページに移動する',
        currentPage: '現在のページ、{0}ページ目'
      }
    }
  }
}
