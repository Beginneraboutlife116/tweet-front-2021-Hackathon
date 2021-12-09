import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn'
import NotFound from './../views/NotFound'

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
    path: '/signup',
    name: 'sign-up',
    component: () => import('./../views/SignUp')
  },
  {
    path: '/home',
    component: () => import('./../views/Main'),
    children: [
      {
        path: '',
        component: () => import('./../views/Twitter'),
        children: [
          {
            path: '',
            name: 'home',
            component: () => import('./../views/Tweets')
          },
          {
            path: 'tweets/:tweetId', // component用Replies.vue
            name: 'replies',
            component: () => import('./../views/Replies')
          },
          {
            path: ':userId/followers', // component用Followers.vue
            name: 'followers',
            component: () => import('./../views/Followers')
          },
          {
            path: ':userId/followings', // component用Followers.vue
            name: 'followings',
            component: () => import('./../views/Followings')
          },
          {
            path: ':userId', // component用userProfile.vue
            name: 'profile',
            redirect: ':userId/tweets',
            component: () => import('./../views/UserProfile'),
            children: [
              {
                path: 'tweets',
                name: 'profile-tweets',
                component: () => import('./../components/ProfileTweets')
              },
              {
                path: 'replies',
                name: 'profile-replies',
                component: () => import('./../components/ProfileReplies')
              },
              {
                path: 'likes',
                name: 'profile-likes',
                component: () => import('./../components/ProfileLikes')
              }
            ]
          }
        ]
      },
      {
        path: ':userId/setting',
        name: 'setting',
        component: () => import('./../views/Setting')
      },
      {
        path: '/admin/tweets',
        name: 'admin-tweets',
        component: () => import('./../views/AdminTweets')
      }
    ]
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: () => import('./../views/SignIn')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
