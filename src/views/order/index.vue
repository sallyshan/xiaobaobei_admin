<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :span="5">
          <data-card :num="nums[0] + ''" label="保单总量"/>
        </el-col>
        <el-col :span="5">
          <data-card :num="'￥' + (nums[1] / 100.0).toFixed(2)" label="保单总额"/>
        </el-col>
      </el-row>
      <p/>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-input v-model="likeQuery.bdNo" style="width: 200px" placeholder="请输入保单号"/>
          <el-button type="primary" icon="el-icon-search" @click.native="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="listQuery.andQuery.status" type="card" @tab-click="fetchData">
      <el-tab-pane label="生效中" name="1"/>
      <el-tab-pane label="已失效" name="2"/>
      <el-tab-pane label="待支付" name="3"/>
    </el-tabs>

    <div v-loading="listLoading" element-loading-text="Loading">
      <div
        v-show="list && (list.length === 0)"
        style="text-align: center;height: 150px"
      >
        <el-button style="margin-top: 20px" size="medium" type="text">暂无数据</el-button>
      </div>
      <div v-for="(item, index) in list" :key="index">
        <order-list-card :order="item" @click.native="handleClickCard(item)"/>
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

  </div>
</template>

<script src="./order.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
