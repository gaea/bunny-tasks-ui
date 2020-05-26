import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://bunny-tasks.herokuapp.com/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

export { apiClient as default }
