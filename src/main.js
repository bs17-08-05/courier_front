import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import App from './App.vue';
import configs from './js/config';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import VueResource from 'vue-resource';
import Notifications from 'vue-notification'

import router from './router'

import Vuex from 'vuex';
App

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
Vue.use(VueResource);
Vue.use(Vuex)
Vue.use(Notifications)
Vue.use(Vuetify)

const store = new Vuex.Store({
  state: {
    configs: configs,
    token: "",
    refresh_token: "",
  },
  mutations: {
    setTokens(state, token, refreshToken) {
      state.token = token;
      state.refresh_token = refreshToken;
    }

  },
  getters: {
    getBackUrl: state => {
      return state.configs.BACKEND_URL;
    },
    getAuthUrl: state => {
      return state.configs.AUTH_URL;
    },
    getBackWsUrl: state => {
      return state.configs.BACKEND_WS;
    },
    getToken: state => {
      return state.token;
    },
    getRefreshToken: state => {
      return state.refresh_token;
    },
  }
})

Vue.http.interceptors.push(function (request) {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
});