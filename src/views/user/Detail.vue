<template>
  <div class="app-container">
    <div>
      <info-card :user="user">
        <template slot="rightButton">
          <el-button type="primary" @click="qrCodeVisible = true">推广二维码</el-button>
        </template>
      </info-card>
    </div>
    <el-tabs v-model="userType" type="card" @tab-click="fetchData">
      <el-tab-pane v-if="user.userType < 2" label="一级经销商" name="2"/>
      <el-tab-pane v-if="user.userType < 3" label="二级经销商" name="3"/>
    </el-tabs>
    <div v-loading="listLoading" element-loading-text="Loading">
      <div
        v-show="list && (list.length === 0)"
        style="text-align: center;height: 150px"
      >
        <el-button style="margin-top: 20px" size="medium" type="text">暂无数据</el-button>
      </div>
      <div v-for="(item, index) in list" :key="index">
        <info-card :user="item"/>
      </div>
    </div>

    <el-row :gutter="10">
      <el-col :span="24" style="text-align: center">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100,500]"
          :page-size="listQuery.limit"
          :total="total"
          @size-change="changeSize"
          @current-change="fetchPage"
          @prev-click="fetchPrev"
          @next-click="fetchNext"
        />

      </el-col>
    </el-row>
    <div/>
    <el-dialog
      title="微信扫描二维码可进入小程序"
      :visible.sync="qrCodeVisible"
      width="30%"
      :center="true"
    >
      <div style="width: 100%;text-align: center">
        <el-image :src="qrCodeSrc"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import InfoCard from '@/views/user/InfoCard'
import { get, getList } from '@/api/distributor'

export default {
  name: 'UserDetail',
  components: { InfoCard },
  data() {
    return {
      userId: 0,
      user: {},
      listQuery: {
        page: 1,
        limit: 10,
        userType: undefined,
        like: ''
      },
      total: 0,
      list: null,
      userType: '2',
      listLoading: false,
      qrCodeVisible: false,
      qrCodeSrc: ''
    }
  },
  created() {
    this.userId = this.$route.params.id
    this.qrCodeSrc = process.env.VUE_APP_BASE_API + `share/qrCode/${this.userId}.jpg`
    this.init()
  },
  methods: {
    async init() {
      const loading = this.$loading({
        lock: false,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.0)'
      })
      await get(this.userId).then(res => {
        this.user = res.data
        if (res.data.userType === 2) {
          this.userType = '3'
        }
      })
      loading.close()
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const queryData = this.listQuery
      queryData.userType = this.userType
      if (this.user.userType === 1) {
        queryData.pId = this.userId
      } else if (this.user.userType === 2) {
        queryData.cId = this.userId
      }
      getList(queryData).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      }).catch(() => { this.listLoading = false })
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
