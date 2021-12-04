<template>
  <div class="replies-container">
    <header class="replies__header">
      <div class="replies__header__title">
        <svg
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
        <router-link :to="`/home/${post.User.id}`" class="main__post__info">
          <img :src="post.User.avatar || 'https://fakeimg.pl/300/'" alt="avatar" aria-label="avatar"/>
          <div class="main__post__info--account">
            <p class="name">{{ post.User.name }}</p>
            <p class="account">@{{ post.User.account }}</p>
          </div>
        </router-link>
        <div class="main__post__wrapper">
        <p class="main__post__wrapper--desc">{{post.description}}</p>
        <span class="main__post__wrapper--time">{{post.createdAt | absoluteTime}}</span>
        </div>
      </div>
    </header>
    <Reply v-for="reply in replies" :key="reply.id" :initial-reply="reply" />
  </div>
</template>

<script>
import Reply from './../components/Reply'
import { fromNowFilter } from './../mixins/helpers'
const dummyData = {
  replies: [
    {
      id: 1,
      comment:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit amet',
      createdAt: '2011-12-02T18:42:25.000Z',
      user: {
        id: 11,
        name: 'name11',
        account: 'account11',
        avatar: null
      }
    },
    {
      id: 2,
      comment:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit amet',
      createdAt: '2011-12-02T16:44:25.000Z',
      user: {
        id: 22,
        name: 'name22',
        account: 'account22',
        avatar: null
      }
    },
    {
      id: 3,
      comment:
        'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit amet',
      createdAt: '2011-12-02T16:44:25.000Z',
      user: {
        id: 33,
        name: 'name33',
        account: 'account33',
        avatar: null
      }
    }
  ]
}

const postData = {
  id: 0,
  description:
    'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ',
  createdAt: '2011-12-02T04:24:25.000Z',
  User: {
    id: 1,
    account: 'account1',
    name: 'name1',
    avatar: null
  },
  likeCounts: 10,
  replyCounts: 5,
  isLike: true
}

export default {
  mixins: [fromNowFilter],
  components: {
    Reply
  },
  data () {
    return {
      replies: [],
      post: {
        id: 0,
        description:
          'amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sitLorem ipsum dolor sit Lorem ipsum dolor sit amet Lorem ipsum',
        createdAt: '2011-12-02T16:44:25.000Z',
        User: {
          id: 1,
          account: 'account1',
          name: 'name1',
          avatar: null
        },
        likeCounts: 10,
        replyCounts: 5,
        isLike: true
      }
    }
  },
  created () {
    this.fetchReplies()
    this.fetchPost()
  },
  methods: {
    fetchReplies () {
      this.replies = dummyData.replies.map((data) => {
        return {
          ...data
        }
      })
    },
    fetchPost () {
      this.post = {
        ...postData
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
      margin: 1.5rem 4.1rem 1.6rem 1.5rem;
    }
  }
}
.main__post{
  &__info {
    display: flex;
    padding: 1rem 1.5rem 0 1.5rem;
    color: var(--font-color);
    font-size: $font-md;
    img {
      margin-right: 1rem;
      max-width: 5rem;
      border-radius: 50%;
      object-fit: cover;
    }
    &--account{
      padding-top:0.5rem;
      line-height: 2.1rem;
      .name {
        font-weight: bold;
        color: var(--font-color);
      }
      .account{
        color: var(--label-color);
      }
    }
  }
  &__wrapper {
    padding: 1.5rem;
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
}
</style>
