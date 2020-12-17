<template>
  <div class="app-container">
<!--    <el-row :gutter="10">-->
<!--      <el-col :span="24">-->
<!--        <el-button-->
<!--          icon="el-icon-plus"-->
<!--          type="primary"-->
<!--          @click="toEdit(0)"-->
<!--        >新增商品-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <p/>-->
    <el-tabs v-model="status" type="border-card" @tab-click="handleTabChange">
      <el-tab-pane label="在售商品" name="0">
        <div>
          <div v-for="(item, index) in list" :key="index">
            <goods-card :goods="item">
              <template slot="right-content">
                <el-button
                  icon="el-icon-edit"
                  style="margin-top: 50px"
                  type="primary"
                  @click="toEdit(item.id)"
                >
                  编辑
                </el-button>
                <el-button icon="el-icon-download" type="danger" @click="changeStatus(item, 1)">下架</el-button>
              </template>
            </goods-card>
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
      <el-tab-pane label="下架商品" name="1">
        <div>
          <div v-for="(item, index) in list2" :key="index">
            <goods-card :goods="item">
              <template slot="right-content">
                <el-button
                  icon="el-icon-edit"
                  style="margin-top: 50px"
                  type="primary"
                  @click="toEdit(item.id)"
                >
                  编辑
                </el-button>
                <el-button icon="el-icon-upload" type="success" @click="changeStatus(item, 0)">上架</el-button>
              </template>
            </goods-card>
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
  </div>
</template>

<script src="./goods.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";

  .goods-title {
    font-family: "Arial Negreta", "Arial Normal", Arial,serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    margin-bottom: 10px
  }
</style>
