<template>
  <div class="sign-container">
    <div class="sign">
      <header class="sign__header">
        <div class="sign__header-logo">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.6996 23.4709C30.6996 23.4709 23.2328 35.5781 17.1109 35.5781C6.40314 35.5781 16.3821 12.5132 24.1916 12.5132C29.641 12.5132 30.6996 23.4709 30.6996 23.4709Z" fill="#FF6600"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.5723 38.6972C37.4451 40.9607 34.8198 42.6976 31.9044 43.7701C28.989 44.8426 25.8639 45.2213 22.7767 44.8761C19.6895 44.5309 16.7252 43.4713 14.1188 41.7813C11.5125 40.0914 9.33573 37.8175 7.76123 35.1401C9.5314 37.5477 12.5338 39.1527 16.803 39.1527C27.3199 39.1527 33.2899 30.98 33.2899 30.98C33.2899 30.98 33.8062 37.4392 39.5593 38.6972H39.5723Z" fill="#FF6600"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M42.7223 15.7451C44.2963 18.7527 45.0781 22.1116 44.9939 25.505C44.9096 28.8984 43.9621 32.2144 42.2407 35.1401C40.8792 34.3764 39.8725 33.1082 39.4379 31.609L37.1558 24.7724L42.7223 15.7451Z" fill="#FF6600"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0031 5.01737C30.0185 5.01403 34.8513 6.89881 38.5398 10.2967L34.7521 16.4088C33.3811 12.843 30.5957 9.2729 25.1767 9.2729C14.0784 9.2729 5.85231 21.3888 5.85231 28.9846C5.84986 29.9669 5.97528 30.9454 6.22543 31.8953C5.11558 28.8725 4.75205 25.6265 5.16572 22.4331C5.57938 19.2398 6.75802 16.1934 8.60147 13.5531C10.4449 10.9127 12.8987 8.75634 15.7542 7.26726C18.6097 5.77818 21.7826 5.00039 25.0031 5V5.01737Z" fill="#FF6600"/>
          </svg>
        </div>
        <p class="sign__header-title">建立你的帳號</p>
      </header>
      <form class="sign__form" @submit.prevent="handleSubmit">
        <label class="sign__form-row">
          <p class="sign__form-title">帳號</p>
          <input type="text" class="sign__form-input" v-model.trim="account" ref="account" required>
          <p class="sign__form-error">
            <span class="error" v-if="accountRepeat">帳號 已重複註冊！</span>
          </p>
        </label>
        <label class="sign__form-row">
          <p class="sign__form-title">名稱</p>
          <input type="text" class="sign__form-input" v-model.trim="name" :style="{borderColor: nameErrorHandler.borderColor}">
          <p class="sign__form-error">
            <span class="error" v-show="name.length" :style="{color: nameErrorHandler.color}"> {{ nameErrorHandler.text }} </span>
            <span class="limit" v-show="name.length"> {{name.length}} /50</span>
          </p>
        </label>
        <label class="sign__form-row">
          <p class="sign__form-title">Email</p>
          <input type="email" class="sign__form-input" v-model.trim="email" ref="email" required>
          <p class="sign__form-error">
            <span class="error" v-if="emailRepeat">Email 已重複註冊！</span>
          </p>
        </label>
        <label class="sign__form-row">
          <p class="sign__form-title">密碼</p>
          <input type="password" class="sign__form-input" v-model.trim="password" ref="password" required>
        </label>
        <label class="sign__form-row">
          <p class="sign__form-title">密碼確認</p>
          <input type="password" class="sign__form-input" v-model.trim="passwordConfirm" ref="passwordConfirm" required>
          <p class="sign__form-error">
            <span class="error" v-if="passwordError">確認密碼與密碼不符，請再試一次</span>
          </p>
        </label>
        <button class="sign__form-submit active" type="submit">註冊</button>
      </form>
      <div class="sign__btns">
        <router-link to="/signin" class="sign__btns-link">取消</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from './../mixins/helpers'

const dummyUser = {
  id: 3,
  account: 'user3',
  email: 'user3@example.com',
  password: '3',
  name: 'user3',
  role: 'user',
  createdAt: '2021-12-01T07:59:14.418Z',
  updatedAt: '2021-12-01T07:59:14.418Z'
}

