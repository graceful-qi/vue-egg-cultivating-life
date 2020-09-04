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

const lessRuleMatcher = rule =>
  rule.test && String(rule.test) === String(/\.less$/);

const createLoaderMatcher = loader => rule =>
  rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
const lessLoaderMatcher = createLoaderMatcher("less-loader");
const postcssLoaderMatcher = createLoaderMatcher("postcss-loader");
const fileLoaderMatcher = createLoaderMatcher("file-loader");


function createCustomAntdTheme() {
  const lessLoaderOptions = {
    modifyVars: theme,
    javascriptEnabled: true
  }

  return function(config, env) {
    const lessRule = findRule(config.module.rules, lessRuleMatcher);

    const lessLoader = findRule(lessRule, lessLoaderMatcher);

    lessLoader.options = Object.assign(lessLoader.options, lessLoaderOptions)

    return config;
  };
}

const customAntdTheme = createCustomAntdTheme();

customAntdTheme.withLoaderOptions = createCustomAntdTheme;

module.exports = customAntdTheme;
