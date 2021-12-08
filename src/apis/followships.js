import { apiHelper } from './../mixins/helpers'

export default {
  getFollowings (userId) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers (userId) {
    return apiHelper.get(`/users/${userId}/followers`)
  }
}
