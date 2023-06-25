const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // /api为请求前缀，可以改成其他名字
      // 只要请求资源路径的前缀为 /api 就通过代理服务器发送请求
      // 否则不通过代理服务器发送请求
      '/api': {
        // 设置代理服务器向服务器的请求地址，即向服务器发起请求
        target: 'http://127.0.0.1:3000/',
        // 为路径重写，匹配api开头的字符串，并把api替换为空字符串，
        // 这样才能保证代理服务器转发给服务器的资源路径不带前边的前缀
        pathRewrite:{'^/api':''},
        // 用于支持websocket
        ws: true,
        // changeOrigin设置为true时，服务器收到的请求头中的host会与服务器一样
        //  changeOrigin设置为false时，服务器收到的请求头中的host为真实的请求来源地址
        //  changeOrigin默认值为true
        changeOrigin: true
      }
    }
  }
})
