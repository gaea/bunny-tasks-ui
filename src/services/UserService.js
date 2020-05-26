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
    var data = new FormData()
    data.append('name', user.name)

    return apiClient.post('/users/', data)
  },
  updateUser(user) {
    var data = new FormData()
    data.append('id', user.id)
    data.append('name', user.name)

    return apiClient.put(`/users/${user.id}/`, data)
  }
}
