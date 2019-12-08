<template>
  <div class="category-container" v-if="loaded">
    <el-row class="logo">
      <el-row style="height:20%;width:100%" class="logo">
        <el-image :src="userInfo.logo" />
      </el-row>
    </el-row>
    <el-row class="title" v-if="type === 'price'">婚礼案例 - 按价格</el-row>
    <el-row class="title" v-else>婚礼案例 - 按主题 </el-row>
    <el-row class="content">
      <el-row
        v-for="item in categoryList"
        :key="item"
        class="content-item"
        @click.native="gotoList"
      >
        <span v-if="type !== 'price'"> {{ item }}</span>
        <span v-else>
          {{
            tranNumber(item.split("/")[0]) +
              "到" +
              tranNumber(item.split("/")[1])
          }}</span
        >
        <i class="el-icon-caret-right"></i>
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
  loaded = false;
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
      this.loaded = true;
    });
  }
  gotoList() {
    this.$router.push("/main/home/weddingList");
  }
  tranNumber(num: number) {
    let numStr = num.toString();
    // 十万以内直接返回
    if (numStr.length < 5) {
      return numStr;
    }
    //大于8位数是亿
    else if (numStr.length > 8) {
      let decimal = numStr.substring(numStr.length - 8, numStr.length - 8);
      return (
        parseFloat(parseInt(Number(num) / 100000000 + "") + "." + decimal) +
        "亿"
      );
    }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length >= 4) {
      let decimal = numStr.substring(numStr.length - 3, numStr.length - 3);
      return (
        parseFloat(parseInt(Number(num) / 10000 + "") + "." + decimal) + "万"
      );
    }
  }

  handleQueryCategory() {
    let param = {};
    configApi.getCategoryList(param).then((res: any) => {
      this.categoryParam = res[0];
      this.priceRange.dynamicTags = res[0].price.list;
      this.categoryTags.dynamicTags = res[0].style.list;
      console.log(this.$route.params);
      if (this.$route.params.type === "price") {
        //@ts-ignore
        this.categoryList = this.priceRange.dynamicTags;
      } else {
        //@ts-ignore
        this.categoryList = this.categoryTags.dynamicTags;
      }
    });
  }
  @Watch("$route.path", { immediate: true })
  onChangeRoute(val: any) {
    this.type = this.$route.params.type;
    if (this.$route.params.type === "price") {
      //@ts-ignore
      this.categoryList = this.priceRange.dynamicTags;
    } else {
      //@ts-ignore
      this.categoryList = this.categoryTags.dynamicTags;
    }
  }
}
</script>
<style lang="stylus">
.category-container
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
