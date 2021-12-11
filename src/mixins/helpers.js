import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import axios from 'axios'

// const baseURL = 'https://simple-twitter-paul-heidi.herokuapp.com/api'
// const baseURL = 'http://5149-81-31-74-124.ngrok.io/api/'
const baseURL = 'http://b520-2001-b400-e270-b4f2-9421-c0bb-cd26-a065.ngrok.io/api/'

const axiosInstance = axios.create({
  baseURL,
  validateStatus: (status) => {
    return status >= 200 && status < 501
  }
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

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
    },
    absoluteTimeShort (dateTime) {
      if (!dateTime) {
        return '-'
      }
      const hour = dayjs(dateTime).hour()
      if (hour < 12) {
        return dayjs(dateTime).format('上午 HH:mm')
      } else {
        return dayjs(dateTime).format('下午 HH:mm')
      }
    }
  }
}
