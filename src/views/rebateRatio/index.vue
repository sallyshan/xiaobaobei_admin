<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="list"
      element-loading-text="Loading"
      border
      fit
    >
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="商品类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="代理商（一级）（%）" align="center">
        <template slot-scope="scope">
          {{ scope.row.agent1 }}
        </template>
      </el-table-column>
      <el-table-column label="二级经销商（%）" align="center">
        <template slot-scope="scope">
          {{ scope.row.agent2 }}
        </template>
      </el-table-column>
      <el-table-column label="三级经销商（%）" align="center">
        <template slot-scope="scope">
          {{ scope.row.agent3 }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          {{ scope.row.creator }}
        </template>
      </el-table-column>
      <el-table-column label="修改人" align="center">
        <template slot-scope="scope">
          {{ scope.row.updater }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100px">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click.native="edit(scope.row)">编辑
          </el-button>
          <!--<el-button type="text" size="mini" icon="el-icon-delete" @click.native="remove(scope.row)">-->
          <!--  删除-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-row>
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
        />

      </el-col>
    </el-row>

    <!-- 编辑和添加弹窗 -->
    <el-dialog
      :center="true"
      :title="formTitle"
      :visible.sync="formVisible"
      width="500px"
      @close="resetForm"
    >
      <el-form ref="dialogForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="商品类型" prop="type">
          <el-input v-model="form.type" :disabled="true"/>
        </el-form-item>
        <el-form-item label="代理商(一级)" prop="agent1">
          <el-input v-model="form.agent1">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="二级代理" prop="agent2">
          <el-input v-model="form.agent2">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="三级代理" prop="agent3">
          <el-input v-model="form.agent3">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="formLoading" @click="save">保存</el-button>
          <el-button @click.native="formVisible = false">放弃</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./rebateRatio.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";

  .el-form {
    width: 400px;
    margin: 0 auto;
  }
</style>
