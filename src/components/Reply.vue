<template>
  <div>
    <div class="reply-container">
      <div class="reply">
        <!-- 點擊回文中使用者頭像/name/account時，能到profile頁 -->
        <router-link :to="`/home/${reply.tweet.User.id}`" class="reply__avatar">
          <img
            class="reply__avatar--img"
            :src="reply.tweet.User.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'"
            alt="avatar"
            aria-label="avatar"
          />
        </router-link>
        <div class="reply__info">
          <div class="reply__info-replyBy">
            <!-- 點擊回文中使用者頭像/name/account時，能到profile頁 -->
            <router-link :to="`/home/${reply.tweet.User.id}`">
              <span class="name">{{ reply.tweet.User.name || "NoName" }} </span>
              <span class="account"
                >@{{ reply.tweet.User.account }}・</span
              >
            </router-link>
            <!-- 點擊時間連到當則推文-->
            <router-link :to=" reply.tweet.id ? `/home/tweets/${reply.tweet.id}` : `/home/tweets/${this.$route.params}`">
              <span class="timeStamp">{{ reply.createdAt | fromNow }}</span>
            </router-link>
          </div>
          <div class="reply__info-replyTo">
            <span class="reply__info-replyTo--text">回覆 </span>
            <!-- 發文者的資料需要從推文元件 回傳到這裡目前還無法獲取 先寫poster -->
            <router-link to="/home/1">
            <span class="reply__info-replyTo--account">@{{ "poster" }}</span>
            </router-link>
          </div>
          <p class="reply__info-description">{{ reply.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../mixins/helpers'
export default {
  mixins: [fromNowFilter],
  name: 'Reply',
  props: {
    initialReply: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      reply: {
        id: -1,
        comment: '',
        createdAt: '2001-12-02T16:44:25.000Z',
        tweet: {
          id: -1,
          User: {
            id: -1,
            account: '',
            avatar: null
          }
        }
      }
    }
  },
  created () {
    this.fetchReply()
  },
  methods: {
    fetchReply () {
      this.reply = {
        ...this.initialReply
      }
    }
  },
  watch: {
    initialReply (newValue) {
      this.reply = {
        ...this.reply,
        ...newValue
      }
    }
  }
}
</script>

<style lang="scss">
.reply-container {
  width: 100%;
}
.reply {
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
    &-replyBy {
      margin: 0.4rem 0 0.5rem 0;
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
      font-size: $font-md;
      color: var(--font-color);
    }
    &-replyTo {
      font-size: $font-md;
      &--text {
        color: var(--label-color);
      }
      &--account {
        color: var(--main-color);
      }
    }
  }
}
</style>
