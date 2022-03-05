import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'
import adminAPI from './../apis/admin'
// import chatAPI from './../apis/chat'

Vue.use(Vuex)

const modulePrivate = {
  namespaced: true,
  state: () => ({
    receiver: {},
    isChatting: false,
    privateNotiCount: 0,
    subscribedRooms: {},
    roomsArray: [],
    dialogue: [],
    roomId: ''
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
    recordUnreadMessageNumber (state, number) {
      state.privateNotiCount = number
    },
    decreaseNoti (state) {
      state.privateNotiCount--
    },
    startPrivateChatRoom (state) {
      state.isChatting = true
    },
    endPrivateChatRoom (state) {
      state.isChatting = false
      state.receiver = {}
      state.dialogue = []
    },
    recordMessage (state, message) {
      state.dialogue.unshift(message)
    },
    readMessage (state, selectedMessageId) {
      state.roomsArray = state.roomsArray.map((room) => {
        if (room.room === selectedMessageId && !room.isRead) {
          // TODO: 給予room id給後端，去提示要把isRead: true回傳
          if (room.ReceiverId === this.state.currentUser.id) {
            state.privateNotiCount -= 1
          }
          return {
            ...room,
            isRead: true,
            isSelected: true
          }
        }
        if (room.room === selectedMessageId && room.isRead) {
          console.log('isRead: ', room.isRead)
          return {
            ...room,
            isSelected: true
          }
        }
        return {
          ...room,
          isSelected: false
        }
      })
    },
    updateMessagesToRoomsArray (state, newMessage) {
      const msgBarInfo = {
        ...newMessage,
        isSelected: !!newMessage.isSelected,
        isRead: !!newMessage.isRead
      }
      const messageIndex = state.roomsArray.findIndex(
        (data) => data.room === newMessage.room
      )
      if (messageIndex === -1) {
        state.roomsArray.push(msgBarInfo)
      } else {
        state.roomsArray.splice(messageIndex, 1)
        state.roomsArray.unshift(msgBarInfo)
      }
    },
    subscribeRoom (state, data) {
      if (Object.keys(data).indexOf('room') !== -1) {
        const { room, users } = data
        const newSubscribeRooms = {
          [room]: users,
          ...state.subscribedRooms
        }
        state.subscribedRooms = newSubscribeRooms
      } else {
        state.subscribedRooms = {
          ...data
        }
      }
    },
    setRoomId (state, roomId) {
      state.roomId = roomId
    }
  },
  action: {
    getRoomHistory ({ state }) {
      setTimeout(() => {
        console.log('get room history')
      }, 1000)
      // TODO: 用roomId, userId去取得歷史資料，將回傳資料放入roomArray
      // TODO: 每一個都要記錄一個isSelected值，用做連動CSS用的
    }
    // async getRoomSnapShot ({ commit, rootState }, payload) {
    //   try {
    //     const data = await chatAPI.getRoomSnapshot(
    //       rootState.currentUser.id,
    //       payload
    //     )
    //     console.log(data)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
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
        User: data.user,
        message: data.message || '',
        createdAt: data.timeStamp || ''
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
      state.private = {
        receiver: {},
        isChatting: false,
        privateNotiCount: 0,
        subscribedRooms: {},
        roomsArray: [],
        dialogue: [],
        roomId: ''
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
        const { id, account, name, email, avatar, cover, introduction, role } =
          data
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
        const root = data.find((data) => data.id === Number(currentUserId))
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
