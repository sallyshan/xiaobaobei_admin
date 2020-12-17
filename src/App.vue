<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /** 修复表格错位 */
  body .el-table th.gutter {
    display: table-cell !important;
}
</style>
