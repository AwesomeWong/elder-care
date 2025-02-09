import { request } from '@/utils/request'
import type {
  FormLevel,
  ListResult,
  PlanListResult,
  ListModel,
  ProjecListModel,
  PlanListModel,
  ListArrangeResult
} from '@/api/model/serveModel'

// 获取护理等级所有数据
export function getLevelAllList(params) {
  return request.get<ListResult>({
    url: '/nursingLevel/listAll',
    params
  })
}
// 分页查询护理等级信息
export function getLevelList(params) {
  return request.get<ListResult>({
    url: `/nursingLevel/listByPage`,
    params
  })
}
// 获取等级详情
export function getLevelDetails(id) {
  return request.get<ListModel>({
    url: `/nursingLevel/${id}`
  })
}
// 护理等级添加
export function levelAdd(params: FormLevel) {
  return request.post<FormLevel>({
    url: '/nursingLevel/insert',
    data: params
  })
}
// 护理等级编辑
export function levelUpdate(params: FormLevel) {
  return request.put<FormLevel>({
    url: `/nursingLevel/update`,
    data: params
  })
}
// 护理等级删除
export function levelDelete(id) {
  return request.delete({
    url: `/nursingLevel/delete/${id}`
  })
}
// 护理等级禁用启用
export function levelStatus(params) {
  return request.put({
    url: `/nursingLevel/${params.id}/status/${params.status}`
  })
}

// 护理项目
// 所有护理项目信息
export function getAllProjectList() {
  return request.get<ProjecListModel>({
    url: `/nursing_project/all`
  })
}
// 分页查询护理项目信息
export function getProjectList(params) {
  return request.get<ProjecListModel>({
    url: `/nursing_project`,
    params
  })
}
// 获取护理项目详情
export function getProjectDetails(id) {
  return request.get<ProjecListModel>({
    url: `/nursing_project/${id}`
  })
}
// 护理项目添加
export function projectAdd(params: FormLevel) {
  return request.post<ProjecListModel>({
    url: '/nursing_project',
    data: params
  })
}
// 护理项目编辑
export function projectUpdate(params: ProjecListModel) {
  return request.put<ProjecListModel>({
    url: `/nursing_project`,
    data: params
  })
}
// 护理项目删除
export function projectDelete(id) {
  return request.delete({
    url: `/nursing_project/${id}`
  })
}
// 护理项目禁用启用
export function projectStatus(params) {
  return request.put({
    url: `/nursing_project/${params.id}/status/${params.status}`
  })
}
// 护理计划
// 查询所有护理计划
export function getnursAllPlanList() {
  return request.get<PlanListResult>({
    url: '/nursing/plan'
  })
}
// 护理计划分页查询列表
export function getPlanList(params) {
  return request.get<PlanListResult>({
    url: '/nursing/plan/search',
    params
  })
}
// 获取护理计划详情
export function getPlanDetails(id) {
  return request.get<PlanListModel>({
    url: `/nursing/plan/${id}`
  })
}
// 护理计划添加
export function planAdd(params: FormLevel) {
  return request.post<PlanListModel>({
    url: '/nursing/plan',
    data: params
  })
}
// 护理计划编辑
export function planUpdate(params: ProjecListModel) {
  return request.put<PlanListModel>({
    url: `/nursing/plan/${params.id}`,
    data: params
  })
}
// 护理计划删除
export function planDelete(id) {
  return request.delete({
    url: `/nursing/plan/${id}`
  })
}
// 护理计划禁用启用
export function planStatus(params) {
  return request.put({
    url: `/nursing/${params.id}/status/${params.status}`
  })
}
// 护理任务
// 护理任务列表
export function getArrangeList(params) {
  return request.get<ListArrangeResult>({
    url: `/nursingTask/page`,
    params
  })
}
// 执行护理任务
export function executePlan(params) {
  return request.put({
    url: `/nursingTask/do?estimatedServerTime=${params.estimatedServerTime}&mark=${params.mark}&taskId=${params.taskId}&taskImage=${params.taskImage}`
  })
}
// 取消护理任务
export function cancelPlan(params) {
  return request.put({
    url: `/nursingTask/cancel?reason=${params.reason}&taskId=${params.taskId}`
  })
}
// 修改护理任务的执行日期
export function changePlanTime(params) {
  return request.put({
    url: `/nursingTask/updateTime?estimatedServerTime=${params.estimatedServerTime}&taskId=${params.taskId}`
  })
}
// 查看护理任务详情
export function getTaskDetail(params) {
  return request.get<ListArrangeResult>({
    url: `/nursingTask`,
    params
  })
}
// 给老人设置护理员
export function setNurseForOlder(params: any) {
  return request.put<PlanListModel>({
    url: `/elder/setNursing`,
    data: params
  })
}
