<template>
  <div class="tweets-container">
    <header class="tweets__header">
      <div class="tweets__header__title">
        <h1>首頁</h1>
      </div>
      <div class="tweets__header__post">
        <router-link
          :to="`/home/${currentUser.id}`"
          class="tweets__header__post--avatar"
        >
          <img
            :src="
              currentUser.avatar ||
              'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
            "
            alt="avatar"
            aria-label="avatar"
          />
        </router-link>
        <div class="tweets__header__post__wrapper">
          <textarea
            v-model.trim="text"
            name="new-post"
            id="new-post"
            rows="3"
            placeholder="有什麼新鮮事？"
            autofocus
          >
          </textarea>
          <button
            class="active"
            @click.stop.prevent="sendTweet(text)"
            :disabled="isProcessing"
            :class="{ disabled: isProcessing }"
          >
            推文
          </button>
        </div>
      </div>
    </header>
    <hr class="tweets-line" />
    <template>
      <Spinner v-if="isLoading" />
      <Tweet
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
        v-else
      />
    </template>
  </div>
</template>

<script>
import Tweet from './../components/Tweet'
import Spinner from './../components/Spinner.vue'
import { mapState } from 'vuex'
import { Toast } from './../mixins/helpers'
import tweetsAPI from './../apis/tweets'

export default {
  name: 'tweets',
  components: {
    Tweet,
    Spinner
  },
  data () {
    return {
      tweets: [],
      text: '',
      isProcessing: false,
      isLoading: true
    }
  },
  created () {
    this.fetchTweets()
  },
  computed: {
    ...mapState(['currentUser', 'tweet'])
  },
  watch: {
    tweet () {
      this.sendTweet(this.tweet)
    }
  },
  sockets: {
    ONLINE_LIST_UPDATE (data) {
      this.$store.commit('SOCKET_storeUsers', data)
      console.log('list update', data)
    }
  },
  methods: {
    async fetchTweets () {
      try {
        this.isLoading = true
        const { data } = await tweetsAPI.getTweets()
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = data.map((data) => {
          return {
            ...data
          }
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法獲取推文，請稍後再嘗試'
        })
      }
    },
    sendTweet (message) {
      if (!message) {
        Toast.fire({
          icon: 'warning',
          title: '內容不可空白'
        })
        return
      }

      if (message.length > 140) {
        Toast.fire({
          icon: 'warning',
          title: '超過推文字數限制'
        })
        return
      }
      this.updateTweets(message)
      this.text = ''
    },
    async updateTweets (message) {
      try {
        this.isProcessing = true
        this.isLoading = true
        const description = message
        const { data } = await tweetsAPI.postTweets({ description })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchTweets()
        this.isProcessing = false
        this.isLoading = false
      } catch (err) {
        this.isProcessing = false
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '推文失敗，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.tweets-container {
  grid-column: 1;
  height: 100vh;
  border-inline: 1px solid var(--border-color);
  overflow: scroll;
}

.tweets__header {
  &__title {
    padding: 1.5rem 0 1.4rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    h1 {
      font-size: $font-lg;
      font-weight: bold;
    }
  }
  &__post {
    display: flex;
    &--avatar {
      padding: 1rem 1rem 1rem 1.5rem;
      img {
        max-width: 5rem;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &__wrapper {
      display: flex;
      flex-direction: column;
      flex: calc(100% - 6.5rem);
      margin: 2.1rem 1.5rem 1rem 0;
      textarea {
        border: none;
        resize: none;
      }
      button {
        @extend %buttonStyle;
        width: 6.6rem;
        height: 3.8rem;
        align-self: flex-end;
        font-size: $font-lg;
      }
    }
  }
}
.tweets-line {
  margin: 0;
  border: 0.5rem solid;
  color: var(--border-color);
}
</style>
