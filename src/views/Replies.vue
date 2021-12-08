<template>
  <div class="replies-container">
    <header class="replies__header">
      <div class="replies__header__title">
        <svg @click.stop.prevent="$router.back()"
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9995 10.9999H6.4135L10.7065 6.70687C11.0965 6.31687 11.0965 5.68388 10.7065 5.29288C10.3165 4.90188 9.6835 4.90288 9.2925 5.29288L3.2925 11.2929C2.9025 11.6829 2.9025 12.3159 3.2925 12.7069L9.2925 18.7069C9.4875 18.9019 9.7425 18.9999 9.9995 18.9999C10.2565 18.9999 10.5115 18.9019 10.7065 18.7069C11.0965 18.3169 11.0965 17.6839 10.7065 17.2929L6.4135 12.9999H18.9995C19.5525 12.9999 19.9995 12.5529 19.9995 11.9999C19.9995 11.4469 19.5525 10.9999 18.9995 10.9999Z"
            fill="black"
          />
        </svg>
        <h1>推文</h1>
      </div>
      <div class="main__post">
        <router-link :to="`/home/${tweet.User.id}`" class="main__post__info">
          <img
            :src="tweet.User.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'"
            alt="avatar"
            aria-label="avatar"
          />
          <div class="main__post__info--account">
            <p class="name">{{ tweet.User.name }}</p>
            <p class="account">@{{ tweet.User.account }}</p>
          </div>
        </router-link>
        <div class="main__post__wrapper">
          <p class="main__post__wrapper--desc">{{ tweet.description }}</p>
          <span class="main__post__wrapper--time">{{
            tweet.createdAt | absoluteTime
          }}</span>
        </div>
        <div class="main__post__data">
          <div class="main__post__data--reply">
            <span class="count">{{ tweet.replyCounts }}</span>
            <span class="text">回覆</span>
          </div>
          <div>
            <span @click.prevent.stop="toggleReplyModal(tweet.id)" class="count">{{ tweet.likeCounts }}</span>
            <span class="text">喜歡次數</span>
          </div>
        </div>
        <div class="main__post__action">
          <!-- 點擊回覆打開回覆modal -->
          <span
            @click.prevent.stop="$store.commit('toggleModal', {
              reply: 'reply',
              id: tweet.id,
              description: tweet.description,
              createdAt: tweet.createdAt,
              User: {
                ...tweet.User
              }
            })"
            class="main__post__action--reply"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5576 0.802539L10.3726 0.790039H10.3701C4.90262 0.790039 0.620117 5.07379 0.620117 10.5425C0.620117 15.665 4.60262 19.55 9.95137 19.755V24.54C9.95137 24.675 10.0064 24.8975 10.1014 25.0438C10.2789 25.325 10.5814 25.4775 10.8914 25.4775C11.0639 25.4775 11.2376 25.43 11.3939 25.33C11.7239 25.12 19.4851 20.155 21.5039 18.4475C23.8814 16.435 25.3039 13.485 25.3076 10.5575V10.5363C25.3001 5.07754 21.0201 0.802539 15.5576 0.801289V0.802539ZM20.2914 17.0175C18.8739 18.2175 14.2139 21.2738 11.8264 22.8213V18.8375C11.8264 18.32 11.4076 17.9 10.8889 17.9H10.3939C5.81887 17.9 2.49637 14.805 2.49637 10.5425C2.49637 6.12504 5.95637 2.66504 10.3714 2.66504L15.5551 2.67754H15.5576C19.9726 2.67754 23.4326 6.13504 23.4351 10.5475C23.4314 12.935 22.2576 15.3525 20.2926 17.0175H20.2914Z"
                fill="#657786"
              />
            </svg>
          </span>
          <!-- 點擊喜歡愛心亮起 -->
          <span
            @click.prevent.stop="toggleLikeModal(tweet.id, tweet.isLike)"
            class="reply__info-count--like"
          >
            <svg
              v-show="!tweet.isLike"
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 24.0473H12.9825C9.75375 23.9873 0.4375 15.5698 0.4375 7.59728C0.4375 3.76728 3.59375 0.404785 7.19125 0.404785C10.0537 0.404785 11.9787 2.37979 12.9987 3.81729C14.0162 2.38229 15.9412 0.404785 18.805 0.404785C22.405 0.404785 25.56 3.76729 25.56 7.59854C25.56 15.5685 16.2425 23.986 13.0137 24.0448H13V24.0473ZM7.1925 2.28104C4.5925 2.28104 2.31375 4.76603 2.31375 7.59978C2.31375 14.7748 11.1062 22.0948 13.0012 22.1723C14.8987 22.0948 23.6887 14.776 23.6887 7.59978C23.6887 4.76603 21.41 2.28104 18.81 2.28104C15.65 2.28104 13.885 5.95104 13.87 5.98729C13.5825 6.68979 12.425 6.68979 12.1362 5.98729C12.1187 5.94979 10.355 2.28104 7.19375 2.28104H7.1925Z"
                fill="#657786"
              />
            </svg>
            <svg
              v-show="tweet.isLike"
              width="25"
              height="25"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19.6381H10.986C8.40295 19.5901 0.949951 12.8561 0.949951 6.47812C0.949951 3.41412 3.47495 0.724121 6.35295 0.724121C8.64295 0.724121 10.183 2.30412 10.999 3.45412C11.813 2.30612 13.353 0.724121 15.644 0.724121C18.524 0.724121 21.048 3.41412 21.048 6.47912C21.048 12.8551 13.594 19.5891 11.011 19.6361H11V19.6381Z"
                fill="#E0245E"
              />
            </svg>
          </span>
        </div>
      </div>
    </header>
    <template>
      <Spinner v-if="isLoading"/>
      <Reply v-for="reply in replies" :key="reply.id" :initial-reply="reply" :initial-tweet="tweet" v-else/>
    </template>
  </div>
