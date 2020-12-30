import Vue from 'vue'
import Dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 本地化
import relativeTime from 'dayjs/plugin/relativeTime'

Dayjs.locale('zh-cn')
Dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
  return Dayjs(value).fromNow()
})

Vue.filter('commentTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return Dayjs(value).format(format)
})
