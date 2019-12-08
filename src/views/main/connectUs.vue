<template>
  <div>
    <el-row class="logo">
      <el-row style="height:20%;width:100%" class="logo">
        <img src="@assets/images/base/case-logo.png" />
      </el-row>
    </el-row>
    <el-row>
      <i class="el-icon-time"></i><span>{{ userInfo.timeRange }}</span>
    </el-row>
    <el-row>
      <i class="el-icon-mobile-phone"></i
      ><span>联系方式：{{ userInfo.phone }}</span>
    </el-row>
    <el-row v-if="userInfo.weibo">
      <i class="el-icon-paperclip"></i
      ><span>微博名称：{{ userInfo.weibo }}</span>
    </el-row>
    <el-row v-if="userInfo.qrCode">
      <i class="el-icon-chat-line-round"></i><span>点击获取客户微信二维码</span>
    </el-row>
    <el-row>
      <i class="el-icon-office-building"></i><span>{{ userInfo.address }}</span>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import * as configApi from "@api/config";
@Component
export default class HomeIndex extends Vue {
  userInfo = {};
  created() {
    this.getUserInfo();
  }
  getUserInfo() {
    configApi.getUserInfo({}).then((res: any) => {
      this.userInfo = res[0];
    });
  }
}
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
