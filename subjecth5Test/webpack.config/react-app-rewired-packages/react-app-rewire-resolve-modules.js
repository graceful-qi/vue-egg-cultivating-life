const rewireResolveModules = (config, env) => {
  config.resolve.modules = ['./'].concat(config.resolve.modules)
  return config
}

module.exports = rewireResolveModules;
