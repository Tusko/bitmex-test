import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Notifications from "vue-notification";
import config from "./config";

Vue.config.productionTip = false;
Vue.use(Notifications);

Vue.prototype.$http = axios.create({
  baseURL: config.apiUrl,
  headers: { "Access-Control-Allow-Origin": "*" }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
