import axios from 'axios'



export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND + 'api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export default apiClient

