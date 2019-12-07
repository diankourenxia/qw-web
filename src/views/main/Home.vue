<template>
  <div class="wrapper">
    <el-container class="main-home">
      <el-main>
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
  border 1px solid black
</style>
