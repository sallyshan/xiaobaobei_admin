import request from '@/utils/request'

export function countNum(type) {
  return request({
    url: `/admin/index/count/${type}`,
    method: 'get'
  })
}
