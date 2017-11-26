import Vue from 'vue';
import Vuex from 'vuex';

import entities from './modules/entity';
import modal from './modules/modal';
import form from './modules/form';
import markdown from './modules/markdown';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    entities,
    modal,
    form,
    markdown
  },
  strict: debug,
});
