<template>
  <div class="connect-container" v-if="loaded">
    <el-row class="logo">
      <el-row style="height:20%;width:100%" class="logo">
        <el-image :src="userInfo.logo" />
      </el-row>
    </el-row>
    <el-row class="content">
      <el-row>
        <span> {{ userInfo.describe }}</span>
      </el-row>
    </el-row>
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
    this.getUserInfo();
  }
  getUserInfo() {
    configApi.getUserInfo({}).then((res: any) => {
      this.userInfo = res[0];
      this.loaded = true;
    });
  }
}
</script>
<style lang="stylus">
.connect-container
  .logo
    text-align center
  .content
    padding 30px 50px
    font-size 18px
    color #c29b69
    line-height 53px
    text-align left
    text-shadow 0 0 10px #fff
.el-drawer
  background #f1f1f1
.el-drawer__header
  height 0
  margin 0
  // padding 0
  .el-icon-close
    opacity 0
</style>
