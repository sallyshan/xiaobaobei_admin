<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button style="float: right" type="primary" size="small" icon="el-icon-plus" @click.native="add">新建账号
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="list"
      element-loading-text="Loading"
      border
      fit
    >
      <el-table-column label="账号id" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="启用状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="primary">启用</el-tag>
          <el-tag v-if="scope.row.status === 1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          {{ scope.row.creator }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" type="primary" size="mini" @click.native="remove(scope.row, 0)">启用
          </el-button>
          <el-button v-if="scope.row.status === 0" type="danger" size="mini" @click.native="remove(scope.row, 1)">禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="10">
      <el-col>
        <el-pagination
          style="float: right"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100,500]"
          :page-size="listQuery.limit"
          :total="total"
          @size-change="changeSize"
          @current-change="fetchPage"
          @prev-click="fetchPrev"
          @next-click="fetchNext"
        /></el-col>
    </el-row>

    <!-- 编辑和添加弹窗 -->
    <el-dialog
      :center="true"
      :title="formTitle"
      :visible.sync="formVisible"
      width="500px"
      @close="resetForm"
    >
      <el-form ref="dialogForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="formLoading" @click="save">添加</el-button>
          <el-button @click.native="formVisible = false">取消</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./admin.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
