<template>
  <div class="profile-container">
    <header class="profile__header">
      <div class="profile__header__title">
        <svg
          @click="$router.back()"
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
        <div class="profile__header__title__wrapper">
          <p class="name">{{ profile.name }}</p>
          <p class="tweetCounts">{{ profile.tweetCounts }} 推文</p>
        </div>
      </div>
    </header>
    <Spinner v-if="isLoading"/>
    <div class="main__profile" v-else>
      <div class="main__profile__img">
        <img
          class="main__profile__img--cover"
          :src="
            profile.cover ||
            'https://fakeimg.pl/600x200/?text=Add%20Your%20Cover'
          "
          alt="avatar"
          aria-label="avatar"
        />
        <img
          class="main__profile__img--avatar"
          :src="
            profile.avatar ||
            'https://i.pinimg.com/originals/1f/7c/70/1f7c70f9b5b5f0e1972a4888468ed84c.jpg'
          "
          alt="avatar"
          aria-label="avatar"
        />
      </div>
      <div class="main__profile__info">
        <div class="main__profile__info__btn">
          <template v-if="currentUser.id !== profile.id">
            <IconMessage :initial-profile="profile"/>
            <svg
              v-if="profile.isSubscribing"
              @click.stop.prevent="toggleSubscribe(profile.id, profile.isSubscribing)"
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="17.5"
                cy="17.5"
                r="17"
                fill="#FF6600"
                stroke="#FF6600"
              />
              <path
                d="M27.6584 7.1313C27.3302 6.9703 26.9391 7.10505 26.7781 7.4288L24.2721 12.4828L22.782 10.899C22.5344 10.6339 22.1187 10.6225 21.8545 10.871C21.5902 11.1195 21.578 11.536 21.8265 11.7985L23.9641 14.07C24.0892 14.2013 24.2616 14.2757 24.4419 14.2757C24.4734 14.2757 24.5057 14.273 24.5381 14.2687C24.7507 14.2372 24.9336 14.1024 25.0299 13.9099L27.9541 8.01242C28.1151 7.68692 27.9821 7.29317 27.6566 7.13217L27.6584 7.1313ZM23.6404 21.5469C23.5677 21.4909 21.8519 20.125 21.8816 16.5069C21.9009 14.378 21.1991 12.4854 19.9076 11.1782C18.7491 10.0057 17.1811 9.35555 15.4924 9.34767H15.481C13.7922 9.35642 12.2242 10.0039 11.0657 11.1782C9.7751 12.4863 9.07335 14.3789 9.09085 16.5087C9.12235 20.125 7.40823 21.49 7.34085 21.5425C7.11335 21.7114 7.01973 22.0063 7.1081 22.2758C7.19735 22.5453 7.44935 22.7264 7.7311 22.7264H11.3011C11.3781 24.9752 13.22 26.7864 15.488 26.7864C17.756 26.7864 19.5987 24.9752 19.6749 22.7264H23.2466C23.5266 22.7264 23.7751 22.5462 23.8652 22.2802C23.9554 22.0142 23.8635 21.7175 23.6412 21.5469H23.6404ZM15.4871 24.9489C14.2324 24.9489 13.2121 23.9628 13.1386 22.7264H17.8356C17.7612 23.9628 16.7419 24.9489 15.4871 24.9489Z"
                fill="white"
              />
            </svg>
            <svg
              v-else
              @click.stop.prevent="
                toggleSubscribe(profile.id)
              "
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17.5" cy="17.5" r="17" stroke="#FF6600" />
              <path
                d="M27.3351 9.85253H25.2132V7.72803C25.2132 7.36578 24.9192 7.07178 24.557 7.07178C24.1947 7.07178 23.9007 7.36578 23.9007 7.72803V9.85253H21.7788C21.4166 9.85253 21.1226 10.1457 21.1226 10.5088C21.1226 10.8719 21.4166 11.165 21.7788 11.165H23.9016V13.286C23.9016 13.6483 24.1956 13.9423 24.5578 13.9423C24.9201 13.9423 25.2141 13.6483 25.2141 13.286V11.165H27.336C27.6991 11.165 27.9922 10.8702 27.9922 10.5088C27.9922 10.1474 27.6982 9.85253 27.336 9.85253H27.3351ZM21.8838 16.5078C21.9013 14.378 21.1996 12.4854 19.9081 11.179C18.7496 10.0048 17.1816 9.35553 15.4928 9.34765H15.4815C13.7927 9.3564 12.2247 10.0039 11.0662 11.1782C9.77559 12.4863 9.07384 14.3789 9.09134 16.5087C9.12284 20.125 7.40872 21.49 7.34134 21.5425C7.11384 21.7114 7.02022 22.0063 7.10859 22.2758C7.19784 22.5453 7.44984 22.7264 7.73159 22.7264H11.8581C11.9543 24.6742 13.5556 26.2325 15.5278 26.2325C17.5001 26.2325 19.1005 24.675 19.1976 22.7264H23.2445C23.5245 22.7264 23.773 22.5462 23.8631 22.2802C23.9532 22.0141 23.8631 21.7175 23.64 21.5469C23.5682 21.4909 21.8523 20.125 21.883 16.5069L21.8838 16.5078ZM15.527 24.92C14.2792 24.92 13.2642 23.9488 13.1697 22.7255H17.8842C17.7897 23.9505 16.7747 24.9192 15.527 24.9192V24.92ZM9.14822 21.4139C9.76247 20.4558 10.4231 18.8729 10.403 16.4982C10.3881 14.6939 10.9402 13.1732 11.9998 12.1013C12.9125 11.1773 14.1506 10.6663 15.4876 10.661C16.8237 10.6672 18.0627 11.1773 18.9745 12.1013C20.0332 13.174 20.5845 14.6939 20.5696 16.4982C20.5503 18.8729 21.2101 20.4558 21.827 21.4139H9.14822Z"
                fill="#FF6600"
              />
            </svg>
          </template>
          <button
            v-if="currentUser.id === profile.id"
            class="main__profile__info__btn--edit"
            @click.stop.prevent="toggleEditModal"
          >
            編輯個人資料
          </button>
          <UserEdit v-if="isOpen" @close-modal="toggleEditModal" :initial-profile="profile" @after-submit="handleAfterSubmit"/>
          <button
            v-if="currentUser.id !== profile.id"
            class="main__profile__info__btn--follow"
            :class="{ active: profile.isFollowing, disabled: postFollow }"
            @click.stop.prevent="toggleFollow(profile.id, profile.isFollowing)"
            :disabled="postFollow"
          >
            {{ profile.isFollowing ? "正在跟隨" : "跟隨" }}
          </button>
        </div>
        <p v-if="!isLoading" class="name">{{ profile.name }}</p>
        <p v-if="!isLoading" class="account">@{{ profile.account }}</p>
        <p v-if="!isLoading" class="introduction">{{ profile.introduction }}</p>
      </div>
      <div v-if="!isLoading" class="main__profile__data">
        <div class="main__profile__data--follow">
          <router-link :to="`/home/${profile.id}/followings`">
            <span class="count"
              >{{ profile.followship.followingCounts }} 個</span
            >
            <span class="text">跟隨中</span>
          </router-link>
        </div>
        <div class="main__profile__data--follow">
          <router-link :to="`/home/${profile.id}/followers`">
            <span class="count"
              >{{ profile.followship.followerCounts }} 位</span
            >
            <span class="text">跟隨者</span>
          </router-link>
        </div>
      </div>
      <div class="main__profile__tabs">
        <router-link
          :to="{ name: 'profile-tweets' }"
          class="main__profile__tabs--link"
          ><p>推文</p></router-link
        >
        <router-link
          :to="{ name: 'profile-replies' }"
          class="main__profile__tabs--link"
          ><p>推文與回覆</p></router-link
        >
        <router-link
          :to="{ name: 'profile-likes' }"
          class="main__profile__tabs--link"
          ><p>喜歡的內容</p></router-link
        >
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from './../mixins/helpers'
import usersAPI from './../apis/users'
import followAPI from '../apis/followships'
import Spinner from './../components/Spinner'
import UserEdit from './../components/UserEdit.vue'
import IconMessage from './../components/icons/IconMessage.vue'
export default {
  name: 'UserProfile',
  components: {
    Spinner,
    UserEdit,
    IconMessage
  },
  props: {
    toChangeFollowStatus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      profile: {
        account: 'null',
        avatar: null,
        cover: null,
        email: '',
        followship: {
          followingCounts: 0,
          followerCounts: 0
        },
        id: 0,
        introduction: null,
        isFollowing: false,
        isSubscribing: false,
        name: '',
        tweetCounts: 0
      },
      isProcessing: false,
      isLoading: true,
      isOpen: false,
      postFollow: false
    }
  },
  created () {
    const { userId } = this.$route.params
    this.fetchProfile(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { userId } = to.params
    this.fetchProfile(userId)
    next()
  },
  watch: {
    toChangeFollowStatus: {
      handler () {
        if (this.profile.id === this.toChangeFollowStatus[0]) {
          this.profile.isFollowing = this.toChangeFollowStatus[1]
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    handleAfterSubmit (data) {
      this.profile.avatar = data.avatar
      this.profile.cover = data.cover
      this.profile.name = data.name
      this.profile.introduction = data.introduction
    },
    toggleEditModal () {
      this.isOpen = !this.isOpen
    },
    async fetchProfile (userId) {
      try {
        this.isProcessing = true
        this.isLoading = true
        const { data } = await usersAPI.getUserProfile(userId)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.profile = {
          ...data,
          isSubscribing: false
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法獲取個人資料，請稍後再嘗試'
        })
      }
    },
    async toggleFollow (userId, userIsFollowing) {
      try {
        this.postFollow = true
        if (userIsFollowing) {
          const { data } = await followAPI.cancelFollow(userId)
          if (data.status === 'error') {
            throw new Error(data.message)
          }
          this.profile.followship.followerCounts--
          this.profile.isFollowing = false
          this.$emit('after-toggle-follow', [this.profile.id, this.profile.isFollowing])
          Toast.fire({
            icon: 'success',
            title: '成功取消追隨'
          })
        } else {
          const { data } = await followAPI.addFollow(userId)
          if (data.status === 'error') {
            throw new Error(data.message)
          }
          this.profile.followship.followerCounts++
          this.profile.isFollowing = true
          this.$emit('after-toggle-follow', [this.profile.id, this.profile.isFollowing])
          Toast.fire({
            icon: 'success',
            title: '成功加入追隨'
          })
        }
        this.postFollow = false
      } catch (error) {
        this.postFollow = false
        Toast.fire({
          icon: 'error',
          title: '無法修改追隨狀態'
        })
      }
    },
    toggleSubscribe (userId) {
      this.profile.isSubscribing = !this.profile.isSubscribing
    }
  }
}
</script>

<style lang="scss">
.router-link-exact-active.main__profile__tabs--link {
  color: var(--main-color);
  border-bottom: 2px solid var(--main-color);
}

.profile-container {
  grid-column: 1;
  height: 100vh;
  border-inline: 1px solid var(--border-color);
  overflow: scroll;
}

.profile__header {
  svg {
    cursor: pointer;
  }
  &__title {
    display: flex;
    align-items: center;
    padding: 0.6rem 0 0.7rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    &__wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 4rem;
      .name {
        line-height: 2.75rem;
        font-weight: 900;
        font-size: $font-xl;
      }
      .tweetCounts {
        color: var(--label-color);
        font-size: $font-xs;
      }
    }
  }
}

.main__profile {
  // svg {
  //   cursor: pointer;
  // }
  &__img {
    position: relative;
    &--cover {
      width: 100%;
      height: 20rem;
      object-fit: cover;
      overflow: hidden;
    }
    &--avatar {
      position: absolute;
      bottom: -50%;
      left: 1.5rem;
      transform: translateY(-25%);
      border-radius: 50%;
      width: 14rem;
      height: 14rem;
      border: 4px solid var(--basic-color);
      object-fit: cover;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem 1rem 1.5rem;
    &__btn {
      display: flex;
      align-self: flex-end;
      gap: 1rem;
    }
    &__btn--edit {
      @extend %buttonStyle;
      height: 3.5rem;
      width: 12rem;
      font-size: $font-md;
    }
    &__btn--follow {
      @extend %buttonStyle;
      align-self: flex-end;
      height: 3.5rem;
      width: 9rem;
      font-size: $font-md;
    }
    .name {
      margin-top: 2.4rem;
      font-weight: 900;
      font-size: $font-xl;
    }
    .account {
      font-weight: 500;
      font-size: $font-md;
      color: var(--label-color);
    }
    .introduction {
      margin-top: 1rem;
      font-size: $font-sm;
    }
  }
  &__data {
    display: flex;
    padding-left: 1.5rem;
    margin-bottom: 2rem;
    &--follow {
      font-size: $font-sm;
      margin-right: 2rem;
      .count {
        font-weight: 500;
        color: var(--font-color);
      }
      .text {
        font-weight: 400;
        color: var(--label-color);
      }
    }
  }
  &__tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    &--link {
      height: 5.2rem;
      width: 13rem;
      line-height: 5.2rem;
      font-weight: 500;
      font-size: $font-md;
      color: var(--label-color);
      text-align: center;
      cursor: pointer;
      &:hover {
        color: var(--main-color);
        border-bottom: 2px solid var(--main-color);
      }
    }
  }
}
</style>
