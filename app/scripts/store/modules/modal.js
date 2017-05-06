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
    autoSize: false,
  },
  // MUTATIONS
  mutations: {
    [SET_MODAL](state, payload) {
      const { header, heading, footer, content, props, open, autoSize } = { ...state, ...payload };
      state.header = header;
      state.heading = heading;
      state.footer = footer;
      state.content = content;
      state.props = props;
      state.open = open;
      state.autoSize = autoSize;
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
