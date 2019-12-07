import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引用本地配置过滤器和指令
import "@/services/directives";
// 样式重置
import "@assets/stylus/reset.styl";
import "./element";
// 引用本地组件
import "@components/k-components";
// 引用本地工具
import "./kutils";

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
