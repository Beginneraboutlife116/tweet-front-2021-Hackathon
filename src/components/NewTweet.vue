<template>
  <div class="modal-container">
    <div class="modal">
      <header class="modal__header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="modal__header-delete" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4139 11.9999L19.2069 6.20687C19.5969 5.81687 19.5969 5.18388 19.2069 4.79288C18.8169 4.40188 18.1839 4.40288 17.7929 4.79288L11.9999 10.5859L6.20687 4.79288C5.81687 4.40288 5.18388 4.40288 4.79288 4.79288C4.40188 5.18288 4.40288 5.81587 4.79288 6.20687L10.5859 11.9999L4.79288 17.7929C4.40288 18.1829 4.40288 18.8159 4.79288 19.2069C4.98788 19.4019 5.24287 19.4999 5.49987 19.4999C5.75687 19.4999 6.01187 19.4019 6.20687 19.2069L11.9999 13.4139L17.7929 19.2069C17.9879 19.4019 18.2429 19.4999 18.4999 19.4999C18.7569 19.4999 19.0119 19.4019 19.2069 19.2069C19.5969 18.8169 19.5969 18.1839 19.2069 17.7929L13.4139 11.9999Z" fill="#FF6600"/>
        </svg>
      </header>
      <div class="modal__tweet">
        <div class="modal__tweet-postBy">
          <img src="" alt="" class="modal__tweet-postyBy--avatar">
        </div>
        <div class="modal__tweet-content">
          <p class="modal__tweet-content--detail">
            <router-link><span class="modal__tweet-content--detail-name"></span></router-link>
            <router-link><span class="modal__tweet-content--detail-account"></span></router-link>
            ・<span class="modal__tweet-content--detail-createdAt"></span>
          </p>
          <p class="modal__tweet-content--text"></p>
          <p class="modal__tweet-content--replyTo">
            <span></span>
            <router-link>
              <span class="modal__tweet-content--replyTo-account"></span>
            </router-link>
          </p>
        </div>
      </div>
      <div class="modal__user">
        <div class="modal__user-avatar">
          <img src="" alt="" class="modal__user-avatar--img">
        </div>
        <form class="modal__user-textarea">
          <input type="textarea" class="modal__user-textarea--input">
          <p class="modal__user-textarea--row">
            <span class="modal__user-textarea--error"></span>
            <button class="modal__user-textarea--submit">回覆</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0, 0, 40%);
  z-index: 1;
}

.modal {
  width: calc(600 / 1440 * 100%);
  margin: 5.4rem auto;
  background-color: #fff;
}
</style>
