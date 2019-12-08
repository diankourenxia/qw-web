<template>
  <div>
    1
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class HomeIndex extends Vue {}
</script>
<style lang="stylus">
.el-drawer
  background #f1f1f1
.el-drawer__header
  height 0
  margin 0
  // padding 0
  .el-icon-close
    opacity 0
</style>
