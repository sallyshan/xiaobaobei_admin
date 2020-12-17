// 金额转换
export default {
  changeMoney(num) {
    var regexp = /(?:\.0*|(\.\d+?)0+)$/
    if (num > 1000000) {
      num = JSON.stringify(num).slice(0, JSON.stringify(num).length - 4) / 100
      return num + '万'
    } else {
      num = (num / 100).toFixed(2)
      num = num.replace(regexp, '$1')
      return num
    }
  }
}
