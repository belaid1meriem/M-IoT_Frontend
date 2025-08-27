import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PROTOCOL+'://'+ localStorage.getItem('subdomain')+':'+import.meta.env.VITE_PORT+'/' + 'api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export default apiClient