<template>
  <div class="main-container">
    <!-- sidebar -->
    <Sidebar />
    <router-view />
    <!-- 會是預設巢狀tweets，一開始會是這一頁，會轉換到admin的頁面 -->
    <NewTweet />
  </div>
</template>

<script>
import Sidebar from './../components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
.main-container {
  display: flex;
}
</style>
