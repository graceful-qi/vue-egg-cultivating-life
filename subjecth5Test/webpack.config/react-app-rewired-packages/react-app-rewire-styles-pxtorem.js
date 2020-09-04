const postcssPxtorem = require('postcss-pxtorem')
const { cloneDeep } = require("lodash");
const path = require("path");
const theme = require('../../package.json').theme;

const ruleChildren = loader =>
  loader.use ||
  loader.oneOf ||
  (Array.isArray(loader.loader) && loader.loader) ||
  [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result = undefined;
  const rules = Array.isArray(rulesSource)
    ? rulesSource
    : ruleChildren(rulesSource);
  rules.some(
    (rule, index) =>
      (result = ruleMatcher(rule)
        ? { index, rules }
        : findIndexAndRules(ruleChildren(rule), ruleMatcher))
  );
  return result;
};

const findRule = (rulesSource, ruleMatcher) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  return rules[index];
};

const cssRuleMatcher = rule =>
  rule.test && String(rule.test) === String(/\.css$/);

const createLoaderMatcher = loader => rule =>
  rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
const cssLoaderMatcher = createLoaderMatcher("css-loader");
const postcssLoaderMatcher = createLoaderMatcher("postcss-loader");
const fileLoaderMatcher = createLoaderMatcher("file-loader");

function createStylesPxtorem() {
  const pxtoremOptions = {
    rootValue: 100,
    unitPrecision: 5,
    propList: ['*'],
    // selectorBlackList: [/^\.am-/],
    replace: true,
    mediaQuery: true,
    minPixelValue: 0
  }
  const lessLoaderOptions = {
    modifyVars: theme
  }

  return function(config, env) {
    const cssRule = findRule(config.module.rules, cssRuleMatcher);

    // cssRule.exclude = /node_modules/;

    const postCssLoader = findRule(cssRule, postcssLoaderMatcher);
    const _plugins = postCssLoader.options.plugins()
    _plugins.push(postcssPxtorem(pxtoremOptions))
    postCssLoader.options.plugins = () => {
      return _plugins
    }

    return config;
  };
}

const stylesPxtorem = createStylesPxtorem();

stylesPxtorem.withLoaderOptions = createStylesPxtorem;

module.exports = stylesPxtorem;
