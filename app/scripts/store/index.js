import Vue from 'vue';
import Vuex from 'vuex';

import professors from './modules/professors';
import courses from './modules/courses';
import degrees from './modules/degrees';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    professors,
    courses,
    degrees,
  },
  strict: debug,
});
