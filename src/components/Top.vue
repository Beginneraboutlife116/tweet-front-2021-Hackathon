<template>
  <section class="top-container">
    <main class="top">
      <header class="top__header">
        <p class="top__header-title">Popular</p>
      </header>
      <div class="top__user" v-for="top in tops" :key="top.id">
        <router-link :to="`/home/${top.id}`">
          <div class="top__user-avatar">
            <img :src="top.avatar" class="top__user-avatar--img">
          </div>
        </router-link>
        <div class="top__user-info">
          <div>
            <router-link :to="`/home/${top.id}`">
              <p class="top__user-info--name"> {{top.name}} </p>
            </router-link>
            <router-link :to="`/home/${top.id}`">
              <p class="top__user-info--account"> @{{top.account}} </p>
            </router-link>
          </div>
          <button v-if="top.id !== currentUser.id" class="top__user-info--follow" :class="{active: top.isFollowing, disabled: top.isProcessing}" :disabled="top.isProcessing" @click.stop.prevent="top.isFollowing ? cancelFollow(top.id) : addFollow(top.id)"> {{top.isFollowing ? '正在跟隨' : '跟隨'}} </button>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { Toast } from './../mixins/helpers'
import followshipsAPI from '../apis/followships'
import { mapState } from 'vuex'

export default {
  name: 'Top',
  data () {
    return {
      tops: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchTops () {
      try {
        const { data } = await followshipsAPI.getTopFollow()
        this.tops = data.results.map(data => {
          return {
            ...data,
            name: data.name || 'NoName',
            avatar: data.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg',
            isProcessing: false
          }
        })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法讀取到熱門使用者資訊，請稍後再試'
        })
      }
    },
    toggleProcessing (id) {
      this.tops = this.tops.map(top => {
        if (top.id === id) {
          return {
            ...top,
            isProcessing: !top.isProcessing
          }
        } else {
          return {
            ...top
          }
        }
      })
    },
    async addFollow (id) {
      try {
        this.toggleProcessing(id)
        const { data } = await followshipsAPI.addFollow(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tops = this.tops.map(top => {
          if (top.id === id) {
            return {
              ...top,
              isFollowing: true,
              isProcessing: !top.isProcessing
            }
          } else {
            return {
              ...top
            }
          }
        })
        Toast.fire({
          icon: 'success',
          title: '跟隨成功！'
        })
      } catch (err) {
        this.toggleProcessing(id)
        Toast.fire({
          icon: 'error',
          title: '無法跟隨或取消跟隨該使用者，請稍後再試'
        })
      }
    },
    async cancelFollow (id) {
      try {
        this.toggleProcessing(id)
        const { data } = await followshipsAPI.cancelFollow(id)
        this.tops = this.tops.map(top => {
          if (top.id === id) {
            return {
              ...top,
              isFollowing: false,
              isProcessing: !top.isProcessing
            }
          } else {
            return {
              ...top
            }
          }
        })
        Toast.fire({
          icon: 'success',
          title: `${data.message}!`
        })
      } catch (err) {
        this.toggleProcessing(id)
        Toast.fire({
          icon: 'error',
          title: '無法跟隨或取消跟隨該使用者，請稍後再試'
        })
      }
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
      overflow: hidden;
      &--img {
        object-fit: cover;
        object-position: center;
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
