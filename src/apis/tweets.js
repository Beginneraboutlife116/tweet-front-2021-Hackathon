import { apiHelper } from './../mixins/helpers'

export default {
  getTweets () {
    return apiHelper.get('/tweets')
  },
  postTweets ({ description }) {
    return apiHelper.post('/tweets/', { description })
  }
}
