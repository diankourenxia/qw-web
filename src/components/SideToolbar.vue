<template>
  <div class="toolbar-wrapper">
    <div class="item-wrapper" @click="handleService">
      <i class="icon k-icon-service"></i>
      <p>联系客服</p>
    </div>
    <div class="item-wrapper" @click="handleHelper" style="margin:2px 0">
      <i class="icon k-icon-question-circle" style="font-size:24px"></i>
      <p>帮助中心</p>
    </div>
    <el-popover placement="left" trigger="hover">
      <div slot="reference" class="item-wrapper">
        <i class="icon k-icon-qr"></i>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:130px">
          <k-text primary base>扫码关注微信公众号</k-text>
          <k-text secondary small>及时获取重要通知</k-text>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { UserInfo } from "@interface/common.interface";

@Component
export default class SideToolbar extends Vue {
  handleService() {}

  handleHelper() {
    const route = this.$router.resolve({ path: "/system/help" });
    window.open(route.href, "_blank");
  }
}
</script>

<style lang="stylus" scoped>
.img-qr
  width 150px
  height 150px
.toolbar-wrapper
  position absolute
  background-color white
  display flex
  right 0
  width 50px
  flex-wrap wrap
  bottom 40vh
  -webkit-box-shadow 0 0 10px rgba(0, 0, 0, 0.12)
  box-shadow 0 0 10px rgba(0, 0, 0, 0.12)
  cursor pointer
  z-index 2000
  .item-wrapper
    writing-mode horizontal-tb
    background-color #D1E8FD
    width 48px
    height 48px
    flex-center(row)
    i
      font-size 20px
      color #006AFF
    p
      width 30px
      position absolute
      color transparent
    &:hover
      background-color #006AFF
      i
        color transparent
      p
        color white
      &:last-child
        i
          color white
</style>
