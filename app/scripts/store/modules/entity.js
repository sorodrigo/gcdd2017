import {
  SET_CURRENT_ENTITY,
  SET_ENTITY_LIST,
  SET_ENTITY_ERROR,
} from '../mutation-types';

const staff = {
  // INITIAL STATE
  state: {
    data: {},
    current: {},
    error: null,
  },
  // MUTATIONS
  mutations: {
    [SET_CURRENT_ENTITY](state, current) {
      state.current = current;
    },
    [SET_ENTITY_LIST](state, list, entity) {
      state.data = { ...state.data, [entity]: { ...state.data[entity], list } };
    },
    [SET_ENTITY_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    setStaff({ commit }, { entity }) {
      return new Promise((resolve, reject) => {
        fetch(`/api/${entity}`)
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_ENTITY_LIST, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_ENTITY_ERROR, err);
            reject(err);
          });
      });
    },
  },
  // GETTERS
  getters: {
    getEntity: ({ data, current }) => data[current],
  },
};

export default staff;
