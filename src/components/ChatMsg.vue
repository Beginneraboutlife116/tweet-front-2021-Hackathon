<template>
  <div v-if="!msg.status">
    <div class="out" v-if="msg.id === currentUser.id">
      <div class="out__info">
        <p class="out__text"> {{msg.message}} </p>
        <p class="out__timeStamp"> {{msg.timeStamp | absoluteTimeShort}} </p>
      </div>
      <div class="out__avatar">
        <img
          :src="msg.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'"
          alt=""
          class="out__avatar-img"
        />
      </div>
    </div>
    <div class="in" v-else>
      <div class="in__avatar">
        <img :src="msg.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'" alt="" class="in__avatar-img">
      </div>
      <div class="in__info">
        <p class="in__text"> {{msg.message}} </p>
        <p class="in__timeStamp"> {{msg.timeStamp | absoluteTimeShort}} </p>
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
.in,
.out {
  display: flex;
  align-items: end;
  width: max-content;
  height: max-content;
  gap: 1rem;
  &__avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    &-img {
      border-radius: 50%;
    }
  }
  &__info {
    position: relative;
  }
  &__text {
    background-color: var(--border-color);
    padding: 1rem 1.5rem;
    border-radius: 99em 99em 99em 0;
    color: var(--font-color);
    max-width: 65rem;
  }
  &__timeStamp {
    position: absolute;
    top: 105%;
    left: 0;
    font-size: $font-xs;
    line-height: $font-xs;
    color: var(--label-color);
    width: max-content;
  }
}

.out {
  margin-left: auto;
  &__text {
    background-color: var(--main-color);
    padding: 1rem 1.5rem;
    border-radius: 99em 99em 0 99em;
    color: white;
  }
}

.noti {
  background-color: #e5e5e5;
  width: max-content;
  padding: 0.7rem 1.4rem;
  border-radius: 99em;
  color: var(--label-color);
  &__name {
    margin-right: 0.3rem;
  }
}
</style>
