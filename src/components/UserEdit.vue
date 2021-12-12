<template>
  <div class="modal-container" @click.stop.self="$emit('close-modal')">
    <div class="edit">
      <header class="edit__header">
        <button @click.stop.prevent="$emit('close-modal')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M13.4139 11.9999L19.2069 6.20687C19.5969 5.81687 19.5969 5.18388 19.2069 4.79288C18.8169 4.40188 18.1839 4.40288 17.7929 4.79288L11.9999 10.5859L6.20687 4.79288C5.81687 4.40288 5.18388 4.40288 4.79288 4.79288C4.40188 5.18288 4.40288 5.81587 4.79288 6.20687L10.5859 11.9999L4.79288 17.7929C4.40288 18.1829 4.40288 18.8159 4.79288 19.2069C4.98788 19.4019 5.24287 19.4999 5.49987 19.4999C5.75687 19.4999 6.01187 19.4019 6.20687 19.2069L11.9999 13.4139L17.7929 19.2069C17.9879 19.4019 18.2429 19.4999 18.4999 19.4999C18.7569 19.4999 19.0119 19.4019 19.2069 19.2069C19.5969 18.8169 19.5969 18.1839 19.2069 17.7929L13.4139 11.9999Z" fill="#ff6600"/>
          </svg>
        </button>
        <p class="edit__title">
          <span>編輯個人資料</span>
        </p>
      </header>
      <form class="edit__body" @submit.stop.prevent="handleSubmit">
        <div class="edit__file">
          <div class="edit__cover">
            <img
              class="edit__cover-img"
              :src="cover"
              alt="cover"
              aria-label="cover"
            />
            <div class="edit__cover-btns">
              <label for="cover" name="cover">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="edit__cover-svg">
                  <path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083H6.438C7.633 3.17 9.722 2 12 2C14.277 2 16.367 3.17 17.562 5.083H19.708C20.972 5.083 22 6.11 22 7.375V19.708C22 20.972 20.972 22 19.708 22ZM4.292 6.583C3.855 6.583 3.5 6.938 3.5 7.375V19.708C3.5 20.145 3.855 20.5 4.292 20.5H19.708C20.145 20.5 20.5 20.145 20.5 19.708V7.375C20.5 6.938 20.145 6.583 19.708 6.583H17.258C16.941 6.633 16.626 6.488 16.476 6.201C15.596 4.536 13.882 3.501 12 3.501C10.117 3.501 8.402 4.536 7.524 6.203C7.364 6.505 7.022 6.663 6.691 6.583H4.293H4.292Z"/>
                  <path d="M11.9999 8.16699C9.31989 8.16699 7.13989 10.347 7.13989 13.027C7.13989 15.707 9.31989 17.887 11.9999 17.887C14.6799 17.887 16.8599 15.707 16.8599 13.027C16.8599 10.347 14.6799 8.16699 11.9999 8.16699ZM13.9999 13.75H12.7499V15C12.7499 15.414 12.4139 15.75 11.9999 15.75C11.5859 15.75 11.2499 15.414 11.2499 15V13.75H9.99989C9.58589 13.75 9.24989 13.414 9.24989 13C9.24989 12.586 9.58589 12.25 9.99989 12.25H11.2499V11C11.2499 10.586 11.5859 10.25 11.9999 10.25C12.4139 10.25 12.7499 10.586 12.7499 11V12.25H13.9999C14.4139 12.25 14.7499 12.586 14.7499 13C14.7499 13.414 14.4139 13.75 13.9999 13.75Z"/>
                </svg>
              </label>
              <button class="delete-btn" @click.stop.prevent="deleteCover">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="edit__cover-svg">
                  <path d="M13.4139 11.9999L19.2069 6.20687C19.5969 5.81687 19.5969 5.18388 19.2069 4.79288C18.8169 4.40188 18.1839 4.40288 17.7929 4.79288L11.9999 10.5859L6.20687 4.79288C5.81687 4.40288 5.18388 4.40288 4.79288 4.79288C4.40188 5.18288 4.40288 5.81587 4.79288 6.20687L10.5859 11.9999L4.79288 17.7929C4.40288 18.1829 4.40288 18.8159 4.79288 19.2069C4.98788 19.4019 5.24287 19.4999 5.49987 19.4999C5.75687 19.4999 6.01187 19.4019 6.20687 19.2069L11.9999 13.4139L17.7929 19.2069C17.9879 19.4019 18.2429 19.4999 18.4999 19.4999C18.7569 19.4999 19.0119 19.4019 19.2069 19.2069C19.5969 18.8169 19.5969 18.1839 19.2069 17.7929L13.4139 11.9999Z"/>
                </svg>
              </button>
              <input name="cover" type="file" id="cover" class="edit__cover-input" accept="image/*" @change="fileChangeCover">
            </div>
          </div>
          <div class="edit__avatar">
            <label for="avatar" name="avatar">
              <img
                class="edit__avatar-img"
                :src="editAvatar"
                alt="avatar"
                aria-label="avatar"
              />
            </label>
            <input type="file" name="avatar" id="avatar" class="edit__avatar-input" @change="fileChangeAvatar"
            accept="image/*">
          </div>
        </div>
        <div class="edit__name">
          <label for="name" name="name" class="edit__name-label">
            <p class="edit__name-title">名稱</p>
            <input type="text" id="name" name="name" class="edit__name-input" :placeholder="prevName" value="editName" v-model.trim="editName" ref="name" maxlength="50" required>
          </label>
          <p class="edit__name-msg">
            <span class="edit__name-error" v-show="!editName.length"> 名稱必填 </span>
            <span class="edit__name-error" v-show="editName.length > 50"> 字數超出上限！ </span>
            <span class="edit__name-number" :style="{color: editName.length > 50 ? '#fc5a5a' : '#0099ff'}"> {{ editName.length }}/50</span>
          </p>
        </div>
        <div class="edit__intro">
          <label for="introduction" name="introduction" class="edit__intro-label">
            <p class="edit__intro-title">自我介紹</p>
            <textarea name="introduction" id="introduction" cols="30" rows="10" class="edit__intro-input" :placeholder="prevIntro" value="editIntro" v-model.trim="editIntro" maxlength="160"></textarea>
          </label>
          <p class="edit__name-msg">
            <span class="edit__name-error" v-show="editIntro.length > 160"> 字數超出上限！ </span>
            <span class="edit__intro-number" :style="{color: editIntro.length > 160 ? '#fc5a5a' : '#0099ff'}"> {{ editIntro.length }}/160</span>
          </p>
        </div>
        <button class="edit__submit active" type="submit" :disabled="isProcessing" :class="{disabled: isProcessing}"> {{ isProcessing ? '傳送中' : '儲存'}} </button>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from './../mixins/helpers'
