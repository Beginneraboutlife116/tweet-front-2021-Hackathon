<template>
  <div class="private-container">
    <div class="message-container">
      <header class="message__header">
        <p class="message__title">訊息</p>
        <IconNoti />
      </header>
      <Bar
        v-for="room in roomsArray"
        :key="room.room"
        :initial-room="room"
        @check-this-message="checkHistory"
      />
    </div>
    <div class="chatroom-container">
      <template v-if="isChatting">
        <header class="chatroom__header">
          <p class="chatroom__title">{{ userName }}</p>
        </header>
        <main class="chatroom_box" v-if="isLoading">
          <Spinner />
        </main>
        <main class="chatroom__box" v-else>
          <ChatMsg v-for="(msg, index) in dialogue" :key="index" :msg="msg" />
        </main>
        <footer class="chatroom__send">
          <input
            type="text"
            class="chatroom__send-input"
            placeholder="輸入訊息..."
            v-model.trim="text"
            @keyup.enter="sendMessage"
          />
          <button class="chatroom__send-btn" @click.stop.prevent="sendMessage">
            <IconSend />
          </button>
        </footer>
      </template>
      <template v-else>
        <div class="chatroom__uncheck">
          <h1 class="uncheck-title">請點選"訊息"來查看聊天室</h1>
          <img
            src="./../assets/pngs/dog.png"
            alt="dog picture"
            class="uncheck-img"
          />
          <article class="uncheck-img-source">
            Icons made by
            <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
            <a href="https://www.flaticon.com/" title="Flaticon"
              >www.flaticon.com</a
            >
          </article>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import IconNoti from '../components/icons/IconNoti.vue'
import IconSend from '../components/icons/IconSend.vue'
import Bar from './../components/PersonalMsgBar.vue'
import ChatMsg from './../components/ChatMsg.vue'
import Spinner from '../components/Spinner.vue'
import { mapState } from 'vuex'
import chatAPI from '../apis/chat'
import { Toast } from '../mixins/helpers'

export default {
  name: 'PersonalMsg',
  components: {
    IconNoti,
    IconSend,
    Bar,
    ChatMsg,
    Spinner
  },
  data () {
    return {
      text: '',
      userName: '',
      isLoading: false
    }
  },
  created () {
    this.fetchMessageData()
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.currentUser,
      receiver: (state) => state.private.receiver,
      isChatting: (state) => state.private.isChatting,
      dialogue: (state) => state.private.dialogue,
      roomsArray: (state) => state.private.roomsArray,
      roomId: (state) => state.private.roomId,
      subscribedRooms: (state) => state.private.subscribedRooms
    })
  },
  methods: {
    fetchMessageData () {
      // * 主要是用在當新增room的時候，讓上方header可以顯示名稱
      if (this.isChatting) {
        this.userName = this.receiver.name
      }
    },
    checkHistory (selectedRoomId) {
      if (selectedRoomId === this.roomId) return
      if (!this.isChatting) {
        this.$store.commit('private/startPrivateChatRoom')
      }
      // * make header title be the receiver
      this.userName = this.roomsArray.find(
        (room) => room.room === selectedRoomId
      ).User.name
      // * clean old history
      this.$store.commit('private/cleanDialogue')
      // * record the roomId
      this.$store.commit('private/setRoomId', selectedRoomId)
      // * make message to be read
      this.$store.commit('private/makeMessageToBeRead', selectedRoomId)
      // ? 是否直接將makeMessageToBeRead移到這邊會比較好？因為可以直接發動API
      this.getChatHistory(selectedRoomId)
    },
    async getChatHistory (roomId) {
      try {
        this.isLoading = true
        const { data } = await chatAPI.getRoomHistory(roomId)
        if (data.status === 'success') {
          this.isLoading = false
        }
        const { message } = data
        const anotherAvatar = this.roomsArray.find(
          (room) => room.room === roomId
        ).User.avatar
        message.forEach((msg) => {
          const msgToDialogue = {
            ...msg,
            User: {
              id: msg.SenderId,
              avatar:
                msg.SenderId === this.currentUser.id
                  ? this.currentUser.avatar
                  : anotherAvatar
            }
          }
          this.$store.commit('private/recordMessage', msgToDialogue)
        })
      } catch (err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '系統發生錯誤，請稍後再試'
        })
      }
    },
    sendMessage () {
      if (!this.text) return
      const message = {
        message: this.text,
        SenderId: this.currentUser.id,
        ReceiverId: this.receiver.id,
        room: this.roomId,
        createdAt: new Date()
      }
      if (message.room) {
        this.$socket.emit('SEND_ROOM_MESSAGE', message)
      }
      const messageBar = {
        ...message,
        User: {
          id: this.receiver.id,
          account: this.receiver.account,
          name: this.receiver.name,
          avatar: this.receiver.avatar
        }
      }
      this.$store.commit('private/updateMessagesToRoomsArray', messageBar)
      const messageData = {
        ...message,
        User: {
          id: message.SenderId,
          avatar: this.currentUser.avatar
        }
      }
      this.$store.commit('private/recordMessage', messageData)
      this.text = ''
    }
  },
  destroyed () {
    if (this.isChatting) {
      this.$store.commit('private/endPrivateChatRoom')
    }
  }
}
</script>

<style lang="scss">
.private-container {
  flex: 1;
  border-left: 1px solid var(--border-color);
  display: flex;
}
.message {
  &-container {
    flex-basis: calc(390 / 1062 * 100%);
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  &__uncheck {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > * {
      margin-bottom: 2rem;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--basic-color);
      opacity: 0.5;
    }
  }
}

.uncheck {
  &-img {
    width: 40%;
    &-source {
      font-size: $font-xs;
      & > a {
        text-decoration: underline;
        color: var(--font-color);
      }
    }
  }
}

.noti {
  margin: 0 auto 1.5rem;
}
</style>
