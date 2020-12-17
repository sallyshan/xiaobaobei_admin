<template>
  <el-card class="box-card">
    <order-list-card :order="detail.order"/>
    <h3>投保人信息</h3>
    <div class="ph-body">
      <el-row :gutter="10">
        <el-col :span="6">
          <span>
            <span>
              姓名：   {{ detail.policyHolder.name }}
            </span>
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            证件类型 {{ detail.policyHolder.certType === 1 ? '身份证' : '统一信用代码' }} {{ detail.policyHolder.certNo }}
          </span>
        </el-col>
        <el-col :span="6">
          <span>
            <!--            出生日期   {{ detail.policyHolder.birthday }}-->
          </span>
        </el-col>
        <el-col :span="6">
          <span>
            <!--            性别    {{ detail.policyHolder.gender === 'F' ? '女' : '男' }}-->
          </span>
        </el-col>
      </el-row>
      <p/>
      <el-row :gutter="10">
        <el-col :span="6">
          <span>
            邮箱   {{ detail.policyHolder.email }}
          </span>
        </el-col>
        <el-col :span="6">
          <span>
            常住城市  {{ detail.policyHolder.address }}
          </span>
        </el-col>
        <el-col :span="6">
          <span>
            投保人手机  {{ detail.policyHolder.phone }}
          </span>
        </el-col>
        <el-col :span="6">
          <span>
            投保份数  1份
          </span>
        </el-col>
      </el-row>

    </div>
    <div style="display: flex;align-items: center;padding-right: 200px">
      <span class="title">投保人和被保人关系</span>
      <div style="text-align: center;flex:1">
        <span>关系</span><span style="margin-left: 100px">&nbsp;</span><span>其它</span>
      </div>
    </div>
    <hr>
    <h3>被保人信息</h3>
    <div v-for="(item, index) in detail.insureds" :key="index" class="ph-body">
      <el-row :gutter="10">
        <el-col :span="item.certType === 1 ? 8 : 6">
          <span>
            <span>
              姓名：  {{ item.name }}
            </span>
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            证件类型 {{ item.certType === 1 ? '身份证' : '统一信用代码' }}   {{ item.certNo }}
          </span>
        </el-col>
        <el-col :span="6">
          <span>
            <!--            出生日期  {{ item.birthday }}-->
          </span>
        </el-col>
        <el-col :span="6">
          <span>
            <!--            性别    {{ item.gender === 'F' ? '女' : '男' }}-->
          </span>
        </el-col>
      </el-row>
      <p/>
      <el-row :gutter="10">
        <el-col :span="item.certType === 1 ? 8 : 6">
          <span>
            邮箱 {{ item.email }}
          </span>
        </el-col>
        <el-col v-if="item.certType !== 1" :span="item.certType === 1 ? 8 : 6">
          <span>
            常住城市 {{ item.address }}
          </span>
        </el-col>
        <el-col :span="item.certType === 1 ? 8 : 6">
          <span>
            被保人手机 {{ item.phone }}
          </span>
        </el-col>
        <el-col :span="item.certType === 1 ? 8 : 6">
          <span>
            投保份数  1份
          </span>
        </el-col>
      </el-row>

    </div>
    <span class="title">投保信息</span>
    <hr><p/>
    <div>
      <el-row :gutter="10">
        <el-col :span="8"><span>保险起期 {{ detail.order.startDate }}</span></el-col>
        <el-col :span="8"><span/>保险止期 {{ detail.order.endDate }}</el-col>
        <el-col :span="8"><span/>保险期限    1年</el-col>
      </el-row>
    </div>
    <el-row :gutter="10" style="margin-top: 60px">
      <el-col :span="24" style="text-align: center">
        <el-button type="success" style="width: 150px" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

import { get } from '@/api/order'
import OrderListCard from '@/views/order/OrderListCard'

export default {
  name: 'OrderDetail',
  components: { OrderListCard },
  data() {
    return {
      orderId: 0,
      detail: {
        order: {},
        policyHolder: {},
        insureds: {}
      }
    }
  },
  created() {
    this.orderId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      get(this.orderId).then(res => {
        this.detail = res.data
        this.detail.order.goodsCover = process.env.VUE_APP_IMAGE_URL + this.detail.order.goodsCover
        console.log(this.detail.order.goodsCover)
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .el-card {
    font-size: 14px;
  }
  .title {
    display: block;
    font-size: 1.17em;
    font-weight: bold;
  }
  .ph-body {
    width: 100%;
    height: 80px;
  }
</style>
