<template>
  <div class="index-container">
    <el-image :src="userInfo.logo" alt="" v-if="loaded" fit="contain" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import * as configApi from "@api/config";

@Component
export default class HomeIndex extends Vue {
  userInfo = {};
  loaded = false;
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
    this.loaded = true;
  }
  getUserInfo() {
    configApi.getUserInfo({}).then((res: any) => {
      return res[0];
    });
  }
}
</script>
<style lang="stylus">
.index-container
  position relative
  height 100vh
  .el-image
    position absolute
    margin auto
    top 0
    bottom 0
    right 0
    left 0
    max-width 100%
    padding-bottom 126px
    text-align center
    img
      width 80%
.el-drawer
  background #f1f1f1
.el-drawer__header
  height 0
  margin 0
  // padding 0
  .el-icon-close
    opacity 0
</style>
