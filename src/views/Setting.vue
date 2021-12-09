<template>
  <div class="setting-container">
    <div class="setting">
      <header class="setting__header">
        <p class="setting__header-title">帳號設定</p>
      </header>
      <form class="setting__form" @submit.prevent="handleSubmit">
        <label class="setting__form-row">
          <p class="setting__form-title account">帳號</p>
          <input type="text" class="setting__form-input account" v-model.trim="editUser.account" ref="account" :placeholder="prevAccount" value="editUser.account" required>
          <p class="setting__form-error">
            <span class="error" v-if="accountRepeat">帳號 已重複註冊！</span>
          </p>
        </label>
        <label class="setting__form-row">
          <p class="setting__form-title">名稱</p>
          <input type="text" class="setting__form-input" v-model.trim="editUser.name" value="editUser.name" :placeholder="prevName" ref="name" required>
          <p class="setting__form-error">
            <span class="error" v-show="editUser.name.length" :style="{color: nameErrorHandler.color}"> {{ nameErrorHandler.text }} </span>
            <span class="limit" v-show="editUser.name.length"> {{ editUser.name.length }}/50</span>
          </p>
        </label>
        <label class="setting__form-row">
          <p class="sign__form-title">Email</p>
          <input type="email" class="setting__form-input" v-model.trim="editUser.email" ref="email" :placeholder="prevEmail" value="editUser.email" required>
          <p class="setting__form-error">
            <span class="error" v-if="emailRepeat">Email 已重複註冊！</span>
          </p>
        </label>
        <label class="setting__form-row">
          <p class="setting__form-title">密碼</p>
          <input type="password" class="setting__form-input" v-model.trim="password" ref="password" required>
        </label>
        <label class="setting__form-row">
          <p class="setting__form-title">密碼確認</p>
          <input type="password" class="setting__form-input" v-model.trim="passwordConfirm" ref="passwordConfirm" required>
          <p class="setting__form-error">
            <span class="error" v-if="passwordError">確認密碼與密碼不符，請再試一次</span>
          </p>
        </label>
        <button class="setting__form-submit active" type="submit" :class="{disabled: isProcessing || waitForFill}"> {{ isProcessing ? '傳送中' : '儲存' }} </button>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from './../mixins/helpers'
import usersAPI from './../apis/users'

