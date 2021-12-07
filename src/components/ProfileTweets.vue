<template>
  <div>
   <Spinner v-if="isLoading" />
   <Tweet v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from './../components/Spinner'
import Tweet from './../components/Tweet'
import { Toast } from './../mixins/helpers'
import usersAPI from './../apis/users'

export default {
  name: 'profile-tweets',
  components: {
    Tweet,
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
    const { userId } = this.$route.params
    this.fetchTweets(userId)
  },
  methods: {
    async fetchTweets (userId) {
      try {
        this.isProcessing = true
        this.isLoading = true
        const { data } = await usersAPI.getUserProfileTweets(userId)

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
          title: '無法獲取個人資料推文'
        })
      }
    }
  }
}
</script>
