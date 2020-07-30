/**
 * 导出配置
 */

const env = process.env.NODE_ENV
if (env === 'production') {
  module.exports = require('./prod.conf')
} else {
  module.exports = require('./dev.conf')
}
