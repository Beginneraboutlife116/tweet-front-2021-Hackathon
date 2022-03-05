import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn'
import NotFound from './../views/NotFound'
import store from './../store'
import { Toast } from './../mixins/helpers'

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
  // ? 可以在這邊去做到傳送'SUBSCRIBE_TO_ALL_ROOM'嗎？我要怎麼使用socket.emit？
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
            path: ':userId/notifications',
            name: 'notifications',
            component: () => import('./../views/Notifications'),
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
        path: ':userId/public',
        name: 'public',
        component: () => import('./../views/ChatRoom.vue'),
        beforeEnter: authorizeIsUser
      },
      {
        path: ':userId/private',
        name: 'private',
        component: () => import('./../views/PersonalMsg'),
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
  let isAuthenticated = store.state.isAuthenticated
  let userIdInStore = store.state.currentUser.id.toString() || ''

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    if (!isAuthenticated && userIdInLocalStorage === '60') {
      isAuthenticated = await store.dispatch('fetchRootUser')
    } else {
      isAuthenticated = await store.dispatch('fetchCurrentUser')
      if (isAuthenticated) {
        userIdInStore = store.state.currentUser.id.toString()
        if (userIdInLocalStorage !== userIdInStore) {
          isAuthenticated = false
        }
      }
    }
  } else if (tokenInLocalStorage && userIdInLocalStorage !== userIdInStore) {
    Toast.fire({
      icon: 'error',
      title: '發現到使用者id不同，請再次登入驗證'
    })
    isAuthenticated = false
  }

  const pathWithoutAuthentication = ['sign-in', 'sign-up', 'admin-sign-in']

  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    store.commit('revokeAuthentication')
    next('/signin')
    return
  }

  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    store.state.currentUser.role === 'user' ? next('/home') : next('/admin/tweets')
    return
  }

  next()
})

export default router
