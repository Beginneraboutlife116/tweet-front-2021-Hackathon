<template>
  <nav class="sidebar">
    <router-link :to="{ name: 'home' }">
      <img
        src="@/assets/icons/Logo.svg"
        class="sidebar__logo"
        alt="logo"
        aria-label="logo"
      />
    </router-link>
    <template v-if="currentUser.role === 'user'">
      <router-link v-for="link in userLinks" :key="link.id" :to="link.route">
        <ul>
          <li class="sidebar__link">
            <img
              src="@/assets/icons/side_home.svg"
              :alt="link.title"
              :aria-label="link.title"
            />
            <p>{{ link.name }}</p>
          </li>
        </ul>
      </router-link>
    </template>
    <template v-else>
      <router-link
        v-for="link in adminLinks"
        :key="link.id"
        :to="{ name: 'home' }"
      >
        <ul>
          <li class="sidebar__link">
            <img
              src="@/assets/icons/side_user.svg"
              :alt="link.title"
              :aria-label="link.title"
            />
            <p>{{ link.name }}</p>
          </li>
        </ul>
      </router-link>
    </template>
    <button class="sidebar__button" @click.stop.prevent="createTweet">
      推文
    </button>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
const data = {
  userLinks: [
    {
      id: 1,
      name: '首頁',
      title: 'home',
      route: '/home',
      icon: '@/assets/icons/side_home.svg'
    },
    {
      id: 2,
      name: '個人資料',
      title: 'profile',
      route: '/profile',
      icon: '@/assets/icons/side_user.svg'
    },
    {
      id: 3,
      name: '設定',
      title: 'setting',
      route: '/setting',
      icon: '@/assets/icons/side_cog.svg'
    }
  ],
  adminLinks: [
    {
      id: 1,
      name: '推文清單',
      title: 'adminTweets',
      route: '/admin/tweets',
      icon: '@/assets/icons/side_home.svg'
    },
    {
      id: 2,
      name: '使用者列表',
      title: 'adminUsers',
      route: '/admin/users',
      icon: '@/assets/icons/side_user.svg'
    }
  ]
}

export default {
  name: 'Sidebar',
  data () {
    return {
      userLinks: [],
      adminLinks: []
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    fetchCategories () {
      this.userLinks = data.userLinks
      this.adminLinks = data.adminLinks
    },
    createTweet () {
      // 將v-model設置true 顯示新推文modal
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
<style lang="scss">
.router-link-exact-active {
  ul{
    li{
      p{
        color: var(--main-color);
      }
    }
  }
}

.sidebar {
  padding: 0 1rem;
  width: 26.25%;
  font-size: $font-lg;
  .sidebar__logo {
    margin: 1rem 0 2rem 1rem;
  }
  a {
    text-decoration: none;
    .sidebar__link {
      height: 5.6rem;
      display: flex;
      align-items: center;
      padding: 1.5rem 0 1.5rem 1rem;
      img {
        height: 2.2rem;
        padding: 0 2rem 0 1rem;
        path {
          fill: var(--main-color);
        }
      }
    }
    p {
      font-weight: bold;
      color: var(--font-color);
      &:hover {
        color: var(--main-color);
      }
    }
  }
  .sidebar__button {
    height: 5.8rem;
    width: 100%;
    padding: 1rem 0;
  }
}
</style>
