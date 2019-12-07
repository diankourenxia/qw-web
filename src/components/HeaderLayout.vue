<template>
  <div class="headerWrapper" v-loading.fullscreen.lock="fullscreenLoading">
    <el-row style="flex:8;min-width:320px">
      <template v-for="(item, index) in routeMapArr">
        <el-col
          :key="index"
          :span="3"
          class="router-menu-col"
          v-if="!item.children"
          style="min-width:80px"
        >
          <router-link :to="item.path">
            <k-text
              class="tab-title-link"
              :class="{ 'tab-title-link-active': selectedIndex === index }"
              inverse
              medium
              >{{ item.title }}
            </k-text>
          </router-link>
        </el-col>

        <el-col v-if="item.children" :key="index" :span="3">
          <el-dropdown>
            <k-text
              class="tab-title-link"
              :class="{ 'tab-title-link-active': selectedIndex === index }"
              inverse
              medium
            >
              {{ item.title }}

              <i class="el-icon-caret-bottom"></i>
            </k-text>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(data, _index) in item.children">
                <router-link :to="data.path" :key="_index + 'sub'">
                  <el-dropdown-item
                    >&nbsp;&nbsp;{{ data.title }}&nbsp;&nbsp;</el-dropdown-item
                  >
                </router-link>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { UserInfo } from "@interface/common.interface";

@Component
export default class HeaderLayout extends Vue {
  selectedIndex: number = 0;
  fullscreenLoading = false;

  rightRoute = "";
  routeMapArr = [
    {
      title: "内容设置",
      path: "/config/more/wedding"
    }
  ];

  routeIndex: { [key: string]: number } = {
    "/config/more/address": 4,
    "/config/more/order": 4,
    "/config/more/product": 4
  };

  @Watch("$route.path", { immediate: true })
  onRouteChange(val: string) {
    if (val === "/customize") {
      this.rightRoute = "customize";
      this.fullscreenLoading = false;
    }
    this.selectedIndex = this.routeIndex[val];
  }

  handleCommand(command: string) {}

  handleTest() {}
}
</script>

<style lang="stylus" scoped>
.headerWrapper
  display flex
  align-items center
  width 99%
  .logo-img
    margin-right 5vw
    margin-top -4px
    cursor pointer
    width 100px
    height auto
  .fp-logo
    position absolute
    top 8px
    left 70px
    width 53px
  .user-img
    width 18px
    margin-right 8px
  .router-menu-col
    position relative
    .new-svg
      margin-bottom 25px
      width 25%
      max-width 34px
      position absolute
      top 6px
      margin-left 3vw
  .tab-title-link
    cursor pointer
    opacity 0.9
    display flex
    line-height 60px
    align-items center
    justify-content center
    &:hover
      font-weight 600
      opacity 1
      font-size 17px
      // background-color rgba(0, 0, 0, 0.1)
  .tab-title-link-active
    font-weight 600
    font-size 17px
    opacity 1
  .help-text
    display flex
    font-size $font-size-small
    color white
    cursor pointer
    opacity 0.9
    height 50px
    align-items center
    margin-right 40px
    min-width 80px
    &:hover
      font-weight 600
      opacity 1
  .user-wrapper
    // width 150px
    justify-content flex-end
    @extend flex-row
</style>
