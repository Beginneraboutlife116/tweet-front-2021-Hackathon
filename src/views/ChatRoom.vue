<template>
  <div class="public-container">
    <div class="users-container">
      <header class="users__header">
        <p class="users__title">上線使用者({{allOnlineUsers.length}})</p>
      </header>
      <User v-for="user in allOnlineUsers" :key="user.id" :user="user"/>
    </div>
    <div class="chatroom-container">
      <header class="chatroom__header">
        <p class="chatroom__title">公開聊天室</p>
      </header>
      <main class="chatroom__box">
        <ChatMsg v-for="(msg, index) in chatroomList" :key="index" :msg="msg"/>
      </main>
      <footer class="chatroom__send">
        <input type="text" class="chatroom__send-input" placeholder="輸入訊息..." v-model.trim="text" @keyup.enter="sendMessage">
        <button class="chatroom__send-btn" @click.stop.prevent="sendMessage">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1301 9.35798L1.61406 0.107979C1.32406 -0.0440207 0.97406 0.00597923 0.74106 0.233979C0.51106 0.459979 0.44806 0.810979 0.59106 1.10198L4.95306 10.022L0.59106 18.942C0.44806 19.234 0.51106 19.585 0.74106 19.81C0.88606 19.95 1.07406 20.022 1.26406 20.022C1.38406 20.022 1.50406 19.994 1.61406 19.935L19.1311 10.685C19.3761 10.555 19.5311 10.299 19.5311 10.021C19.5311 9.74298 19.3761 9.48898 19.1311 9.35898L19.1301 9.35798ZM2.94806 2.50998L15.7521 9.27198H6.25506L2.94806 2.51198V2.50998ZM6.25506 10.77H15.7531L2.94806 17.535L6.25506 10.772V10.77Z" fill="#FF6600"/>
          </svg>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import User from './../components/User'
import ChatMsg from '../components/ChatMsg.vue'
import usersAPI from './../apis/users'
import { Toast } from './../mixins/helpers'

export default {
  components: {
    User,
    ChatMsg
  },
  data () {
    return {
      chatroomList: [],
      text: ''
    }
  },
  computed: {
    allOnlineUsers () {
      return this.$store.state.allOnlineUsers
    },
    userStatus () {
      return this.$store.state.userStatus
    },
    userMsg () {
      return this.$store.state.userMsg
    }
  },
  created () {
    this.loginMessageHistory()
    this.$socket.emit('USER_ONLINE', { user: this.$store.state.currentUser })
  },
  methods: {
    sendMessage () {
      if (!this.text) { return }
      const user = {
        id: this.$store.state.currentUser.id,
        name: this.$store.state.currentUser.name,
        avatar: this.$store.state.currentUser.avatar
      }
      this.$socket.emit('MESSAGE', { user, message: this.text, timeStamp: new Date() })
      this.text = ''
    },
    async loginMessageHistory () {
      try {
        const { data } = await usersAPI.getMessageHistory()
        this.chatroomList = data
      } catch (err) {
        Toast.fire({
          icon: 'fire',
          title: '無法讀取歷史訊息'
        })
      }
    }
  },
  watch: {
    userStatus: {
      handler () {
        this.chatroomList.unshift(this.userStatus)
      },
      deep: true
    },
    userMsg: {
      handler () {
        this.chatroomList.unshift(this.userMsg)
      },
      deep: true
    }
  },
  sockets: {
    ONLINE_LIST_UPDATE (data) {
      this.$store.commit('SOCKET_storeUserList', data)
    },
    MESSAGE_UPDATE (data) {
      this.$store.commit('SOCKET_storeMessage', data)
    }
  }
}
</script>

<style lang="scss">
.public-container {
  flex: 1;
  border-left: 1px solid var(--border-color);
  display: flex;
  color: var(--font-color);
}
.users {
  &-container {
    flex-basis: calc(390 / 1062 * 100%);
  }
  &__header {
    padding: 1.5rem;
    font-size: $font-lg;
    font-weight: 700;
    border-bottom: 1px solid var(--border-color);
  }
}

.chatroom {
  &-container {
    flex: 1;
    border-left: 1px solid var(--border-color);
    position: relative;
  }
  &__header {
    padding: 1.5rem;
    font-size: $font-xl;
    font-weight: 700;
    border-bottom: 1px solid var(--border-color);
    position: fixed;
    top: 0;
    width: calc(673 / 1440 * 100%);
    z-index: 1;
    background-color: #fff;
  }
  &__box {
    height: 100vh;
    overflow-y: auto;
    padding: 8rem 1.5rem 5rem;
    transform: rotate(180deg);
  }
  &__send {
    position: fixed;
    width: calc(673 / 1440 * 100%);
    bottom: 0;
    padding: 1.2rem 1.5rem 1.1rem 1.5rem;
    z-index: 1;
    background-color: #fff;
    display: flex;
    gap: 1.7rem;
    align-items: center;
    border-top: 1px solid var(--border-color);
    &-input {
      all: unset;
      flex: 1;
      background-color: var(--border-color);
      border-radius: 99em;
      padding: 0.8rem 0 0.8rem 1.5rem;
      font-size: $font-md;
    }
  }
}
.noti {
  margin: 0 auto 1.5rem;
}
</style>
