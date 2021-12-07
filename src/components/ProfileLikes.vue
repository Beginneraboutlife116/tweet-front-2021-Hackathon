<template>
  <div>
    <Spinner v-if="isLoading" />
    <Tweet v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tweet from './../components/Tweet'
import { Toast } from './../mixins/helpers'
import usersAPI from './../apis/users'
import Spinner from './../components/Spinner'

export default {
  name: 'profile-likes',
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
  beforeRouteUpdate (to, from, next) {
    const { userId } = to.params
    this.fetchTweets(userId)
    next()
  },
  methods: {
    async fetchTweets (userId) {
      try {
        this.isProcessing = true
        this.isLoading = true
        const { data } = await usersAPI.getUserProfileLikes(userId)

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = data.map((data) => {
          const userId = data.Tweet.User.id
          const { id, createdAt, description, likeCounts, replyCounts } =
            data.Tweet
          const { account, avatar, name } = data.Tweet.User
          return {
            id,
            description,
            createdAt,
            User: {
              id: userId,
              account,
              name,
              avatar
            },
            likeCounts,
            replyCounts,
            isLike: true
          }
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法獲取個人資料，請稍後再嘗試'
        })
      }
    }
  }
}
</script>
