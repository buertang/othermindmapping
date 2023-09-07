import service from './http'
import { SERVER_CONTEXT } from '@/config'
import { HttpResponse } from '@/@types'

function apiGetBlogConfig (): Promise<HttpResponse> {
  return service({
    method: 'get',
    url: `${SERVER_CONTEXT}/v1/findBlogConfig`
  })
}

export {
  apiGetBlogConfig
}
