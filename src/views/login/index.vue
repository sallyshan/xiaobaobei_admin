<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      size="medium"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password" style="margin-bottom: 5px">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-row style="margin-bottom: 5px">
        <el-col>
          <el-button size="medium" type="text" style="float: right" @click.native="dialogVisible = true">忘记密码?</el-button>
        </el-col>
      </el-row>
      <el-button
        size="medium"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录
      </el-button>

    </el-form>
    <el-dialog
      :center="true"
      title="找回密码"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <div class="register-form">
        <p>请输入手机号</p>
        <input v-model="registerForm.username" type="text">
        <p>请输入验证码</p>
        <input v-model="registerForm.code" style="width: 100px;margin-right: 10px" type="text">
        <el-button :disabled="!show" style="width: 100px" type="primary" @click="AcquireValidation">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{ count }} s</span>
        </el-button>
        <p>请输入新的密码</p>
        <input v-model="registerForm.password" type="password">
        <p>再次输入新的密码</p>
        <input v-model="registerForm.rePassword" type="password">
        <p/>
        <el-button
          :loading="rLoading"
          size="medium"
          style="width: 100%"
          type="primary"
          @click="handleRegister"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validPhone } from '@/utils/validate'
import { sendSms, register } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数字'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      registerForm: {
        username: '',
        code: '',
        password: '',
        rePassword: ''
      },
      dialogVisible: false,
      rLoading: false,
      show: true,
      count: '',
      timer: null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            console.log('login success')
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
            this.$notify({
              title: '欢迎',
              message: '您已经成功登录本系统',
              type: 'success'
            })
          }).catch((res) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      if (!validPhone(this.registerForm.username)) {
        this.$message('请输入正确的手机号')
        return
      }
      if (this.registerForm.code === '') {
        this.$message('请输入验证码')
        return
      }
      if (this.registerForm.password.length < 6) {
        this.$message('密码不能少于6位')
        return
      }
      if (this.registerForm.password !== this.registerForm.rePassword) {
        this.$message('两次密码不一致')
        return
      }
      console.log(this.registerForm)
      register({
        phone: this.registerForm.username,
        password: this.registerForm.password,
        code: this.registerForm.code
      }).then(res => {
        this.$message.success('注册成功')
      })
    },
    AcquireValidation() {
      if (!validPhone(this.registerForm.username)) {
        this.$message('请先输入正确的手机号')
        return
      }
      if (!this.timer) {
        this.count = 60
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
        sendSms(this.registerForm.username).then(res => {
          this.$message('验证码已发送')
        })
      }
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

  .register-form {
    width: 400px;
    margin: 0 auto;
    input {
      width: 100%;
      height: 32px;
    }
  }
</style>
