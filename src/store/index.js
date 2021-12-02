import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      role: 'user'
    },
    isAuthenticated: true,
    token: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
