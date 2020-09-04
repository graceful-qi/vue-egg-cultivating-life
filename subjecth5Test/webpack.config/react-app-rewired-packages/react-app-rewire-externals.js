const rewireExternals = (config, env) => {

  config.externals = {
    wx: 'wx'
  }

  return config
}

module.exports = rewireExternals;
