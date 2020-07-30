/**
 * 通用配置
 */

const statusCode = {
  // 成功
  success: 200,
}

module.exports = {
  // api 配置
  api: {
    // 网络请求超时时间
    timeout: 30000,
    // 状态吗定义
    code: statusCode,
    // 不以 toast 提示的状态码列表
    excludedTipCode: [
      10010
    ],
    tip: {
      unknown: '未定义错误',
      serverError: '服务器繁忙，请稍后再试',
    }
  },
  url: {
    assets: {
    }
  },
}
