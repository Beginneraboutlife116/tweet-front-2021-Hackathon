import { apiHelper } from './../mixins/helpers'

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  }
}