import usersAPI from './../apis/users'

export default {
  name: 'UserEdit',
  props: {
    initialProfile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editName: '',
      editIntro: '',
      editAvatar: '',
      editCover: '',
      prevName: '',
      prevIntro: '',
      prevCover: '',
      isProcessing: false
    }
  },
  computed: {
    cover () {
      if (!this.editCover) {
        return this.prevCover || 'https://fakeimg.pl/600x200/?text=Add%20Your%20Cover'
      }
      return this.editCover
    }
  },
  created () {
    this.fetchProfile()
  },
  methods: {
    handleSubmit (e) {
      this.$refs.name.focus()
      this.$refs.name.borderColor = ''
      if (!this.editName) {
        Toast.fire({
          icon: 'warning',
          title: '名稱必填'
        })
        this.$refs.name.focus()
        this.$refs.name.borderColor = '#fc5a5a'
        return
      }
      const formData = new FormData(e.target)
      this.putEdit(formData)
    },
    async putEdit (formData) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.putUserEdit(this.initialProfile.id, formData)
        this.$emit('after-submit', {
          name: this.editName,
          introduction: this.editIntro,
          avatar: this.editAvatar,
          cover: this.editCover
        })
        Toast.fire({
          icon: 'success',
          title: `${data.message}`
        })
        this.isProcessing = false
        this.$emit('close-modal')
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法上傳檔案，請稍後再試'
        })
      }
    },
    fetchProfile () {
      this.editName = this.initialProfile.name || ''
      this.prevName = this.initialProfile.name || ''
      this.editIntro = this.initialProfile.introduction || ''
      this.prevIntro = this.initialProfile.introduction || ''
      this.editCover = this.initialProfile.cover || ''
      this.prevCover = this.initialProfile.cover || 'https://fakeimg.pl/600x200/?text=Add%20Your%20Cover'
      this.editAvatar = this.initialProfile.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
    },
    deleteCover () {
      if (this.editCover) {
        this.editCover = ''
      }
    },
    fileChangeCover (e) {
      const { files } = e.target
      if (files.length === 0) {
        this.editCover = ''
      } else {
        const imgURL = window.URL.createObjectURL(files[0])
        this.editCover = imgURL
      }
    },
    fileChangeAvatar (e) {
      const { files } = e.target
      if (files.length === 0) {
        this.editAvatar = ''
      } else {
        const imgURL = window.URL.createObjectURL(files[0])
        this.editAvatar = imgURL
      }
    }
  }
}
</script>

