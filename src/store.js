import { createStore } from 'vuex';
import axios from 'axios';


const state = {
  auth_token: null
};

const actions = {

  login ({commit}, auth_data) {
    axios.post(
      '/api/v1/auth/token/login',
      auth_data
    ).then(function (response) {
      let auth_token = response.data.auth_token;
      commit('authUser', auth_token);
      localStorage.setItem('auth_token', auth_token);
    })
    .catch(function (error) {
      console.log(error);
      localStorage.removeItem('auth_token');
    });
  },

  logout ({commit, state}) {
    axios.post(
      '/api/v1/auth/token/logout/',
      null,
      {
        headers: {
          "Authorization": "Token " + state.auth_token
        }
    })
    .then(function () {
      commit('destroyAuth');
      localStorage.removeItem('auth_token');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};

const mutations = {

  initStore (state) {
    state.auth_token = localStorage.getItem('auth_token');
  },

  authUser (state, auth_token) {
    state.auth_token = auth_token;
  },

  destroyAuth (state) {
    state.auth_token = null;
  }
};

const getters = {
  is_auth: state => !!state.auth_token,
}

export default createStore({
  state,
  actions,
  mutations,
  getters,
});