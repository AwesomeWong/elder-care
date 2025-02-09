import { request } from '@/utils/request'
import type {
  loginResult,
  userInfoResult,
  ListResult
} from '@/api/model/userModel'

// 登录
// 账号登录
export const userLogins = (params) =>
  request.post<loginResult>({
    url: `/security/login`,
    data: params
  })
// 获取用户信息
export const getUserInfo = () =>
  request.get<userInfoResult>({
    url: `/getInfo`
  })
// 获取用户信息列表
export const getCUser = (params) =>
  request.get<ListResult>({
    url: `/c-user/page`,
    params
  })
// 注册
export function register() {
  return request.post<any>({
    url: '/login'
  })
}
// 个人中心
export function getpersonal() {
  return request.get<any>({
    url: '/user/current-user'
  })
}
// 修改个人信息
export function updatepersonal(params) {
  return request.patch<any>({
    url: '/user',
    data: params
  })
}
// 修改密码
export function updatePwd(params) {
  return request.put<any>({
    url: `/user/modify-passwords`,
    params
  })
}
// 校验密码
export function validatePwd(params) {
  return request.put<any>({
    url: `/user/cmodify-passwords`,
    params
  })
}
// 获取路由信息
export function getRuterInfo() {
  return request.get<any>({
    url: '/resource/menus'
  })
}
// 获取按钮信息
export function getRuterButton() {
  return request.get<any>({
    url: '/resource/myButten/'
  })
}
