<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="stylus">
#app
  font-family 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-ser
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  font-size $font-size-base
  color $color-text-regular
  margin 0
  padding 0
  width 99.5%
  height 100%
.table-index-number
  width 24px
  height 24px
  rounded(12px)
  text-align center
  color $color-text-primary
  background rgba(217, 220, 226, 1)
</style>
