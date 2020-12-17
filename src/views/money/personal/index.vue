<template>
  <div class="app-container">
    <withdraw :type="0"/>
  </div>
</template>

<script>

import Withdraw from '../Withdraw'
export default {
  name: 'PersonalWithdraw',
  components: { Withdraw }
}
</script>

<style scoped>

</style>
