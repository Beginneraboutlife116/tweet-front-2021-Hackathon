import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
