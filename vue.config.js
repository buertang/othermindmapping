const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? './' : '/xmind',
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    open: true,
    port: 8080,
    https: false,
    proxy: {
      '/feedbook': {
        target: 'http://localhost:3000/feedbook',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/feedbook': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$/, // 匹配需要压缩的文件类型
        threshold: 10240, // 文件大小大于10kb时才会被压缩
        deleteOriginalAssets: false // 是否删除原文件
      })
    ]
  }
}
