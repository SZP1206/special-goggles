import axios from 'axios'
import store from '@/store'

// 处理大数字：[https://github.com/sidorares/json-bigint]
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [
    function(data) {
      try {
        return JSONBig.parse(data)
      } catch (error) {
        return data
      }
    },
  ],
})

request.interceptors.request.use(config => {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export default request
