import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/rebateRatio/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/rebateRatio',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/admin/rebateRatio/${id}`,
    method: 'delete'
  })
}

export function get(id) {
  return request({
    url: `/admin/rebateRatio/${id}`,
    method: 'get'
  })
}
