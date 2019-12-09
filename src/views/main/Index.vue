<template>
  <div class="index-container" v-if="loaded">
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
    if (JSON.parse(sessionStorage.getItem("userInfo") || "")) {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
      this.loaded = true;
    } else {
      this.getUserInfo();
    }
  }
  getUserInfo() {
    configApi.getUserInfo({}).then((res: any) => {
      this.userInfo = res[0];
      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
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
