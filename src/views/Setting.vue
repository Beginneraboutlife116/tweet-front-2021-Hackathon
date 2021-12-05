<template>
  <div class="setting-container">
    <div class="setting">
      <header class="setting__header">
        <p class="setting__header-title">帳號設定</p>
      </header>
      <form class="setting__form" @submit.prevent="handleSubmit">
        <label class="setting__form-row">
          <p class="setting__form-title">帳號</p>
          <input type="text" class="setting__form-input" v-model.trim="editUser.account" ref="account" :placeholder="prevAccount" value="editUser.account" required>
          <p class="setting__form-error">
            <span class="error" v-if="accountRepeat">帳號 已重複註冊！</span>
          </p>
        </label>
        <label class="setting__form-row">
          <p class="setting__form-title">名稱</p>
          <input type="text" class="setting__form-input" v-model.trim="editUser.name" value="editUser.name" :placeholder="prevName">
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
        <button class="setting__form-submit active" type="submit">儲存</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from './../mixins/helpers'

const dummyUser = {
  id: 2,
  account: 'user2',
  email: 'user2@example.com',
  password: '2',
  name: 'user2',
  role: 'user',
  createdAt: '2021-12-01T07:59:14.418Z',
  updatedAt: '2021-12-01T07:59:14.418Z'
}

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
      passwordError: false
    }
  },
  computed: {
    nameErrorHandler () {
      const nameError = {}
      nameError.borderColor = this.editUser.name.length > 50 ? '#fc5a5a' : ''
      nameError.color = this.editUser.name.length > 50 ? '#fc5a5a' : '#0099ff'
      nameError.text = this.editUser.name.length > 50 ? '字數超出上限！' : '字數正確'
      return nameError
    }
  },
  methods: {
    fetchCurrentUser () {
      const { id, name, account, email } = this.$store.state.currentUser
      this.editUser = {
        id,
        name,
        account: '@' + account,
        email
      }
      this.prevName = name
      this.prevAccount = '@' + account
      this.prevEmail = email
    },
    // TODO: 等API串接，再做相對應的流程設計
    handleSubmit () {
      if (!this.editUser.account) {
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

      let editAccount = ''
      const num = this.editUser.account.indexOf('@')
      if (num < 0) {
        editAccount = this.editUser.account
      } else {
        editAccount = this.editUser.account.slice(num + 1)
      }
      console.log(editAccount)

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
      } else {
        this.$refs.email.style.borderColor = ''
      }

      if (!this.verifyEmail(this.editUser.email)) {
        Toast.fire({
          icon: 'warning',
          title: '無效的Email，請再次確認'
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

      if (this.editUser.account.slice(1) === dummyUser.account) {
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

      if (this.editUser.email === dummyUser.email) {
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

      // TODO: POST資料給後端
      console.log({
        id: this.editUser.id,
        name: this.editUser.name,
        account: this.editUser.account.slice(1),
        email: this.editUser.email,
        password: this.password
      })

      Toast.fire({
        icon: 'success',
        title: '修改成功'
      })
      this.$router.push('/home')
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
