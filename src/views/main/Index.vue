<template>
  <div class="index-container">
    <img src="@assets/images/base/case-logo.png" alt="" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class HomeIndex extends Vue {}
</script>
<style lang="stylus">
.index-container
  position relative
  height 100vh
  img
    position absolute
    margin auto
    top 0
    bottom 0
    right 0
    left 0
    max-width 100%
    padding-bottom 126px
.el-drawer
  background #f1f1f1
.el-drawer__header
  height 0
  margin 0
  // padding 0
  .el-icon-close
    opacity 0
</style>
