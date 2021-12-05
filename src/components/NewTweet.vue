<template>
  <div class="modal-container" v-if="modal">
    <div class="modal">
      <header class="modal__header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="modal__header-delete" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4139 11.9999L19.2069 6.20687C19.5969 5.81687 19.5969 5.18388 19.2069 4.79288C18.8169 4.40188 18.1839 4.40288 17.7929 4.79288L11.9999 10.5859L6.20687 4.79288C5.81687 4.40288 5.18388 4.40288 4.79288 4.79288C4.40188 5.18288 4.40288 5.81587 4.79288 6.20687L10.5859 11.9999L4.79288 17.7929C4.40288 18.1829 4.40288 18.8159 4.79288 19.2069C4.98788 19.4019 5.24287 19.4999 5.49987 19.4999C5.75687 19.4999 6.01187 19.4019 6.20687 19.2069L11.9999 13.4139L17.7929 19.2069C17.9879 19.4019 18.2429 19.4999 18.4999 19.4999C18.7569 19.4999 19.0119 19.4019 19.2069 19.2069C19.5969 18.8169 19.5969 18.1839 19.2069 17.7929L13.4139 11.9999Z" fill="#FF6600"/>
        </svg>
      </header>
      <main class="modal__body">
        <div class="modal__postBy" v-if="!(modal === 'tweet')">
          <div class="modal__postBy-avatar">
            <router-link to=""><img src="https://fakeimg.pl/300/" alt="" class="modal__postBy-avatar--img"></router-link>
          </div>
          <div class="modal__postBy-detail">
            <p class="modal__postBy-detail-info">
              <span class="modal__postBy-detail-info--name"><router-link to="">Apple</router-link></span>
              <span class="modal__postBy-detail-info--account"><router-link to="">@apple</router-link></span>
              ・<span class="modal__postBy-detail-info--createdAt">asd</span>
            </p>
            <article class="modal__postBy-detail--content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa repudiandae est quia impedit odio non! Est eligendi dolore obcaecati itaque!
            </article>
            <p class="modal__postBy-detail-replyTo">
              <span>回覆給</span>
              <router-link to="">
                <span class="modal__postBy-detail-replyTo--account">@apple</span>
              </router-link>
            </p>
          </div>
        </div>
        <div class="modal__user">
          <div class="modal__user-avatar">
            <router-link to=""><img src="https://fakeimg.pl/300/" alt="" class="modal__user-avatar--img"></router-link>
          </div>
          <div class="modal__user-reply">
            <textarea class="modal__user-reply--textarea" v-model.trim="text" :placeholder="true ? '有什麼新鮮事？' : '推你的回覆'" rows="5"/>
          </div>
        </div>
      </main>
      <footer class="modal__footer">
        <span class="modal__footer-error">內容不可留白</span>
        <span class="modal__footer-error">字數不可超過140字</span>
        <button class="modal__footer-submit active">回覆</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewTweet',
  props: {
    modal: {
      types: String
    }
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="scss">
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0, 0, 40%);
  z-index: 99;
}

.modal {
  width: calc(600 / 1440 * 100%);
  min-height: 30rem;
  margin: 5.4rem auto;
  background-color: #fff;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  &__header {
    height: 5.3rem;
    border-bottom: 1px solid var(--border-color);
    padding: 1.5rem 0 1.5rem 1.5rem;
  }
  &__body {
    padding: 1.5rem;
  }
  &__postBy {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    &-avatar {
      max-width: 5rem;
      aspect-ratio: 1;
      border-radius: 50%;
      position: relative;
      &--img {
        border-radius: 50%;
      }
      &::after {
        content: '';
        display: block;
        width: 0.2rem;
        height: calc(100% - 5.5rem);
        background-color: var(--line-color);
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &-detail {
      flex: 1;
      padding-bottom: 1rem;
      &-info {
        margin-bottom: 0.6rem;
        font-size: $font-md;
        line-height: $font-md;
        color: var(--label-color);
        &--name .router-link-exact-active {
          color: var(--font-color);
          font-weight: bold;
          margin-right: 0.5rem;
        }
        &--account .router-link-exact-active {
          color: var(--label-color);
          margin-right: -0.5rem;
        }
      }
      &--content {
        margin-bottom: 1.5rem;
      }
      &-replyTo {
        font-size: $font-xs;
        line-height: $font-xs;
        color: var(--label-color);
        & span {
          margin-right: 0.2rem;
        }
      }
    }
  }
  &__user {
    display: flex;
    gap: 1rem;
    &-avatar {
      max-width: 5rem;
      aspect-ratio: 1;
      border-radius: 50%;
      &--img {
        border-radius: 50%;
      }
    }
    &-reply {
      flex: 1;
      margin-top: 1.2rem;
      &--textarea {
        width: 100%;
        resize: none;
        border: none;
        font-size: $font-lg;
        line-height: 2.6rem;
        font-weight: normal;
      }
    }
  }
  &__footer {
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    text-align: right;
    &-error {
      font-size: $font-md;
      line-height: $font-md;
      color: var(--error-color);
    }
    &-submit {
      @extend %buttonStyle;
      padding: 0.8rem 1.5rem;
      margin-left: 2rem;
    }
  }
}
</style>
