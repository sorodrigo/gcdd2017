import {
  SET_FORM_MODEL,
} from '../mutation-types';

const form = {
  // INITIAL STATE
  state: {
    model: null,
  },
  // MUTATIONS
  mutations: {
    [SET_FORM_MODEL](state, model) {
      state.model = model;
    }
  },
  // ACTIONS
  actions: {
    setFormModel({ commit }, model) {
      commit(SET_FORM_MODEL, model);
    },
  },
};

export default form;
