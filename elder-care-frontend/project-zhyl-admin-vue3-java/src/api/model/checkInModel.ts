export interface ListCheckin {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  adminCreator: string
  applicat: string
  applicatId: string
  checkInCode: string
  checkInTime: string
  counselor: string
  createBy: string
  createDay: string
  createTime: string
  createType: number
  creator: string
  dataState: string
  deptNo: string
  elderId: string
  elderVo: string
  flowStatus: number
  id: string
  otherApplyInfo: string
  reason: string
  remark: ''
  reviewInfo: string
  status: number
  title: string
  updateBy: string
  updateTime: string
  updater: string
}
export interface FormApply {
  checkInTime: string
  elderDto: {
    arrearsAmount: number
    id: number
    idCardNo: string
    image: string
    name: string
    paymentDeadline: string
    phone: string
    remark: string
    status: number
  }
  id: number
  otherApplyInfo: string
  remark: string
  reviewInfo: string
}
// 配置提交
export interface ConfigApply {
  bedCost: number
  bedId: number
  checkInEndTime: string
  checkInId: number
  checkInStartTime: string
  costEndTime: string
  costStartTime: string
  depositAmount: number
  elderId: number
  governmentSubsidy: number
  id: number
  medicalInsurancePayment: number
  nursingCost: number
  nursingLevelId: number
  otherCost: number
  remark: string
}
// 签约办理
export interface SignTransaction {
  checkInId: number
  checkInNo: string
  contractNo: string
  elderId: number
  elderName: string
  endTime: string
  id: number
  levelDesc: string
  memberId: number
  memberName: string
  memberPhone: string
  name: string
  pdfUrl: string
  releaseDate: string
  releasePdfUrl: string
  releaseSubmitter: string
  remark: string
  signDate: string
  sort: number
  startTime: string
  status: number
}
