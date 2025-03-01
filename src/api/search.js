import request from '@/utils/request'

export const getSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q, // 请求的前缀词句
    },
  })
}

export const getResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params,
  })
}

export const getHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories',
  })
}

export const deleteAllHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories',
  })
}
