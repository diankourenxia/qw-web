<template>
  <div class="wrapper">
    <img src="@assets/images/base/ic_404.png" class="img" />
    <k-text large secondary>当前页面丢失</k-text>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Error404 extends Vue {}
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  height 100vh
  flex-direction column
  align-items center
  justify-content center
  .img
    width 240px
    height auto
</style>
