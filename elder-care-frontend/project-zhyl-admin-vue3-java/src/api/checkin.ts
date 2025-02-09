import { request } from '@/utils/request'
import type {
  ListCheckin,
  FormApply,
  ConfigApply,
  SignTransaction
} from '@/api/model/checkInModel'
// 获取分页查询数据
export function getCheckInList(params) {
  return request.get<ListCheckin>({
    url: '/checkIn/selectByPage',
    params
  })
}
// // 获取退住分页查询数据
// export function getSelectByPage(params) {
//   return request.post<ListResult>({
//     url: '/elder/selectByPage',
//     params
//   })
// }
// // 我的申请获取分页查询数据
// export function getApplicationList(params) {
//   return request.post<ListResult>({
//     url: '/applications/selectByPage',
//     params
//   })
// }
// 获取详情
export function getCheckInfo(params) {
  return request.get({
    url: `/checkIn`,
    params
  })
}
// 申请入住
export function applyCheckIn(params) {
  return request.post<FormApply>({
    url: `/checkIn/create`,
    params
  })
}
// 入住评估
export function assessmentCheckIn(params) {
  return request.post({
    url: `/checkIn/review`,
    params
  })
}
// 提交配置
export function configSubmit(params) {
  return request.post<ConfigApply>({
    url: `/checkIn`,
    params
  })
}
// 提交签约办理
export function signSubmit(params) {
  return request.post<SignTransaction>({
    url: `/checkIn/sign`,
    params
  })
}
// 审批通过提交
export function checkInSubmit(params) {
  return request.put({
    url: `/checkIn/submit?id=${params.id}&message=${params.message}&taskId=${params.taskId}`
  })
}
// 拒绝提交
export function rejectSubmit(params) {
  return request.put({
    url: `/checkIn/reject?id=${params.id}&message=${params.message}&taskId=${params.taskId}`
  })
}
// 驳回
export function turnSubmit(params) {
  return request.put({
    url: `/checkIn?id=${params.id}&message=${params.message}&taskId=${params.taskId}`
  })
}
// 撤回
export function revocationSubmit(params) {
  return request.put({
    url: `/checkIn/revocation?id=${params.id}&flowStatus=${params.flowStatus}&taskId=${params.taskId}`
  })
}
// 撤销
export function cancelCheckSubmit(params) {
  return request.put<FormApply>({
    url: `/checkIn/cancel?id=${params.id}&taskId=${params.taskId}`
  })
}
// // 上传退款凭证
// export function uploadRefundVoucher(params) {
//   return request.put<FormApply>({
//     url: `/retreat_bills/uploadRefundVoucher`,
//     params
//   })
// }
// // 获取上传退款凭证详情
// export function getUploadRefund(params) {
//   return request.get({
//     url: `/retreat_bills`,
//     params
//   })
// }
// // 清理退住数据
// export function clearData() {
//   return request.delete({
//     url: `/elder/delete_all`
//   })
// }
