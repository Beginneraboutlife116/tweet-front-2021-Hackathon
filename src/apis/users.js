import { apiHelper } from './../mixins/helpers'

export default {
  getUserProfile () {
    return apiHelper.get('/users/10')
  }
}
