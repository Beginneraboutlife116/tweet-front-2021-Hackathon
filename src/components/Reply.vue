<template>
  <div>
    <div class="reply-container">
      <div class="reply">
        <router-link :to="avatarNameLink" class="reply__avatar">
          <img
            class="reply__avatar--img"
            :src="avatar"
            alt="avatar"
            aria-label="avatar"
          />
        </router-link>
        <div class="reply__info">
          <div class="reply__info-replyBy">
            <router-link :to="avatarNameLink">
              <span class="name"> {{name}} </span>
              <span class="account"
                >@{{ account }}・</span
              >
            </router-link>
            <router-link :to="toRepliesLink">
              <span class="timeStamp">{{ reply.createdAt | fromNow }}</span>
            </router-link>
          </div>
          <div class="reply__info-replyTo">
            <span class="reply__info-replyTo--text"> 回覆 </span>
            <router-link :to="toAccountLink">
              <span class="reply__info-replyTo--account">@{{ replyAccount }}</span>
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
    },
    initialTweet: {
      type: Object
    }
  },
  data () {
    return {
      reply: {
        id: -1,
        comment: '',
        createdAt: ''
      },
      tweet: {}
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    replyAccount () {
      return Object.keys(this.reply).includes('tweet') ? this.reply.tweet.User.account : this.tweet.User.account
    },
    avatarNameLink () {
      return Object.keys(this.reply).includes('tweet') ? `/home/${this.reply.userId}` : `/home/${this.reply.User.id}`
    },
    avatar () {
      if (Object.keys(this.reply).includes('tweet')) {
        return this.reply.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
      } else {
        return this.reply.User.avatar || 'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
      }
    },
    toAccountLink () {
      return Object.keys(this.reply).includes('tweet') ? `/home/${this.reply.tweet.User.id}` : `/home/${this.tweet.User.id}`
    },
    name () {
      if (Object.keys(this.reply).includes('tweet')) {
        return this.reply.name || 'NoName'
      } else {
        return this.reply.User.name || 'NoName'
      }
    },
    account () {
      return Object.keys(this.reply).includes('tweet') ? this.currentUser.account : this.reply.User.account
    },
    toRepliesLink () {
      return Object.keys(this.reply).includes('tweet') ? `/home/tweets/${this.reply.tweet.id}` : `/home/tweets/${this.$route.params.tweetId}`
    }
  },
  created () {
    this.fetchReply()
    this.tweet = {
      ...this.initialTweet
    }
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
    },
    initialTweet (newValue) {
      this.tweet = {
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
      width: 5rem;
      height: 5rem;
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
