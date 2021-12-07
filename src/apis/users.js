import { apiHelper } from './../mixins/helpers'

export default {
  getUserProfile (userId) {
    return apiHelper.get(`/users/${userId}`)
  }
}
