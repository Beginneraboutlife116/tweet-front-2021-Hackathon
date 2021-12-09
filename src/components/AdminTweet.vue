<template>
  <div class="tweet">
    <div class="tweet__avatar">
      <img
        class="tweet__avatar--img"
        :src="
          tweet.User.avatar ||
          'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
        "
        alt="avatar"
        aria-label="avatar"
      />
    </div>
    <div class="tweet__info">
      <div class="tweet__info-tweetBy">
        <span class="name"> {{ tweet.User.name }} </span>
        <span class="account">@{{ tweet.User.account }}・</span>
        <span class="timeStamp">{{ tweet.createdAt | fromNow }}</span>
      </div>
      <p class="tweet__info-description--admin">{{ tweet.description }}</p>
      <svg
        @click.stop.prevent="deletePostRequest(tweet.id)"
        class="tweet__info--svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.414 8.00012L15.207 2.20712C15.597 1.81712 15.597 1.18412 15.207 0.793119C14.817 0.402119 14.184 0.403119 13.793 0.793119L8 6.58612L2.207 0.793119C1.817 0.403119 1.184 0.403119 0.792997 0.793119C0.401997 1.18312 0.402997 1.81612 0.792997 2.20712L6.586 8.00012L0.792997 13.7931C0.402997 14.1831 0.402997 14.8161 0.792997 15.2071C0.987997 15.4021 1.243 15.5001 1.5 15.5001C1.757 15.5001 2.012 15.4021 2.207 15.2071L8 9.41412L13.793 15.2071C13.988 15.4021 14.243 15.5001 14.5 15.5001C14.757 15.5001 15.012 15.4021 15.207 15.2071C15.597 14.8171 15.597 14.1841 15.207 13.7931L9.414 8.00012Z"
          fill="#657786"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fromNowFilter } from './../mixins/helpers'

export default {
  mixins: [fromNowFilter],
  name: 'AdminTweet',
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
        }
      }
    }
  },
  created () {
    this.fetchTweet()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchTweet () {
      this.tweet = {
        ...this.initialTweet
      }
    },
    deletePostRequest (tweetId) {
      console.log(tweetId)
      this.$emit('delete-post', tweetId)
    }
  }
}
</script>

<style lang="scss">
.tweet {
  position: relative;
  display: flex;
  padding: 1.5rem 0 1.2rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  &__avatar {
    padding-top: 0.3rem;
    max-width: 5rem;
    aspect-ratio: 1;
    border-radius: 50%;
    margin-right: 1rem;
    &--img {
      border-radius: 50%;
    }
  }
  &__info {
    &-tweetBy {
      margin: 0.4rem 0 0.6rem 0;
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
    &-description--admin {
      margin-bottom: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 37rem;
      font-size: $font-md;
      color: var(--font-color);
    }
    &--svg {
      position: absolute;
      top: 0;
      right: 0;
      margin: 1.95rem;
      cursor: pointer;
    }
  }
}
</style>