export default {
  name: 'Setting',
  data () {
    return {
      editUser: {},
      prevName: '',
      prevAccount: '',
      prevEmail: '',
      password: '',
      passwordConfirm: '',
      accountRepeat: false,
      emailRepeat: false,
      passwordError: false,
      isProcessing: false
    }
  },
  computed: {
    nameErrorHandler () {
      const nameError = {}
      nameError.borderColor = this.editUser.name.length > 50 ? '#fc5a5a' : ''
      nameError.color = this.editUser.name.length > 50 ? '#fc5a5a' : '#0099ff'
      nameError.text = this.editUser.name.length > 50 ? '字數超出上限！' : '字數正確'
      return nameError
    },
    waitForFill () {
      if (!this.editUser.account || !this.editUser.email || !this.password || !this.passwordConfirm || !this.name) {
        return true
      }
      return false
    }
  },
  methods: {
    fetchCurrentUser () {
      const { id, name, account, email } = this.$store.state.currentUser
      this.editUser = {
        id,
        name,
        account,
        email
      }
      this.prevName = name
      this.prevAccount = account
      this.prevEmail = email
    },
    handleSubmit () {
      this.$refs.account.style.borderColor = ''
      this.$refs.email.style.borderColor = ''
      this.$refs.password.style.borderColor = ''
      this.$refs.passwordConfirm.style.borderColor = ''
      this.$refs.name.style.borderColor = ''
      this.accountRepeat = false
      this.emailRepeat = false
      if (!this.editUser.account) {
        Toast.fire({
          icon: 'warning',
          title: '帳號必填'
        })
        this.$refs.account.focus()
        this.$refs.account.style.borderColor = '#fc5a5a'
        return
      }

      if (!this.name) {
        Toast.fire({
          icon: 'warning',
          title: '名稱必填'
        })
        this.$refs.name.focus()
        this.$refs.name.style.borderColor = '#fc5a5a'
      }

      if (this.editUser.name > 50) {
        this.editUser.name = this.editUser.name.slice(0, 50)
      }

      if (!this.editUser.email) {
        Toast.fire({
          icon: 'warning',
          title: 'Email必填'
        })
        this.$refs.email.focus()
        this.$refs.email.style.borderColor = '#fc5a5a'
        return
      }

      if (!this.verifyEmail(this.editUser.email)) {
        Toast.fire({
          icon: 'warning',
          title: '無效的Email，請再次確認'
        })
        this.$refs.email.focus()
        this.$refs.email.style.borderColor = '#fc5a5a'
        return
      }

      if (!this.password) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入密碼'
        })
        this.$refs.password.focus()
        this.$refs.password.style.borderColor = '#fc5a5a'
        return
      }

      if (!this.passwordConfirm) {
        Toast.fire({
          icon: 'warning',
          title: '請再輸入一次密碼做確認'
        })
        this.$refs.passwordConfirm.focus()
        this.$refs.passwordConfirm.style.borderColor = '#fc5a5a'
        return
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

      this.editUserInfo()
    },
    async editUserInfo () {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.putUserEdit(this.editUser.id, {
          account: this.editUser.account,
          name: this.editUser.name,
          email: this.editUser.email,
          password: this.password,
          checkPassword: this.passwordConfirm
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: `${data.message}`
        })
        this.$store.commit('setCurrentUser', {
          account: this.editUser.account,
          name: this.editUser.name,
          email: this.editUser.email,
          password: this.password
        })
        this.$router.push('/home')
      } catch (err) {
        this.isProcessing = false
        if (err.message === 'account已重複註冊！') {
          this.$refs.account.focus()
          this.$refs.account.style.borderColor = '#fc5a5a'
          this.accountRepeat = true
        }

        if (err.message === 'email已重複註冊！') {
          this.$refs.email.focus()
          this.$refs.email.style.borderColor = '#fc5a5a'
          this.emailRepeat = true
        }
        Toast.fire({
          icon: 'error',
          title: `${err.message}`
        })
      }
    },
    verifyEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  },
  created () {
    this.fetchCurrentUser()
  }
}
</script>

<style lang="scss">
.setting-container {
  flex: 1;
  border-left: 1px solid var(--border-color);
}
.setting {
  &__header {
    border-bottom: 1px solid var(--border-color);
    &-title {
      padding: 1.3rem 0 1.3rem 2rem;
      font-weight: bold;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    width: calc(642 / 1063 * 100%);
    gap: 3rem;
    padding: 3rem 0 0 1.6rem;
    position: relative;
    &-row {
      background-color: var(--fill-color);
      position: relative;
    }
    &-title {
      padding: 0.5rem 0 0 1rem;
      font-size: $font-md;
      line-height: $font-md;
      color: var(--label-color);
      position: relative;
      &.account::after {
        content: '@';
        position: absolute;
        top: 130%;
        left: 1rem;
      }
    }
    &-input {
      all: unset;
      width: calc(100% - 1rem);
      cursor: text;
      padding-left: 1rem;
      border-radius: 0 0 4px 4px;
      border-bottom: 2px solid var(--label-color);
      font-size: $font-xl;
      &:hover,
      &:focus {
        border-color: var(--link-color);
      }
      &.account {
        padding-left: 2.5rem;
        width: calc(100% - 3rem);
      }
    }
    &-submit {
      @extend %buttonStyle;
      padding: 1rem 0;
      position: absolute;
      width: calc(116 / 642 * 100%);
      right: 0;
      bottom: -10rem;
      transform: translateY(-50%);
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
}

</style>
