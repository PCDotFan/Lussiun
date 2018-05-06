module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "Lussiun",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#2889ED" },
  css: [
    "~assets/css/simplemde-theme-minimum.min.css",
    { src: "~assets/less/uikit.theme.less", lang: "less" },
    { src: "~assets/sass/element-ui/index.scss", lang: "scss" }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "@/plugins/uikit", ssr: false }
  ],

  router: {
    linkActiveClass: "",
    linkExactActiveClass: "uk-active"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
