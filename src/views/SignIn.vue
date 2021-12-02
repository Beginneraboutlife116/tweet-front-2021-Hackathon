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
        <p class="sign__header-title"><span>登入</span><span>Alphitter</span></p>
      </header>
      <form class="sign__form" @submit.prevent="handleSubmit">
        <label class="sign__form-row">
          <p class="sign__form-title">Email</p>
          <input type="email" class="sign__form-input" v-model.trim="email" ref="email" required>
          <p class="sign__form-error">
            <span class="error" v-if="emailError">Email不存在</span>
          </p>
        </label>
        <label class="sign__form-row">
          <p class="sign__form-title">密碼</p>
          <input type="password" class="sign__form-input" v-model.trim="password" ref="password" required>
          <p class="sign__form-error">
            <span class="error" v-if="passwordError">密碼錯誤</span>
          </p>
        </label>
        <button class="sign__form-submit active" type="submit">登入</button>
      </form>
      <div class="sign__btns">
        <router-link to="/signup" class="sign__btns-link">註冊Alphitter</router-link>
        <span>・</span>
        <router-link to="/admin/signin" class="sign__btns-link">後台登入</router-link>
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
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false
    }
  },
  methods: {
    // TODO: 等API串接，再做相對應的流程設計
    handleSubmit () {
      if (!this.email) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入Email'
        })
        this.$refs.email.focus()
        this.$refs.email.style.borderColor = '#fc5a5a'
        return
      } else {
        this.$refs.email.style.borderColor = ''
      }

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

      // TODO: 這邊由串接後得到結果，做出相對應動作
      if (this.email !== dummyUser.email) {
        Toast.fire({
          icon: 'error',
          title: '可能Email有誤，或此Email未註冊'
        })
        this.emailError = true
        this.$refs.email.style.borderColor = '#fc5a5a'
        return
      } else {
        this.emailError = false
        this.$refs.email.style.borderColor = ''
      }

      if (this.password !== dummyUser.password) {
        Toast.fire({
          icon: 'error',
          title: '密碼有誤'
        })
        this.passwordError = true
        this.$refs.password.focus()
        this.$refs.password.style.borderColor = '#fc5a5a'
        return
      }

      this.$store.commit('setCurrentUser', dummyUser)
      console.log(`email: ${this.email}, password: ${this.password}`)
      Toast.fire({
        icon: 'success',
        title: '成功登入！'
      })
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
      & span:first-child {
        margin-right: 5px;
      }
    }
  }
  &__form-submit {
    font-size: $font-lg;
    line-height: $font-lg;
  }
  &__btns {
    margin-top: 2rem;
    text-align: right;
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
</style>
