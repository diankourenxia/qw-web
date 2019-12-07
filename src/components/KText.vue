<template>
  <p
    class="text-default"
    :class="classObject"
    @click="
      () => {
        $emit('click');
      }
    "
  >
    <slot />
  </p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class KText extends Vue {
  @Prop(Boolean) readonly primary?: boolean;
  @Prop(Boolean) readonly inverse?: boolean;
  @Prop(Boolean) readonly regular?: boolean;
  @Prop(Boolean) readonly secondary?: boolean;
  @Prop(Boolean) readonly exlarge?: boolean;
  @Prop(Boolean) readonly large?: boolean;
  @Prop(Boolean) readonly medium?: boolean;
  @Prop(Boolean) readonly small?: boolean;
  @Prop(Boolean) readonly exsmall?: boolean;

  classObject = {
    "text-color-primary": this.primary,
    "text-color-inverse": this.inverse,
    "text-color-regular": this.regular,
    "text-color-secondary": this.secondary,
    "text-size-extra-large": this.exlarge,
    "text-size-large": this.large,
    "text-size-medium": this.medium,
    "text-size-small": this.small,
    "text-size-extra-small": this.exsmall
  };
}
</script>

<style lang="stylus" scoped>
.text-default
  outline none
  font-size $font-size-base
  color $color-text-regular
.text-color-primary
  color $color-text-primary
.text-color-inverse
  color white
.text-color-regular
  color $color-text-regular
.text-color-secondary
  color $color-text-secondary
.text-size-extra-large
  font-size $font-size-extra-large
.text-size-large
  font-size $font-size-large
.text-size-medium
  font-size $font-size-medium
.text-size-base
  font-size $font-size-base
.text-size-small
  font-size $font-size-small
.text-size-extra-small
  font-size $font-size-extra-small
</style>
