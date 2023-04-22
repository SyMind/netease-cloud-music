export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#d43c33',
    navigationBarTitleText: '网易云音乐',
    navigationBarTextStyle: 'white',
  },
  requiredBackgroundModes: ['audio'],
  subpackages: [
    {
      root: 'pages/packageA',
      pages: [
        'pages/playListDetail/index',
        'pages/search/index',
        'pages/songDetail/index',
      ]
    }
  ],
  tabBar: {
    selectedColor: '#d43c33',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '发现',
        iconPath: 'assets/images/discovery.png',
        selectedIconPath: 'assets/images/selected_discovery.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/images/account.png',
        selectedIconPath: 'assets/images/selected_account.png'
      }
    ]
  }
})
