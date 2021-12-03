<template>
  <div class="tweet-container">
    <div class="tweet">
      <router-link :to="{ name:'profile'}" , params: { id: user.id }>
        <div class="tweet__avatar">
          <img class="tweet__avatar-img" src="" alt="">
        </div>
      </router-link>
      <div class="tweet__info">
        <div class="tweet__info-postBy">
          <!-- 點擊貼文中使用者頭像/name/account時，能到profile頁 -->
          <router-link :to="{ name:'profile'}" , params: { id: user.id }>
            <span class="tweet__info-postBy--name"></span>
            <span class="tweet__info-postBy--account"></span>
          </router-link>
          <!-- 點擊時間連到當則推文 -->
          <router-link :to="{name:'tweet'}" , params: { id: tweet.id }>
            <span class="tweet__info-postBy--timeStamp"></span>
          </router-link>
        </div>
        <!-- 點擊推文內容到當則推文 -->
        <router-link :to="{name:'tweet'}" , params: { id: tweet.id }>
          <p class="tweet__info-desc"></p>
        </router-link>
        <div class="tweet__info-count">
          <router-link>
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5576 2.80254L12.3726 2.79004H12.3701C6.90262 2.79004 2.62012 7.07379 2.62012 12.5425C2.62012 17.665 6.60262 21.55 11.9514 21.755V26.54C11.9514 26.675 12.0064 26.8975 12.1014 27.0438C12.2789 27.325 12.5814 27.4775 12.8914 27.4775C13.0639 27.4775 13.2376 27.43 13.3939 27.33C13.7239 27.12 21.4851 22.155 23.5039 20.4475C25.8814 18.435 27.3039 15.485 27.3076 12.5575V12.5363C27.3001 7.07754 23.0201 2.80254 17.5576 2.80129V2.80254ZM22.2914 19.0175C20.8739 20.2175 16.2139 23.2738 13.8264 24.8213V20.8375C13.8264 20.32 13.4076 19.9 12.8889 19.9H12.3939C7.81887 19.9 4.49637 16.805 4.49637 12.5425C4.49637 8.12504 7.95637 4.66504 12.3714 4.66504L17.5551 4.67754H17.5576C21.9726 4.67754 25.4326 8.13504 25.4351 12.5475C25.4314 14.935 24.2576 17.3525 22.2926 19.0175H22.2914Z"
                fill="#657786"
              />
            </svg>
            <span class="tweet__info-count--reply"></span>
          </span>
          </router-link>
          <span>
            <router-link>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 27.0473H14.9825C11.7537 26.9873 2.4375 18.5698 2.4375 10.5973C2.4375 6.76728 5.59375 3.40479 9.19125 3.40479C12.0537 3.40479 13.9787 5.37979 14.9987 6.81729C16.0162 5.38229 17.9412 3.40479 20.805 3.40479C24.405 3.40479 27.56 6.76729 27.56 10.5985C27.56 18.5685 18.2425 26.986 15.0137 27.0448H15V27.0473ZM9.1925 5.28104C6.5925 5.28104 4.31375 7.76603 4.31375 10.5998C4.31375 17.7748 13.1062 25.0948 15.0012 25.1723C16.8987 25.0948 25.6887 17.776 25.6887 10.5998C25.6887 7.76603 23.41 5.28104 20.81 5.28104C17.65 5.28104 15.885 8.95104 15.87 8.98729C15.5825 9.68979 14.425 9.68979 14.1362 8.98729C14.1187 8.94979 12.355 5.28104 9.19375 5.28104H9.1925Z"
                fill="#657786"
              />
            </svg>
            <span class="tweet__info-count--like"></span>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tweet',
  props: {}
}
</script>

<style lang="sass">
</style>
