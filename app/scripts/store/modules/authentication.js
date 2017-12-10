import { auth } from 'app/datasource.schema.json';
import { SET_AUTH_STATUS } from '../mutation-types';

const authentication = {
  // INITIAL STATE
  state: {
    loggedIn: false,
    payload: null
  },
  // MUTATIONS
  mutations: {
    [SET_AUTH_STATUS](state, { loggedIn, payload }) {
      state.loggedIn = loggedIn;
      state.payload = payload;
    },
  },
  // ACTIONS
  actions: {
    checkAuth({ commit }) {
      const authStatus = localStorage.getItem('auth');
      if (authStatus) {
        commit(SET_AUTH_STATUS, JSON.parse(authStatus));
      }
    },
    authenticate({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        fetch(auth.request.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            [auth.request.user]: username,
            [auth.request.password]: password
          })
        })
          .then((res) => {
            if (res.status >= 400) throw new Error(res.status);
            return res.json();
          })
          .then((res) => {
            const payload = res[auth.response.payload];
            localStorage.setItem('auth', JSON.stringify({ payload, loggedIn: true }));
            commit(SET_AUTH_STATUS, { payload, loggedIn: true });
            resolve(payload);
          })
          .catch((err) => {
            commit(SET_AUTH_STATUS, { payload: null, loggedIn: false });
            console.error(err);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      localStorage.removeItem('auth');
      commit(SET_AUTH_STATUS, { payload: null, loggedIn: false });
    }
  },
};

export default authentication;
