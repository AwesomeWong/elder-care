// 列表
export interface ListResult {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  code: string
  createBy: number
  createTime: string
  creator: string
  floorId: number
  id: number
  occupancyRate: number
  occupiedBeds: number
  sort: number
  totalBeds: number
  typeName: string
  updateBy: number
  updateTime: string
  bedVoList: [
    {
      bedNumber: string
      bedStatus: number
      createBy: number
      createTime: string
      creator: string
      id: number
      roomId: number
      sort: number
      updateBy: number
      updateTime: string
    }
  ]
}
// 楼层提交
export interface FormFloor {
  name: string
  code: string
  id: number
}
// 删除基础列表的数据
export interface deleteListParams {
  id: number
}
// 房间
export interface Formroom {
  floorId: number
  typeName: string
  code: string
  id: number
  sort: number
}
// 床位
export interface FormBed {
  roomId: number
  bedNumber: string
  id: number
  sort: number
}
// 房型设置
export interface TypesListResult {
  data: any[]
  list: Array<TypesListModel>
}
export interface TypesListModel {
  createBy: Date
  createTime: Date
  updateBy: Date
  id: number
  name: string
  bedCount: number
  price: number
  creator: string
  introduction: string
  photo: string
  typeName: string
  status: number
  updateTime: Date
}
// 合同
export interface ContractListResult {
  data: any[]
  list: Array<ContractListModel>
}
export interface ContractListModel {
  checkInNo: string
  contractNo: string
  createBy: number
  createTime: string
  creator: string
  elderId: number
  elderName: string
  elderVo: {
    createBy: number
    createTime: string
    creator: string
    id: number
    idCardNo: string
    image: string
    name: string
    status: number
    updateBy: number
    updateTime: string
  }
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
  roomVo: {
    bedVoList: [
      {
        bedNumber: string
        bedStatus: number
        createBy: number
        createTime: string
        creator: string
        id: number
        roomId: number
        sort: number
        updateBy: number
        updateTime: string
      }
    ]
    code: string
    createBy: number
    createTime: string
    creator: string
    floorId: number
    id: number
    occupancyRate: number
    occupiedBeds: number
    sort: number
    totalBeds: number
    typeName: string
    updateBy: number
    updateTime: string
  }
  signDate: string
  sort: number
  startTime: string
  status: string
  updateBy: number
  updateTime: string
}
