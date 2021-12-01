import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: () => import('./../views/Main'),
    children: [
      {
        path: '',
        component: () => import('./../views/Tweets')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
