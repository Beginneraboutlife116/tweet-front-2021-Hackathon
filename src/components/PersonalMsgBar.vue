<template>
  <div class="message-wrapper">
    <div class="message__avatar">
      <router-link to="">
        <img src="https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg" alt="" class="message__avatar-img">
      </router-link>
    </div>
    <section class="message__info">
      <div class="message__info-title">
        <p class="message__info-person">
          <span class="message__info-person--name">
            <router-link to="">
              Apple
            </router-link>
          </span>
          <span class="message__info-person--account">
            <router-link to="">
              @apple
            </router-link>
          </span>
        </p>
        <p class="message__info-timeStamp">5秒</p>
      </div>
      <p class="message__info-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, eos. Eaque perferendis provident velit soluta illum suscipit numquam quaerat laboriosam.
      </p>
    </section>
  </div>
</template>

<style lang="scss">
.message {
  &-wrapper {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
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
</style>
