import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data,
  })
}

export const getSMS = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}

export const getUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
  })
}
