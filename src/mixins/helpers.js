import Swal from 'sweetalert2'
import dayjs from 'dayjs'

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
      console.log(hour)
      if (hour < 12) {
        return dayjs(datetime).format('上午 HH:mm・YYYY年MM月DD日')
      } else {
        return dayjs(datetime).format('下午 HH:mm・YYYY年MM月DD日')
      }
    }
  }
}
