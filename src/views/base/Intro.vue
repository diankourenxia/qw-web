<template>
  <div class="wrapper">
    <img :src="getSource('intro1.png')" class="img-top" />
    <img :src="getSource('intro2.png')" class="img-down" />
    <img :src="getSource('intro3.png')" class="img-down" />
    <img :src="getSource('intro4.png')" class="img-down" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Intro extends Vue {
  pre = "https://ks-static.kuaixe.com/img/";

  getSource(name: string) {
    return this.pre + name;
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  flex-direction column
  align-items center
  .img-top
    width 100%
    height auto
    margin-bottom 10px
  .img-down
    width 70%
    height auto
</style>
