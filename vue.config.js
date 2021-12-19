module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/main.scss";'
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tweet-front-2021-Hackathon/'
    : '/'
}
