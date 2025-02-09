// 列表
export interface ListResult {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  createBy: number
  createTime: string
  creator: string
  id: number
  mobile: string
  name: string
  status: number
  time: string
  type: number
  updateBy: number
  updateTime: string
  visitor: string
}
// 到院访问时间
export interface formParams {
  id: number
  time: number
}
