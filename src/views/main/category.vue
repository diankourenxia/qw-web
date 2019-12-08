<template>
  <div class="connect-container">
    <el-row class="logo">
      <el-row style="height:20%;width:100%" class="logo">
        <img src="@assets/images/base/case-logo.png" />
      </el-row>
    </el-row>
    <el-row class="title"
      >婚礼案例 - {{ type === "prie" ? "按价格" : "按主题" }}</el-row
    >
    <el-row class="content">
      <el-row v-for="item in categoryList" :key="item" class="content-item">
        <span> {{ item }}</span
        ><i class="el-icon-caret-right"></i>
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
  categoryTags = {
    dynamicTags: ["唯美/清新"]
  };
  priceRange = {
    dynamicTags: ["0/5000"]
  };
  categoryList = [];
  type = "price";
  created() {
    this.getUserInfo();
    this.handleQueryCategory();
  }

  categoryParam = {};
  getUserInfo() {
    configApi.getUserInfo({}).then((res: any) => {
      this.userInfo = res[0];
    });
  }
  handleQueryCategory() {
    let param = {};
    configApi.getCategoryList(param).then((res: any) => {
      this.categoryParam = res[0];
      this.priceRange.dynamicTags = res[0].price.list;
      this.categoryTags.dynamicTags = res[0].style.list;
      if (this.$route.params.type === "price") {
        //@ts-ignore
        this.categoryList = this.priceRange.dynamicTags;
      } else {
        //@ts-ignore
        this.categoryList = this.categoryTags.dynamicTags;
      }
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
    text-align center
    text-shadow 0 0 10px #fff
    .content-item
      border-bottom 1px solid rgba(216, 192, 160, 0.36)
      height 60px
      line-height 60px
      text-align left
      width 200px
      display inline-block
      position relative
      i
        position absolute
        right 10px
        top 20px
  .title
    margin-top 15px
    width 100%
    text-align center
    font-size 20px
    color #c29b69
    opacity 0.6
.el-drawer
  background #f1f1f1
.el-drawer__header
  height 0
  margin 0
  // padding 0
  .el-icon-close
    opacity 0
</style>
