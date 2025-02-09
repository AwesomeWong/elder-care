import { request } from '@/utils/request'

// 获取分页查询数据
export function getBillList(params) {
  return request.get({
    url: '/bill/page/',
    params
  })
}
// 欠费查询数据
export function getArrearsList(params) {
  return request.get({
    url: '/bill/arrears/',
    params
  })
}
// 预付费充值记录
export function getBeforehandList(params) {
  return request.get({
    url: '/bill/prepaidRechargeRecord/page',
    params
  })
}
// 分页查询余额
export function getBalanceList(params) {
  return request.get({
    url: '/bill/balance/',
    params
  })
}
// 支付账单
export function billPay(params) {
  return request.post({
    url: `/bill/payRecord`,
    params
  })
}
// 创建账单
export function createBill(params) {
  return request.post({
    url: `/bill`,
    params
  })
}
// 取消
export function cancelBill(params, id) {
  return request.put({
    url: `/bill/cancel/${id}`,
    params
  })
}
// 账单详情
export function billDetail(id) {
  return request.get({
    url: `/bill/${id}`
  })
}
// 创建充值记录
export function creatRecharge(params) {
  return request.post({
    url: `/bill/prepaidRechargeRecord`,
    params
  })
}
