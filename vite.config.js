const path = require('path')
module.exports = {
  alias: {
    // https://github.com/vitejs/vite/issues/279#issuecomment-635646269
    '/@/': path.resolve(__dirname, './src')
  },
  // https://github.com/vitejs/vite/issues/572#issuecomment-660493303
  // 解决echarts由于非es module产生的引入错误
  optimizeDeps: {
    exclude: ['echarts'],
    include: ['echarts/echarts.all.js']
  },
}
