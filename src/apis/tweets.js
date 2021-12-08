import { apiHelper } from './../mixins/helpers'

export default {
  getTweets () {
    return apiHelper.get('/tweets')
  },
  postTweets ({ description }) {
    return apiHelper.post('/tweets/', { description })
  },
<<<<<<< HEAD
  postLike (tweetId) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  postUnlike (tweetId) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
=======
  getSingleTweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
>>>>>>> main
  }
}
