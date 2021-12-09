import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 10,
      account: '',
      name: '',
      email: '',
      avatar: '',
      cover: '',
      introduction: '',
      role: 'user'
    },
    isAuthenticated: false,
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
      localStorage.removeItem('userId')
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
    async fetchCurrentUser ({ commit }) {
      try {
        const currentUserId = localStorage.getItem('userId')
        const { data } = await usersAPI.getUserProfile(currentUserId)
        const { id, account, name, email, avatar, cover, introduction, role } = data
        commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          avatar,
          cover,
          introduction,
          role
        })
      } catch (err) {
        console.error('無法取得現在使用者資訊')
      }
    }
  },
  modules: {
  }
})
