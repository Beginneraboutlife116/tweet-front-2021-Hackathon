import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 10,
      account: 'account0',
      name: 'name',
      email: '',
      role: 'user',
      avatar: ''
    },
    isAuthenticated: true,
    token: '',
    tweet: '',
    reply: '',
    modal: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      state.token = ''
    },
    recordText (state, payload) {
      state[payload.action] = payload.text
    },
    toggleModal (state, payload) {
      state.modal = payload
    },
    clearModal (state) {
      state.modal = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
