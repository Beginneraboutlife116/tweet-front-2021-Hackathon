<template>
  <div>
    <Spinner v-if="isLoading" />
    <Reply v-for="reply in replies" :key="reply.id" :initial-reply="reply" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Reply from './../components/Reply'
import usersAPI from './../apis/users'
import { Toast } from './../mixins/helpers'
import Spinner from './../components/Spinner'

export default {
  name: 'profile-replies',
  components: {
    Reply,
    Spinner
  },
  data () {
    return {
      replies: [],
      isLoading: true
    }
  },
  created () {
    const { userId } = this.$route.params
    this.fetchReplies(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { userId } = to.params
    this.fetchReplies(userId)
    next()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchReplies (userId) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.getUserProfileReplies(userId)
        this.replies = data.map((data) => {
          const { id, comment, createdAt, Tweet, User } = data
          const { avatar, name, id: userId } = User
          const { User: tweetUser, id: tweetId } = Tweet
          const { account: tweetUserAccount, id: tweetUserId } = tweetUser
          return {
            id,
            comment,
            createdAt,
            avatar,
            userId,
            name,
            tweet: {
              id: tweetId,
              User: {
                id: tweetUserId,
                account: tweetUserAccount
              }
            }
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
