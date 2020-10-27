import Vue from 'vue'
import router from './router/index.js'
import App from './App.vue'
import axios from 'axios'
import md5 from 'js-md5'

//注册全局过滤器
import { filters }  from './util/filter.js'
// Vue.filter('formatDate',filters['formatDate']);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
//配置访问服务器的基础地址
axios.defaults.baseURL="http://cron.weixihang.com"
axios.interceptors.request.use(
	config => {
		// config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	  let token =localStorage.getItem('token')
		if (token) {
			config.headers.common['token'] = token;
		}
		return config
	},
	err => {
		return Promise.reject(err);
	}
)


Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5

import components from "./util/components"
Vue.use(components);

import {formatDate} from './util/date.js'
Vue.prototype.$formatDate = formatDate
import {checkToken} from './util/checkToken.js'
Vue.prototype.$checkToken = checkToken


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
