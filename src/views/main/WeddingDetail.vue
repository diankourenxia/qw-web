<template>
  <div style="height:100%;padding:0 20px" class="detail-container">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in weddingParam.picItems" :key="index">
        <template v-if="index !== 0">
          <transition
            appear
            v-for="(items, i) in item.picList"
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut"
            :key="items"
          >
            <el-image
              :class="{
                'img-delay': i === 1,
                'img-one': item.picList.length === 1
              }"
              fit="scale-down"
              :src="items"
              v-if="index === $refs.mySwiper.swiper.activeIndex"
            />
          </transition>
        </template>
        <template v-if="index === 0">
          <el-row style="height:100%" class="first-page-container">
            <el-row style="height:20%;width:100%" class="logo">
              <el-image
                fit="contain"
                :src="userInfo && userInfo.logo"
                style="margin-top:-15px"
              />
            </el-row>
            <el-row style="height:45%">
              <transition
                appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated fadeOut"
                duration="1000"
              >
                <el-image
                  fit="scale-down"
                  :src="weddingParam.picItems[0].picList[0]"
                  v-if="0 === $refs.mySwiper.swiper.activeIndex"
              /></transition>
            </el-row>
            <el-row style="height:30%">
              <transition
                appear
                enter-active-class="animated fadeIn delay-1s"
                leave-active-class="animated fadeOut"
              >
                <textarea
                  v-if="0 === $refs.mySwiper.swiper.activeIndex"
                  class="describe-container"
                  v-model="weddingParam.describe"
                  disabled
                ></textarea
              ></transition>
            </el-row>
          </el-row>
        </template>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
    <div
      class="arr"
      v-if="
        showArr &&
          $refs.mySwiper.swiper.activeIndex !== weddingParam.picItems.length - 1
      "
    >
      向上滑动，查看更多
    </div>
    <div
      class="back"
      v-if="
        showArr &&
          $refs.mySwiper.swiper.activeIndex === weddingParam.picItems.length - 1
      "
    >
      <img src="@assets/images/base/back.png" alt="" @click="gotoList" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import * as configApi from "@api/config";
//@ts-ignore
// import "swiper/dist/css/swiper.css";
// require styles
import "@assets/stylus/swiper.css";
//@ts-ignore
import { swiper, swiperSlide } from "vue-awesome-swiper";

@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class WeddingList extends Vue {
  weddingParam = {};
  rightIndex = 0;
  showArr = false;
  swiperOption = {
    // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>
    // 假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
    notNextTick: true,
    // swiper configs 所有的配置同swiper官方api配置
    autoplay: false,
    direction: "vertical",
    grabCursor: true,
    setWrapperSize: true,
    autoHeight: true,
    // pagination: ".swiper-pagination",
    paginationClickable: true,
    // prevButton: ".swiper-button-prev", //上一张
    // nextButton: ".swiper-button-next", //下一张
    // scrollbar: ".swiper-scrollbar", //滚动条
    mousewheelControl: true,
    observeParents: true,
    on: {
      slideChange() {
        //@ts-ignore
        if (this.activeIndex === 0) {
          //@ts-ignore

          self.menuCross = true;
        } else {
          //@ts-ignore

          self.menuCross = false;
        }
      }
    }
  };
  userInfo = {};
  computed() {}
  created() {
    let id = this.$route.params.id;
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
    // configApi.getUserInfo({}).then((res: any) => {
    //   this.userInfo = res[0];
    //   console.log(this.userInfo);
    configApi.getWedding({ id }).then(res => {
      this.weddingParam = res[0];
      this.showArr = true;
    });
    // });
  }
  getUserInfo() {
    configApi.getUserInfo({}).then((res: any) => {
      this.userInfo = res[0];
      console.log(this.userInfo);
    });
  }
  gotoList() {
    console.log(window.history);
    if (window.history.length <= 1) {
      this.$router.push("/main/home/WeddingList");
    } else {
      this.$router.back();
    }
    console.log(this.$route);
    // this.$router.back();
  }
  mounted() {
    //@ts-ignore
  }
  callback(e: any) {
    this.rightIndex = e.realIndex;
  }
}
</script>
<style lang="stylus">
.swiper-container-autoheight, .swiper-container-autoheight .swiper-slide
  height 100%
.detail-container
  .el-image
    margin-top 20px
    width 100%
    text-align center
  .img-one
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    margin-top -80px
  .img-delay
    -webkit-animation-delay 0.8s
    animation-delay 0.8s
@keyframes arrowUp
  0%, 30%
    opacity 0
    -webkit-transform translate(0, 10px)
  60%
    opacity 1
    -webkit-transform translate(0, 0)
  100%
    opacity 0
    -webkit-transform translate(0, -10px)
@keyframes bg
  00%
    background-position 0 0
  100%
    background-position -640px 0
@keyframes bg2
  00%
    background-position 0 0
  100%
    background-position -462px 0
.arr
  position absolute
  z-index 3
  left 50%
  bottom 3%
  margin-left -105px
  width 210px
  height 30px
  text-align center
  color #c17b117a
  font-weight 700
  font-size 14px
  letter-spacing 4px
  opacity 0.7
  // background url('../../assets/images/base/arr-1.png') bottom no-repeat
  &:after
    content ''
    position absolute
    left 0
    top -40px
    right 0
    height 24px
    background url('../../assets/images/base/arr-1.png') top no-repeat
    pointer-events none
    -webkit-animation arrowUp 2s infinite
    background-size 80%
    opacity 0.7
.first-page-container
  height 100%
  .logo
    text-align center
    img
      max-height 100%
      max-width 100%
.describe-container
  width 100%
  height 100%
  background #ff000000
  border 0
  text-align center
  color #c3955c
  font-size 16px
  line-height 25px
.back
  position absolute
  z-index 3
  left 50%
  bottom 6%
  margin-left -105px
  width 210px
  text-align center
  color #c17b117a
  font-weight 700
  font-size 14px
  letter-spacing 4px
  img
    width 60px
</style>
