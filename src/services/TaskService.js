import apiClient from '@/helpers/ApiClient.js'

export default {
  getTasks(user_id) {
    return apiClient.get(`/users/${user_id}/tasks/`)
  },
  getTask(user_id, task_id) {
    return apiClient.get(`/users/${user_id}/tasks/tasks/${task_id}/`)
  },
  deleteTask(task) {
    return apiClient.delete(`/users/${task.user_id}/tasks/${task.id}/`)
  },
  createTask(task) {
    var data = new FormData()
    data.append('state', task.state)
    data.append('description', task.description)
    data.append('user_id', task.user_id)

    return apiClient.post(`/users/${task.user_id}/tasks/`, data)
  },
  updateTask(task) {
    var data = new FormData()
    data.append('state', task.state)
    data.append('description', task.description)

    return apiClient.put(`/users/${task.user_id}/tasks/${task.id}/`, data)
  }
}
