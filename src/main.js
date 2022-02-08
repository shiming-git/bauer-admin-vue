import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import "@/router/before"
import store from '@/store/index'
import ElementUI from 'element-ui'
import './styles.scss'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'

import axios from "axios";
import api from "./http/api";
import "./http/axios";
import dayjs from "dayjs";
import md5 from 'js-md5';

import Standard from "@/standard/index"

Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

Vue.use(ElementUI)
Vue.use(ElementUI, { locale })
Vue.use(Standard)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
