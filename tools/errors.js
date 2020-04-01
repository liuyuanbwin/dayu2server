module.exports = error => {
  switch (error) {
    case 0:
      return '请求成功'
      break
    case 40001:
      return '手机号码已被注册'
      break
    case 40002:
      return '数据保存错误'
      break
    case 40003:
      return '手机未注册'
      break
    case 40004:
      return '密码错误'
      break
    case 40005:
      return '未登录或token失效'
      break
    case 40006:
      return '查询出错'
      break
      case 40007:
      return '请求参数错误'
      break
    default:
      return '未知错误'
      break
  }
}
