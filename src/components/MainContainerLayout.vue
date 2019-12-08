<template>
  <el-container class="container">
    <el-main class="main">
      <keep-alive>
        <router-view />
      </keep-alive>

      <el-backtop
        style="z-index:2001"
        :visibility-height="1500"
        :bottom="20"
        :right="100"
        target=".main"
      ></el-backtop>
      <!-- <side-toolbar /> -->
    </el-main>

    <!-- <el-footer></el-footer> -->
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HeaderLayout from "./HeaderLayout.vue";
import SideToolbar from "./SideToolbar.vue";

@Component({
  components: { HeaderLayout, SideToolbar }
})
export default class MainContainerLayout extends Vue {}
</script>

<style lang="stylus" scoped>
.container
  // background-color #E4E9F2
  position absolute
  height 100vh
  right 0
  left 0
  &:after
    content ''
    position fixed
    z-index -1
    top 0
    left 0
    right 0
    bottom 0
    background url('../assets/images/base/bg.jpg') repeat-x
    pointer-events none
    -webkit-animation bg 20s linear infinite
  .header
    background-image url('../assets/images/base/bg_main_header.png')
    background-size contain
    background-repeat no-repeat
    background-size 100% 100%
    flex-center(column)
  .main
    margin auto
    width 100%
    height 100%
    // background-color $color-background
@keyframes bg
  00%
    background-position 0 0
  100%
    background-position -640px 0
</style>
