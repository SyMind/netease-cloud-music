export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#d43c33",
    navigationBarTitleText: "网易云音乐",
    navigationBarTextStyle: "white",
  },
  requiredBackgroundModes: ["audio"]
})
