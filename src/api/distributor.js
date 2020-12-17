import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/distributor/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/distributor',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/admin/distributor/${id}`,
    method: 'delete'
  })
}

export function get(id) {
  return request({
    url: `/admin/distributor/${id}`,
    method: 'get'
  })
}

export function getUserNum() {
  return request({
    url: `/admin/distributor/num`,
    method: 'get'
  })
}

export function getInviteCode() {
  return request({
    url: `/admin/distributor/inviteCode`,
    method: 'get'
  })
}

