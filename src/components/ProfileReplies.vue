<template>
  <div>
    <Reply v-for="reply in replies" :key="reply.id" :initial-reply="reply" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Reply from './../components/Reply'
const dummyData = {
  replies: [
    {
      id: 1,
      comment: 'amet Lorem ipsum dolor ',
      createdAt: '2021-12-02T16:44:25.000Z',
      tweet: {
        id: 1,
        User: {
          id: 11,
          account: 'account'
        }
      }
    },
    {
      id: 2,
      comment: 'amet Lorem ipsum dolor ',
      createdAt: '2021-12-02T16:44:25.000Z',
      tweet: {
        id: 2,
        User: {
          id: 2,
          account: 'account2'
        }
      }
    }

  ]
}
export default {
  name: 'profile-replies',
  components: {
    Reply
  },
  data () {
    return {
      replies: []
    }
  },
  created () {
    this.fetchReplies()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchReplies () {
      this.replies = dummyData.replies.map((data) => {
        const { id, comment, createdAt, tweet } = data
        const tweetId = tweet.id
        const UserId = tweet.User.id
        const account = tweet.User.account
        const avatar = this.currentUser.avatar
        return {
          id,
          comment,
          createdAt,
          tweet: {
            id: tweetId,
            User: {
              id: UserId,
              account,
              avatar
            }
          }

        }
      })
    }
  }
}
</script>
