import { REQUEST_SUCCESS } from '@/config'
import Message from '@/components/NxMessage'
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import router from '../router'
const service = axios.create({
  timeout: 15000,
  withCredentials: true
})

service.interceptors.response.use(function (response: AxiosResponse<any>) {
  if (response.data.isLogin === '-1' && response.data.success === false) {
    router.replace('/login')
    return Promise.reject(response)
  }

  if (response.headers['content-disposition'] && response.headers['content-disposition'].includes('attachment')) {
    return Promise.resolve(response)
  }

  if (response.data.code !== REQUEST_SUCCESS) {
    Message.error(response.data.message)
    return Promise.reject(response)
  }

  return Promise.resolve(response.data)
}, function (error: AxiosError) {
  let errmsg: string = error.message || ''
  if (error.message) {
    errmsg = error.message
  }

  if (error.response) {
    errmsg = error.response.data.message
      ? error.response.data.message
      : error.response.data.data
  }

  if (errmsg.indexOf('timeout') >= 0) {
    errmsg = 'timeout'
  }

  if (error?.response?.status === 401) {
    if (router.currentRoute.value.path !== '/entry/login') {
      router.push('/entry/login')
    }
    return Promise.reject(new Error('401'))
  }
  return Promise.reject(new Error(errmsg))
})

service.interceptors.request.use(function (config: AxiosRequestConfig) {
  return config
}, function (error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error)
})

export default service
