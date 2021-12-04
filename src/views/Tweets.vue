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
          <img src="https://fakeimg.pl/300/" alt="" />
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
          <button class="active" @click.stop.prevent="sendTweet">推文</button>
        </div>
      </div>
    </header>
    <hr class="tweets-line" />
    <Tweet v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tweet from './../components/Tweet'
import { Toast } from './../mixins/helpers'
const dummyData = {
  tweets: [
    {
      id: 1,
      description:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit amet',
      createdAt: '2021-12-02T16:44:25.000Z',
      user: {
        id: 2,
        account: 'account',
        name: 'userName',
        avatar: null
      },
      isLike: true,
      likeCounts: 100,
      replyCounts: 20
    },
    {
      id: 2,
      description:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit',
      createdAt: '2021-12-02T16:44:25.000Z',
      user: {
        id: 2,
        account: 'account2',
        name: 'userName2',
        avatar: null
      },
      isLike: false,
      likeCounts: 30,
      replyCounts: 50
    },
    {
      id: 3,
      description:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit',
      createdAt: '2021-12-02T16:44:25.000Z',
      user: {
        id: 3,
        account: 'account3',
        name: 'userName3',
        avatar: null
      },
      isLike: false,
      likeCounts: 2,
      replyCounts: 5
    },
    {
      id: 4,
      description:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit',
      createdAt: '2021-12-02T16:44:25.000Z',
      user: {
        id: 4,
        account: '',
        name: '',
        avatar: null
      },
      isLike: false,
      likeCounts: 4,
      replyCounts: 5
    }
  ]
}
export default {
  name: 'tweets',
  components: {
    Tweet
  },
  data () {
    return {
      tweets: [],
      text: ''
    }
  },
  created () {
    this.fetchTweets()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchTweets () {
      this.tweets = dummyData.tweets.map((data) => {
        return {
          ...data
        }
      })
    },
    sendTweet () {
      if (!this.text) {
        Toast.fire({
          icon: 'warning',
          title: '內容不可空白'
        })
        return
      }

      if (this.text.length > 140) {
        Toast.fire({
          icon: 'warning',
          title: '超過推文字數限制'
        })
        return
      }
      console.log(`${this.text}`)
      this.updateTweets()
    },
    updateTweets () {
      const { id, name, avatar, account } = this.currentUser
      const description = this.text
      const createdAt = Date.now()
      this.tweets.unshift({
        description,
        createdAt,
        user: {
          id,
          account,
          name,
          avatar
        },
        isLike: false,
        likeCounts: 0,
        replyCounts: 0
      })
      this.text = ''
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
