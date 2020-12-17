<template>
  <el-card shadow="hover">
    <div class="card-container">
      <div class="card-container-item">
        <div style="flex: 1">
          <span v-if="order.status === 1">保单号：{{ order.bdNo }} </span>
          <span>下单时间：{{ order.createTime }}</span>
        </div>
        <div style="margin-left: 100px">
          <span>保险公司：大家保险 </span>
          <span>客服电话：400-3333-333 </span>
        </div>
        <div style="width: 100px;text-align: right">
          <div v-if="order.status===2" class="invalid">
            已失效
          </div>
        </div>
      </div>
      <div class="card-container-item center">
        <el-image :src="order.goodsCover" fit="cover"/>
        <div class="center-item center-item-left">
          <span class="goods-title">{{ order.goodsTitle }}</span>
          <span style="margin-top: 10px">{{ order.goodsDisc }}</span>
          <span/>
          <span>保费{{ (order.skuPrice / 100.0).toFixed(2) }}元/年</span>
        </div>
        <div class="center-item">
          <span>投保人：{{ order.phName }}</span>
          <span>被保人：{{ order.insuredName }}</span>
          <span>保额：{{ order.insureAmount + '  ' }}保障日期：{{ order.startDate }}至{{ order.endDate }}</span>
        </div>
        <div>
<!--          <el-button v-if="order.status === 1" size="default" type="primary" @click.stop="download">下载保单附件</el-button>-->
        </div>
      </div>
      <div class="card-container-item">
        <span>
          <span v-if="order.provinceId > 0">
            {{ order.provinceName }} 推广费：￥{{ (order.provinceAmount / 100.0).toFixed(2) }}
          </span>
          <span style="margin-left: 20px"/>
          <span v-if="order.cityId > 0">
            {{ order.cityName }}推广费：￥{{ (order.cityAmount / 100.0).toFixed(2) }}
          </span>
          <span style="margin-left: 20px"/>
          <span v-if="order.countyId > 0">
            {{ order.countyName }} 推广费 ￥{{ (order.countyAmount / 100.0).toFixed(2) }}
          </span>
          <span v-if="order.inviteId > 0">
            {{ order.inviteName }} 推广费 ￥{{ (order.inviteAmount / 100.0).toFixed(2) }}
          </span>
        </span>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getDownloadUrl } from '@/api/order'

export default {
  name: 'OrderListCard',
  props: {
    order: {
      type: Object,
      default: function() {
        return {
          no: '',
          checkNo: '',
          bdNo: '',
          insureCompany: '',
          insureAmount: '',
          startDate: '',
          endDate: '',
          userName: '',
          status: '',
          phId: '',
          phName: '',
          insuredId: '',
          insuredName: '',
          goodsId: '',
          goodsTitle: '',
          goodsDisc: '',
          goodsCover: '',
          goodsProportion: '',
          goodsProportion1: '',
          goodsProportion2: '',
          goodsProportionBalance: '',
          goodsType: '',
          createTime: '',
          updateTime: '',
          userId: '',
          skuId: '',
          skuName: '',
          skuCost: '',
          skuProfit: '',
          skuPrice: '',
          skuUnit: '',
          skuValue: '',
          provinceId: '',
          provinceName: '',
          provinceAmount: '',
          cityId: '',
          cityName: '',
          cityAmount: '',
          countyId: '',
          countyName: '',
          countyAmount: '',
          inviteId: '',
          inviteName: '',
          inviteAmount: '',
          rdseq: '',
          sourcenotecode: '',
          paymentcode: '',
          id: ''
        }
      }
    }
  },
  methods: {
    download(event) {
      window.location.href = getDownloadUrl(this.order.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 6px;
}

.card-container {
  display: flex;
  min-width: 500px;
  font-size: 14px;
  flex-direction: column;

  .card-container-item {
    display: flex;
  }

  .invalid {
    border: 2px red solid;
    border-radius: 999px;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    float: right;
    font-size: 13px;
    color: red;
  }

  .center {
    height: 77px;
    margin-top: 10px;
    margin-bottom: 10px;

    .el-image {
      height: 77px;
      width: 77px;
      margin-right: 15px;
      border-radius: 5px;
    }

    .center-item {
      flex: 1;
      display: flex;
      flex-direction: column;

      span {
        flex: 1;
        font-size: 14px;
      }

      .goods-title {
        font-family: "Arial Negreta", "Arial Normal", Arial, serif;
        font-weight: 700;
        font-style: normal;
        font-size: 16px;
      }
    }

    .center-item-left {
      span {
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial', serif;
        font-weight: 700;
        font-style: normal;
        font-size: 12px;
      }
    }
  }
}
</style>
