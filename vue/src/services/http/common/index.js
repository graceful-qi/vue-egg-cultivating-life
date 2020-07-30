import { createAxiosInstance } from '../requestCreator'
import apiMap from './apiMap'

const axiosInstance = createAxiosInstance()

/**
 * createRequestMethods
 * @param axiosInstance
 * @param apiMap
 */
const createRequestMethods = (axiosInstance, apiMap) => {
  const http = {}
  Object.keys(apiMap).forEach(requestMethod => {
    const methodApis = apiMap[requestMethod]
    Object.keys(methodApis).forEach(api => {
      http[api] = data => {
        return axiosInstance({
          url: methodApis[api],
          method: requestMethod,
          [requestMethod.toUpperCase() === 'POST' ? 'data' : 'params']: data
        })
      }
    })
  })
  return http
}

export default createRequestMethods(axiosInstance, apiMap)
