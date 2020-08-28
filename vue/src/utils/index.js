import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

// 判断类型 环境
/**
 * 判断值是否为空
 * @param v
 * @returns {boolean}
 */
export const isUndef = v => v === undefined

/**
 * 判断是否为函数类型
 * @param func
 * @returns {boolean}
 */
export const isFunc = func => typeof func === 'function'

/**
 * 判断运行时环境是否为 app
 * @returns {boolean}
 */
export const getRunTimeEnvIsApp = () => {
  const UA = window.navigator.userAgent
  const reg = /APP/i
  return reg.test(UA)
}

/**
 * 判断用户来源 来自哪端设备
 * @returns {strind}
 */
export const userSource = () => {
  const UA = window.navigator.userAgent
  if (/(iPhone|iPad|iPod|iOS)/i.test(UA)) {
    return 'Apple'
  } else if (/(Android)/i.test(UA)) {
    return 'Android'
  } else {
    return 'PC'
  }
}

/**
  * 判断运行时环境是否为 weixin
  * @returns {boolean}
 */
export const getRunTimeEnvIsWx = () => {
  const UA = window.navigator.userAgent
  const reg = /MicroMessenger/i
  return reg.test(UA)
}

// 校验
/**
 * 校验手机号是否合法
 * @param phone
 * @returns {boolean}
 */
export const validatePhone = phone => {
  if (typeof phone === 'number') phone += ''

  phone = phone.trim()

  if (phone.length !== 11) return false

  // China Mobile
  // 134,135,136,137,138,139,147(数据卡),150,151,152,157,158,159,170[5],178,182,183,184,187,188
  const cmReg = /^((13[4-9])|(147)|(15[0-2, 7-9])|(178)|(18[2-4,7-8]))\d{8}|(1705)\d{7}$/

  // China Unicom
  // 130,131,132,145(数据卡),155,156,170[4,7-9],171,175,176,185,186
  const cuReg = /^((13[0-2])|(145)|(15[5-6])|(17[156])|(18[5-6]))\d{8}|(170[4,7-9])\d{7}$/

  // China Telecom
  // 133,149(数据卡),153,170[0-2],173,177,180,181,189
  const ctReg = /^((133)|(149)|(153)|(17[3,7])|(18[0,1,9]))\d{8}|(170[0-2])\d{7}$/

  return cmReg.test(phone) || cuReg.test(phone) || ctReg.test(phone)
}

// url处理
/**
 * 获取 url 全路径
 * @param location
 * @returns {*}
 */
export const getFullPath = location => {
  return location.pathname + location.search + location.hash
}

/**
 * 获取 hash router 的查询参数
 * @returns {string}
 */
export const getHashRouterQueryString = () => {
  const url = new URL(`about:blank${window.location.hash.slice(1)}`)
  return url.search
}

/**
 * 确保 string 末尾有 '/'
 * @param str {string}
 * @returns {string}
 */
export const ensureTailHasSlash = str => /.*\/$/.test(str) ? str : str + '/'

/**
 * 确保 string 开头没有 '/'
 * @param str {string}
 * @reutrns {string}
 */
export const ensureCapitalHasNotSlash = str => /^\/.*/.test(str) ? str.slice(1) : str


// 时间 倒计时

/**
 * 返回时间范围
 * @param start
 * @param end
 * @param period 'days' | 'weeks' | 'months' | 'd' | 'w' | 'm'
 */
export const dateRange = (start, end, period = 'days') => {
  if (!period) throw new Error('The argument `period` is Required.')

  let formatStr = ''

  if (period === 'days' || period === 'd') {
    period = 'days'
    formatStr = 'YYYY-MM-DD'
  } else if (period === 'weeks' || period === 'w') {
    period = 'weeks'
    formatStr = 'YYYY-WW'
  } else if (period === 'months' || period === 'm') {
    period = 'months'
    formatStr = 'YYYY-MM'
  }

  return Array.from(moment.range(
    moment(start, formatStr),
    moment(end, formatStr)
  ).by(period)).map(itm => itm.format(formatStr))
}

/**
 * 倒计时
 * @param count {number}
 * @param callback {function}
 * @param step {number}
 * @param interval {number}
 * @returns {{unsubscribe: function}}
 */
export const countDown = (count, callback, step = 1, interval = 1000) => {
  let timer = null

  const clearInterval = () => {
    timer && window.clearInterval(timer)
  }

  const intervalHandler = () => {
    if (count <= 0) clearInterval()
    if (callback) callback(count)
    count -= step
  }

  intervalHandler()

  timer = window.setInterval(intervalHandler, interval)

  return {
    unsubscribe: clearInterval,
  }
}

// 数字处理

/**
 * 十位补零
 * @param num
 * @returns {string}
 */
export const paddingZero = num => num < 10 ? '0' + num : num

