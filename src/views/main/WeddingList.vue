<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li
      v-for="i in weddingList"
      class="infinite-list-item"
      :key="i.id"
      @click="gotoDetail(i._id)"
    >
      <el-row class="page-pic">
        <el-image :src="i.pagePic" />
      </el-row>
      <el-row class="title">
        {{ i.title }}
      </el-row>
    </li>
  </ul>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import * as configApi from "@api/config";

@Component
export default class WeddingList extends Vue {
  count = 1;
  weddingList = [];
  created() {
    configApi.getWeddingList().then((res: any) => {
      this.weddingList = res;
    });
  }
  gotoDetail(id: string | number) {
    this.$router.push(`/main/home/weddingDetail/${id}`);
  }
  load() {
    this.count += 2;
  }
}
</script>
<style lang="stylus">
.infinite-list
  height 100%
  padding 0 20px
  .infinite-list-item
    height 270px
    width 100%
    margin-top 20px
    box-shadow 2px 2px 4px 1px #d6d6d6
    .el-image
      height 100%
      overflow hidden
      img
        width 100%
    .page-pic
      width 100%
      height 230px
    .title
      height 40px
      padding-left 30px
      line-height 40px
      font-size 18px
      color #c29b69
      background white
</style>
