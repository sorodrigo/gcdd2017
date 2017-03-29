import 'styles/index.scss';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import { ClientTable } from 'vue-tables-2';

import App from './App';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

sync(store, router);

Vue.use(ClientTable, {}, false, false);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
