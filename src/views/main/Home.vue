<template>
  <div class="wrapper">
    <el-container class="main-home">
      <el-main>
        <i
          class="menu-icon"
          :class="drawer ? '' : 'el-icon-menu'"
          @click="showMenu"
          v-if="
            $route.fullPath === '/main/home/index' ||
              $route.fullPath === '/main/home/aboutUs' ||
              $route.fullPath === '/main/home/category' ||
              $route.fullPath === '/main/home/connectUs'
          "
        ></i>
        <router-view></router-view>
        <el-drawer
          :visible.sync="drawer"
          direction="rtl"
          size="180px"
          :show-close="false"
        >
          <ul>
            <li
              v-for="item in menuList"
              :key="item.label"
              class="menu-item"
              :class="{ choosed: $route.fullPath === item.path }"
              @click.stop="gotoUrl(item.path)"
            >
              <i :class="item.icon"></i><span>{{ item.label }}</span>
              <ul v-if="item.children" class="">
                <li
                  v-for="items in item.children"
                  :key="items.label"
                  class="child-menu-item"
                  :class="{ choosed: $route.fullPath === items.path }"
                  @click.stop="gotoUrl(items.path)"
                >
                  <i :class="items.icon"></i><span>{{ items.label }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </el-drawer>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ConfigMore extends Vue {
  drawer = false;
  showMenu() {
    this.drawer = true;
  }
  menuList = [
    {
      icon: "el-icon-s-home",
      label: "首页",
      path: "/main/home/index"
    },
    {
      icon: "el-icon-s-order",
      label: "婚礼案例",
      path: "/main/home/weddingList",
      children: [
        {
          icon: "el-icon-price-tag",
          label: "按价格",
          path: "/main/home/category/price"
        },
        {
          icon: "el-icon-view",
          label: "按主题",
          path: "/main/home/category/style"
        }
      ]
    },
    {
      icon: "el-icon-user-solid",
      label: "关于我们",
      path: "/main/home/aboutUs"
    },
    {
      icon: "el-icon-phone",
      label: "联系我们",
      path: "/main/home/connectUs"
    }
  ];
  gotoUrl(url: string) {
    this.drawer = false;
    this.$router.push(url);
  }
  handleSelect(key: string, keyPath: string[]) {
    if (this.$route.path !== key) {
      this.$router.push({ path: key });
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-icon
  font-size 32px
  position fixed
  top 20px
  right 20px
  color rgb(218, 173, 117)
  z-index 999
  opacity 0.6
  &.el-icon-circle-close
    right 200px
.wrapper
  flex 1
  height 100%
  .menu
    min-height 100%
    width 160px
    border none
    .el-menu-item
      border-1px(bottom)
  i
    margin-right 10px
.new-svg
  position absolute
  width 30px
  top 5px
.main-home
  height 100%
  width 100%
  max-width 600px
  position absolute
  margin auto
  top 0
  bottom 0
  left 0
  right 0
  .el-drawer__header
    height 0
.el-main
  padding 0
.menu-item
  width 100%
  min-height 60px
  line-height 60px
  text-align left
  padding-left 15px
  // border-bottom 1px solid #c3c3c3
  position relative
  &:after
    content ''
    position absolute
    left 0
    bottom 0
    right 0
    height 1px
    background #c3c3c3
  i
    color #999
    font-size 20px
  span
    margin-left 10px
    width 40%
    display inline-block
    text-align left
    color #a0a09f
    height 100%
    font-size 16px
  &:first-child
    span
      letter-spacing 16px
  .child-menu-item
    margin-left 20%
    // border-bottom 1px solid #c3c3c3
.choosed
  i, span
    color #c29b69 !important
</style>
