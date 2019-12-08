import MainContainerLayout from "@components/MainContainerLayout.vue";
import Home from "@views/main/Home.vue";
import HomeIndex from "@view/main/Index.vue";
export default {
  path: "/",
  name: "main",
  component: MainContainerLayout,
  redirect: "/main/home",
  children: [
    {
      path: "/main/home",
      name: "mainHome",
      component: Home,
      redirect: "/main/home/index",
      children: [
        {
          path: "/main/home/index",
          name: "mainHomeIndex",
          component: () => import("@views/main/Index.vue"),
          meta: {
            title: "首页",
            ignoreLogin: true
          }
        },
        {
          path: "/main/home/weddingList",
          name: "mainHomeWeddingList",
          component: () => import("@views/main/WeddingList.vue"),
          meta: {
            title: "案例列表",
            ignoreLogin: true
          }
        },
        {
          path: "/main/home/weddingDetail/:id",
          name: "mainHomeWeddingDetail",
          component: () => import("@views/main/WeddingDetail.vue"),
          meta: {
            title: "案例详情",
            ignoreLogin: true
          }
        },
        {
          path: "/main/home/connectUs",
          name: "mainHomeConnectUs",
          component: () => import("@views/main/connectUs.vue"),
          meta: {
            title: "联系我们",
            ignoreLogin: true
          }
        }
      ]
    }
  ]
};
