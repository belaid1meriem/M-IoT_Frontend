import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://'+ localStorage.getItem('subdomain')+':8000/' + 'api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export default apiClient