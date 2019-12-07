<template>
  <div style="height:100%">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in weddingParam.picItems" :key="index">
        <transition
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <el-image
            :src="item.picList[0]"
            alt=""
            v-if="index === $refs.mySwiper.swiper.activeIndex"
          />
        </transition>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
    <el-button @click="next">xxx</el-button>
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
  computed() {}
  created() {
    configApi.getWeddingList().then((res: any) => {
      this.weddingParam = res[0];
    });
  }
  next() {
    //@ts-ignore

    this.$refs.mySwiper.swiper.slideTo(0, 1000, false);
  }
  mounted() {
    //@ts-ignore
    this.$refs.mySwiper.swiper.slideTo(2, 1000, false);
  }
  callback(e: any) {
    this.rightIndex = e.realIndex;
    console.log(e);
  }
}
</script>
<style lang="stylus">
.swiper-container-autoheight, .swiper-container-autoheight .swiper-slide
  height 100%
</style>
