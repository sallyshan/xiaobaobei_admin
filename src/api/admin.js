import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/admin/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/admin',
    method: 'post',
    data
  })
}

export function changeStatus(id, status) {
  return request({
    url: `/admin/admin/${id}/${status}`,
    method: 'PUT'
  })
}

export function get(id) {
  return request({
    url: `/admin/admin/${id}`,
    method: 'get'
  })
}
