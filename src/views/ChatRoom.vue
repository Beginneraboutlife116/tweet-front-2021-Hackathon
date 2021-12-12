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
          <ChatBoxButtonSvg />
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import User from './../components/User'
import ChatMsg from '../components/ChatMsg.vue'
import ChatBoxButtonSvg from '../components/ChatboxButtonSvg.vue'
import usersAPI from './../apis/users'
import { Toast } from './../mixins/helpers'

export default {
  components: {
    User,
    ChatMsg,
    ChatBoxButtonSvg
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
    this.$socket.emit('USER_ONLINE', { user: { ...this.$store.state.currentUser, name: '' } })
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
        if (!this.userStatus.name) {
          return
        }
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
    }
  }
}
</script>

<style lang="scss">
.public-container {
  flex: 1;
  border-left: 1px solid var(--border-color);
  display: flex;
}
.users {
  &-container {
    flex-basis: calc(390 / 1062 * 100%);
  }
  &__header {
    padding: 1.5rem;
    font-size: $font-xl;
    font-weight: 700;
    border-bottom: 1px solid var(--border-color);
  }
}

.chatroom {
  &-container {
    flex: 1;
    width: calc(673 / 1440 * 100%);
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
