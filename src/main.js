import Vue from "vue";
import App from "./App.vue";

import IonicVue from "@ionic/vue";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";

Vue.config.productionTip = false;

Vue.use(IonicVue);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
