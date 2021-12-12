<template>
  <div class="notification-container">
    <header class="notification__header">通知</header>
    <template>
      <div class="notification__wrapper">
        <div class="notification__avatar">
          <router-link to="/">
            <img src="https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg" alt="" class="notification__avatar-img">
          </router-link>
        </div>
        <p class="notification__info">
          John 有新的推文通知
        </p>
        <p class="notification__content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab laborum necessitatibus itaque at quas doloremque, omnis assumenda perspiciatis vero repellendus. Est magni soluta exercitationem neque impedit qui porro eius quos numquam modi provident, nobis, perspiciatis molestias. Facere cupiditate cum ipsum, est aspernatur voluptas ex vitae. Maiores aut vel repellendus nisi.
        </p>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.notification {
  &-container {
    border-inline: 1px solid var(--border-color);
  }
  &__header {
    padding: 1.5rem;
    font-size: $font-lg;
    font-weight: 700;
    border-bottom: 1px solid var(--border-color);
  }
  &__wrapper {
    padding: 1rem 7.5rem 1.5rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  &__avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 0.5rem;
    &-img {
      object-fit: cover;
    }
  }
  &__content {
    margin-top: 1rem;
    color: var(--label-color);
  }
}
</style>
