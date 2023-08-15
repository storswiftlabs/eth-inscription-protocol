/* eslint unicorn/prefer-node-protocol: 0 */

/**
 *  TODO 封装接口调用方法
 */
import process from 'process'
import axios from 'axios'

const ApiUrl = process.env.NEXT_PUBLIC_FETCH_API

const request = axios.create({
  baseURL: ApiUrl,
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
