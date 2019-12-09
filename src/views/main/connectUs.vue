<template>
  <div class="connect-container">
    <el-row class="logo">
      <el-row style="height:20%;width:100%" class="logo">
        <el-image :src="userInfo.logo" />
      </el-row>
    </el-row>
    <el-row class="content">
      <el-row>
        <i class="el-icon-time"></i><span> {{ userInfo.timeRange }}</span>
      </el-row>
      <el-row>
        <i class="el-icon-mobile-phone"></i
        ><span> 联系方式：{{ userInfo.phone }}</span>
      </el-row>
      <el-row v-if="userInfo.weibo">
        <i class="el-icon-paperclip"></i
        ><span> 微博名称：{{ userInfo.weibo }}</span>
      </el-row>
      <el-row v-if="userInfo.qrCode" @click.native="showQrCode">
        <i class="el-icon-chat-line-round"></i
        ><span> 点击获取客户微信二维码</span>
      </el-row>
      <el-row>
        <i class="el-icon-office-building"></i
        ><span> {{ userInfo.address }}</span>
      </el-row>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" width="70%">
      <span
        ><el-image :src="userInfo.qrCode" alt="" />
        <el-row style="text-align:center;color:#c29b69"
          >(长按可保存二维码)</el-row
        ></span
      >
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import * as configApi from "@api/config";
@Component
export default class HomeIndex extends Vue {
  userInfo = {};
  dialogVisible = false;
  created() {
    // this.getUserInfo();
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
  }
  showQrCode() {
    this.dialogVisible = true;
  }
  getUserInfo() {
    configApi.getUserInfo({}).then((res: any) => {
      this.userInfo = res[0];
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
