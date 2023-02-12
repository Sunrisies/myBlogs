import instance from '@/utils/http'

export const login = (url: string, data: Object) => {
  return instance.post(url, data)
}
