import Vue from "vue";
import { Utils, RouteUtils } from "@utils";
declare module "vue/types/vue" {
  interface Vue {
    $utils: typeof Utils;
    $routeUtils: typeof RouteUtils;
  }
}

Vue.prototype.$utils = Utils;
Vue.prototype.$routeUtils = RouteUtils;
