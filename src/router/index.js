import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn'
import NotFound from './../views/NotFound'
import store from './../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'admin') {
    next({ path: '/404', replace: true })
    return
  }
  next()
}

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'user') {
    next({ path: '/404', replace: true })
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
            beforeEnter: authorizeIsUser
          },
          {
            path: 'tweets/:tweetId',
            name: 'replies',
            component: () => import('./../views/Replies'),
            beforeEnter: authorizeIsUser
          },
          {
            path: ':userId/followers',
            name: 'followers',
            component: () => import('./../views/Followers'),
            beforeEnter: authorizeIsUser
          },
          {
            path: ':userId/followings',
            name: 'followings',
            component: () => import('./../views/Followings'),
            beforeEnter: authorizeIsUser
          },
          {
            path: ':userId',
            name: 'profile',
            redirect: ':userId/tweets',
            component: () => import('./../views/UserProfile'),
            children: [
              {
                path: 'tweets',
                name: 'profile-tweets',
                component: () => import('./../components/ProfileTweets'),
                beforeEnter: authorizeIsUser
              },
              {
                path: 'replies',
                name: 'profile-replies',
                component: () => import('./../components/ProfileReplies'),
                beforeEnter: authorizeIsUser
              },
              {
                path: 'likes',
                name: 'profile-likes',
                component: () => import('./../components/ProfileLikes'),
                beforeEnter: authorizeIsUser
              }
            ]
          }
        ]
      },
      {
        path: ':userId/setting',
        name: 'setting',
        component: () => import('./../views/Setting'),
        beforeEnter: authorizeIsUser
      },
      {
        path: '/admin/tweets',
        name: 'admin-tweets',
        component: () => import('./../views/AdminTweets'),
        beforeEnter: authorizeIsAdmin
      },
      {
        path: '/admin/users',
        name: 'admin-users',
        component: () => import('./../views/AdminUsers'),
        beforeEnter: authorizeIsAdmin
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
  const userIdInStore = store.state.currentUser.id.toString()
  let isAuthenticated = store.state.isAuthenticated

  const tokenCompareResult = tokenInLocalStorage !== tokenInStore
  const idCompareResult = userIdInLocalStorage !== userIdInStore

  if (tokenInLocalStorage && tokenCompareResult) {
    isAuthenticated = store.state.currentUser.role === 'admin' ? await store.dispatch('fetchRootUser') : await store.dispatch('fetchCurrentUser')
  }

  if (tokenInLocalStorage && idCompareResult) {
    isAuthenticated = store.state.currentUser.role === 'admin' ? await store.dispatch('fetchRootUser') : await store.dispatch('fetchCurrentUser')
  }

  const pathWithoutAuthentication = ['sign-in', 'sign-up', 'admin-sign-in']

  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    store.state.currentUser.role === 'admin' ? next('/admin/tweets') : next('/home')
    return
  }

  next()
})

export default router
