import { request } from '@/utils/request'
import type {
  ListResult,
  ListModel,
  RefundList,
  RefundListModel
} from '@/api/model/orderModel'

// 获取分页查询数据
export function getOrderList(params) {
  return request.get<ListResult>({
    url: '/orders/search',
    params
  })
}
// 获取退款分页查询数据
export function getRefundList(params) {
  return request.post<RefundList>({
    url: '/trade-common-feign/query-refund-record',
    params
  })
}
// 获取订单详情
export function getDetails(params) {
  return request.get<ListModel>({
    url: `/orders`,
    params
  })
}
// 根据退款单号进行退款结果查询
export function getRefundDetails(params) {
  return request.get<RefundListModel>({
    url: `/trade-common-feign/query-refund`,
    params
  })
}
// 订单取消
export function orderCancel(params) {
  return request.post<ListModel>({
    url: `/orders/${params.orderId}/cancel?reason=${params.reason}`
  })
}
// 订单取消
export function orderRefund(params) {
  return request.post<ListModel>({
    url: `/trade-common-feign/refund`,
    params
  })
}
