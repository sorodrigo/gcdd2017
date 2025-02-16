import startCase from 'lodash/startCase';
import isDate from 'lodash/isDate';
import formSchema from 'app/form.schema.json';
import datasource from 'app/datasource.schema.json';
import {
  SET_FORM_MODEL,
  SET_FORM_ERROR,
  SET_FORM_STATUS,
} from '../mutation-types';

const getSchemaProps = (field, fieldName) => {
  switch (true) {
    case (fieldName === 'email'):
      return {
        type: 'input',
        inputType: 'email',
        validator: 'email',
      };
    case (fieldName === 'password'):
      return {
        type: 'input',
        inputType: 'password',
        min: 6,
        required: true,
        hint: 'Minimum 6 characters',
        validator: 'alphaNumeric',
      };
    case (typeof field === 'string'):
      return {
        type: 'input',
        inputType: 'text',
        validator: 'string',
      };
    case (typeof field === 'boolean'):
      return {
        type: 'checkbox',
        default: true
      };
    case (Number.isInteger(field)): {
      return {
        type: 'input',
        inputType: 'number',
        validator: 'integer',
      };
    }
    default:
      return {
        type: 'input',
        inputType: 'text',
        validator: 'string',
      };
  }
};

const getSchemaValues = (schema, entities) => {
  const props = {};
  Object.keys(schema)
    .forEach((key) => {
      if (key === 'relation') {
        const { relation } = schema;
        props[relation.key] = entities[relation.name];
      } else props[key] = schema[key];
    });
  return props;
};

const form = {
  // INITIAL STATE
  state: {
    entity: null,
    model: null,
    isReadOnly: false,
    error: null,
    status: false,
  },
  // MUTATIONS
  mutations: {
    [SET_FORM_MODEL](state, { entity, model, isReadOnly }) {
      state.isReadOnly = !!isReadOnly;
      state.entity = entity;
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
    getFormModel({ commit, dispatch }, { endpoint, id, isReadOnly }) {
      const { prefetch } = datasource.entities[endpoint];
      let dispatches;
      if (prefetch) {
        dispatches = [endpoint, ...prefetch].map(dependency => dispatch('fetchEntity', dependency));
      }
      Promise.all(dispatches)
        .then(() => new Promise((resolve, reject) => {
          fetch(`/api/${endpoint}/${id}`)
            .then((res) => {
              if (res.status >= 400) throw new Error(res.status);
              return res.json();
            })
            .then((data) => {
              const model = { ...data };
              Object.keys(data).forEach((key) => {
                if (key.endsWith('_date')) model[key] = new Date(model[key]);
              });
              const payload = { entity: endpoint, model, isReadOnly };
              commit(SET_FORM_MODEL, payload);
              resolve(payload);
            })
            .catch((err) => {
              commit(SET_FORM_ERROR, err);
              reject(err);
            });
        }));
    },
    requestFormModel({ commit }, { endpoint, id, model, action }) {
      const request = {
        new: { method: 'POST', params: '' },
        edit: { method: 'PATCH', params: `/${id}` }
      }[action];
      const url = `/api/${endpoint}`;
      return new Promise((resolve, reject) => {
        const sanitizeModel = m => Object.entries(m).reduce((acc, [key, value]) =>
          ({ ...acc, [key]: isDate(value) ? value.getTime() : value }), {});
        fetch(url + request.params, {
          method: request.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sanitizeModel(model))
        })
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            const payload = { entity: endpoint, model: data };
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
    getFormSchema({ model, entity, isReadOnly }, getters, { entities }) {
      if (!model) return {};
      const fields = Object.keys(model).map((key) => {
        const field = model[key];
        const readonly = (key === 'id') || isReadOnly;
        const schemaValues = (formSchema[entity] && key in formSchema[entity])
          && getSchemaValues(formSchema[entity][key], entities.data);
        const schema = {
          label: startCase(key),
          model: key
        };
        if (readonly) {
          const dateFormatter = (m) => {
            const value = { ...m }[key];
            const date = (value && isDate(value)) ? value : new Date(value);
            return date ? date.toLocaleDateString() : date;
          };
          const decoratedSchemaValues = (schemaValues || {}).inputType === 'date'
            ? { ...schemaValues, get: dateFormatter }
            : schemaValues;
          return { ...schema, ...decoratedSchemaValues, type: 'label' };
        }
        const schemaProps = schemaValues || getSchemaProps(field, key);
        return { ...schema, ...schemaProps };
      });

      return { fields };
    }
  }
};

export default form;
