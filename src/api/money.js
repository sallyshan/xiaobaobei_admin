import request from '@/utils/request'

export function getCountNum() {
  return request({
    url: '/admin/money/countNum',
    method: 'get'
  })
}

export function getCountWithdraw(type) {
  return request({
    url: '/admin/money/countWithdraw/' + type,
    method: 'get'
  })
}

