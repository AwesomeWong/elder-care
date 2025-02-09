// 列表
export interface ListResult {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  id: string
  applicat: string
  applicationTime: string
  code: string
  status: number
  assigneeId: number
  assignee: string
  title: string
  type: number
}
// 表单提交
export interface FormApply {
  applicat: string
  applicatId: number
  bedNo: string
  checkInEndTime: string
  checkInStartTime: string
  checkOutTime: string
  contractName: string
  contractUrl: string
  counselor: string
  createTime: string
  flowStatus: number
  id: number
  idCardNo: string
  name: string
  nursingLevelName: string
  phone: string
  reason: string
  remark: string
  retreatCode: string
  status: number
  title: string
}
// 删除基础列表的数据
export interface deleteListParams {
  id: number
}
// 护理项目列表
export interface ProjectListResult {
  data: any[]
  list: Array<ProjecListModel>
}
export interface page {
  page: number
  pageSize: number
  pages: number
  total: number
}
export interface ProjecListModel {
  createBy: number
  createTime: string
  creator: string
  id: number
  image: string
  name: string
  nursingRequirement: string
  orderNo: number
  price: number
  status: number
  unit: string
  updateBy: number
  updateTime: string
}
// 护理计划列表
export interface PlanListResult {
  data: any[]
  list: Array<PlanListModel>
}
export interface PlanListModel {
  createBy: number
  createTime: string
  id: number
  planName: string
  projectPlans: [
    {
      createBy: number
      createTime: string
      executeCycle: number
      executeFrequency: number
      executeTime: string
      id: number
      planId: number
      projectId: number
      updateBy: number
      updateTime: string
    }
  ]
  sortNo: number
  status: number
  updateBy: number
  updateTime: string
}