/**
 * 获取指定范围内的随机数
 * @param min 开始数字 
 * @param max 结束数字
 */
export const getRadomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// 字符串处理
/**
 * 查找字符串中的最长公共前缀
 * @param arr 字符串数组
 */
export const getMaxStrPart = (arr) => {
  let firstStr = arr[0], result = ''
  if (!arr.length) return result
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (firstStr[i] != arr[j][i]) {
        return result
      }

    }
    result += firstStr[i]
  }
  return result
}

/**
 * 统计一个字符串出现最多的字母
 * @param obj 数据
 * @returns 
 */
export const getMaxStrLetter = (arr) => {
  if (!arr.length) return;
  if (arr.length === 1) return { maxel: arr[0], maxnum: 1 };
  let h = {}, maxnum = 0, maxel = '';
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i]
    h[a] === undefined ? h[a] = 1 : (h[a]++)
    if (h[a] > maxnum) {
      maxnum = h[a]
      maxel = a
    }
  }
  return { maxel, maxnum }
}

// 数组 对象处理

/**
 * 去掉一组一维数组重复的值
 * @param obj 数据
 */
export const unique = (arr) => {
  let hashTable = {};
  let data = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!hashTable[arr[i]]) {
      hashTable[arr[i]] = true;
      data.push(arr[i]);
    }
  }
  return data
}

/**
 * 通过JSON来进行数组对象的 深拷贝
 * @param obj 数据
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 生成斐波那契数组
 * @param n 数组长度
 */
export const getFibonacci = (n) => {
  let fibarr = [];
  let i = 0;
  while (i < n) {
    if (i <= 1) {
      fibarr.push(i);
    } else {
      fibarr.push(fibarr[i - 1] + fibarr[i - 2])
    }
    i++;
  }
  return fibarr;
}

/**
 * 跳转页面
 * @param {string} url H5地址
 * @param {number} new_page 是否打开新页面(1: 新页面；0: 当前页面)
 * @param {bool} is_hash_route 是否hash值
 */
export const goH5 = (
  {
    url,
    newPage = 1,
    isHashRoute = true
  }
) => {
  if (newPage) {
    if (isHashRoute) {
      window.location.hash = `#${url}`
    } else {
      window.location.href = url
    }
  } else {
    if (isHashRoute) {
      const { origin } = window.location
      url = `${origin}/#${url}`
      window.location.replace(url)
    } else {
      window.location.replace(url)
    }
  }
}

/**
 * 页面滚动到制定位置
 * @param scrollTargetY
 * @param speed
 * @param easing
 */
export const scrollToY = (scrollTargetY = 0, speed = 2000, easing = 'easeOutSine') => {
  return new Promise((resolve) => {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    let scrollY = window.scrollY,
      currentTime = 0;

    // min time .1, max time .8 seconds
    let time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    let easingEquations = {
      easeOutSine: function (pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: function (pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint: function (pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      }
    };

    // add animation loop
    function tick() {
      currentTime += 1 / 60;

      let p = currentTime / time;
      let t = easingEquations[easing](p);

      if (p < 1) {
        raf(tick);

        window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
      } else {
        // console.log('scroll done');
        window.scrollTo(0, scrollTargetY);
        resolve()
      }
    }

    // call it once to get started
    tick();
  })
}

/**
 * 页面底部动态插入 js
 * @param src
 * @returns {Promise<any>}
 */
export const insertScript = src => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')

    document.body.appendChild(script)

    script.addEventListener('load', () => {
      script = null
      resolve()
    })
    script.addEventListener('error', () => {
      script = null
      reject()
    })

    script.src = src
  })
}

// 通用唯一识别码 uuid生成
export const uuid = () => {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // s[8] = s[13] = s[18] = s[23] = "=";
  return s.join('')
}

/**
 * 加载图片
 * @param src: string
 * @returns {Promise<any>}
 */
export const loadImage = src => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => {
      resolve(image)
    })
    image.addEventListener('error', err => {
      reject(err)
    })

    image.src = src
  })
}


export default {
  // 判断类型 环境
  isUndef,
  isFunc,
  getRunTimeEnvIsApp,
  userSource,
  getRunTimeEnvIsWx,
  // 校验
  validatePhone,
  // url处理
  getFullPath,
  getHashRouterQueryString,
  ensureTailHasSlash,
  ensureCapitalHasNotSlash,
  // 时间 倒计时
  dateRange,
  countDown,
  // 数字处理
  paddingZero,
  getRadomNum,
  // 字符串处理
  getMaxStrPart,
  getMaxStrLetter,
  // 数组 对象处理
  unique,
  deepClone,
  getFibonacci,
  // 其他
  goH5,
  scrollToY,
  insertScript,
  uuid,
  loadImage,
}
