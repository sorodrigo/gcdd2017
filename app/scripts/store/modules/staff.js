import {
  SET_STAFF,
  SET_STAFF_ERROR,
} from '../mutation-types';

const staff = {
  // INITIAL STATE
  state: {
    list: [],
    error: null,
  },
  // MUTATIONS
  mutations: {
    [SET_STAFF](state, list) {
      state.list = list;
    },
    [SET_STAFF_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    setStaff({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('/api/staff')
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_STAFF, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_STAFF_ERROR, err);
            reject(err);
          });
      });
    },
  },
  // GETTERS
  getters: {
    getStaff: state => state.list,
  },
};

export default staff;