export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      account: '',
      email: '',
      password: '',
      passwordConfirm: '',
      accountRepeat: false,
      emailRepeat: false,
      passwordError: false
    }
  },
  computed: {
    nameErrorHandler () {
      const nameError = {}
      nameError.borderColor = this.name.length > 50 ? '#fc5a5a' : ''
      nameError.color = this.name.length > 50 ? '#fc5a5a' : '#0099ff'
      nameError.text = this.name.length > 50 ? '字數超出上限！' : '字數正確'
      return nameError
    }
  },
  methods: {
    // TODO: 等API串接，再做相對應的流程設計
    handleSubmit () {
      if (!this.account) {
        Toast.fire({
          icon: 'warning',
          title: '帳號必填'
        })
        this.$refs.account.focus()
        this.$refs.account.style.borderColor = '#fc5a5a'
        return
      } else {
        this.$refs.account.style.borderColor = ''
      }

      if (this.name.length > 50) {
        this.name = this.name.slice(0, 50)
      }

      if (!this.email) {
        Toast.fire({
          icon: 'warning',
          title: 'Email必填'
        })
        this.$refs.email.focus()
        this.$refs.email.style.borderColor = '#fc5a5a'
        return
      } else {
        this.$refs.email.style.borderColor = ''
      }
      // TODO: 是否需要驗證email格式？
      if (!this.password) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入密碼'
        })
        this.$refs.password.focus()
        this.$refs.password.style.borderColor = '#fc5a5a'
        return
      } else {
        this.$refs.password.style.borderColor = ''
      }

      if (!this.passwordConfirm) {
        Toast.fire({
          icon: 'warning',
          title: '請再輸入一次密碼做確認'
        })
        this.$refs.passwordConfirm.focus()
        this.$refs.passwordConfirm.style.borderColor = '#fc5a5a'
        return
      } else {
        this.$refs.passwordConfirm.style.borderColor = ''
      }

      if (this.account === dummyUser.account) {
        Toast.fire({
          icon: 'error',
          title: '帳號已重複註冊！'
        })
        this.accountRepeat = true
        this.$refs.account.focus()
        this.$refs.account.style.borderColor = '#fc5a5a'
        return
      } else {
        this.accountRepeat = false
        this.$refs.account.style.borderColor = ''
      }

      if (this.email === dummyUser.email) {
        Toast.fire({
          icon: 'error',
          title: 'Email已重複註冊！'
        })
        this.emailRepeat = true
        this.$refs.email.focus()
        this.$refs.email.style.borderColor = '#fc5a5a'
        return
      } else {
        this.emailRepeat = false
        this.$refs.email.style.borderColor = ''
      }

      if (this.password !== this.passwordConfirm) {
        Toast.fire({
          icon: 'error',
          title: '密碼不相符，請再試一次'
        })
        this.passwordError = true
        this.$refs.passwordConfirm.focus()
        this.$refs.passwordConfirm.style.borderColor = '#fc5a5a'
        return
      }

      // TODO: 要傳送出去的
      console.log(`{
        account: ${this.account},
        name: ${this.name},
        email: ${this.email},
        password: ${this.password},
        passwordConfirm: ${this.passwordConfirm}
      }`)
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss">
.sign {
  width: calc( 540 / 1440 * 100%);
  margin: 6rem auto 0;
  &__header {
    margin-bottom: 4rem;
    &-logo {
      text-align: center;
      margin-bottom: 1.4rem;
    }
    &-title {
      text-align: center;
      font-size: $font-xxl;
      font-weight: bold;
      line-height: 3.3rem;
    }
  }
  &__form-submit,
  &__btns {
    font-size: $font-lg;
    line-height: $font-lg;
  }
  &__btns {
    margin-top: 2rem;
    text-align: center;
    color: var(--link-color);
    &-link {
      color: var(--link-color);
      text-decoration: underline;
      &:hover {
        color: var(--main-color);
      }
    }
  }
}

// TODO: 等SignIn的merge通過，就拿掉
.sign__form {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  &-row {
    background-color: var(--fill-color);
    position: relative;
  }
  &-title {
    padding: 0.5rem 0 0.6rem 1rem;
    font-size: $font-md;
    line-height: $font-md;
    color: var(--label-color);
  }
  &-input {
    all: unset;
    width: calc(100% - 1rem);
    cursor: text;
    padding-left: 1rem;
    border-radius: 0 0 4px 4px;
    border-bottom: 2px solid var(--label-color);
    &:hover,
    &:focus {
      border-color: var(--link-color);
    }
  }
  &-submit {
    @extend %buttonStyle;
    padding: 1rem 0;
    margin-top: 0.8rem;
  }
  &-error {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    bottom: -2rem;
    font-size: $font-md;
    line-height: $font-md;
    & .error {
      color: var(--error-color);
    }
  }
}
</style>
