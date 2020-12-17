<template>
  <div class="number-card">
    <div class="text-num">{{ num }}</div>
    <div class="text-title">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: 'DataCard',
  props: {
    num: {
      type: String,
      default: ' '
    },
    label: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style scoped>
  .number-card {
    height: 100px;
    max-width: 200px;
    /*margin: 20px;*/
    background-color: #ff8c00;
    border-radius: 5px;
  }

  .text-num {
    color: white;
    width: 100%;
    text-align: center;
    padding-top: 27px
  }

  .text-title {
    color: white;
    width: 100%;
    text-align: center;
    padding-top: 5px;
  }
</style>
