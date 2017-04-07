import {
  SET_DEGREES,
  SET_DEGREES_ERROR
} from '../mutation-types';

const degrees = {
  // INITIAL STATE
  state: {
    list: [],
    error: null,
  },
  // MUTATIONS
  mutations: {
    [SET_DEGREES](state, list) {
      state.list = list;
    },
    [SET_DEGREES_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    setDegrees({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('/api/degrees')
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_DEGREES, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_DEGREES_ERROR, err);
            reject(err);
          });
      });
    },
  },
  // GETTERS
  getters: {
    getDegrees: state => state.list,
  },
};

export default degrees;
