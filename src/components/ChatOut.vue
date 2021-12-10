<template>
  <div class="out">
    <div class="out__info">
      <p class="out__text">安安你好</p>
      <p class="out__timeStamp">時間</p>
    </div>
    <div class="out__avatar">
      <img src="https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg" alt="" class="out__avatar-img">
    </div>
  </div>
</template>

<style lang="scss">
.out {
  display: flex;
  align-items: end;
  width: max-content;
  height: max-content;
  gap: 1rem;
  margin-left: auto;
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
    background-color: var(--main-color);
    padding: 1rem 1.5rem;
    border-radius: 99em 99em 0 99em;
    color: white;
  }
  &__timeStamp {
    position: absolute;
    top: 105%;
    right: 0;
    font-size: $font-xs;
    line-height: $font-xs;
    color: var(--label-color);
  }
}
</style>
