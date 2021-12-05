<template>
  <div id="app">
    <router-view :key="$route.path" />
    <!-- 切換sign-in, sign-up, admin-sign-in, tweets -->
  </div>
</template>
