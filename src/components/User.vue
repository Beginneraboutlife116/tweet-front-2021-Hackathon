<template>
  <div class="user">
    <div class="user__avatar">
      <router-link :to="{name: 'profile-tweets', params: { userId: user.id } }">
        <img :src="user.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'" alt="" class="user__avatar-img">
      </router-link>
    </div>
    <p class="user__info">
      <span class="user__info-name">
        <router-link :to="{name: 'profile-tweets', params: { userId: user.id } }">
          {{user.name}}
        </router-link>
      </span>
      <span class="user__info-account">
        <router-link :to="{name: 'profile-tweets', params: { userId: user.id } }">
          @{{user.account}}
        </router-link>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.user {
  display: flex;
  padding: 1rem 0 1.5rem 1.5rem;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  &__avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    &-img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
    }
  }
  &__info {
    &-name {
      font-size: $font-md;
      font-weight: bold;
      margin-right: 0.5rem;
      & a {
        color: var(--font-color);
      }
    }
    &-account {
      color: var(--label-color);
      & a {
        color: var(--label-color)
      }
    }
  }
}
</style>
