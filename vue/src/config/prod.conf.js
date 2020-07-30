/**
 * 开发环境配置
 */

import baseConf from './base.conf'
import { defaultsDeep } from 'lodash'

const baseUrl = 'http://localhost:8081'

const prodConf = {
  // api 配置
  api: {
    url: '/'
  },
  url: {
    baseUrl
  },
  webSocket: {
  },
}

defaultsDeep(prodConf, baseConf)

export default prodConf
