import { apiHelper } from './../mixins/helpers'

export default {
  delete (tweetId) {
    return apiHelper.get(`/admin/tweets/${tweetId}`)
  }
}
