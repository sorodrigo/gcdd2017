import startCase from 'lodash/startCase';
import VueFormGenerator from 'vue-form-generator';
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
        validator: VueFormGenerator.validators.email,
      };
    case (fieldName === 'password'):
      return {
        type: 'input',
        inputType: 'password',
        min: 6,
        required: true,
        hint: 'Minimum 6 characters',
        validator: VueFormGenerator.validators.alphaNumeric,
      };
    case (typeof field === 'string'):
      return {
        type: 'input',
        inputType: 'text',
        validator: VueFormGenerator.validators.string,
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
        validator: VueFormGenerator.validators.integer,
      };
    }
    default:
      return {
        type: 'input',
        inputType: 'text',
        validator: VueFormGenerator.validators.string,
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
    error: null,
    status: false,
  },
  // MUTATIONS
  mutations: {
    [SET_FORM_MODEL](state, { entity, model }) {
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
    getFormModel({ commit, dispatch }, { endpoint, id }) {
      const dependencies = datasource[endpoint].action;
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
              const model = { ...data };
              Object.keys(data).forEach((key) => {
                if (key.endsWith('_date')) model[key] = new Date(model[key]);
              });
              const payload = { entity: endpoint, model };
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
        fetch(url + request.params, {
          method: request.method,
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
    getFormSchema({ model, entity }, getters, { entities }) {
      if (!model) return {};
      const fields = Object.keys(model).map((key) => {
        const field = model[key];
        const schema = {
          label: startCase(key),
          model: key,
          readonly: key === 'id'
        };
        const schemaProps = (formSchema[entity] && key in formSchema[entity])
          ? getSchemaValues(formSchema[entity][key], entities.data)
          : getSchemaProps(field, key);
        return { ...schema, ...schemaProps };
      });

      return { fields };
    }
  }
};

export default form;
