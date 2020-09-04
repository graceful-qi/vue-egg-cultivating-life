const autoprefixer = require('autoprefixer');
const path = require("path");

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
const postcssLoaderMatcher = createLoaderMatcher("postcss-loader");

function createCustomPostCSS() {
  const pxtoremOptions = {
    rootValue: 100,
    unitPrecision: 5,
    propList: ['*'],
    // selectorBlackList: [/^\.am-/],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  }

  return function(config, env) {
    const cssRule = findRule(config.module.rules, cssRuleMatcher);

    // cssRule.exclude = /node_modules/;

    const postCssLoader = findRule(cssRule, postcssLoaderMatcher);
    postCssLoader.options.plugins = () => {
      return [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
        }),
      ]
    }

    return config;
  };
}

const customPostCSS = createCustomPostCSS();

customPostCSS.withLoaderOptions = createCustomPostCSS;

module.exports = customPostCSS;
