<template>
  <div class="in">
    <div class="in__avatar">
      <img src="https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg" alt="" class="in__avatar-img">
    </div>
    <div class="in__info">
      <p class="in__text">我先離開了唷</p>
      <p class="in__timeStamp">時間</p>
    </div>
  </div>
</template>

<style lang="scss">
.in {
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
  }
  &__timeStamp {
    position: absolute;
    top: 105%;
    left: 0;
    font-size: $font-xs;
    line-height: $font-xs;
    color: var(--label-color);
  }
}
</style>
