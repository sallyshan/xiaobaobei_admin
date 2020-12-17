import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/withdraw/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/withdraw',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/admin/withdraw/${id}`,
    method: 'delete'
  })
}

export function get(id) {
  return request({
    url: `/admin/withdraw/${id}`,
    method: 'get'
  })
}
