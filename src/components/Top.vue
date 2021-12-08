<template>
  <section class="top-container">
    <main class="top">
      <header class="top__header">
        <p class="top__header-title">Popular</p>
      </header>
      <div class="top__user" v-for="top in tops" :key="top.id">
        <router-link :to="`/home/${top.id}`">
          <div class="top__user-avatar">
            <img :src="top.image" class="top__user-avatar--img">
          </div>
        </router-link>
        <div class="top__user-info">
          <div>
            <!-- route還沒設定，所以會失敗 -->
            <router-link :to="`/home/${top.id}`">
              <p class="top__user-info--name"> {{top.name}} </p>
            </router-link>
            <router-link :to="`/home/${top.id}`">
              <p class="top__user-info--account"> @{{top.account}} </p>
            </router-link>
          </div>
          <button class="top__user-info--follow" :class="{active: top.isFollowed}" @click.stop.prevent="toggleFollow(top.id)"> {{top.isFollowed ? '正在跟隨' : '跟隨'}} </button>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { Toast } from './../mixins/helpers'
import followshipsAPI from '../apis/followships'
const dummyData = [
  {
    id: 1,
    account: 'user1',
    name: 'user1',
    img: null,
    isFollowed: true
  },
  {
    id: 2,
    account: 'user2',
    name: 'user2',
    img: null,
    isFollowed: true
  },
  {
    id: 3,
    account: '',
    name: 'user3',
    img: null,
    isFollowed: false
  },
  {
    id: 4,
    account: 'user4',
    name: 'user4',
    img: null,
    isFollowed: false
  },
  {
    id: 5,
    account: '',
    name: 'user5',
    img: null,
    isFollowed: false
  },
  {
    id: 6,
    account: 'user6',
    name: 'user6',
    img: null,
    isFollowed: false
  },
  {
    id: 7,
    account: 'user7',
    name: 'user7',
    img: null,
    isFollowed: false
  },
  {
    id: 8,
    account: 'user8',
    name: 'user8',
    img: null,
    isFollowed: true
  },
  {
    id: 9,
    account: '',
    name: 'user9',
    img: null,
    isFollowed: true
  },
  {
    id: 10,
    account: 'user10',
    name: 'user10',
    img: null,
    isFollowed: true
  }
]

export default {
  name: 'Top',
  data () {
    return {
      tops: []
    }
  },
  methods: {
    async fetchTops () {
      // TODO: 與後端串接tops的資料
      try {
        const limit = 10
        const { data } = await followshipsAPI.getTopFollow({ limit })
        console.log(data)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法讀取到熱門使用者資訊，請稍後再試'
        })
        console.log(err)
      }
      this.tops = dummyData.map(data => {
        return {
          ...data,
          name: data.name || 'NoName',
          image: data.image || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
        }
      })
    },
    toggleFollow (userId) {
      // TODO: 將資料傳給後端
      this.tops = this.tops.map(top => {
        if (top.id === userId) {
          return {
            ...top,
            isFollowed: !top.isFollowed
          }
        }
        return {
          ...top
        }
      })
    }
  },
  created () {
    this.fetchTops()
  }
}
</script>

<style lang="scss">
.top-container {
  grid-column: 2;
  padding: 1.5rem 0 0 3rem;
}

.top {
  width: calc( 350 / 462 * 100% );
  border-radius: 1.4rem;
  background-color: var(--fill-color);
  box-shadow: 0 4px 4px 0 hsla(0, 0, 0, 25%);
  &__header {
    padding: 1rem 0 1rem 1.5rem;
    &-title {
      font-size: $font-lg;
      font-weight: bold;
    }
  }
  &__user {
    display: flex;
    height: 7rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border-color);
    &-avatar {
      max-width: 5rem;
      aspect-ratio: 1;
      border-radius: 50%;
      margin-right: 1rem;
      &--img {
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &-info {
      flex: 1 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &--name {
        color: var(--font-color);
        margin-bottom: 3px;
      }
      &--name:hover {
        color: var(--main-color);
      }
      &--name,
      &--account {
        font-size: $font-md;
        line-height: $font-md;
        font-weight: bold;
      }
      &--account {
        color: var(--label-color);
      }
      &--account:hover {
        color: var(--main-color);
      }
      &--follow {
        @extend %buttonStyle;
        padding: 1rem 1.5rem;
        font-size: $font-md;
        line-height: $font-md;
      }
    }
  }
}
</style>
