// 列表
export interface ListResult {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  amount: number
  bedVo: {
    bedNumber: string
    bedStatus: number
    createBy: number
    createTime: string
    creator: string
    id: number
    remark: string
    roomId: number
    sort: number
    updateBy: number
    updateTime: string
  }
  createBy: number
  createTime: string
  creator: string
  elderId: number
  elderVo: {
    arrearsAmount: number
    createBy: number
    createTime: string
    creator: string
    id: number
    idCardNo: string
    image: string
    name: string
    paymentDeadline: string
    phone: string
    remark: string
    status: number
    updateBy: number
    updateTime: string
  }
  estimatedArrivalTime: string
  id: number
  isRefund: string
  mark: string
  memberId: number
  memberVo: {
    authId: string
    avatar: string
    birthday: string
    createBy: number
    createTime: string
    creator: string
    elderNames: string
    id: number
    idCardNo: string
    idCardNoVerify: number
    isSign: string
    name: string
    openId: string
    orderCount: number
    phone: string
    remark: string
    sex: number
    updateBy: number
    updateTime: string
  }
  nursingProjectVo: {
    count: number
    createBy: number
    createTime: string
    creator: string
    id: number
    image: string
    name: string
    nursingRequirement: string
    orderNo: number
    price: number
    remark: string
    status: number
    unit: string
    updateBy: number
    updateTime: string
  }
  paymentStatus: string
  projectId: number
  reason: string
  refund: number
  remark: string
  status: number
  tradingOrderNo: number
  updateBy: number
  updateTime: string
}
// 护理等级表单提交
export interface FormLevel {
  createBy: number
  createTime: string
  description: string
  fee: number
  id: number
  name: string
  planId: number
  planName: string
  status: number
  updateBy: number
  updateTime: string
}
// 护理计划列表
export interface RefundList {
  data: any[]
  list: Array<RefundListModel>
}
export interface RefundListModel {
  createBy: number
  createDay: string
  createTime: string
  creator: string
  dataState: string
  endTime: string
  enterpriseId: string
  id: number
  memo: string
  pageNum: number
  pageSize: number
  productOrderNo: string
  refundAmount: number
  refundCode: string
  refundMsg: string
  refundNo: number
  refundStatus: number
  remark: string
  startTime: string
  storeId: string
  tradingChannel: string
  tradingOrderNo: string
  updateBy: number
  updateTime: string
  updater: string
}
