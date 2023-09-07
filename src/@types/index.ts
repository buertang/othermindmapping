export interface HttpResponse {
  status: number
  statusText: string
  data: {
    code: string
    message: string
    [key: string]: any
  }
}
