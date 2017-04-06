import {
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR
} from '../mutation-types';

const categories = {
  // INITIAL STATE
  state: {
    list: [],
    error: null,
  },
  // MUTATIONS
  mutations: {
    [SET_CATEGORIES](state, list) {
      state.list = list;
    },
    [SET_CATEGORIES_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    setCategories({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('/api/categories')
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_CATEGORIES, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_CATEGORIES_ERROR, err);
            reject(err);
          });
      });
    },
  },
  // GETTERS
  getters: {
    getCategories: state => state.list,
  },
};

export default categories;
