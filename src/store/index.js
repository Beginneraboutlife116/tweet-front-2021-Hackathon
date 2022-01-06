import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'
import adminAPI from './../apis/admin'

Vue.use(Vuex)

const modulePrivate = {
  namespaced: true,
  state: () => ({
    receiver: {},
    isChatting: false,
    privateNotiCount: 0,
    roomId: 0,
    dialogue: []
  }),
  mutations: {
    getReceiver (state, payload) {
      const { account, avatar, id, name } = payload.receiver
      state.receiver = {
        account,
        avatar,
        id,
        name
      }
    },
    fetchRoomId (state, roomId) {
      state.roomId = roomId
    },
    increaseNoti (state) {
      state.privateNotiCount++
    },
    decreaseNoti (state) {
      state.privateNotiCount--
    },
    startPrivateChatRoom (state) {
      state.isChatting = true
    },
    endPrivateChatRoom (state) {
      state.isChatting = false
    },
    recordMessage (state, message) {
      state.dialogue.unshift(message)
    }
  },
  action: {
    getRoomHistory ({ state }) {
      // TODO: 用roomId, userId去取得歷史資料
      // TODO: fetch history into dialogue
    }
  }
}

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
    userStatus: {},
    userMsg: {}
  },
  mutations: {
    SOCKET_storeUserList (state, data) {
      state.allOnlineUsers = data.userList
      state.userStatus = data.user
    },
    SOCKET_storeMessage (state, data) {
      state.userMsg = {
        user: data.user,
        message: data.message || '',
        timeStamp: data.timeStamp || ''
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
        if (data.status === 'error') {
          throw new Error('使用者資訊錯誤')
        }
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
        const currentUserId = localStorage.getItem('userId')
        if (currentUserId !== '60') {
          throw new Error('非管理者')
        }
        const { data } = await adminAPI.getUsers()
        const root = data.find(data => data.id === Number(currentUserId))
        commit('setCurrentUser', {
          ...root,
          role: 'admin'
        })
        return true
      } catch (err) {
        console.error('無法取得現在使用者資訊')
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
    private: modulePrivate
  }
})
