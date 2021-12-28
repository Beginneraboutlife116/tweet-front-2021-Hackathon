<template>
  <div class="private-container">
    <div class="message-container">
      <header class="message__header">
        <p class="message__title">訊息</p>
        <IconNoti />
      </header>
      <Bar v-for="room in roomArray" :key="room.roomId" :initial-room="room" @check-this-message="checkMessages"/>
    </div>
    <div class="chatroom-container">
      <template v-if="selectedDialogue">
        <header class="chatroom__header">
          <p class="chatroom__title"> {{ userName }} </p>
        </header>
        <main class="chatroom__box">
          <ChatMsg v-for="(msg, index) in dialogue" :key="index" :msg="msg"/>
        </main>
        <footer class="chatroom__send">
          <input type="text" class="chatroom__send-input" placeholder="輸入訊息..." v-model.trim="text" @keyup.enter="sendMessage">
          <button class="chatroom__send-btn" @click.stop.prevent="sendMessage">
            <IconSend />
          </button>
        </footer>
      </template>
      <template v-else>
        <div class="chatroom__uncheck">
          <h1 class="uncheck-title">請點選"新訊息"來查看聊天室</h1>
          <img src="./../assets/pngs/dog.png" alt="dog picture" class="uncheck-img">
          <article class="uncheck-img-source">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></article>
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

const dummyData = [
  {
    roomId: 1,
    userId: 1000,
    userName: 'test1',
    userAccount: 'test1',
    userAvatar: '',
    msgTimeStamp: '2021-01-01',
    newMsg: '早安你好，今天天氣真好！'
  },
  {
    roomId: 2,
    userId: 2000,
    userName: 'test2',
    userAccount: 'test2',
    userAvatar: '',
    msgTimeStamp: '2021-10-10',
    newMsg: '來打遊戲吧！！不要打code了？'
  }
]

const dummyDialogue = [
  {
    message: '哈囉～～',
    timeStamp: '2021-09-10',
    user: {
      avatar: '',
      id: 64,
      name: 'kevin'
    }
  },
  {
    message: '早安你好，今天天氣真好！',
    timeStamp: '2021-10-10',
    user: {
      avatar: '',
      id: 1000,
      name: 'test1'
    }
  }
]

export default {
  name: 'PersonalMsg',
  components: {
    IconNoti,
    IconSend,
    Bar,
    ChatMsg
  },
  data () {
    return {
      text: '',
      roomArray: [
        {
          roomId: 0,
          userId: 0,
          userName: '',
          userAccount: '',
          userAvatar: '',
          msgTimeStamp: '',
          newMsg: ''
        }
      ],
      userName: '',
      dialogue: [],
      selectedDialogue: false
    }
  },
  created () {
    this.fetchMessageData()
  },
  methods: {
    fetchMessageData () {
      this.roomArray = dummyData.map(data => {
        return {
          ...data,
          isSelected: false
        }
      })
    },
    checkMessages (id) {
      // TODO: fetch history API for dialogue
      this.dialogue = [...dummyDialogue]

      this.selectedDialogue = true
      this.roomArray = this.roomArray.map(room => {
        if (room.roomId === id) {
          this.userName = room.userName
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
