/**
 * 开发环境配置
 */

import baseConf from './base.conf'
import { defaultsDeep } from 'lodash'

const baseUrl = 'http://localhost:7001'

const devConf = {
  // api 配置
  api: {
    url: `/`,
  },
  url: {
    baseUrl,
    webSocketUrl: `ws://`
  },
}

defaultsDeep(devConf, baseConf)

export default devConf
