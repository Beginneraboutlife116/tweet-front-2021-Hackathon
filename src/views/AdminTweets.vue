<template>
   <div class="admin-tweets-container">
    <header class="admin-tweets__header">
      <h1 class="admin-tweets__header--title">推文清單</h1>
    </header>
    <Spinner v-if="isLoading" />
    <AdminTweet v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet"
    @delete-post="deletePost"/>
   </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from './../components/Spinner'
import AdminTweet from './../components/AdminTweet'
import { Toast } from './../mixins/helpers'
import tweetsAPI from './../apis/tweets'
import adminAPI from './../apis/admin'
export default {
  name: 'profile-tweets',
  components: {
    AdminTweet,
    Spinner
  },
  data () {
    return {
      tweets: [],
      isProcessing: false,
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        this.isProcessing = true
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
          title: '無法獲取推文'
        })
      }
    },
    async deletePost (tweetId) {
      try {
        console.log(tweetId)
        const { data } = await adminAPI.delete(tweetId)
        console.log(data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweets = this.tweets.filter(
          (tweet) => tweet.id !== tweetId
        )
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.admin-tweets-container {
  flex: 1;
  height: 100vh;
  border-left: 1px solid var(--border-color);
  overflow: scroll;
}

.admin-tweets__header--title{
  padding: 1.5rem 0 1.4rem 2.6rem;
  border-bottom: 1px solid var(--border-color);
  font-size: $font-lg;
}
</style>
