import datasource from 'datasource';

import {
  SET_ENTITY,
  SET_ENTITY_ERROR,
  INIT_ENTITIES
} from '../mutation-types';


const staff = {
  // INITIAL STATE
  state: {
    data: {},
    error: null,
  },
  // MUTATIONS
  mutations: {
    [INIT_ENTITIES](state, data) {
      state.data = data;
    },
    [SET_ENTITY](state, { list, entity }) {
      state.data = { ...state.data, [entity]: list };
    },
    [SET_ENTITY_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    initEntities({ commit }) {
      const entities = Object.keys(datasource)
        .reduce((acc, next) => ({ ...acc, [next]: [] }), {});
      commit(INIT_ENTITIES, entities);
    },
    setEntity({ commit }, entity) {
      return new Promise((resolve, reject) => {
        fetch(`/api/${entity}`)
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((list) => {
            commit(SET_ENTITY, { list, entity });
            resolve(list);
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
    getEntity: ({ data, current }, getters, { route }) => data[route.params.datasource],
  },
};

export default staff;
