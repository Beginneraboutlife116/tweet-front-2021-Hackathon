<template>
  <div v-if="!msg.status" class="chat-container">
    <div class="out" v-if="msg.User.id === currentUser.id">
      <div class="out__info">
        <p class="out__text"> {{msg.message}} </p>
        <p class="out__timeStamp"> {{msg.createdAt | absoluteTimeShort}} </p>
      </div>
      <div class="out__avatar">
        <router-link :to="{ name: 'profile-tweets', params: { userId: msg.User.id } }">
          <img
            :src="msg.User.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'"
            alt=""
            class="out__avatar-img"
          />
        </router-link>
      </div>
    </div>
    <div class="in" v-else>
      <div class="in__avatar">
        <router-link :to="{ name: 'profile-tweets', params: { userId: msg.User.id } }">
          <img :src="msg.User.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'" alt="" class="in__avatar-img">
        </router-link>
      </div>
      <div class="in__info">
        <p class="in__text"> {{msg.message}} </p>
        <p class="in__timeStamp"> {{msg.createdAt | absoluteTimeShort}} </p>
      </div>
    </div>
  </div>
  <div class="noti" v-else>
    <span class="noti__name"> {{msg.name}} </span>
    <span class="noti__action"> {{ msg.status === 'on' ? '上線' : '離線' }} </span>
  </div>
</template>

<script>
import { fromNowFilter } from './../mixins/helpers'

export default {
  name: 'chat',
  mixins: [fromNowFilter],
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  }
}
</script>

<style lang="scss">
.chat-container {
  width: 100%;
}
.in,
.out {
  display: flex;
  align-items: end;
  width: max-content;
  height: max-content;
  gap: 1rem;
  transform: rotate(180deg);
  margin-top: 1rem;
  margin-bottom: 3rem;
  &__avatar {
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    &-img {
      width: 4rem;
      height: 4rem;
      object-fit: cover;
    }
  }
  &__info {
    position: relative;
  }
  &__text {
    background-color: var(--main-color);
    padding: 1rem 1.5rem;
    border-radius: 99em 99em 0em 99em;
    color: white;
    max-width: 50rem;
  }
  &__timeStamp {
    position: absolute;
    top: 105%;
    right: 0;
    font-size: $font-xs;
    line-height: $font-xs;
    color: var(--label-color);
    width: max-content;
  }
}

.in {
  margin-left: auto;
  &__text {
    background-color: var(--border-color);
    padding: 1rem 1.5rem;
    border-radius: 99em 99em 99em 0;
    color: var(--font-color);
  }
  &__timeStamp {
    left: 0;
  }
}

.noti {
  background-color: #e5e5e5;
  width: max-content;
  padding: 0.7rem 1.4rem;
  border-radius: 99em;
  color: var(--label-color);
  transform: rotate(180deg);
  &__name {
    margin-right: 0.3rem;
  }
}
</style>
