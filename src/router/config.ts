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
            title: "快打单-测试",
            ignoreLogin: true
          }
        },
        {
          path: "/config/more/baseConfig",
          name: "baseConfig",
          component: () => import("@views/config/BaseConfig.vue"),
          meta: {
            title: "快打单-测试2",
            ignoreLogin: true
          }
        }
      ]
    }
  ]
};
