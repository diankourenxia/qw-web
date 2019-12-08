import ContainerLayout from "@components/ContainerLayout.vue";
import ConfigMore from "@views/config/ConfigMore.vue";

export default {
  path: "/",
  name: "config",
  component: ContainerLayout,
  redirect: "/config/more/wedding",
  children: [
    {
      path: "/config/more",
      name: "configBusiness",
      component: ConfigMore,
      redirect: "/config/more/product",
      children: [
        {
          path: "/config/more/wedding",
          name: "configWedding",
          component: () => import("@views/config/wedding.vue"),
          meta: {
            title: "栖吾创意-婚礼案例管理",
            ignoreLogin: true
          }
        },
        {
          path: "/config/more/baseConfig",
          name: "baseConfig",
          component: () => import("@views/config/BaseConfig.vue"),
          meta: {
            title: "栖吾创意-基础信息",
            ignoreLogin: true
          }
        }
      ]
    }
  ]
};
