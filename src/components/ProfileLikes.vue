<template>
  <div>
   <Tweet v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
  </div>
</template>

<script>
import Tweet from './../components/Tweet'
const dummyData = {
  tweetLikes: [
    {
      tweet: {
        id: 1,
        description: '123123123',
        createdAt: '2021-12-02T16:44:25.000Z',
        User: {
          id: 1,
          account: 'account',
          name: 'name',
          avatar: null
        },
        likeCounts: 5,
        replyCounts: 3
      }
    },
    {
      tweet: {
        id: 2,
        description: '123123123',
        createdAt: '2021-12-02T16:44:25.000Z',
        User: {
          id: 2,
          account: 'account',
          name: 'name',
          avatar: null
        },
        likeCounts: 2,
        replyCounts: 3
      }
    }
  ]
}
export default {
  name: 'profile-likes',
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
      this.tweets = dummyData.tweetLikes.map((data) => {
        return {
          ...data.tweet,
          isLike: true
        }
      })
    }
  }
}
</script>
