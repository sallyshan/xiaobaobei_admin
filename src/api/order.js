import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/order/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/order',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/admin/order/${id}`,
    method: 'delete'
  })
}

export function get(id) {
  return request({
    url: `/admin/order/${id}`,
    method: 'get'
  })
}

export function getSum() {
  return request({
    url: `/admin/order/sum`,
    method: 'get'
  })
}

export function getDownloadUrl(id) {
  return `/admin/order/download/${id}`
}
