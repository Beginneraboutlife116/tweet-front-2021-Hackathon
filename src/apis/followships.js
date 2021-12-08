import { apiHelper } from '../mixins/helpers'

export default {
  getFollowings (userId) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers (userId) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getTopFollow () {
    return apiHelper.get('/followships/top')
  },
  addFollow (id) {
    return apiHelper.post('/followships', { id })
  },
  cancelFollow (id) {
    return apiHelper.delete(`/followships/${id}`)
  }
}
