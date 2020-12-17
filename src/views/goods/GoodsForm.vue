<template>
  <div class="app-container">
    <el-form ref="dialogForm" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="轮播图" prop="covers">
        <el-upload
          :action="actionUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
        >
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="概要描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      <el-form-item label=" ">
        <el-button disabled type="primary" @click="addSku">添加规格</el-button>
        <el-card v-for="(item, index) in skuList" :key="index" shadow="never" class="sku-card">
          <div style="display: flex">
            <span style="flex: 1;display: flex">
              <span style="width: 80px;">规格名：</span>
              <el-input v-model="item.name" disabled style="width: 150px"/>
            </span>
            <span v-if="!item.children || item.children.length === 0" style="flex: 1">

              售价：
              <el-input v-model="item.price" disabled style="width: 100px"/>
              <span>{{ item.unit }}</span>
              <el-select v-model="item.unit" disabled placeholder="请选择">
                <el-option label="人/年" value="人/年"/>
                <el-option label="人/月" value="人/月"/>
                <el-option label="人/日" value="人/日"/>
              </el-select>
            </span>
          </div>
          <p v-if="!item.children || item.children.length === 0"/>
          <div v-if="!item.children || item.children.length === 0" style="display: flex">
            <div style="flex: 1;display: flex">
              <span style="width: 80px;padding-left: 15px;">成本：</span>
              <el-input v-model="item.cost" disabled style="width: 100px"/>
            </div>
            <div style="flex: 1;">

              利润：
              <el-input v-model="item.profit" disabled style="width: 100px"/>
            </div>
          </div>
          <p v-if="!item.children || item.children.length === 0"/>
          <div v-if="!item.children || item.children.length === 0" style="display: flex">
            <div style="flex: 1;display: flex">
              <div style="flex: 1;display: flex">
                <span disabled style="width: 80px;padding-left: 15px;">保额：</span>
                <el-input v-model="item.insureAmount" disabled style="width: 100px"/>
              </div>
            </div>
            <div style="flex: 1">
              <el-button disabled type="text" @click="delSkuItem(skuList, index)">删除</el-button>
            </div>
          </div>
          <el-divider/>
          <div v-if="item.children && item.children.length > 0">
            <div v-for="(itemChild, i) in item.children" :key="i">
              <div style="display: flex">
                <span style="flex: 1;display: flex">
                  <span style="width: 80px;">子规格名：</span>
                  <el-input v-model="itemChild.name" disabled style="width: 150px"/>
                </span>
                <span style="flex: 1">

                  售价：
                  <el-input v-model="itemChild.price" disabled style="width: 100px"/>
                  <span>{{ itemChild.unit }}</span>
                  <el-select v-model="itemChild.unit" disabled placeholder="请选择">
                    <el-option label="人/年" value="人/年"/>
                    <el-option label="人/月" value="人/月"/>
                    <el-option label="人/日" value="人/日"/>
                  </el-select>
                </span>
              </div>
              <p/>
              <div style="display: flex">
                <div style="flex: 1;display: flex">
                  <span disabled style="width: 80px;padding-left: 15px;">成本：</span>
                  <el-input v-model="itemChild.cost" disabled style="width: 100px"/>
                </div>
                <div style="flex: 1;">

                  利润：
                  <el-input v-model="itemChild.profit" disabled style="width: 100px"/>
                </div>
              </div>
              <p/>
              <div style="display: flex">
                <div style="flex: 1;display: flex">
                  <div style="flex: 1;display: flex">
                    <span style="width: 80px;padding-left: 15px;">保额：</span>
                    <el-input v-model="itemChild.insureAmount" disabled style="width: 100px"/>
                  </div>
                </div>
                <div style="flex: 1">
                  <el-button disabled type="text" @click="delSkuItem(item, i)">删除</el-button>
                </div>
              </div>
              <div class="divider-line"/>
            </div>
          </div>
          <el-row :gutter="10">
            <el-col :span="24" style="text-align: center">
              <el-button disabled type="success" @click="addSkuItem(item)">添加子规格</el-button>
            </el-col>
          </el-row>
          <!--<div v-if="!item.children || item.children.length === 0">-->
          <!--  <el-button @click="addSkuItem(item)">添加子规格</el-button>-->
          <!--</div>-->
        </el-card>
      </el-form-item>
      <el-form-item label="推广比例设置">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-input v-model="form.proportion">
              <template slot="append">代理商(一级)</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.proportion1">
              <template slot="append">一级经销商</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.proportion2">
              <template slot="append">二级经销商</template>
            </el-input>

          </el-col>
          <el-col :span="5">
            <el-input v-model="form.proportionBalance">
              <template slot="append">结余占比</template>
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="formLoading" @click="save">保存</el-button>
        <el-button @click.native="handleCancel">放弃</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { save, get } from '@/api/goods'

