import axios from 'axios'
import Cookies from 'js-cookie'

axios.interceptors.response.use(
  (response) => {
    const cookies = response.headers['set-cookie']
    if (cookies) {
      cookies.forEach((cookie) => {
        Cookies.set(cookie.split(';')[0])
      })
    }
    const newResponse = {...response}
    newResponse.headers['access-control-allow-origin'] = '*'
    return newResponse
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axios