</template>

<script>
import Reply from './../components/Reply'
import Spinner from './../components/Spinner.vue'
import { fromNowFilter, Toast } from './../mixins/helpers'
import tweetsAPI from './../apis/tweets'
import repliesAPI from './../apis/replies'

export default {
  name: 'Replies',
  mixins: [fromNowFilter],
  components: {
    Reply,
    Spinner
  },
  data () {
    return {
      replies: [],
      tweet: {
        id: -1,
        description: '',
        createdAt: '',
        User: {
          id: -1,
          account: '',
          name: '',
          avatar: ''
        },
        likeCounts: 0,
        replyCounts: 0,
        isLike: false
      },
      isLoading: true
    }
  },
  computed: {
    reply () {
      return this.$store.state.reply
    }
  },
  watch: {
    reply () {
      this.fetchReplies(this.tweet.id)
    }
  },
  created () {
    const { tweetId } = this.$route.params
    this.fetchPost(tweetId)
    this.fetchReplies(tweetId)
  },
  methods: {
    async fetchReplies (tweetId) {
      try {
        this.isLoading = true
        const { data } = await repliesAPI.getReplies({ tweetId })
        this.replies = data
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得回覆資料，請稍後再試'
        })
      }
    },
    async fetchPost (tweetId) {
      try {
        const { data } = await tweetsAPI.getSingleTweet({ tweetId })
        const { id, description, createdAt, User, likeCounts, replyCounts, isLike } = data
        this.tweet = {
          id,
          description,
          createdAt,
          User,
          likeCounts,
          replyCounts,
          isLike
        }
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得該篇推文，請稍後再試'
        })
      }
    },
    async toggleLikeModal (tweetId, tweetIsLike) {
      try {
        if (tweetIsLike) {
          const { data } = await tweetsAPI.postUnlike(tweetId)
          if (data.status === 'error') {
            throw new Error(data.message)
          }
        } else {
          const { data } = await tweetsAPI.postLike(tweetId)
          if (data.status === 'error') {
            throw new Error(data.message)
          }
        }
        this.tweet = {
          ...this.tweet,
          isLike: !this.tweet.isLike
        }
        if (!tweetIsLike) {
          this.tweet.likeCounts++
        } else {
          this.tweet.likeCounts--
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法切換喜歡狀態，請稍後再嘗試'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.replies-container {
  grid-column: 1;
  height: 100vh;
  border-inline: 1px solid var(--border-color);
  overflow: scroll;
}
.replies__header {
  &__title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    h1 {
      font-size: $font-lg;
      font-weight: bold;
    }
    svg {
      margin: 1.5rem 4.1rem 1.5rem 1.5rem;
      cursor: pointer;
    }
  }
}
.main__post {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  &__info {
    display: flex;
    padding: 0 1.5rem 0 0;
    color: var(--font-color);
    font-size: $font-md;
    img {
      margin-right: 1rem;
      max-width: 5rem;
      border-radius: 50%;
      object-fit: cover;
    }
    &--account {
      padding-top: 0.5rem;
      line-height: 2.1rem;
      .name {
        font-weight: bold;
        color: var(--font-color);
      }
      .account {
        color: var(--label-color);
      }
    }
  }
  &__wrapper {
    padding: 1.5rem 6rem 1.5rem 0;
    p {
      line-height: 3.4rem;
      font-size: $font-xxl;
    }
    span {
      margin: 1.5rem 0;
      font-size: $font-md;
      color: var(--label-color);
    }
  }
  &__data {
    display: flex;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    .count {
      font-weight: bold;
      font-size: $font-xl;
      margin-right: 0.3rem;
    }
    .text {
      color: var(--label-color);
      font-size: $font-xl;
    }
    &--reply {
      margin-right: 2rem;
    }
  }
  &__action {
    display: flex;
    padding: 2rem 0 0 0;
    cursor: pointer;
    &--reply {
      width: calc( 155 / 600 * 100%);
    }
  }
}
</style>
