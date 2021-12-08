<template>
  <div class="follow">
    <!-- 點擊回文中使用者頭像/name/account時，能到profile頁 -->
    <router-link :to="`/home/${follow.followingId}`" class="follow__avatar">
      <img
        class="follow__avatar--img"
        :src="
          follow.avatar ||
          'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
        "
        alt="avatar"
        aria-label="avatar"
      />
    </router-link>
    <div class="follow__info">
      <div class="follow__info-followship">
        <!-- 點擊回文中使用者頭像/name/account時，能到profile頁 -->
        <router-link :to="`/home/${follow.followingId}`">
          <p class="name">{{ follow.name || "NoName" }}</p>
          <p class="account">@{{ follow.account }}</p>
        </router-link>
      </div>
      <p class="follow__info-description">
        {{ follow.introduction || "（作者目前還沒有自我介紹內容）" }}
      </p>
    </div>
    <button
      @click.stop.prevent="toggleFollow(follow.followingId)"
      :class="{ active: follow.isFollowing }"
      :disabled="currentUser.id === follow.followingId || currentUser.id === follow.followerId"
    >
      {{ follow.isFollowing ? "正在跟隨" : "跟隨" }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Followship',
  props: {
    initialFollow: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      follow: {
        followingId: 20,
        account: 'user2',
        name: 'user2',
        avatar: null,
        introduction: null,
        isFollowing: false
      }
    }
  },
  created () {
    this.fetchFollow()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchFollow () {
      this.follow = {
        ...this.initialFollow
      }
      console.log(this.follow)
    },
    toggleFollow (userId) {
      // TODO: 將資料傳給後端
      this.follow = {
        ...this.follow,
        isFollowing: !this.follow.isFollowing
      }
    }
  },
  watch: {
    initialFollow (newValue) {
      this.follow = {
        ...this.follow,
        ...newValue
      }
    }
  }
}
</script>

<style lang="scss">
.follow {
  position: relative;
  display: flex;
  padding: 1rem 1rem 0rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  &__avatar {
    margin-top: 0.3rem;
    margin-right: 1rem;
    img {
      max-width: 5rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &__info {
    &-followship {
      margin: 0.4rem 0 0.5rem 0;
      font-size: $font-md;
      line-height: $font-md;
      .name {
        margin-right: 0.5rem;
        font-weight: bold;
        color: var(--font-color);
      }
      .account {
        margin: 0.5rem 0;
        color: var(--label-color);
      }
    }
    &-description {
      margin-bottom: 1rem;
      font-size: $font-md;
      color: var(--font-color);
    }
  }
  button {
    @extend %buttonStyle;
    position: absolute;
    right: 1.5rem;
    cursor: pointer;
    height: 2.5rem;
    width: 9rem;
    font-size: $font-md;
    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
