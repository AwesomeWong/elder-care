// 获取常用时间
import dayjs from 'dayjs'

export const LAST_7_DAYS = [
  dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD')
]

export const LAST_30_DAYS = [
  dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD')
]
// 获取日期转换
// 获取处理当前日期，时分秒以00:00:00显示
export const getTate = (time) => {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${addZero(y)}-${addZero(m)}-${addZero(d)}T${time}:00`
}
// 获取处理当前日期，去除T
export const getTateDt = (time) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const min = date.getMinutes()
  const Sec = date.getSeconds()
  return `${addZero(y)}-${addZero(m)}-${addZero(d)} ${addZero(h)}:${addZero(
    min
  )}:${addZero(Sec)}`
}
// 获取处理当前日期，添加T
export const getTateAddt = (time) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const min = date.getMinutes()
  const Sec = date.getSeconds()
  return `${addZero(y)}-${addZero(m)}-${addZero(d)}T${addZero(h)}:${addZero(
    min
  )}:${addZero(Sec)}`
}
// 获取时间段时分00:00
export const getTime = (val) => {
  const date = new Date(val)
  const h = date.getHours()
  const min = date.getMinutes()
  return `${addZero(h)}:${addZero(min)}`
}
// 时间不足两位在前面补0
export const addZero = (s) => {
  return s < 10 ? `0${s}` : s
}
// 获取年月日
export const getDateInfo = (time) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${addZero(y)}-${addZero(m)}-${addZero(d)}`
}
// 获取年月日
export const getYearMonthInfo = (time) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  return `${addZero(y)}-${addZero(m)}`
}
// 获取月份的天数
export const getMonthInfo = (time) => {
  const todayDate = new Date()
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = todayDate.getDate()
  const newm = todayDate.getMonth() + 1
  const days = new Date(y, m, 0).getDate()
  const dayObj = {
    days,
    surplusDay: m > newm ? days : days - d
  }
  return dayObj
}
// 获取两个日期之间的天数
export const getDays = (startTime, endTime) => {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  const days = Math.floor((end - start) / 86400000)
  return days + 1
}
// 时间戳转日期
export const getTimestamp = (time) => {
  // 此处时间戳以毫秒为单位
  const date = new Date(parseInt(time))
  const Year = date.getFullYear()
  const Moth =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const Day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const Hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const Minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const Sechond =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  const GMT = `${Year}-${Moth}-${Day}   ${Hour}:${Minute}:${Sechond}`
  return GMT
}
// 获取一个小时的
export function getHours() {
  const date = new Date()
  const hour = new Date(date.getTime() - 1 * 60 * 60 * 1000)
  return hour
}
// 获取24小时的
export function getHours24() {
  const date = new Date()
  const hour = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  return hour
}
// 获取7天前的日期
export function getDay7() {
  const date = new Date()
  const day = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
  return day
}
// 获取开始时间戳
export const getStartTimeStr = (time) => {
  const date = getStartTime(time)
  return new Date(date).getTime()
}
// 获取结束时间戳
export const getEndTimeStr = (time) => {
  const date = getEndTime(time)
  return new Date(date).getTime()
}
// 获取开始时间日期
export const getStartTime = (time) => {
  return getTateDt(new Date(`${time} 00:00:00`))
}
// 获取结束时间日期
export const getEndTime = (time) => {
  return getTateDt(new Date(`${time} 23:59:59`))
}
// //
// export const getStartMonthStr = (time) => {
//   const date = new Date(new Date(time).getTime())
//   const y = date.getFullYear()
//   const m = date.getMonth() + 1
//   return new Date(`${addZero(y)}-${addZero(m)}- 01`).getTime()
// }
// export const getEndMonthStr = (time) => {
//   const date = new Date(new Date(time).getTime())
//   const y = date.getFullYear()
//   const m = date.getMonth() + 1
//   const days = new Date(y, m, 0).getDate()
//   return new Date(`${addZero(y)}-${addZero(m)}-${days}`).getTime()
// }

// 根据参数日期获取具体日期信息
export const formatDate = function (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]

  const dateInfo = {
    date: new Date(date),
    dateStr: `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
    year,
    month,
    day,
    week,
    isToday: false
  }

  const today = new Date()
  // 判断是否为当天
  if (
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day
  ) {
    dateInfo.isToday = true
  }
  return dateInfo
}

// 根据基准日期，获取长度为dayLenth的日期数组
export const setDate = function (date, step = 7) {
  const weekData = []
  const week = date.getDay() - 0 // 0是从周日至周六；1是从周一至周日
  date = getDateByDate(date, week * -1)
  for (let i = 0; i < step; i++) {
    weekData.push(formatDate(i === 0 ? date : getDateByDate(date, 1)))
  }
  return weekData
}

// 根据基准日期获取前后某天的日期对象
export const getDateByDate = function (date, range = 0) {
  date.setDate(date.getDate() + range)
  return date
}

/* 
  获取以baselineDate所在周的一周、前一周、下一周的日期和星期信息(切换周期也可通过参数dayLenth自行设置)
  baselineDate: 设置的基准日期(返回的日期列表的第一个日期)
  range: 以 baselineDate 为基准日期的前后天数范围(如基准日期的range为0，需要返回前7天日期，则range为-7，后7天则range为7)
  step: 需要获取的日期信息周期天数，默认获取baselineDate所在周的一周日期信息
 */
export const getWeekDate = ({ baselineDate, range = 0, step = 7 }) => {
  return setDate(getDateByDate(baselineDate, range), step)
}
