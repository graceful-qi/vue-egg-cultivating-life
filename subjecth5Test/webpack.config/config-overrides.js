// const { injectBabelPlugin } = require('./react-app-rewired')
const rewireStylusModules = require('./react-app-rewired-packages/react-app-rewire-stylus-modules')
const rewireCustomPostCSS = require('./react-app-rewired-packages/react-app-rewire-postcss')
const rewireStylesPxtorem = require('./react-app-rewired-packages/react-app-rewire-styles-pxtorem')
const rewireLessModules = require("./react-app-rewired-packages/react-app-rewire-less-modules");
const rewireAntdTheme = require('./react-app-rewired-packages/react-app-rewire-antd-theme')
const rewireAlias = require('./react-app-rewired-packages/react-app-rewire-alias')
const rewireRemoveConsole = require('./react-app-rewired-packages/react-app-rewire-remove-console')
const rewireExternals = require('./react-app-rewired-packages/react-app-rewire-externals')
// const rewireInsertDataIntoHTML = require('./react-app-rewired-packages/react-app-rewire-insert-data-into-html')

process.env.HHHHH = 'WTF!'

module.exports = function override(config, env) {
  // 按需引入  // 已经在.babelrc 配置
  // config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: true }], config)

  // alias
  config = rewireAlias(config, env)

  // custom postcss
  config = rewireCustomPostCSS(config, env)

  // px to rem
  config = rewireStylesPxtorem(config, env)

  /**
   * css modules
   *   1. *.css *.styl 不使用模块
   *   2. *.module.css *.module.styl 使用模块
   */
  config = rewireStylusModules(config, env)

  config = rewireLessModules(config, env)

  // custom antd theme
  config = rewireAntdTheme(config, env)

  // remove console.log
  config = rewireRemoveConsole(config, env)

  // rewire externals
  config = rewireExternals(config, env)

  // request
  // config = rewireInsertDataIntoHTML(config, env)
  return config
}
