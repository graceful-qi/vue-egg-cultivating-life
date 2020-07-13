// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = ({ file }) => {
  let rootValue
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    rootValue = 50 // 针对vant ui 字体变小所有对vant下目录重新配置rem
  } else {
    rootValue = 100
  }
  return {
    "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      // to edit target browsers: use "browserslist" field in package.json
      "autoprefixer": {},
      "postcss-pxtorem": {
        "rootValue": rootValue, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
        "propList": ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
        "selectorBlackList": [ //这是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
          // ".van-"
        ],
        // unitPrecision: 5, //保留rem小数点多少位
        // mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
        // minPixelValue: 12, //px小于12的不会被转换
      }
    }
  }
}
