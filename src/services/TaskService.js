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
    return apiClient.post(`/users/${task.user_id}/tasks/`, task)
  },
  updateTask(task) {
    return apiClient.put(`/users/${task.user_id}/tasks/${task.id}/`, task)
  }
}
