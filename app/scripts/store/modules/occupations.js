import {
  SET_OCCUPATIONS,
  SET_OCCUPATIONS_ERROR,
} from '../mutation-types';

const staff = {
  // INITIAL STATE
  state: {
    list: [],
    error: null,
  },
  // MUTATIONS
  mutations: {
    [SET_OCCUPATIONS](state, list) {
      state.list = list;
    },
    [SET_OCCUPATIONS_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    setOccupations({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('/api/occupations')
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_OCCUPATIONS, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_OCCUPATIONS_ERROR, err);
            reject(err);
          });
      });
    },
  },
  // GETTERS
  getters: {
    getOccupations: state => state.list,
  },
};

export default staff;
