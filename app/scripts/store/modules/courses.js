import {
  SET_COURSES,
  SET_COURSES_ERROR
} from '../mutation-types';

const courses = {
  // INITIAL STATE
  state: {
    list: [],
    error: null,
  },
  // MUTATIONS
  mutations: {
    [SET_COURSES](state, list) {
      state.list = list;
    },
    [SET_COURSES_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    getCourses({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('/api/courses')
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_COURSES, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_COURSES_ERROR, err);
            reject(err);
          });
      });
    },
  },
  // GETTERS
  getters: {},
};

export default courses;
