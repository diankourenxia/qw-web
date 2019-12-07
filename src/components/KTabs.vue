<template>
  <div class="tabs-wrapper">
    <slot />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";

@Component({})
export default class KTabs extends Vue {
  @Model("change") currentTab!: string;

  created() {
    this.$on("tab-change", (command: string) => {
      this.$emit("change", command);
    });
  }
}
</script>

<style lang="stylus" scoped>
.tabs-wrapper
  display flex
  line-height 45px
  align-items center
  background-color $color-background-deep
  padding-left 10px
  padding-right 10px
  padding-top 6px
  border-radius 6px 6px 0px 0px
</style>
