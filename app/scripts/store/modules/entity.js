import { entities } from 'app/datasource.schema.json';
import tableSchema from 'app/table.schema.json';

import {
  SET_ENTITY,
  SET_ENTITY_ERROR,
  INIT_ENTITIES,
  SET_ENTITY_ROW,
  REMOVE_ENTITY_ROW
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
    [SET_ENTITY_ROW](state, { entity, row }) {
      const list = state.data[entity]
        .filter(item => row.id !== item.id);
      state.data = { ...state.data, [entity]: [...list, row] };
    },
    [REMOVE_ENTITY_ROW](state, { entity, id }) {
      const list = state.data[entity]
        .filter(item => id !== item.id);
      state.data = { ...state.data, [entity]: list };
    },
    [SET_ENTITY_ERROR](state, error) {
      state.error = error;
    },
  },
  // ACTIONS
  actions: {
    initEntities({ commit }) {
      const data = Object.keys(entities)
        .reduce((acc, next) => ({ ...acc, [next]: [] }), {});
      commit(INIT_ENTITIES, data);
    },
    fetchEntity({ commit }, entity) {
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
    setEntityRow({ commit }, { entity, row }) {
      commit(SET_ENTITY_ROW, { entity, row });
    },
    removeEntityRow({ commit }, { id, entity }) {
      return new Promise((resolve, reject) => {
        fetch(`/api/${entity}/${id}`, {
          method: 'DELETE'
        })
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.text();
          })
          .then(() => {
            commit(REMOVE_ENTITY_ROW, { id, entity });
            resolve();
          })
          .catch((err) => {
            commit(SET_ENTITY_ERROR, err);
            reject(err);
          });
      });
    }
  },
  // GETTERS
  getters: {
    getEntity: ({ data, current }, getters, { route }) => data[route.params.entity],
    getEntityWithRelations: ({ data }, getters, { route }) => {
      const entity = [...data[route.params.entity]];
      const entityTableSchema = tableSchema[route.params.entity];
      if (entityTableSchema) {
        return entity.map((row) => {
          const result = { ...row };
          Object.keys(result).forEach((prop) => {
            const { relation } = entityTableSchema[prop] || {};
            if (relation && data[relation.name] && data[relation.name].length > 0) {
              const value = data[relation.name].find(r => (r.id === result[prop]));
              if (value) result[prop] = value[relation.key];
            }
            return result[prop];
          });
          return result;
        });
      }
      return entity;
    }
  }
};

export default staff;
