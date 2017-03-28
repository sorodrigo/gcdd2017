import 'styles/index.scss';

import Vue from 'vue';
import { ClientTable } from 'vue-tables-2';

import App from './App';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(ClientTable, {}, false, false);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
