import {
  SET_PROFESSORS,
  SET_PROFESSORS_ERROR
} from '../mutation-types';

const professors = {
  // INITIAL STATE
  state: {
    list: [],
    error: null,
  },
  // MUTATIONS
  mutations: {
    [SET_PROFESSORS](state, list) {
      state.list = list;
    },
    [SET_PROFESSORS_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    setProfessors({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('/api/professors')
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_PROFESSORS, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_PROFESSORS_ERROR, err);
            reject(err);
          });
      });
    },
  },
  // GETTERS
  getters: {
    getProfessors(state) {
      return state.list;
    }
  },
};

export default professors;
