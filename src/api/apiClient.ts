import axios from 'axios'

// export default axios.create({
//   baseURL: import.meta.env.VITE_BACKEND + 'api',
// })

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND + 'api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export default apiClient

// // Request interceptor to add token
// apiClient.interceptors.request.use((config) => {
//   const authContext = useAuth()
//   if (authContext.accessToken) {
//     config.headers.Authorization = `Bearer ${authContext.accessToken}`
//   }
//   return config
// })

// // Response interceptor to handle token expiration
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const authContext = useAuth()
//     const navigate = useNavigate()

//     if (error.response && error.response.status === 401) {
  
//       authContext.setAccessToken(null) // Clear the token
//       navigate('/auth/login') // Redirect to login page
//     }

//     return Promise.reject(error)
//   }
// )
