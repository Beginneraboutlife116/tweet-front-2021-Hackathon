<template>
  <div class="twitter-container">
    <router-view />
    <Top />
    <!-- 預設跟使用者有關的頁面轉換 -->
  </div>
</template>

<script>
import Top from '../components/Top.vue'
export default {
  components: {
    Top
  }
}
</script>

<style lang="scss">
.twitter-container {
  flex: calc(100% - 26.25%);
  display: grid;
  grid-template-columns: 1fr calc( 462 / 1062 * 100% );
}
</style>
