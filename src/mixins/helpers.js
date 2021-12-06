import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import axios from 'axios'

const baseURL = 'http://localhost:3000/api'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(
  config => {
    // 從 localStorage 將 token 取出
    const token = localStorage.getItem('token')

    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      if (!datetime) {
        return '-'
      }
      var relativeTime = require('dayjs/plugin/relativeTime')
      dayjs.extend(relativeTime)
      return dayjs(datetime).fromNow()
    },
    absoluteTime (datetime) {
      if (!datetime) {
        return '-'
      }
      const hour = dayjs(datetime).hour()
      if (hour < 12) {
        return dayjs(datetime).format('上午 HH:mm・YYYY年MM月DD日')
      } else {
        return dayjs(datetime).format('下午 HH:mm・YYYY年MM月DD日')
      }
    }
  }
}
