import Vue from 'vue';
import Vuex from 'vuex';

import entity from './modules/entity';
import modal from './modules/modal';
import form from './modules/form';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    entity,
    modal,
    form,
  },
  strict: debug,
});
