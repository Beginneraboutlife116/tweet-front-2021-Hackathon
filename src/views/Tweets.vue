<template>
  <div class="tweets-container">
    <header class="user-header">
      <img src="" alt="" />
    </header>
    <Tweet v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
  </div>
</template>

<script>
import Tweet from './../components/Tweet'

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
  components: {
    Tweet
  },
  data () {
    return {
      tweets: []
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    fetchTweets () {
      this.tweets = dummyData.tweets.map((data) => {
        return {
          ...data
        }
      })
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
</style>
