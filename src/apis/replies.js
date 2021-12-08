import { apiHelper } from './../mixins/helpers'

export default {
  getReplies ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  postReplyUnderTweet ({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, {
      tweetId,
      comment
    })
  }
}
