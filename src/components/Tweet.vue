<template>
  <div>
    <div class="tweet-container">
      <div class="tweet">
        <!-- 點擊貼文中使用者頭像/name/account時，能到profile頁 -->
        <router-link :to="`/home/${tweet.User.id}`" class="tweet__avatar">
          <img
            class="tweet__avatar--img"
            :src="tweet.User.avatar || 'https://fakeimg.pl/300/'"
            alt="avatar"
            aria-label="avatar"
          />
        </router-link>
        <div class="tweet__info">
          <div class="tweet__info-postBy">
            <!-- 點擊貼文中使用者頭像/name/account時，能到profile頁 -->
            <router-link :to="`/home/${tweet.User.id}`">
              <span class="name">{{ tweet.User.name || 'NoName'}} </span>
              <span class="account">@{{ tweet.User.account }}・</span>
            </router-link>
            <!-- 點擊時間連到當則推文 -->
            <router-link :to="`/home/${tweet.id}`">
              <span class="timeStamp">{{ tweet.createdAt | fromNow }}</span>
            </router-link>
          </div>
          <!-- 點擊推文內容到當則推文 -->
          <router-link :to="`/home/tweets/${tweet.id}`">
            <p class="tweet__info-description">{{ tweet.description }}</p>
          </router-link>
          <div class="tweet__info-count">
            <!-- 點擊回覆打開回覆modal -->
            <span @click.prevent.stop="toggleReplyModal(tweet.id)" class="tweet__info-count--reply">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.77881 1.40127L6.18631 1.39502H6.18506C3.45131 1.39502 1.31006 3.53689 1.31006 6.27127C1.31006 8.83252 3.30131 10.775 5.97568 10.8775V13.27C5.97568 13.3375 6.00318 13.4488 6.05068 13.5219C6.13943 13.6625 6.29068 13.7388 6.44568 13.7388C6.53193 13.7388 6.61881 13.715 6.69693 13.665C6.86193 13.56 10.7426 11.0775 11.7519 10.2238C12.9407 9.21752 13.6519 7.74252 13.6538 6.27877V6.26814C13.6501 3.53877 11.5101 1.40127 8.77881 1.40064V1.40127ZM11.1457 9.50877C10.4369 10.1088 8.10693 11.6369 6.91318 12.4106V10.4188C6.91318 10.16 6.70381 9.95002 6.44443 9.95002H6.19693C3.90943 9.95002 2.24818 8.40252 2.24818 6.27127C2.24818 4.06252 3.97818 2.33252 6.18568 2.33252L8.77756 2.33877H8.77881C10.9863 2.33877 12.7163 4.06752 12.7176 6.27377C12.7157 7.46752 12.1288 8.67627 11.1463 9.50877H11.1457Z"
                  fill="#657786"
                />
              </svg>
              <span>{{
                tweet.replyCounts
              }}</span>
            </span>
            <!-- 點擊喜歡愛心亮起 -->
            <span @click.prevent.stop="toggleLikeModal(tweet.id)" class="tweet__info-count--like">
              <svg
                v-show="!tweet.isLike"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 13.5239H7.49125C5.87687 13.4939 1.21875 9.28514 1.21875 5.29889C1.21875 3.38389 2.79687 1.70264 4.59562 1.70264C6.02687 1.70264 6.98937 2.69014 7.49937 3.40889C8.00812 2.69139 8.97062 1.70264 10.4025 1.70264C12.2025 1.70264 13.78 3.38389 13.78 5.29951C13.78 9.28451 9.12125 13.4933 7.50687 13.5226H7.5V13.5239ZM4.59625 2.64076C3.29625 2.64076 2.15687 3.88326 2.15687 5.30014C2.15687 8.88764 6.55312 12.5476 7.50062 12.5864C8.44937 12.5476 12.8444 8.88826 12.8444 5.30014C12.8444 3.88326 11.705 2.64076 10.405 2.64076C8.825 2.64076 7.9425 4.47576 7.935 4.49389C7.79125 4.84514 7.2125 4.84514 7.06812 4.49389C7.05937 4.47514 6.1775 2.64076 4.59687 2.64076H4.59625Z"
                  fill="#657786"
                />
              </svg>
              <svg
                v-show="tweet.isLike"
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19.6381H10.986C8.40295 19.5901 0.949951 12.8561 0.949951 6.47812C0.949951 3.41412 3.47495 0.724121 6.35295 0.724121C8.64295 0.724121 10.183 2.30412 10.999 3.45412C11.813 2.30612 13.353 0.724121 15.644 0.724121C18.524 0.724121 21.048 3.41412 21.048 6.47912C21.048 12.8551 13.594 19.5891 11.011 19.6361H11V19.6381Z"
                  fill="#E0245E"
                />
              </svg>
              <span>{{
                tweet.likeCounts
              }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../mixins/helpers'
export default {
  mixins: [fromNowFilter],
  name: 'Tweet',
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: {
        id: 0,
        description: '',
        createdAt: '2001-12-02T16:44:25.000Z',
        User: {
          id: -1,
          account: '',
          name: '',
          avatar: ''
        },
        isLike: true,
        likeCounts: 100,
        replyCounts: 20
      }
    }
  },
  created () {
    this.fetchTweet()
  },
  methods: {
    toggleReplyModal (tweetId) {
      // 開啟modal
      console.log('open reply modal', tweetId)
    },
    toggleLikeModal (tweetId) {
      this.tweet = {
        ...this.tweet,
        isLike: !this.tweet.isLike
      }
      if (this.tweet.isLike === true) {
        this.tweet.likeCounts++
      } else {
        this.tweet.likeCounts--
      }
    },
    fetchTweet () {
      this.tweet = {
        ...this.initialTweet
      }
    }
  },
  watch: {
    initialTweet (newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue
      }
    }
  }
}
</script>

<style lang="scss">
.tweet-container {
  width: 100%;
}

.tweet {
  display: flex;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  &__avatar {
    margin-right: 1rem;
    img {
      max-width: 5rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__info {
    &-postBy {
      font-size: $font-md;
      line-height: $font-md;
      .name {
        margin-right: 0.5rem;
        font-weight: bold;
        color: var(--font-color);
      }
      .account,
      .timeStamp {
        color: var(--label-color);
      }
    }
    &-description {
      padding: 0.6rem 0 1rem 0;
      color: var(--font-color);
      font-size: $font-md;
    }
    &-count {
      position: relative;
      display: flex;
      width: 13rem;
      span {
        display: flex;
        align-items: center;
        font-size: $font-xs;
        justify-content: flex-start;
        svg {
          margin: 0 1rem 0 0;
          height: 1.5rem;
          cursor: pointer;
        }
      }
      &--like {
        position: absolute;
        left: 70%;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
