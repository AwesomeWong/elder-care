// 文字字节数限制
export const validateTextLength = (value, maxLimitStr) => {
  // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
  const cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/
  let substringStr = ''
  let length = 0
  const strArr = value.split('')
  let obj = {}
  strArr.forEach((item) => {
    if (cnReg.test(item)) {
      length++
    } else {
      length += 0.5
    }
    if (length > maxLimitStr) {
      substringStr += ''
    } else {
      substringStr += item
    }
    if (length > maxLimitStr) {
      length = maxLimitStr
    }
  })
  obj = {
    value: substringStr,
    numVal: Math.floor(length)
  }
  return obj
}

// 将接口URL中的参数以对象的形式展示出来
export function getUrlParams(url) {
  const urlStr = url.split('?')[1]
  const urlSearchParams = new URLSearchParams(urlStr)
  const result = Object.fromEntries(urlSearchParams.entries())
  return result
}

// 生成唯一标识uuid
export function uuid(len, radix) {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

const transitionJsonToString = (jsonObj, callback) => {
  // 转换后的jsonObj受体对象
  let _jsonObj = null
  // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
  if (Object.prototype.toString.call(jsonObj) !== '[object String]') {
    try {
      _jsonObj = JSON.stringify(jsonObj)
    } catch (error) {
      // 转换失败错误信息
      callback(error)
    }
  } else {
    try {
      jsonObj = jsonObj.replace(/(\')/g, '"')
      _jsonObj = JSON.stringify(JSON.parse(jsonObj))
    } catch (error) {
      // 转换失败错误信息
      callback(error)
    }
  }
  return _jsonObj
}
// 将后端返回的JSON转为JSON字符串并格式化展示
export const formatJson = (jsonObj, callback) => {
  // 正则表达式匹配规则变量
  const reg = null
  // 转换后的字符串变量
  let formatted = ''
  // 换行缩进位数
  let pad = 0
  // 一个tab对应空格位数
  const PADDING = '&nbsp;&nbsp;&nbsp;&nbsp;'
  // json对象转换为字符串变量
  let jsonString = transitionJsonToString(jsonObj, callback)
  if (!jsonString) {
    return jsonString
  }
  // 存储需要特殊处理的字符串段
  const _index = []
  // 存储需要特殊处理的“再数组中的开始位置变量索引
  let _indexStart = null
  // 存储需要特殊处理的“再数组中的结束位置变量索引
  let _indexEnd = null
  // 将jsonString字符串内容通过\r\n符分割成数组
  let jsonArray = []
  // 正则匹配到{,}符号则在两边添加回车换行
  jsonString = jsonString.replace(/([\{\}])/g, '\r\n$1\r\n')
  // 正则匹配到[,]符号则在两边添加回车换行
  jsonString = jsonString.replace(/([\[\]])/g, '\r\n$1\r\n')
  // 正则匹配到,符号则在两边添加回车换行
  jsonString = jsonString.replace(/(\,)/g, '$1\r\n')
  // 正则匹配到要超过一行的换行需要改为一行
  jsonString = jsonString.replace(/(\r\n\r\n)/g, '\r\n')
  // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
  jsonString = jsonString.replace(/\r\n\,/g, ',')
  // 特殊处理双引号中的内容
  jsonArray = jsonString.split('\r\n')
  jsonArray.forEach(function (node, index) {
    // 获取当前字符串段中"的数量
    const num = node.match(/\"/g) ? node.match(/\"/g).length : 0
    // 判断num是否为奇数来确定是否需要特殊处理
    if (num % 2 && !_indexStart) {
      _indexStart = index
    }
    if (num % 2 && _indexStart && _indexStart != index) {
      _indexEnd = index
    }
    // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
    if (_indexStart && _indexEnd) {
      _index.push({
        start: _indexStart,
        end: _indexEnd
      })
      _indexStart = null
      _indexEnd = null
    }
  })
  // 开始处理双引号中的内容，将多余的"去除
  _index.reverse().forEach(function (item, index) {
    const newArray = jsonArray.slice(item.start, item.end + 1)
    jsonArray.splice(item.start, item.end + 1 - item.start, newArray.join(''))
  })
  // 将处理后的数组通过\r\n连接符重组为字符串
  jsonString = jsonArray.join('\r\n')
  // 将匹配到:后为回车换行加大括号替换为冒号加大括号
  jsonString = jsonString.replace(/\:\r\n\{/g, ':{')
  // 将匹配到:后为回车换行加中括号替换为冒号加中括号
  jsonString = jsonString.replace(/\:\r\n\[/g, ':[')
  // 将上述转换后的字符串再次以\r\n分割成数组
  jsonArray = jsonString.split('\r\n')
  // 将转换完成的字符串根据PADDING值来组合成最终的形态
  jsonArray.forEach(function (item, index) {
    let i = 0
    // 表示缩进的位数，以tab作为计数单位
    let indent = 0
    // 表示缩进的位数，以空格作为计数单位
    let padding = ''
    if (item.match(/\{$/) || item.match(/\[$/)) {
      // 匹配到以{和[结尾的时候indent加1
      indent += 1
    } else if (
      item.match(/\}$/) ||
      item.match(/\]$/) ||
      item.match(/\},$/) ||
      item.match(/\],$/)
    ) {
      // 匹配到以}和]结尾的时候indent减1
      if (pad !== 0) {
        pad -= 1
      }
    } else {
      indent = 0
    }
    for (i = 0; i < pad; i++) {
      padding += PADDING
    }
    formatted += `${padding + item}<br />`
    pad += indent
  })
  // 返回的数据需要去除两边的空格和换行
  return formatted
    .trim()
    .replace(new RegExp('^\\' + '<br />' + '+|\\' + '<br />' + '+$', 'g'), '')
}

// 钱数自动补充两位小数
export function decimalsReplenish(value) {
  value = typeof value === 'string' ? Number(value) : value
  if (!value) return '0.00'

  value = value.toFixed(2)
  const intPart = Math.trunc(value) // 获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  if (value < 0 && value > -1) {
    intPartFormat = `-${intPartFormat}`
  }
  // 去除，分隔符
  if (intPartFormat.indexOf(',') !== -1) {
    intPartFormat = intPartFormat.split(',').join('')
  }

  let floatPart = '.00' // 预定义小数部分
  const value2Array = value.split('.')
  // =2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString() // 拿到小数部分
    if (floatPart.length === 1) {
      return `${intPartFormat}.${floatPart}0`
    }
    return `${intPartFormat}.${floatPart}`
  }
  return intPartFormat + floatPart
}
export function onkeyup(val) {
  return val.key.replace(/[^\d^\.]+/g, '')
}
// 处理路由数据转化
export function routerFormat(data) {
  const dataMap = routerForm(data)
  return dataMap
}

function routerForm(data, tag?: string, par?: string, parentData?: any) {
  const baseFormat = {
    path: '',
    name: '',
    redirect: undefined,
    meta: { title: '', icon: '' },
    parent: undefined,
    children: []
  }
  const baseUrl = data.map((el) => {
    const baseData = { ...baseFormat }
    // 如果是一级目录必须子集 - 子集包含菜单或者目录
    if (tag === undefined && el.type === 'M' && el.children) {
      // 查找子集是有菜单并锁定位置
      let ind = -1
      el.children.forEach((ele, index) => {
        if (ele.type === 'C') {
          ind = index
        }
      })
      // 如果下面有菜单 直接返回该项
      // 一、有子集，
      if (el.children && ind !== -1) {
        baseData.path = el.path
        baseData.name = el.name
        baseData.meta = { title: el.name, icon: el.icon ?? '', single: true }
        baseData.redirect = `${el.path}/${el.children[ind].path}`
        baseData.children = routerForm(
          el.children,
          'child',
          undefined,
          el
        ).flatMap((n) => n)
      } else if (el.children) {
        baseData.path = el.path
        baseData.name = el.name
        baseData.meta = { title: el.name, icon: el.icon ?? '', single: true }
        baseData.redirect = `${el.path}/${el.children[0].path}`
        baseData.children = routerForm(
          el.children,
          'child',
          undefined,
          el
        ).flatMap((n) => n)
      }
      return baseData
    }
    // 如果是二级以后 目录：必须有子集 - 这个属于 无限基本的处理 但本版本并不支持先忽略 后面改版再说
    // if (tag === 'child' && el.type === 'M' && el.children) {
    //   const baseData = { ...baseFormat }
    //   baseData.path = el.path
    //   baseData.name = el.name
    //   baseData.meta = { title: el.name, icon: el.icon ?? '', single: true }
    //   // baseData.redirect = `${el.path}/${el.children[0].path}`
    //   baseData.children = routerForm(el.children, 'child', el.name)
    //   return baseData
    // }
    if (tag === 'child' && el.type === 'M' && el.children) {
      let catchList = []
      const baseData = { ...baseFormat }
      baseData.path = el.path
      baseData.name = el.name
      baseData.meta = {
        title: el.name,
        icon: el.icon ?? '',
        fullPath: parentData ? `${parentData.path}/${el.path}` : undefined
      }
      catchList = el.children.map((ele) => {
        const dishData = { ...baseFormat }
        dishData.path = ele.path
        dishData.name = ele.name
        dishData.meta = {
          title: ele.name,
          icon: ele.icon ?? '',
          fullPath: parentData ? `${parentData.path}/${el.path}` : undefined
        }
        dishData.parent = el.name
        dishData.children = undefined
        return removeUndefined(dishData)
      })
      return [removeUndefined(baseData), ...catchList]
    }
    // 如果是二级 菜单 直接返回  如果是二级以后的 需要标记父级 - 这个版本没有三级了 三级只是加prent进行标记
    if (tag === 'child' && el.type === 'C') {
      const baseData = { ...baseFormat }
      baseData.path = el.path
      baseData.name = el.name
      baseData.meta = {
        title: el.name,
        icon: el.icon ?? '',
        fullPath: parentData ? `${parentData.path}/${el.path}` : undefined
      }
      baseData.parent = par !== undefined ? par : undefined
      return baseData
    }
  })
  return removeUndefined(baseUrl)
}
// 清空对象里的undefined和对象里的null
function removeUndefined(data) {
  // 清空对象里的 undefined
  const baseData = JSON.parse(JSON.stringify(data))
  if (!Array.isArray(baseData)) {
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null)
        baseData[key] = data[key]
    }
  }

  const newArray = []
  // 清理掉数组里的 unll 和undefined
  if (Array.isArray(baseData)) {
    for (let i = 0; i <= baseData.length; i++) {
      if (baseData[i]) {
        newArray.push(baseData[i])
      }
    }
    return newArray
  }
  return baseData
}
export function getCaption(url, parameter) {
  const index = url.lastIndexOf(parameter)
  url = url.substring(index + 1, url.length)
  return url
}
// 下载
export function download(data, typelike, filename) {
  console.log(data, typelike, filename)
  // 创建Blob对象
  const blob = new Blob([data], { type: typelike })
  // 创建URL对象
  const url = URL.createObjectURL(blob)
  // 创建a标签
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  // 触发下载
  a.click()
  // 释放内存
  URL.revokeObjectURL(url)
}
//
export function getStr(val) {
  if (val !== undefined) {
    const arr = val.split(',')
    if (arr.length === 1) {
      return arr[0]
    }
    if (arr.length === 2) {
      return `${arr[0]}-${arr[1]}`
    }
    return `${arr[0]}-${arr[1]}-${arr[2]}`
  }
  return false
}
