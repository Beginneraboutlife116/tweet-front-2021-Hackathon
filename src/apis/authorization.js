import { apiHelper } from './../mixins/helpers'

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  },
  signUp ({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      name,
      email,
      password,
      checkPassword
    })
  }
}
