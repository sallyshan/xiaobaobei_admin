<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong>更换密码</strong>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="form.oldPass" type="password">
            <i slot="prefix" class="el-input__icon el-icon-edit"/>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass" type="password">
            <i slot="prefix" class="el-input__icon el-icon-edit" autocomplete="off"/>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input v-model="form.confirmPass" type="password">
            <i slot="prefix" class="el-input__icon el-icon-edit" autocomplete="off"/>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" :loading="loading" @click="doSubmit">立即更改
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updatePassword } from '@/api/user'

export default {
  name: 'AdminPassword',
  data() {
    return {
      loading: false,
      form: {
        oldPass: undefined,
        newPass: undefined,
        confirmPass: undefined
      },
      rules: {
        oldPass: [
          { required: true, message: '请填写旧密码', trigger: 'blur' },
          { min: 6, max: 50, message: '密码长度为6-50', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          { min: 6, max: 50, message: '密码长度为6-50', trigger: 'blur' }
        ],
        confirmPass: [
          { required: true, validator: this.validatePass2, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const { newPass, oldPass, confirmPass } = this.form
          if (newPass !== confirmPass) {
            this.$message.error('两次密码不一致')
            this.loading = false
            return
          }
          updatePassword({
            newPass, oldPass
          }).then(res => {
            this.$message.success('更改密码成功')
          }).catch(() => {

          }).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>

