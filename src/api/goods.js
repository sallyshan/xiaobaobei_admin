import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/goods/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/goods',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/admin/goods/${id}`,
    method: 'delete'
  })
}

export function get(id) {
  return request({
    url: `/admin/goods/${id}`,
    method: 'get'
  })
}
