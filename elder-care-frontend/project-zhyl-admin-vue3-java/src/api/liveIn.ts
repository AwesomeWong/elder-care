import { request } from '@/utils/request'
import type {
  FormFloor,
  ListResult,
  ListModel,
  Formroom,
  FormBed,
  TypesListResult,
  TypesListModel,
  ContractListResult,
  ContractListModel
} from '@/api/model/liveInModel'
// 获取楼层所有数据（智能床位）
export function getFloorBySmartBed() {
  return request.get<ListResult>({
    url: '/floor/getAllFloorsWithDevice'
  })
}
// 获取楼层下所有数据（负责老人）
export function getAllByFloorSmartBed(id) {
  return request.get<ListResult>({
    url: `/room/getRoomsWithDeviceByFloorId/${id}`
  })
}

// 获取楼层所有数据（负责老人）
export function getFloorByOldPeople() {
  return request.get<ListResult>({
    url: '/floor/getAllFloorsWithNur'
  })
}
// 获取楼层下所有数据（负责老人）
export function getAllByFloorOldPeople(id) {
  return request.get<ListResult>({
    url: `/room/getRoomsWithNurByFloorId/${id}`
  })
}

// 获取楼层所有数据
export function getAllList() {
  return request.get<ListResult>({
    url: '/floor/getAll'
  })
}
// 获取所有楼层，房间，床位 仅供添加只能设备用/floor/getAllWithRoomAndBed
export function getAllRoomList() {
  return request.get<ListResult>({
    url: '/floor/getAllWithRoomAndBed'
  })
}
// 根据楼层id获取不同楼层的数据
export function getFloorList(id) {
  return request.get<ListResult>({
    url: `/floor/get/${id}`
  })
}
// 获取楼层所有数据
export function getRoomBedList(id) {
  return request.get<ListResult>({
    url: `/room/getRoomsByFloorId/${id}`
  })
}
// // 获取所有房间（楼层id）
// export function getRoomFllorList(id) {
//   return request.get<ListResult>({
//     url: `/room/getRoomsByFloorId/${id}`
//   })
// }
// 获取房间所有数据
export function getRoomList(params) {
  return request.get<ListResult>({
    url: `/room/getAll`,
    params
  })
}
// 房间类型
export function getRoomTypeList(params) {
  return request.get<ListResult>({
    url: '/roomTypes',
    params
  })
}

// 获取所有床位（房间id）
export function getbedList(id) {
  return request.get<ListResult>({
    url: `/bed/read/room/${id}`
  })
}
// 获取楼层详情
export function getFloorDetails(id) {
  return request.get<ListModel>({
    url: `/floor/get/${id}`
  })
}
// 获取房间详情
export function getRoomDetails(id) {
  return request.get<ListResult>({
    url: `/room/get/${id}`
  })
}
// 获取床位详情
export function getBedDetails(id) {
  return request.get<ListResult>({
    url: `/bed/read/${id}`
  })
}
// 楼层添加
export function floorAdd(params: FormFloor) {
  return request.post<FormFloor>({
    url: '/floor/add',
    data: params
  })
}
// 楼层编辑
export function floorUpdate(params: FormFloor) {
  return request.put<FormFloor>({
    url: '/floor/update',
    data: params
  })
}
// 楼层删除
export function floorDelete(id) {
  return request.delete({
    url: `/floor/delete/${id}`
  })
}

// 房间添加
export function roomAdd(params: Formroom) {
  return request.post<Formroom>({
    url: '/room/add',
    data: params
  })
}
// 房间编辑
export function roomUpdate(params: Formroom) {
  return request.put<Formroom>({
    url: '/room/update',
    data: params
  })
}
// 房间删除
export function roomDelete(id) {
  return request.delete({
    url: `/room/delete/${id}`
  })
}

// 床位添加
export function bedAdd(params: FormBed) {
  return request.post<FormBed>({
    url: '/bed/create',
    data: params
  })
}
// 床位编辑
export function bedUpdate(params: FormBed) {
  return request.put<FormBed>({
    url: '/bed/update',
    data: params
  })
}
// 床位删除
export function bedDelete(id) {
  return request.delete({
    url: `/bed/delete/${id}`
  })
}

// 房型设置
// 获取所有房型数据
export function getRoomTypesList() {
  return request.get<TypesListResult>({
    url: '/roomTypes'
  })
}
// 根据状态查询房型
export function getRoomStatusList(params) {
  return request.get<TypesListResult>({
    url: '/roomTypes/status',
    params
  })
}
// 根据状态查询房型
export function getRoomTypeNameList(params) {
  return request.get<TypesListResult>({
    url: '/roomTypes/typeName',
    params
  })
}
// 根据ID查询房型
export function getRoomTypeDetails(id) {
  return request.get<TypesListResult>({
    url: `/roomTypes/${id}`
  })
}
// 禁用启用
export function roomTypesStatus(params) {
  return request.put({
    url: `/roomTypes/${params.id}/status/${params.status}`
  })
}
// 添加房型
export function roomTypesAdd(params: TypesListModel) {
  return request.post<TypesListModel>({
    url: '/roomTypes',
    data: params
  })
}
// 修改房型
export function roomTypesEdit(id, params: TypesListModel) {
  return request.put<TypesListModel>({
    url: `/roomTypes/${id}`,
    data: params
  })
}
// 删除房型
export function roomTypesDelete(id) {
  return request.delete({
    url: `/roomTypes/${id}`
  })
}
// 合同列表
export function getContractList(params) {
  return request.get<ContractListResult>({
    url: '/contract/list',
    params
  })
}
// 根据ID查询合同详情
export function getContractDetails(id) {
  return request.get<ContractListModel>({
    url: `/contract/${id}`
  })
}
