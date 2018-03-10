exports.validate = (param, rules, args) => {
  for (let key in rules) {
    const reg = rules[key].reg
    const error = rules[key].msg
    const regType = Object.prototype.toString.call(reg)
    if (regType === '[object RegExp]' && !reg.test(param[key])) {
      return { key, error }
    } else if (regType === '[object Function]' && !reg(param[key], args)) {
      return { key, error }
    }
  }
  return { key: '', error: '' }
}
