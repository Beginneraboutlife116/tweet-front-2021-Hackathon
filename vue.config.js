const path = require('path')

function resolve (dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/main.scss";'
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader
    svgRule.exclude.add(/node_modules/) // 排除node_modules目錄
    svgRule // 添加svg新的loader處理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg處理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  }
}
