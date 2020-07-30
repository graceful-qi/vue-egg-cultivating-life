// 返回隐藏canvas
export const getsCanvas = (function () {
  let canvas = null
  return function () {
    if (!canvas) {
      canvas = document.createElement('canvas')
    }
    return canvas
  }
})()
