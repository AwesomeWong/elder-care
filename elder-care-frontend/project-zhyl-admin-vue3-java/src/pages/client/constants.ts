export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '客户昵称',
    minWidth: 180,
    colKey: 'name'
  },
  {
    title: '客户手机号',
    minWidth: 180,
    colKey: 'phone'
  },
  {
    title: '是否签约',
    minWidth: 180,
    colKey: 'isSign'
  },
  {
    title: '服务下单次数（次）',
    minWidth: '200px',
    colKey: 'orderCount'
  },
  {
    title: '绑定老人姓名',
    minWidth: 250,
    ellipsis: true,
    colKey: 'elderNames'
  },
  {
    title: '首次登录时间',
    width: 183,
    minWidth: 183,
    colKey: 'createTime'
  }
]
