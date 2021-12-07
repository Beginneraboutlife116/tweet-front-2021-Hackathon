import { apiHelper } from './../mixins/helpers'

export default {
  getReplies ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  }
}
