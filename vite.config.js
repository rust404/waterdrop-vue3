const path = require('path')
module.exports = {
  alias: {
    // https://github.com/vitejs/vite/issues/279#issuecomment-635646269
    '/@/': path.resolve(__dirname, './src')
  }
}
