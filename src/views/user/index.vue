<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10">
        <el-col :sm="6">
          <data-card label="代理商" :num="nums[0] + '人'"/>
        </el-col>
        <el-col :sm="6">
          <data-card label="一级经销商" :num="nums[1] + '人'"/>
        </el-col>
        <el-col :sm="6">
          <data-card label="二级经销商" :num="nums[2] + '人'"/>
        </el-col>
        <el-col :span="6" style="text-align: center;padding-top: 30px">
          <el-button type="primary" size="medium" icon="el-icon-plus" :loading="addButtonLoading" @click.native="add">新增代理商</el-button>
        </el-col>
      </el-row>
      <p/>
      <div>
        <el-input v-model="listQuery.like" placeholder="按名字或手机号搜索" style="max-width: 200px;"/>
        <el-button type="primary" icon="el-icon-search" @click.native="search">搜索</el-button>
      </div>
    </div>
    <el-tabs v-model="userType" type="card" @tab-click="fetchData">
      <el-tab-pane label="代理商" name="1"/>
      <el-tab-pane label="一级经销商" name="2"/>
      <el-tab-pane label="二级经销商" name="3"/>
    </el-tabs>
    <div v-loading="listLoading" element-loading-text="Loading">
      <div
        v-show="list && (list.length === 0)"
        style="text-align: center;height: 150px"
      >
        <el-button style="margin-top: 20px" size="medium" type="text">暂无数据</el-button>
      </div>
      <div v-for="(item, index) in list" :key="index">
        <info-card :user="item">
          <template slot="rightButton">
            <el-button v-show="item.userType === 1 || item.userType === 2" icon="el-icon-view" type="primary" @click="toDetail(item)">查看</el-button>
          </template>
        </info-card>
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

<script src="./user.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";

  .el-col {
    margin-bottom: 10px;
  }
</style>
