<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong/>
        <el-radio-group v-model="radio1" style="float: right" @change="handleRadioChange">
          <el-radio-button label="今日"/>
          <el-radio-button label="本周"/>
          <el-radio-button label="本月"/>
          <el-radio-button label="本年"/>
        </el-radio-group>
      </div>
      <div class="block">
        <el-row :gutter="100">
          <el-col v-for="(item, index) in nums" :key="index" :xs="24" :sm="6">
            <div class="number-card">
              <data-card style="margin: 0 auto" :label="item.label" :num="item.num"/>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-tabs v-model="radio2" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="收入明细" name="1">
          <div v-loading="listLoading" element-loading-text="加载中">
            <div
              v-show="list && (list.length === 0)"
              style="text-align: center;height: 150px"
            >
              <el-button style="margin-top: 20px" size="medium" type="text">暂无数据</el-button>
            </div>
            <div v-for="(item, index) in list" :key="index">
              <order-list-card :order="item"/>
            </div>
          </div>
          <el-row :gutter="10">
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
        </el-tab-pane>
        <el-tab-pane label="支出明细" name="2">
          <div v-loading="listLoading2" element-loading-text="加载中">
            <div
              v-show="list2 && (list2.length === 0)"
              style="text-align: center;height: 150px"
            >
              <el-button style="margin-top: 20px" size="medium" type="text">暂无数据</el-button>
            </div>
            <div v-for="(item, index) in list2" :key="index">
              <withdraw-list-item :withdraw="item">
                <template slot="right-content">提现支出</template>
              </withdraw-list-item>
            </div>
          </div>
          <el-row :gutter="10">
            <el-col :span="24" style="text-align: center">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="listQuery2.limit"
                :total="total2"
                @size-change="changeSize2"
                @current-change="fetchPage2"
                @prev-click="fetchPrev2"
                @next-click="fetchNext2"
              />
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script src="./money.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";

  .el-col {
    margin-bottom: 20px;
  }
</style>
