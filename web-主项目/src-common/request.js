import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  // withCredentials: true,
  timeout: 1000 * 10,
  headers: { 'Cache-Control': 'no-cache' }
})
// test
const token = `eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJ1c2VyX25hbWUiOiI2MzE5NzU5IiwibG9naW5fdGltZSI6MTc1NzkxMjgzOSwidHlwZSI6IlNTTyIsImFjY291bnQiOiI2MzE5NzU5In0.um0kzRVKQn-JzkRcdd0tmCx75TdSG5fwoGH40cbOxCQ`
// request interceptor
service.interceptors.request.use(
  (config) => {
    if (token) config.headers['Authorization'] = 'Bearer ' + token
    config.headers.timestamp = new Date().getTime()
    config.headers['Accept-Lang'] = 'zh-cn'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 200 || response.data.code === 0) {
      return Promise.resolve(response.data)
    } else {
      alert(response.data.data || 'warning')
      return Promise.reject(response.data || 'warning')
    }
  },
  (error) => {
    if (error?.response?.status === 401) {
      if (confirm('登录过期 是否重新登录')) {
        let nowUrl = encodeURIComponent(location.href)
        location.href = `/login.html?callback=${nowUrl}`
      }
    }
    return Promise.reject(error?.response?.data || error)
  }
)

export default service
