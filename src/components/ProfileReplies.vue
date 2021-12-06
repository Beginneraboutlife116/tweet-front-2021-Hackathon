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
      created_at: '2021-12-02T16:44:25.000Z',
      tweet: {
        id: 1
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
        return {
          ...data

        }
      })
    }
  }
}
</script>
