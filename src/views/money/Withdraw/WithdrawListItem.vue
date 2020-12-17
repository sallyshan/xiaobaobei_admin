<template>
  <el-card shadow="hover">
    <div class="main">
      <div class="left-content">
        <div class="left-top-line">
          <div style="flex: 1">{{ withdraw.createTime }}</div>
          <div style="flex: 1">申请方：{{ withdraw.username }}</div>
          <div style="flex: 1">提现金额：￥{{ (withdraw.money/100.0).toFixed(2) }}</div>
          <div style="flex: 1">账户余额：￥{{ (withdraw.balance/100.0).toFixed(2) }}</div>
        </div>
        <div class="left-center-line">
          收款账户：
          <span style="padding-left: 10px;padding-right: 20px">户名：{{ withdraw.accountName }}</span>
          <span style="padding-right: 20px">开户行：{{ withdraw.accountBank }}</span>
          收款账号：{{ withdraw.account }}
        </div>
        <div v-if="withdraw.type === 1" class="left-bottom-line">
          发票销售方：{{ withdraw.bill }} <span style="margin-left: 20px"/>
          纳税号：{{ withdraw.taxNumber }}<span style="margin-left: 20px"/>
          开票金额：￥{{ (withdraw.money/100.0).toFixed(2) }}<span style="margin-left: 20px"/>
          <el-button style="font-size: 14px" type="text" @click="showBillImg">查看发票图片</el-button>
        </div>
      </div>
      <div class="right-content">
        <slot name="right-content"/>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div style="width: 100%;text-align: center">
        <el-image :src="getImgUrl(withdraw.billImg)"/>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    withdraw: {
      type: Object,
      default: function() {
        return {
          userId: '',
          money: '',
          phone: '',
          balance: '',
          partnerTradeNo: '',
          paymentNo: '',
          type: '',
          status: '',
          reason: '',
          accountBank: '',
          accountName: '',
          account: '',
          createTime: '',
          updateTime: '',
          id: '',
          bill: '暂无',
          taxNumber: '暂无',
          billImg: ''
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    getImgUrl(uri) {
      return process.env.VUE_APP_IMAGE_URL + uri
    },
    showBillImg() {
      if (this.withdraw.billImg && this.withdraw.billImg !== '') {
        this.dialogVisible = true
      } else {
        this.$message.info('暂无发票图片')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    margin-bottom: 6px;
    padding-bottom: 0;
  }
  .main {
    font-size: 14px;
    display: flex;

    .left-content {
      display: flex;
      flex: 1;
      flex-direction: column;

      .left-top-line {
        display: flex;
        flex: 1;
        font-size: 14px;
      }

      .left-center-line {
        margin-top: 20px;
      }

      .left-bottom-line {
        margin-top: 10px;
      }
    }

    .right-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px;
      height: 100%;
    }
  }
</style>
