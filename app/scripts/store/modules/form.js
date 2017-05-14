import startCase from 'lodash/startCase';
import {
  SET_FORM_MODEL,
  SET_FORM_ERROR,
  SET_FORM_STATUS,
} from '../mutation-types';

const getSchemaProps = (field) => {
  switch (true) {
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

const form = {
  // INITIAL STATE
  state: {
    model: null,
    error: null,
    status: false,
  },
  // MUTATIONS
  mutations: {
    [SET_FORM_MODEL](state, model) {
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
    setFormModel({ commit }, model) {
      commit(SET_FORM_MODEL, model);
    },
    getFormModel({ commit }, { endpoint, id }) {
      return new Promise((resolve, reject) => {
        fetch(`/api/${endpoint}/${id}`)
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((data) => {
            commit(SET_FORM_MODEL, data);
            resolve(data);
          })
          .catch((err) => {
            commit(SET_FORM_ERROR, err);
            reject(err);
          });
      });
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
            commit(SET_FORM_MODEL, data);
            commit(SET_FORM_STATUS, true);
            resolve(data);
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
    getFormSchema({ model }) {
      if (!model) return {};
      const fields = Object.keys(model).map((key) => {
        const field = model[key];
        if (Array.isArray(field)) return undefined;
        const schema = {
          label: startCase(key),
          model: key,
          readonly: key === 'id'
        };

        return { ...schema, ...getSchemaProps(field) };
      });

      return { fields };
    }
  }
};

export default form;
