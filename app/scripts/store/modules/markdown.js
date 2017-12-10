import { SET_MARKDOWN_CONTENT } from '../mutation-types';

const markdown = {
  // INITIAL STATE
  state: {
    blobs: {}
  },
  // MUTATIONS
  mutations: {
    [SET_MARKDOWN_CONTENT](state, { id, blob }) {
      state.blobs = { ...state.blobs, [id]: blob };
    },
  },
  // ACTIONS
  actions: {
    fetchBlob({ commit }, contentUrl) {
      return new Promise((resolve, reject) => {
        fetch(contentUrl)
          .then((res) => {
            if (res.status >= 400) throw new Error(`${contentUrl} ${res.statusText}`);
            return res.text();
          })
          .then((blob) => {
            const id = contentUrl;
            commit(SET_MARKDOWN_CONTENT, { id, blob });
            resolve(blob);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    }
  },
};

export default markdown;
