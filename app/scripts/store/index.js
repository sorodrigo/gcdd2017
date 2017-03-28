import Vue from 'vue';
import Vuex from 'vuex';

import professors from './modules/professors';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    professors,
  },
  strict: debug,
});
