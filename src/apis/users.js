import { apiHelper } from './../mixins/helpers'

export default {
  getUserProfile (userId) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserProfileTweets (userId) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserProfileReplies (userId) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserProfileLikes (userId) {
    return apiHelper.get(`/users/${userId}/likes`)
  }
}
