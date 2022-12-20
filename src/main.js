
import Vue from 'vue'
import App from './App'
import router from './router/index'
//导入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import './assets/gloable.css'
//引入axios
import Request from './utils/request';
Request.defaults.withCredentials=true;




Vue.config.productionTip = false
Vue.use(router);
Vue.use(ElementUI,{locale});
//使用axios
Vue.prototype.axios= Request;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),//ElementUI
})
