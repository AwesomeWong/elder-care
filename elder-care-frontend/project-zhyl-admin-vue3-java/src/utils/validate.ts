// 文字字节数限制
export const validateTextLength = (value, maxLimitStr) => {
  // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
  const cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/
  let substringStr = ''
  let length = 0
  const strArr = value.split('')
  let obj = {}
  strArr.map((str) => {
    if (cnReg.test(str)) {
      // 中文
      length++
    } else {
      // 英文
      length += 0.5
    }
    // 大于最大限制的时候
    if (length > maxLimitStr) {
      substringStr = substringStr
    } else {
      substringStr += str
    }
  })
  if (length > maxLimitStr) {
    length = maxLimitStr
  }
  return (obj = {
    numVal: Math.floor(length),
    val: substringStr
  })
}
export const validateTextLen = (value, maxLimitStr) => {
  const val = value.slice(0, maxLimitStr)
  return val
}
// 调用次数限制
export const validateNum = (val) => {
  const reg = /^[0-9]*$/
  if (reg.test(val) && val <= 999 && val >= 0) {
    return true
  }
  return false
}
// 限制字符5-50
export const validateText = (val) => {
  if (val && val.length >= 5 && val.length <= 50) {
    return true
  }
  return false
}
// 限制字符2-5
export const validateText5 = (val) => {
  if (val && val.length >= 2 && val.length <= 5) {
    return true
  }
  return false
}
// 验证手机号
export const validatePhone = (val) => {
  console.log(val)
  if (val !== undefined && val !== '') {
    const reg =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (reg.test(val)) {
      return true
    }
    return false
  }
  return true
}
// 验证码
export const validateCode = (val) => {
  const reg = /^\d{6}$/
  if (reg.test(val)) {
    return true
  }
  return false
}
// 限制字符2-10
export const validateText10 = (val) => {
  if (val && val.length >= 2 && val.length <= 10) {
    return true
  }
  return false
}
// 判断是否有小数点
export const isDecimals = (val) => {
  if (String(val).indexOf('.') > -1) {
    return true
  }
  return false
}
// 身份证校验
export const validateIdentityCard = (value) => {
  console.log(value)
  const accountreg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/g
  if (accountreg.test(value)) {
    return true
  }
  return false
}
// 数字校验
export const validateIdentityNum = (value) => {
  if (value === NaN) {
    return false
  }
  const accountreg = /^[0-9]*$/
  if (accountreg.test(value)) {
    return true
  }
  return false
}

// 实现自动生成生日，性别，年龄
export const getBirthday = (val) => {
  let sex = null
  let birth = null
  const myDate = new Date()
  const month = myDate.getMonth() + 1
  const day = myDate.getDate()
  let age = 0
  if (val.length === 18) {
    // 生日
    age = myDate.getFullYear() - val.substring(6, 10) - 1
    sex = val.substring(16, 17)
    birth = `${val.substring(6, 10)}-${val.substring(10, 12)}-${val.substring(
      12,
      14
    )}`
    // 年龄
    if (
      val.substring(10, 12) < month ||
      (val.substring(10, 12) === month && val.substring(12, 14) <= day)
    )
      age++
  }
  if (val.length === 15) {
    age = myDate.getFullYear() - val.substring(6, 8) - 1901
    sex = val.substring(13, 14)
    birth = `19${val.substring(6, 8)}-${val.substring(8, 10)}-${val.substring(
      10,
      12
    )}`
    if (
      val.substring(8, 10) < month ||
      (val.substring(8, 10) === month && val.substring(10, 12) <= day)
    )
      age++
  }
  // 性别
  if (sex % 2 === 0) sex = 1
  else sex = 0

  const info = {
    // 性别  ==> 0:男       1:女
    // 性别
    sex,
    // 出生日期
    birthdate: birth,
    // 年龄
    age
  }
  console.log(info)
  return info
}

//
export const isCardID = (sId) => {
  if (
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
      sId
    )
  ) {
    console.log('你输入的身份证长度或格式错误')
    return false
  }
  // 身份证城市
  const aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  if (!aCity[parseInt(sId.substr(0, 2))]) {
    console.log('你的身份证地区非法')
    return false
  }

  // 出生日期验证
  const sBirthday = `${sId.substr(6, 4)}-${Number(sId.substr(10, 2))}-${Number(
    sId.substr(12, 2)
  )}`.replace(/-/g, '/')
  const d = new Date(sBirthday)
  if (sBirthday !== `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`) {
    console.log('身份证上的出生日期非法')
    return false
  }
  // 注释信息是严谨
  // // 身份证号码校验
  // let sum = 0
  // const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // const codes = '10X98765432'
  // for (let i = 0; i < sId.length - 1; i++) {
  //   sum += sId[i] * weights[i]
  // }
  // const last = codes[sum % 11] // 计算出来的最后一位身份证号码

  sId = sId.split('')
  if (sId[17] === 'x') {
    sId[17] = sId[17].toUpperCase()
  }
  // if (sId[sId.length - 1] !== last) {
  //   console.log('你输入的身份证号非法')
  //   return false
  // }

  return true
}
export function validatePasswordL(password) {
  console.log(password)
  // 检查密码长度
  if (password !== undefined && (password.length < 8 || password.length > 20)) {
    return false
  }
  return true
}
// 校验数字
export function validatePasswordN(password) {
  const digitRegex = /[0-9]/
  if (!digitRegex.test(password)) {
    return false
  }
  return true
}
// 校验小写
export function validatePasswordLc(password) {
  // 检查是否包含小写字母、大写字母、
  const lowercaseRegex = /[a-z]/
  if (!lowercaseRegex.test(password)) {
    return false
  }
  return true
}
// 校验大写
export function validatePasswordUc(password) {
  // 检查是否包含小写字母、大写字母、
  const uppercaseRegex = /[A-Z]/
  if (!uppercaseRegex.test(password)) {
    return false
  }
  return true
}
// 禁止输入中文校验
export function validateForbid(val) {
  const Regex = /^[^\u4e00-\u9fa5]{4,15}$/g
  if (!Regex.test(val)) {
    return false
  }
  return true
}
// 获取字符串中的数字
export function getNum(val) {
  return val.replace(/[^\d]/g, '')
}
