<template>
  <div class="message-wrapper" @click.stop.prevent="$emit('check-this-message', initialRoom.room)" :class="{selected: initialRoom.isSelected}">
    <IconErrorNoti class="new-message" v-if="isShowNoti"/>
    <div class="message__avatar">
      <router-link :to="{name: 'profile-tweets', params: {userId: initialRoom.User.id} }">
        <img :src="initialRoom.User.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'" alt="" class="message__avatar-img">
      </router-link>
    </div>
    <section class="message__info">
      <div class="message__info-title">
        <p class="message__info-person">
          <span class="message__info-person--name">
            <router-link :to="{name: 'profile-tweets', params: {userId: initialRoom.User.id} }">
              {{ initialRoom.User.name }}
            </router-link>
          </span>
          <span class="message__info-person--account">
            <router-link :to="{name: 'profile-tweets', params: {userId: initialRoom.User.id} }">
              @{{ initialRoom.User.account }}
            </router-link>
          </span>
        </p>
        <p class="message__info-timeStamp"> {{ initialRoom.createdAt | fromNow }} </p>
      </div>
      <p class="message__info-text">
        {{ initialRoom.message }}
      </p>
    </section>
  </div>
</template>

<script>
import { fromNowFilter } from './../mixins/helpers'
import IconErrorNoti from './../components/icons/IconErrorNoti.vue'
export default {
  name: 'Personal-message-bar',
  components: {
    IconErrorNoti
  },
  mixins: [fromNowFilter],
  props: {
    initialRoom: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    isShowNoti () {
      return !this.initialRoom.isRead && this.initialRoom.userId === this.currentUser.id
    }
  }
}
</script>

<style lang="scss">
.message {
  &-wrapper {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    position: relative;
    transition: transform 300ms ease-in-out;
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0;
      box-shadow: 0 0 15px 0px hsla(24, 100%, 50%, 0.25);
      transition: opacity 300ms ease-in-out;
    }
    &:hover::after {
      opacity: 1;
      z-index: 1;
    }
    &:hover {
      transform: scale(1.01);
    }
  }
  &__avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    &-img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
    }
  }
  &__info {
    flex: 1;
    &-title {
      display: flex;
      justify-content: space-between;
    }
    &-person {
      &--name {
        font-size: $font-md;
        font-weight: 700;
        margin-right: 0.5rem;
        & a {
          color: var(--font-color);
        }
      }
      &--account {
        font-size: $font-md;
        color: var(--label-color);
        & a {
          color: var(--label-color);
        }
      }
    }
    &-timeStamp {
      font-size: $font-md;
      color: var(--label-color);
    }
    &-text {
      width: 100%;
      height: $font-xxl;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

.selected {
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    background: var(--main-color);
    top: 0;
    right: 0;
  }
}

.new-message {
  position: absolute;
  inset: 0 auto auto 0;
  transform: translate(-10px, -10px);
  & > circle {
    fill: none;
  }
}
</style>
