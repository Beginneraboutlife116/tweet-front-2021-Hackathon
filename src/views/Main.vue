<template>
  <div class="main-container">
    <!-- sidebar -->
    <Sidebar @create-tweet="toggleModal" />
    <router-view />
    <!-- 會是預設巢狀tweets，一開始會是這一頁，會轉換到admin的頁面 -->
    <NewTweet :modal="modal"/>
  </div>
</template>

<script>
import Sidebar from './../components/Sidebar.vue'
import NewTweet from './../components/NewTweet.vue'

export default {
  name: 'Main',
  components: {
    Sidebar,
    NewTweet
  },
  data () {
    return {
      modal: ''
    }
  },
  methods: {
    toggleModal (name) {
      this.modal = name
    }
  }
}
</script>

<style lang="scss">
.main-container {
  display: flex;
}
</style>
