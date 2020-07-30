import { createAxiosInstance } from '../requestCreator'
import { ResponseException } from '../Exception'
import config from '@/config'

const axiosInstance = createAxiosInstance()
// 拦截器 做特殊处理
axiosInstance.interceptors.response.use(null, (error) => {
  if (error instanceof ResponseException) {
    const ret = Promise.reject(error)
    switch (error.payload.code) {
      case config.api.code.actEnd:
        return ret
    }
  } else {
    return Promise.reject(error)
  }
})
export const getInfo = (params) => axiosInstance.get('/home/index', { params })

// export const getActiveDetailInfo = (data) => axiosInstance.post('/yd/index/getActiveDetailInfo', { data })
