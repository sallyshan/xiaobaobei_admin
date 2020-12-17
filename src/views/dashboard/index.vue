<template>
  <div>
    <div class="app-container">
      <el-card
        v-loading="loading"
        class="box-card"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      >
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
      </el-card>
    </div>
  </div>
</template>

<script src="./dashboard.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";

  .el-col {
    margin-bottom: 20px;
  }
</style>
