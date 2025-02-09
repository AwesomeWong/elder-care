export interface UserListResult {
  code: number
  msg: string
  data: {
[x: string]: {}
    icon: string
    id: string
    name: string
    roleName: string
    type: number
    requestId: string
  }
}
