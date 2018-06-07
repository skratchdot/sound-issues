import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import i18n from './lang/lang'

import {store} from './store/store'
import {routes} from './routes/routes'

Vue.use(VueRouter);

import Ripple from 'vue-ripple-directive'

Ripple.color = 'rgba(0, 0, 0, .1)';
Ripple.zIndex = 1;

Vue.directive('ripple', Ripple);

const router = new VueRouter({
  routes,
  mode: 'history'
})

const mainVue = new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})

export {
  mainVue,
}
