import apiClient from '@/helpers/ApiClient.js'

export default {
  getUsers() {
    return apiClient.get('/users/')
  },
  getUser(id) {
    return apiClient.get(`/users/${id}/`)
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}/`)
  },
  createUser(user) {
    return apiClient.post('/users/', user)
  },
  updateUser(user) {
    return apiClient.put(`/users/${user.id}/`, user)
  }
}
