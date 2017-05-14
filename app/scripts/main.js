import 'styles/index.scss';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import { ClientTable } from 'vue-tables-2';
import VueFormGenerator from 'vue-form-generator';

import App from './App';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

sync(store, router);

// plugins
Vue.use(ClientTable, {}, false, false);
Vue.use(VueFormGenerator);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
