<template>
  <el-dialog
    @close="() => this.$emit('close')"
    @opened="() => this.$emit('opened')"
    class="dialog"
    :width="width"
    :center="true"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :fullscreen="false"
    :append-to-body="true"
    :destroy-on-close="true"
  >
    <div
      :class="{ 'dialog-wrapper': true, 'dialog-scroll-wrapper': fixedScroll }"
    >
      <slot></slot>
    </div>
    <div slot="title" class="title-wrapper">
      <slot name="icon"></slot>
      <p class="title">{{ title }}</p>
    </div>

    <div slot="footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from "vue-property-decorator";

@Component
export default class KDialog extends Vue {
  @Prop({ default: "" })
  readonly title!: string;
  @Prop({ default: "50%" })
  readonly width!: string;
  @Prop({
    type: Boolean,
    default: () => {
      return false;
    }
  })
  readonly fixedScroll!: boolean;

  dialogVisible = false;

  open() {
    this.dialogVisible = true;
  }

  close() {
    this.dialogVisible = false;
  }
}
</script>

<style lang="stylus" scoped>
.dialog
  background-color rgba(0, 0, 0, 0.3)
  text-align center
.dialog-wrapper
  max-height 600px
.dialog-scroll-wrapper
  overflow-y scroll
.title-wrapper
  display flex
  .title
    color $color-text-primary
    font-size $font-size-large
    font-weight 500
    margin-left 20px
</style>
