import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./../views/Main'),
    children: [
      {
        path: '',
        component: () => import('./../views/Twitter'),
        children: [
          {
            path: '',
            name: 'tweets',
            component: () => import('./../views/Tweets')
          },
          {
            path: 'tweets/:tweetId' // component用Replies.vue
          },
          {
            path: ':userId/followers' // component用Followers.vue
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
