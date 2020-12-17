import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情

    if (store.getters.token) {
      // 让每个请求都携带令牌
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // 做一些请求错误处理
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 如果自定义代码不是200，则将其判断为错误。
    if (res.code !== 20000) {
      if (res.code === 50008 || res.code === 401) {
        // to re-login
        MessageBox.confirm('您的登录已过期，可以取消以保留在该页面上，或者再次登录', 'Confirm logout', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.msg || 'error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      store.dispatch('user/logout').then(() => {
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.path }
        })
      })
      return
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
