const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? '/mywork/pwatest/' : '/',
  devServer: {
    port: 8080,
  },
  productionSourceMap: false,
}
