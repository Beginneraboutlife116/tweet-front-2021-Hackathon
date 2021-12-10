import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 10,
      account: '',
      name: '',
      email: '',
      role: 'user',
      avatar: ''
    },
    isAuthenticated: true,
    token: '',
    tweet: '',
    reply: '',
    modal: '',
    fromReplies: {}
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
      if (typeof payload === 'string') {
        state.modal = payload
      } else {
        const { id, description, createdAt, User, reply } = payload
        state.modal = reply
        state.fromReplies = {
          id,
          description,
          createdAt,
          User
        }
      }
    },
    clearModal (state) {
      if (typeof payload === 'object') {
        state.fromReplies = {}
      }
      state.modal = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
