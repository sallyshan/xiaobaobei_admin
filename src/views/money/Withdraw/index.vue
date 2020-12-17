<template>
  <el-card class="box-card">
    <el-row :gutter="10">
      <el-col :span="6">
        <data-card :num="'￥' + (nums[0]/100.0).toFixed(2)" label="提现待审核"/>
      </el-col>
      <el-col :span="6">
        <data-card :num="'￥' + (nums[1]/100.0).toFixed(2)" label="提现已支出"/>
      </el-col>
    </el-row>
    <el-divider/>
    <el-tabs v-model="tabValue" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="提现待审核" name="0"/>
      <el-tab-pane label="提现已通过" name="1"/>
      <el-tab-pane label="提现已驳回" name="2"/>
    </el-tabs>
    <div v-loading="listLoading" element-loading-text="加载数据中">
      <div
        v-show="list && (list.length === 0)"
        style="text-align: center;height: 150px"
      >
        <el-button style="margin-top: 20px" size="medium" type="text">暂无数据</el-button>
      </div>
      <div v-for="(item ,index) in list" :key="index">
        <withdraw-list-item :withdraw="item">
          <template slot="right-content">
            <el-button v-if="item.status === 0" style="margin-bottom: 10px" type="danger" @click="handleNoPass(item)">审核不通过</el-button>
            <el-button v-if="item.status === 0" style="margin: 0" type="primary" @click="handlePass(item)">审核通过</el-button>
            <div v-if="item.status === 1" style="margin-top: 20px">审核已通过</div>
            <div v-if="item.status === 2" style="margin-top: 15px;text-align: center;width: 210px">
              <span>已驳回</span>
              <p/>
              <span>原因：{{ item.reason }}</span>
            </div>
          </template>
        </withdraw-list-item>
      </div>
    </div>
    <el-row>
      <el-col :span="24" style="text-align: center">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="listQuery.limit"
          :total="total"
          @size-change="changeSize"
          @current-change="fetchPage"
          @prev-click="fetchPrev"
          @next-click="fetchNext"
        />
      </el-col>
    </el-row>
    <el-dialog
      title="驳回理由:"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <el-radio v-model="reason" label="账户名不一致">账户名不一致</el-radio>
      <el-radio v-model="reason" label="其它原因">其它原因</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirmNoPass">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import DataCard from '@/components/DataCard/index'
import { getCountWithdraw } from '@/api/money'
import WithdrawListItem from '@/views/money/Withdraw/WithdrawListItem'
import { getList, save } from '@/api/withdraw'

export default {
  name: 'Withdraw',
  components: { DataCard, WithdrawListItem },
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabValue: '0',
      listQuery: {
        page: 1,
        limit: 10,
        andQuery: {}
      },
      total: 0,
      list: null,
      listLoading: true,
      nums: [0, 0],
      dialogVisible: false,
      reason: '账户名不一致',
      selectedItem: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getCountWithdraw(this.type).then(res => {
        this.nums = res.data
      })
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const queryData = this.listQuery
      queryData.desc = true
      queryData.sortFieldName = 'update_time'
      queryData.andQuery.type = this.type
      queryData.andQuery.status = this.tabValue
      getList(queryData).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleTabClick(tab) {
      this.fetchData()
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
    },
    handleNoPass(item) {
      this.selectedItem = item
      this.dialogVisible = true
    },
    handleConfirmNoPass() {
      save({
        id: this.selectedItem.id, status: 2, reason: this.reason
      }).then(() => {
        this.$message.success('已驳回')
        this.dialogVisible = false
        this.init()
      }).catch(() => {
        this.dialogVisible = false
      })
    },
    handlePass(item) {
      this.$confirm('确认审核通过吗？', {
        // distinguishCancelAndClose: true,
        center: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        save({
          id: item.id, status: 1
        }).then(() => {
          this.$message.success('已通过')
          this.dialogVisible = false
          this.init()
        }).catch(() => {
          this.dialogVisible = false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
