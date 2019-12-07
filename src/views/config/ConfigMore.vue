<template>
  <div class="wrapper">
    <el-container style="height:100%">
      <el-aside width="180px">
        <el-menu
          class="menu"
          :default-active="this.$route.path"
          @select="handleSelect"
        >
          <el-menu-item index="/config/more/wedding"
            ><i class="icon k-icon-aside-name"></i>案例</el-menu-item
          >
          <el-menu-item index="/config/more/baseConfig"
            ><i class="icon k-icon-aside-address"></i>基本信息</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main style="background-color:white">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ConfigMore extends Vue {
  handleSelect(key: string, keyPath: string[]) {
    if (this.$route.path !== key) {
      this.$router.push({ path: key });
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