<style lang="scss">
.edit {
  position: relative;
  width: calc(600 / 1440 * 100%);
  background-color: #fff;
  margin: 5.4rem auto;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
  &__header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    gap: 4rem;
  }
  &__title {
    flex: 1;
    font-weight: bold;
    font-size: $font-xl;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__file {
    height: 20rem;
    position: relative;
    margin-bottom: 8rem;
  }
  &__avatar {
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    position: absolute;
    top: 100%;
    left: 1rem;
    transform: translateY(-50%);
    border: 4px solid #fff;
    overflow: hidden;
    display: grid;
    place-items: center;
    &:hover {
      border-color: var(--main-color);
    }
    &-img {
      object-fit: cover;
      cursor: pointer;
    }
    &-input {
      display: none;
    }
  }
  &__cover {
    &-input {
      display: none;
    }
    &-btns {
      display: flex;
      width: max-content;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &-img {
      width: 100%;
      height: 20rem;
      object-fit: cover;
    }
    &-svg {
      fill: white;
      &:hover {
        fill: var(--main-color);
      }
    }
  }
  &__submit {
    font-weight: normal;
    @extend %buttonStyle;
    padding: 0.5rem 1.5rem;
    position: absolute;
    top: 3rem;
    right: 1rem;
    transform: translateY(-50%);
  }
  &__body {
    padding-inline: 1.5rem;
  }
  &__name,
  &__intro {
    &-label {
      display: block;
      width: 100%;
      background-color: var(--fill-color);
      padding-top: 0.5rem;
    }
    &-input {
      width: 100%;
      background-color: transparent;
      padding-left: 1.5rem;
      border: none;
      border-bottom: 2px solid var(--label-color);
      border-radius: 0 0 4px 4px;
      &:hover,
      &:focus {
        border-color: var(--link-color);
      }
    }
    &-title {
      font-size: $font-md;
      line-height: $font-md;
      color: var(--label-color);
      margin-bottom: 0.4rem;
      padding-left: 1.5rem;
    }
    &-number {
      width: max-content;
      margin-left: auto;
    }
    &-msg {
      display: flex;
      justify-content: space-between;
      padding-left: 1.5rem;
    }
    &-error {
      color: var(--error-color);
      font-size: $font-md;
      line-height: $font-md;
    }
  }
  &__name {
    margin-bottom: 2rem;
  }
  &__intro {
    &-input {
      height: 15rem;
      resize: none;
    }
  }
}
</style>
