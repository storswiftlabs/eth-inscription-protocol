/**
 *  TODO 封装接口调用方法
 */
import axios from 'axios'

const serverConfig = {
  baseURL: 'http://10.10.1.38:8000',
  useTokenAuthorization: false, // 是否开启 token 验证
}

const request = axios.create({
  baseURL: 'http://10.10.1.38:8000',
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截
 * */
request.interceptors.request.use(

)

export default request
