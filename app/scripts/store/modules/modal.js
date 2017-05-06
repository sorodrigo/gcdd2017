import { SET_MODAL } from '../mutation-types';

const modal = {
  // INITIAL STATE
  state: {
    header: true,
    heading: null,
    footer: true,
    content: null,
    props: null,
    open: false,
  },
  // MUTATIONS
  mutations: {
    [SET_MODAL](state, payload) {
      const { header, heading, footer, content, props, open } = { ...state, ...payload };
      state.header = header;
      state.heading = heading;
      state.footer = footer;
      state.content = content;
      state.props = props;
      state.open = open;
    },
  },
  // ACTIONS
  actions: {
    setModal({ commit }, props) {
      commit(SET_MODAL, props);
    },
  },
};

export default modal;
