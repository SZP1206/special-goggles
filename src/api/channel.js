import request from '@/utils/request'

export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
}

export const addUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data,
  })
}
