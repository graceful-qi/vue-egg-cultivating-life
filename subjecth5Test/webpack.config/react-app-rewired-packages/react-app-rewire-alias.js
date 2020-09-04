const fs = require('fs')
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

const projectDir = path.resolve(fs.realpathSync(process.cwd()))

const rewireAlias = (config, env) => {

  config.resolve.alias = Object.assign(config.resolve.alias, {
    '@': resolve(`${projectDir}/src`)
  })

  return config
}

module.exports = rewireAlias;
