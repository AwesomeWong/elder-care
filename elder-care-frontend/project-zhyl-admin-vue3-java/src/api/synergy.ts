import { request } from '@/utils/request'
import type { ListResult, ListModel, FormApply } from '@/api/model/synergyModel'
// 获取分页查询数据
export function getBacklogList(params) {
  return request.post<ListResult>({
    url: '/pending_tasks/selectByPage',
    params
  })
}
// 获取退住分页查询数据
export function getSelectByPage(params) {
  return request.post<ListResult>({
    url: '/elder/selectByPage',
    params
  })
}
// 我的申请获取分页查询数据
export function getApplicationList(params) {
  return request.post<ListResult>({
    url: '/applications/selectByPage',
    params
  })
}
// 获取详情
export function getRetreatCode(params) {
  return request.get<ListModel>({
    url: `/elder`,
    params
  })
}
// 申请退住
export function applyBack(params) {
  return request.post<FormApply>({
    url: `/elder/create`,
    params
  })
}
// 提交
export function examineSubmit(params) {
  return request.post<FormApply>({
    url: `/elder/submit`,
    params
  })
}
// 拒绝提交
export function rejectSubmit(params) {
  return request.put<FormApply>({
    url: `/elder/reject?retreatCode=${params.retreatCode}&reject=${params.reject}&taskId=${params.taskId}`
  })
}
// 驳回
export function turnSubmit(params) {
  return request.put<FormApply>({
    url: `/elder?retreatCode=${params.retreatCode}&message=${params.message}&taskId=${params.taskId}`
  })
}
// 撤回
export function revocationSubmit(params) {
  return request.put<FormApply>({
    url: `/elder/revocation?retreatCode=${params.retreatCode}&flowStatus=${params.flowStatus}&taskId=${params.taskId}`
  })
}
// 撤销
export function cancelSubmit(params) {
  return request.put<FormApply>({
    url: `/elder/cancel?retreatCode=${params.retreatCode}&taskId=${params.taskId}`
  })
}
// 上传退款凭证
export function uploadRefundVoucher(params) {
  return request.put<FormApply>({
    url: `/retreat_bills/uploadRefundVoucher`,
    params
  })
}
// 获取上传退款凭证详情
export function getUploadRefund(params) {
  return request.get({
    url: `/retreat_bills`,
    params
  })
}
