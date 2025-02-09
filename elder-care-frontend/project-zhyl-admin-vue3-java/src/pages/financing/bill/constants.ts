export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 80,
    minWidth: 80,
    colKey: 'rowIndex'
  },
  {
    title: '账单编号',
    minWidth: 240,
    colKey: 'billNo'
  },
  {
    title: '账单类型',
    minWidth: 180,
    colKey: 'billType'
  },
  {
    title: '账单月份',
    minWidth: 180,
    colKey: 'billMonth'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'elderVo.name'
  },
  {
    title: '老人身份证号',
    minWidth: 200,
    colKey: 'elderVo.idCardNo'
  },
  {
    title: '账单金额（元）',
    minWidth: 180,
    colKey: 'billAmount'
  },
  {
    title: '应付金额（元）',
    minWidth: 180,
    colKey: 'payableAmount'
  },
  {
    title: '支付截止时间',
    minWidth: 300,
    colKey: 'paymentDeadline'
  },
  {
    title: '交易状态',
    minWidth: 120,
    colKey: 'transactionStatus',
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '待支付'
        },
        1: {
          label: '已支付'
        },
        2: {
          label: '已关闭'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-contract-${row.transactionStatus}`
        },
        statusList[row.transactionStatus].label
      )
    }
  },
  {
    title: '创建时间',
    minWidth: 300,
    colKey: 'createTime'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 155,
    minWidth: '155px',
    colKey: 'op',
    title: '操作'
  }
]
