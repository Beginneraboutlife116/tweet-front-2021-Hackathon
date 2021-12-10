<template>
  <div class="modal-container" @click.stop.self="$emit('close-modal')">
    <div class="edit">
      <header class="edit__header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.stop.self="$emit('close-modal')">
          <path d="M13.4139 11.9999L19.2069 6.20687C19.5969 5.81687 19.5969 5.18388 19.2069 4.79288C18.8169 4.40188 18.1839 4.40288 17.7929 4.79288L11.9999 10.5859L6.20687 4.79288C5.81687 4.40288 5.18388 4.40288 4.79288 4.79288C4.40188 5.18288 4.40288 5.81587 4.79288 6.20687L10.5859 11.9999L4.79288 17.7929C4.40288 18.1829 4.40288 18.8159 4.79288 19.2069C4.98788 19.4019 5.24287 19.4999 5.49987 19.4999C5.75687 19.4999 6.01187 19.4019 6.20687 19.2069L11.9999 13.4139L17.7929 19.2069C17.9879 19.4019 18.2429 19.4999 18.4999 19.4999C18.7569 19.4999 19.0119 19.4019 19.2069 19.2069C19.5969 18.8169 19.5969 18.1839 19.2069 17.7929L13.4139 11.9999Z" fill="#ff6600"/>
        </svg>
        <p class="edit__title">
          <span>編輯個人資料</span>
        </p>
      </header>
      <form class="edit__body">
        <div class="edit__file">
          <div class="edit__cover">
            <img
              class="edit__cover-img"
              src="
                https://fakeimg.pl/600x200/?text=Add%20Your%20Cover
              "
              alt="cover"
              aria-label="cover"
            />
            <div class="edit__cover-btns">
              <label for="cover" name="cover">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083H6.438C7.633 3.17 9.722 2 12 2C14.277 2 16.367 3.17 17.562 5.083H19.708C20.972 5.083 22 6.11 22 7.375V19.708C22 20.972 20.972 22 19.708 22ZM4.292 6.583C3.855 6.583 3.5 6.938 3.5 7.375V19.708C3.5 20.145 3.855 20.5 4.292 20.5H19.708C20.145 20.5 20.5 20.145 20.5 19.708V7.375C20.5 6.938 20.145 6.583 19.708 6.583H17.258C16.941 6.633 16.626 6.488 16.476 6.201C15.596 4.536 13.882 3.501 12 3.501C10.117 3.501 8.402 4.536 7.524 6.203C7.364 6.505 7.022 6.663 6.691 6.583H4.293H4.292Z" fill="black"/>
                  <path d="M11.9999 8.16699C9.31989 8.16699 7.13989 10.347 7.13989 13.027C7.13989 15.707 9.31989 17.887 11.9999 17.887C14.6799 17.887 16.8599 15.707 16.8599 13.027C16.8599 10.347 14.6799 8.16699 11.9999 8.16699ZM13.9999 13.75H12.7499V15C12.7499 15.414 12.4139 15.75 11.9999 15.75C11.5859 15.75 11.2499 15.414 11.2499 15V13.75H9.99989C9.58589 13.75 9.24989 13.414 9.24989 13C9.24989 12.586 9.58589 12.25 9.99989 12.25H11.2499V11C11.2499 10.586 11.5859 10.25 11.9999 10.25C12.4139 10.25 12.7499 10.586 12.7499 11V12.25H13.9999C14.4139 12.25 14.7499 12.586 14.7499 13C14.7499 13.414 14.4139 13.75 13.9999 13.75Z" fill="black"/>
                </svg>
              </label>
              <button class="delete-btn">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.4139 11.9999L19.2069 6.20687C19.5969 5.81687 19.5969 5.18388 19.2069 4.79288C18.8169 4.40188 18.1839 4.40288 17.7929 4.79288L11.9999 10.5859L6.20687 4.79288C5.81687 4.40288 5.18388 4.40288 4.79288 4.79288C4.40188 5.18288 4.40288 5.81587 4.79288 6.20687L10.5859 11.9999L4.79288 17.7929C4.40288 18.1829 4.40288 18.8159 4.79288 19.2069C4.98788 19.4019 5.24287 19.4999 5.49987 19.4999C5.75687 19.4999 6.01187 19.4019 6.20687 19.2069L11.9999 13.4139L17.7929 19.2069C17.9879 19.4019 18.2429 19.4999 18.4999 19.4999C18.7569 19.4999 19.0119 19.4019 19.2069 19.2069C19.5969 18.8169 19.5969 18.1839 19.2069 17.7929L13.4139 11.9999Z" fill="black"/>
                </svg>
              </button>
              <input type="file" id="cover" class="edit__cover-input">
            </div>
          </div>
          <div class="edit__avatar">
            <label for="avatar" name="avatar">
              <img
                class="edit__avatar-img"
                src="
                https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg
                "
                alt="avatar"
                aria-label="avatar"
              />
            </label>
            <input type="file" name="avatar" id="avatar" class="edit__avatar-input">
          </div>
        </div>
        <div class="edit__name">
          <label for="name" name="name" class="edit__name-label">
            <p class="edit__name-title">名稱</p>
            <input type="text" class="edit__name-input">
          </label>
          <p class="edit__name-number"> /50</p>
        </div>
        <div class="edit__intro">
          <label for="desc" name="desc" class="edit__intro-label">
            <p class="edit__intro-title">自我介紹</p>
            <textarea name="desc" id="desc" cols="30" rows="10" class="edit__intro-input"></textarea>
          </label>
          <p class="edit__intro-number"> /160</p>
        </div>
        <button class="edit__submit active" type="submit">儲存</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.edit {
  position: relative;
  width: calc(600 / 1440 * 100%);
  height: 65.7rem;
  background-color: #fff;
  margin: 5.4rem auto;
  border-radius: 14px;
  border: 1px solid var(--border-color);
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
    &:hover {
      border-color: var(--main-color);
    }
    &-img {
      border-radius: 50%;
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
  &__name {
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
  }
  &__intro {
    &-label {
      display: block;
      width: 100%;
      background-color: var(--fill-color);
      padding-top: 0.5rem;
    }
    &-title {
      font-size: $font-md;
      line-height: $font-md;
      color: var(--label-color);
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }
    &-input {
      width: 100%;
      height: 15rem;
      background-color: transparent;
      padding-left: 1.5rem;
      border: none;
      border-bottom: 2px solid var(--label-color);
      border-radius: 0 0 4px 4px;
      resize: none;
    }
    &-number {
      width: max-content;
      margin-left: auto;
    }
  }
}
</style>
