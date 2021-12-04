<template>
  <div class="replies-container">
    <header class="user-header">
      <img src="" alt="" />
      <img src="" alt="" />
    </header>
    <Reply v-for="reply in replies" :key="reply.id" :initial-reply="reply" />
  </div>
</template>

<script>
import Reply from './../components/Reply'

const dummyData = {
  replies: [
    {
      id: 1,
      comment:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit amet',
      createdAt: '2011-12-02T16:44:25.000Z',
      user: {
        id: 11,
        name: 'name11',
        account: 'account11',
        avatar: null
      }
    },
    {
      id: 2,
      comment:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit amet',
      createdAt: '2011-12-02T16:44:25.000Z',
      user: {
        id: 22,
        name: 'name22',
        account: 'account22',
        avatar: null
      }
    },
    {
      id: 3,
      comment:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit amet',
      createdAt: '2011-12-02T16:44:25.000Z',
      user: {
        id: 33,
        name: 'name33',
        account: 'account33',
        avatar: null
      }
    }
  ]
}

export default {
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

<style lang="scss">
.replies-container {
  grid-column: 1;
  height: 100vh;
  border-inline: 1px solid var(--border-color);
  overflow: scroll;
}
</style>
