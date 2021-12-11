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
  },
  putUserEdit (userId, payload) {
    return apiHelper.put(`/users/${userId}`, payload)
  },
  getMessageHistory () {
    return apiHelper.get('/chats')
  }
}
