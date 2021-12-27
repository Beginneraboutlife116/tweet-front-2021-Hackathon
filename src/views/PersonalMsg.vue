<template>
  <div class="private-container">
    <div class="message-container">
      <header class="message__header">
        <p class="message__title">訊息</p>
        <IconNoti />
      </header>
      <Bar />
    </div>
    <div class="chatroom-container">
      <header class="chatroom__header">
        <p class="chatroom__title">Apple</p>
      </header>
      <main class="chatroom__box">
        <!-- <ChatMsg v-for="(msg, index) in chat" :key="index" :msg="msg"/> -->
      </main>
      <footer class="chatroom__send">
        <input type="text" class="chatroom__send-input" placeholder="輸入訊息..." v-model.trim="text" @keyup.enter="sendMessage">
        <button class="chatroom__send-btn" @click.stop.prevent="sendMessage">
          <IconSend />
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import IconNoti from '../components/icons/IconNoti.vue'
import IconSend from '../components/icons/IconSend.vue'
import Bar from './../components/PersonalMsgBar.vue'

export default {
  name: 'PersonalMsg',
  components: {
    IconNoti,
    IconSend,
    Bar
  },
  data () {
    return {
      text: ''
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
}
.noti {
  margin: 0 auto 1.5rem;
}
</style>
