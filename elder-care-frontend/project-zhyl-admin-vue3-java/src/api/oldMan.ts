import { request } from '@/utils/request'
import type {
  formParams,
  ListResult,
  ListModel
} from '@/api/model/appointmentModel'

// 分页查询分页
export function getOldManList(params) {
  return request.get<ListResult>({
    url: `/elder/selectList`,
    params
  })
}
// 分页查询分页
export function getSelectListByPage(params) {
  return request.get<ListResult>({
    url: `/elder/selectListByPage`,
    params
  })
}
// 分页查询来访分页
export function getVisitList(params) {
  return request.get<ListResult>({
    url: `/visit/page`,
    params
  })
}
// 校验身份证号
export function getIsCard(params) {
  return request.get({
    url: `/elder/selectByIdCard`,
    params
  })
}
// 到访时间
export function visitTime(params) {
  return request.put<formParams>({
    url: `/reservation/${params.id}/visit?time=${params.time}`
  })
}

// 来访添加
export function visitAdd(params: ListModel) {
  return request.post<ListModel>({
    url: '/visit',
    data: params
  })
}
// 来访编辑
export function visitUpdate(params: ListModel) {
  return request.put<ListModel>({
    url: `/visit/${params.id}`,
    data: params
  })
}
// 获取来访详情
export function getVisitDetails(id) {
  return request.get<ListModel>({
    url: `/visit/${id}`
  })
}
// 删除来访
export function visitDelete(id) {
  return request.delete({
    url: `/visit/${id}`
  })
}
