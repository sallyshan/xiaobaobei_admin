import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/admin',
    method: 'post',
    data: {
      phone: data.username,
      password: data.password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/admin/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/admin/logout',
    method: 'post'
  })
}

export function updatePassword(data) {
  return request({
    url: '/admin/admin/password',
    method: 'PUT',
    data: data
  })
}

export function sendSms(phone) {
  return request({
    url: '/admin/register/sendSms/' + phone,
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/admin/register/admin',
    method: 'post',
    data
  })
}
