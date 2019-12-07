<template>
  <div
    :class="{ selected: $parent.currentTab == command }"
    class="tab-pane-wrapper"
    @click="handleClickPane"
  >
    <i :class="`icon k-icon-${icon}`" style="margin-right:2px" />
    {{ label }}
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class KTabPane extends Vue {
  @Prop({ default: "" }) readonly label!: string;
  @Prop({ default: "" }) readonly icon!: string;
  @Prop({ default: "" }) readonly command!: string;

  handleClickPane() {
    this.$parent.$emit("tab-change", this.command);
  }
}
</script>

<style lang="stylus" scoped>
.tab-pane-wrapper
  width 140px
  background-color #E9F1F8
  border-radius 4px 4px 0px 0px
  text-align center
  cursor pointer
  color #6A8DB0
  border-radius 6px 6px 0px 0px
  &:hover
    color $color-primary
.selected
  color $color-primary
  background-color #fff
</style>
