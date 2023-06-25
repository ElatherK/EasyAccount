import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
Vue.use(Antd);
Vue.config.productionTip = false
import {message} from 'ant-design-vue'
Vue.prototype.$message = message
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
