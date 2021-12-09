import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn'
import NotFound from './../views/NotFound'
import store from './../store'

Vue.use(VueRouter)

const authorizeIs = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'admin') {
    next({ name: 'not-found' })
    return
  } else if (currentUser && currentUser.role !== 'user') {
    next({ name: 'not-found' })
    return
  }
  next()
}

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
            component: () => import('./../views/Tweets'),
            beforeEnter: authorizeIs
          },
          {
            path: 'tweets/:tweetId',
            name: 'replies',
            component: () => import('./../views/Replies'),
            beforeEnter: authorizeIs
          },
          {
            path: ':userId/followers',
            name: 'followers',
            component: () => import('./../views/Followers'),
            beforeEnter: authorizeIs
          },
          {
            path: ':userId/followings',
            name: 'followings',
            component: () => import('./../views/Followings'),
            beforeEnter: authorizeIs
          },
          {
            path: ':userId',
            name: 'profile',
            redirect: ':userId/tweets',
            component: () => import('./../views/UserProfile'),
            beforeEnter: authorizeIs,
            children: [
              {
                path: 'tweets',
                name: 'profile-tweets',
                component: () => import('./../components/ProfileTweets'),
                beforeEnter: authorizeIs
              },
              {
                path: 'replies',
                name: 'profile-replies',
                component: () => import('./../components/ProfileReplies'),
                beforeEnter: authorizeIs
              },
              {
                path: 'likes',
                name: 'profile-likes',
                component: () => import('./../components/ProfileLikes'),
                beforeEnter: authorizeIs
              }
            ]
          }
        ]
      },
      {
        path: ':userId/setting',
        name: 'setting',
        component: () => import('./../views/Setting'),
        beforeEnter: authorizeIs
      },
      {
        path: '/admin/tweets',
        name: 'admin-tweets',
        component: () => import('./../views/AdminTweets'),
        beforeEnter: authorizeIs
      },
      {
        path: '/admin/users',
        name: 'admin-users',
        component: () => import('./../views/AdminUsers'),
        beforeEnter: authorizeIs
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

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  const userIdInLocalStorage = localStorage.getItem('userId')
  const userIdInStore = store.state.currentUser.id
  let isAuthenticated = store.state.isAuthenticated

  if (tokenInLocalStorage && (tokenInLocalStorage !== tokenInStore || userIdInLocalStorage !== userIdInStore)) {
    if (store.state.currentUser.role === 'admin') {
      isAuthenticated = await store.dispatch('fetchRootUser')
    }
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  const pathWithoutAuthentication = ['sign-in', 'sign-up', 'admin-sign-in']

  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    store.state.currentUser.role === 'user' ? next({ name: 'home' }) : next({ name: 'admin-tweets' })
    return
  }

  next()
})

export default router
