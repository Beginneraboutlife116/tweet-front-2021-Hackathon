import { apiHelper } from './../mixins/helpers'

export default {
  getRoomSnapshot (userId, subscribedRoomsList) {
    return apiHelper.post(`/rooms/snapshot/${userId}`, subscribedRoomsList)
  },
  getRoomHistory (roomId) {
    return apiHelper.get(`/rooms/${roomId}`)
  }
}
