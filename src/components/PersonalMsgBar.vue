<template>
  <div class="message-wrapper" @click.stop.prevent="$emit('check-this-message', initialRoom.roomId)" :class="{selected: initialRoom.isSelected}">
    <div class="message__avatar">
      <router-link :to="{name: 'profile-tweets', params: {userId: initialRoom.userId} }">
        <img :src="initialRoom.userAvatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'" alt="" class="message__avatar-img">
      </router-link>
    </div>
    <section class="message__info">
      <div class="message__info-title">
        <p class="message__info-person">
          <span class="message__info-person--name">
            <router-link :to="{name: 'profile-tweets', params: {userId: initialRoom.userId} }">
              {{ initialRoom.userName }}
            </router-link>
          </span>
          <span class="message__info-person--account">
            <router-link :to="{name: 'profile-tweets', params: {userId: initialRoom.userId} }">
              @{{ initialRoom.userAccount }}
            </router-link>
          </span>
        </p>
        <p class="message__info-timeStamp"> {{ initialRoom.userTimeStamp | fromNow }} </p>
      </div>
      <p class="message__info-text">
        {{ initialRoom.newMsg }}
      </p>
    </section>
  </div>
</template>

<script>
import { fromNowFilter } from './../mixins/helpers'
export default {
  name: 'Personal-message-bar',
  mixins: [fromNowFilter],
  props: {
    initialRoom: {
      type: Object,
      required: true
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
    &:hover {
      box-shadow: inset 0px 0px 3px 2px hsla(24, 100%, 50%, 0.25);
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
</style>
