<template>
  <div class="app-container">
    <withdraw :type="1"/>
  </div>
</template>

<script>

import Withdraw from '../Withdraw'
export default {
  name: 'EnterpriseWithdraw',
  components: { Withdraw }
}
</script>

<style scoped>

</style>
