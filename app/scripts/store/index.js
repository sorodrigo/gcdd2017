import Vue from 'vue';
import Vuex from 'vuex';

import professors from './modules/professors';
import courses from './modules/courses';
import degrees from './modules/degrees';
import categories from './modules/categories';
import staff from './modules/staff';
import occupations from './modules/occupations';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    professors,
    courses,
    degrees,
    categories,
    staff,
    occupations,
  },
  strict: debug,
});
