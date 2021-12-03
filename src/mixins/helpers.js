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
      const formatDate = dayjs(datetime).format('YYYY-MM-DD')
      return dayjs().to(dayjs(formatDate))
    }
  }
}
