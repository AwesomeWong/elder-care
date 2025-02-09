export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 80,
    minWidth: 80,
    colKey: 'rowIndex'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'elderVo.name'
  },
  {
    title: '床位号',
    minWidth: 200,
    colKey: 'bedVo.bedNumber'
  },
  {
    title: '欠款金额（元）',
    minWidth: 180,
    colKey: 'total'
  },
  {
    title: '支付截止时间',
    minWidth: 300,
    colKey: 'paymentDeadline'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 65,
    minWidth: '65px',
    colKey: 'op',
    title: '操作'
  }
]
export const COLUMNS2 = [
  {
    title: '序号',
    align: 'left',
    width: 80,
    minWidth: 80,
    colKey: 'rowIndex'
  },
  {
    title: '账单编号',
    minWidth: 200,
    colKey: 'billNo'
  },
  {
    title: '账单月份',
    width: 150,
    colKey: 'billMonth'
  },
  {
    title: '支付截止时间',
    width: 180,
    colKey: 'paymentDeadline'
  },
  {
    title: '应付金额（元）',
    width: 135,
    colKey: 'payableAmount'
  }
]
