import Vue from "vue";
import Router from "vue-router";
// import store from '@/store'
import config from "./config";
import main from "./main";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    main,
    config,
    {
      path: "*",
      component: () => import("@views/base/404.vue"),
      meta: {
        title: "404",
        ignoreLogin: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
  // if (to.matched.some(record => record.meta.ignoreLogin)) {
  //   next()
  // } else {
  //   if (store.getters.isLoggedIn) {
  //     next()
  //   } else {
  //     next({ path: '/404' })
  //   }
  // }

  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
