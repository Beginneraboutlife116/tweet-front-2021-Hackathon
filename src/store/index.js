import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'
import adminAPI from './../apis/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: '',
      account: '',
      name: '',
      email: '',
      avatar: '',
      cover: '',
      introduction: '',
      role: ''
    },
    isAuthenticated: false,
    token: '',
    tweet: '',
    reply: '',
    modal: '',
    fromReplies: {},
    allOnlineUsers: [],
    user: {}
  },
  mutations: {
    SOCKET_storeUsers (state, users) {
      state.allOnlineUsers = users.userList
      state.user = {
        ...users.user,
        message: users.message || '',
        timeStamp: users.timeStamp || ''
      }
    },
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication (state) {
      state.currentUser = {
        id: '',
        account: '',
        name: '',
        email: '',
        avatar: '',
        cover: '',
        introduction: '',
        role: ''
      }
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
        return true
      } catch (err) {
        console.error('無法取得現在使用者資訊')
        commit('revokeAuthentication')
        return false
      }
    },
    async fetchRootUser ({ state, commit }) {
      try {
        const { data } = await adminAPI.getUsers()
        const root = data.find(data => data.id === state.currentUser.id)
        commit('setCurrentUser', root)
        return true
      } catch (err) {
        console.error('無法取得現在使用者資訊')
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
