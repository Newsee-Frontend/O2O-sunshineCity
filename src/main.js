// import '@babel/polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/';
import './UI/index';

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

