import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: 'account0',
      name: '',
      email: '',
      role: 'user',
      avatar: null
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
