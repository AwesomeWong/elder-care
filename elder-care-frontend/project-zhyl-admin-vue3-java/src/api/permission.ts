// 权限相关接口
import { request } from '@/utils/request'
import type { UserListResult } from '@/api/model/permissionModel'

/*
 **  部门相关接口  **
 */
// 新增部门
export function addDept(params) {
  return request.put<UserListResult>({
    url: '/dept',
    params
  })
}
// 修改部门
export function editDept(params) {
  return request.patch<UserListResult>({
    url: '/dept',
    params
  })
}

// 启用-禁用部门
export function isEnableDept(params) {
  return request.patch<UserListResult>({
    url: '/dept/is_enable',
    params
  })
}

// 删除部门
export function delDept(id) {
  return request.delete<UserListResult>({
    url: `/dept/${id}`
  })
}
// 获取部门列表 -  部门管理列表数据
export function getDeptList(params) {
  return request.post<UserListResult>({
    url: `/dept/list`,
    params
  })
}
// 获取部门下拉树列表
export function getDeptTree() {
  return request.post<UserListResult>({
    url: `/dept/tree`
  })
}

/*
 **  岗位相关接口  **
 */
// 新增岗位
export function addPost(params) {
  return request.put<UserListResult>({
    url: '/post',
    params
  })
}
// 修改岗位
export function editPost(params) {
  return request.patch<UserListResult>({
    url: '/post',
    params
  })
}
// 删除岗位
export function delPost(id) {
  return request.delete<UserListResult>({
    url: `/post/${id}`
  })
}
// 获取岗位列表
export function getPostPageList(params) {
  return request.post<UserListResult>({
    url: `/post/page/${params.pageNum}/${params.pageSize}`,
    params
  })
}

// 获取岗位列表
export function getPostList(params) {
  return request.post<UserListResult>({
    url: `/post/list`,
    params
  })
}

// 获取岗位选择框列表
export function getPostOptionsList() {
  return request.get<UserListResult>({
    url: `/post/optionselect`
  })
}
// 根据岗位编号获取详细信息
export function getPostDetails(postId) {
  return request.get<UserListResult>({
    url: `/system/post/${postId}`
  })
}

/*
 **  用户管理相关接口  **
 */
// 添加用户
export function addUser(params) {
  return request.put<UserListResult>({
    url: '/user',
    params
  })
}
// 添加用户
export function editUser(params) {
  return request.patch<UserListResult>({
    url: '/user',
    params
  })
}
// 删除用户
export function delUser(userIds) {
  return request.delete<UserListResult>({
    url: `/user/remove/${userIds}`
  })
}

// 重置密码
export function restPassword(userId) {
  return request.post<UserListResult>({
    url: `/user/reset-passwords/${userId}`,
    params: { userId }
  })
}
// 用户分页列表
export function getUserList(params) {
  return request.post<UserListResult>({
    url: `/user/page/${params.pageNum}/${params.pageSize}`,
    params
  })
}
// 获取用户列表
export function getAllUserList(params) {
  return request.post<UserListResult>({
    url: `/user/list`,
    params
  })
}
/*
 **  角色管理相关接口  **
 */

// 新增角色
export function addRoles(params) {
  return request.put<UserListResult>({
    url: '/role',
    params
  })
}
// 修改角色
export function editRoles(params) {
  return request.patch<UserListResult>({
    url: '/role',
    params
  })
}
// 删除角色
export function delRoles(params) {
  return request.delete<UserListResult>({
    url: `/role/${params.roleIds}`,
    params
  })
}
// 角色分页列表
export function getRolesList(params) {
  return request.post<UserListResult>({
    url: `/role/page/${params.pageNum}/${params.pageSize}`,
    params: {
      roleName: params.roleName
    }
  })
}
// 角色下拉列表
export function getRolesOptionsList() {
  return request.post<UserListResult>({
    url: '/role/init-roles'
  })
}
// 修改角色的菜单权限信息
export function editRolesAll(params) {
  return request.patch<UserListResult>({
    url: `/role`,
    params
  })
}

/*
 **  菜单管理相关接口  ***
 */
// 新增菜单
export function addMenu(params) {
  return request.put<UserListResult>({
    url: '/resource',
    params
  })
}
// 修改菜单
export function editMenu(params) {
  return request.patch<UserListResult>({
    url: '/resource',
    params
  })
}
// 删除菜单
export function delMenu(menuId) {
  return request.delete<UserListResult>({
    url: `/resource/${menuId}`,
    params: { menuId }
  })
}
// 禁用菜单
export function enableMenu(params) {
  return request.post<UserListResult>({
    url: '/resource/enable',
    params
  })
}
// 菜单列表
export function getMenuList(params?: {
  dataState: number
  resourceName: string
}) {
  return request.post<UserListResult>({
    url: '/resource/list',
    params
  })
}
// 菜单下拉列表
export function getMenuOptionsList(params) {
  return request.post<UserListResult>({
    url: '/resource/tree',
    params
  })
}

// 菜单树形列表
export function getMenuTreeList(params) {
  return request.post<UserListResult>({
    url: '/resource/tree',
    params
  })
}
