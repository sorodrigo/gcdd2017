import startCase from 'lodash/startCase';
import {
  SET_FORM_MODEL,
  SET_FORM_ERROR,
  SET_FORM_STATUS,
} from '../mutation-types';
import SCHEMAS from '../../form_schemas';
import DATASOURCE from '../../datasource';

const getSchemaProps = (field, fieldName) => {
  switch (true) {
    case (fieldName === 'email'):
      return {
        type: 'input',
        inputType: 'email',
      };
    case (fieldName === 'phone'):
      return {
        type: 'cleave',
        cleaveOptions: {
          phone: true,
          phoneRegionCode: 'ES',
        }
      };
    case (fieldName === 'password'):
      return {
        type: 'input',
        inputType: 'password',
        min: 6,
        required: true,
        hint: 'Minimum 6 characters'
      };
    case (typeof field === 'string'):
      return {
        type: 'input',
        inputType: 'text',
      };
    case (typeof field === 'boolean'):
      return {
        type: 'checkbox',
        default: true
      };
    case (Number.isInteger(field)): {
      return {
        type: 'input',
        inputType: 'number'
      };
    }
    default:
      return {
        type: 'input',
        inputType: 'text'
      };
  }
};

const getSchemaValues = (schema, getters) => {
  const props = {};
  Object.keys(schema)
    .forEach((key) => {
      if (key === 'values') props[key] = getters[schema.values];
      else props[key] = schema[key];
    });
  return props;
};

const form = {
  // INITIAL STATE
  state: {
    datasoure: null,
    model: null,
    error: null,
    status: false,
  },
  // MUTATIONS
  mutations: {
    [SET_FORM_MODEL](state, { datasource, model }) {
      state.datasource = datasource;
      state.model = model;
    },
    [SET_FORM_ERROR](state, error) {
      state.error = error;
    },
    [SET_FORM_STATUS](state, status) {
      state.status = status;
    }
  },
  // ACTIONS
  actions: {
    setFormModel({ commit }, payload) {
      commit(SET_FORM_MODEL, payload);
    },
    getFormModel({ commit, dispatch }, { endpoint, id }) {
      const dependencies = DATASOURCE[endpoint].action;
      let dispatches;
      if (Array.isArray(dependencies)) {
        dispatches = dependencies.map(dependency => dispatch(dependency));
      } else {
        dispatches = dispatch(dependencies);
      }
      Promise.all(dispatches)
        .then(() => new Promise((resolve, reject) => {
          fetch(`/api/${endpoint}/${id}`)
            .then((res) => {
              if (res.status >= 400) throw new Error(res.status);
              return res.json();
            })
            .then((data) => {
              const payload = { datasource: endpoint, model: data };
              commit(SET_FORM_MODEL, payload);
              resolve(payload);
            })
            .catch((err) => {
              commit(SET_FORM_ERROR, err);
              reject(err);
            });
        }));
    },
    updateFormModel({ commit }, { endpoint, id, model }) {
      return new Promise((resolve, reject) => {
        fetch(`/api/${endpoint}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(model)
        })
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            const payload = { datasource: endpoint, model: data };
            commit(SET_FORM_MODEL, payload);
            commit(SET_FORM_STATUS, true);
            resolve(payload);
          })
          .catch((err) => {
            commit(SET_FORM_ERROR, err);
            reject(err);
          });
      });
    },
    setFormStatus({ commit }, status) {
      commit(SET_FORM_STATUS, status);
    },
  },
  getters: {
    getFormSchema({ model, datasource }, getters) {
      if (!model) return {};
      const fields = Object.keys(model).map((key) => {
        const field = model[key];
        const schema = {
          label: startCase(key),
          model: key,
          readonly: key === 'id'
        };

        const schemaProps = (SCHEMAS[datasource] && key in SCHEMAS[datasource])
          ? getSchemaValues(SCHEMAS[datasource][key], getters)
          : getSchemaProps(field, key);
        return { ...schema, ...schemaProps };
      });

      return { fields };
    }
  }
};

export default form;
