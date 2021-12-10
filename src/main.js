/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";

import SocketIO from "socket.io-client";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    connection: SocketIO("http://5149-81-31-74-124.ngrok.io"),
  })
);

new Vue({
  router,
  store,
  store,
  sockets: {
    connect: function () {
      console.log("Connected. Sending Authentication");
      this.$socket.emit("test", "this is a test")
    }
  },
  render: (h) => h(App),
}).$mount("#app");
