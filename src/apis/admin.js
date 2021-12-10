import { apiHelper } from '../mixins/helpers'

export default {
  getUsers () {
    return apiHelper.get('/admin/users')
  },
  delete (tweetId) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  }
}
