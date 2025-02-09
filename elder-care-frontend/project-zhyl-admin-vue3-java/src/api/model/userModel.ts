export interface loginResult {
  code: number
  msg: string
  data: string
}

export interface userInfoResult {
  code: number
  msg: string
  data: {
    icon: string
    id: string
    name: string
    roleName: string
    type: number
    requestId: string
  }
}
// 列表
export interface ListResult {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  authId: string
  avatar: string
  birthday: string
  createBy: number
  createTime: string
  creator: string
  id: number
  idCardNo: string
  idCardNoVerify: number
  name: string
  openId: string
  phone: string
  sex: number
  updateBy: number
  updateTime: string
}
