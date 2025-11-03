import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 1000 * 10
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data)
  },
  (error) => {
    console.error(error?.response?.data || error);
    return Promise.reject(error?.response?.data || error)
  }
)

export default service