export default {
  name: 'GoodsForm',
  data() {
    return {
      id: 0,
      formVisible: false,
      formLoading: false,
      formTitle: '添加商品',
      isAdd: true,
      form: {
        covers: '',
        title: '',
        description: '',
        proportion: 0,
        proportion1: 0,
        proportion2: 0,
        proportionBalance: 0,
        status: '',
        type: '',
        id: '',
        fileList: []
      },
      rules: {},
      actionUrl: process.env.VUE_APP_BASE_API + 'file/uploadImg',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      skuList: [],
      pattern: /(^(([0-9]([0-9])?)|(0))(\.[0-9])?$)/
    }
  },
  created() {
    this.init()
    // this.actionUrl = process.env.VUE_APP_BASE_API + '/file/uploadImg'
  },
  methods: {
    init() {
      this.id = this.$route.params.id
      if (this.id > 0) {
        this.isAdd = false
        get(this.id).then(res => {
          this.form = res.data
          this.form.proportion = (this.form.proportion / 10.0).toFixed(1)
          this.form.proportion1 = (this.form.proportion1 / 10.0).toFixed(1)
          this.form.proportion2 = (this.form.proportion2 / 10.0).toFixed(1)
          this.form.proportionBalance = (this.form.proportionBalance / 10.0).toFixed(1)
          this.form.fileList = []
          this.form.covers.forEach(item => {
            const file = { name: item, url: process.env.VUE_APP_IMAGE_URL + item }
            this.fileList.push(file)
            this.form.fileList.push(item)
          })
          this.skuList = this.form.skuList
          this.skuList.forEach(item => {
            if (item.price) {
              item.price = (item.price / 100.0).toFixed(2)
              if (item.cost) {
                item.cost = (item.cost / 100.0).toFixed(2)
              }
              if (item.profit) {
                item.profit = (item.profit / 100.0).toFixed(2)
              }
            } else {
              if (item.children && item.children.length > 0) {
                item.children.forEach(v => {
                  if (v.price) {
                    v.price = (v.price / 100.0).toFixed(2)
                  }
                  if (v.cost) {
                    v.cost = (v.cost / 100.0).toFixed(2)
                  }
                  if (v.profit) {
                    v.profit = (v.profit / 100.0).toFixed(2)
                  }
                })
              }
            }
          })
        })
      }
    },
    resetForm() {
      this.$refs['dialogForm'].clearValidate()
    },
    add() {
      this.formTitle = '添加'
      this.formVisible = true
      this.isAdd = true
    },
    edit(row) {
      this.isAdd = false
      this.form = JSON.parse(JSON.stringify(row))
      this.formTitle = '编辑'
      this.formVisible = true
    },
    save() {
      console.log(this.form.fileList)
      console.log(this.skuList)
      if (!this.pattern.test(this.form.proportion ||
        !this.pattern.test(this.form.proportion1) ||
        !this.pattern.test(this.form.proportion2) ||
        !this.pattern.test(this.form.proportionBalance)
      )) {
        this.$message.error('推广比例设置不正确')
        return
      }
      if (this.form.proportion2 > this.form.proportion1 || this.form.proportion1 > this.form.proportion) {
        this.$message.error('低级代理推广比例不能高于高级代理')
        return
      }
      if (900 - this.form.proportion * 10 !== this.form.proportionBalance * 10) {
        this.$message.error('结余应为100 - 10 - 代理商比例')
        return
      }
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          this.formLoading = true
          const p = this.form.proportion * 10
          const p1 = this.form.proportion1 * 10
          const p2 = this.form.proportion2 * 10
          const pb = this.form.proportionBalance * 10
          let cs = ''
          this.form.fileList.forEach(item => {
            cs = cs + item + ','
          })
          save({
            covers: cs,
            skuList: this.skuList,
            title: this.form.title,
            description: this.form.description,
            proportion: p,
            proportion1: p1,
            proportion2: p2,
            proportionBalance: pb,
            status: this.form.status,
            type: this.form.type,
            id: this.form.id
          }).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            if (this.isAdd) {
              this.$router.go(-1)
            } else {
              // this.$router.go(0);
            }
            this.formLoading = false
          }).catch(() => {
            this.formLoading = false
          })
        } else {
          return false
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      const files = []
      fileList.forEach(item => {
        if (item.response) {
          files.push(item.response.data)
        } else {
          files.push(item.name)
        }
      })
      this.form.fileList = files
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      if (response.code !== 20000) {
        fileList.pop()
        this.$message.error('图片上传失败')
        return
      }
      console.log(fileList)
      const files = []
      fileList.forEach(item => {
        if (item.response) {
          files.push(item.response.data)
        } else {
          files.push(item.name)
        }
      })
      this.form.fileList = files
    },
    addSku() {
      this.skuList.push({
        goodsId: this.id,
        name: '',
        price: 0.00,
        unit: '人/年',
        insureAmount: '',
        children: [],
        pid: 0,
        cost: 0.00,
        profit: 0.00
      })
    },
    addSkuItem(item) {
      console.log(item)
      if (!item.children) {
        item.children = []
      }
      item.children.push({
        goodsId: this.id,
        name: '',
        unit: '人/年',
        insureAmount: '',
        children: [],
        pid: 0,
        price: 0.00,
        cost: 0.00,
        profit: 0.00
      })
      // this.skuList = JSON.parse(JSON.stringify(this.skuList))
      this.$forceUpdate()
    },
    delSkuItem(list, index) {
      list.splice(index, 1)
      this.$forceUpdate()
    },
    handleCancel() {
      this.$router.go(-1)
    }

  }
}
</script>

<style scoped>
  .sku-card {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .divider-line {
    border-top: #c0c4cc 1px dashed;
    overflow: hidden;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
