import { apiHelper } from './../mixins/helpers'

export default {
  getTweets () {
    return apiHelper.get('/tweets')
  }
}
