export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 80,
    minWidth: 80,
    colKey: 'rowIndex'
  },
  {
    title: '订单编号',
    minWidth: 260,
    colKey: 'orderNo'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'elderVo.name'
  },
  {
    title: '床位号',
    minWidth: 120,
    colKey: 'bedVo.bedNumber'
  },
  {
    title: '护理项目名称',
    minWidth: '160px',
    colKey: 'nursingProjectVo.name'
  },
  {
    title: '订单金额（元）',
    minWidth: '160px',
    colKey: 'amount'
  },
  {
    title: '期望服务时间',
    minWidth: 300,
    colKey: 'estimatedArrivalTime'
  },
  {
    title: '下单人',
    minWidth: 180,
    colKey: 'memberVo.name'
  },
  {
    title: '创建时间',
    minWidth: 300,
    colKey: 'createTime'
  },
  {
    title: '订单状态',
    colKey: 'status',
    width: 120,
    minWidth: '120px',
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '待支付'
        },
        1: {
          label: '待执行'
        },
        2: {
          label: '已执行'
        },
        3: {
          label: '已完成'
        },
        4: {
          label: '已关闭'
        },
        5: {
          label: '已退款'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-order-${row.status}`
        },
        statusList[row.status].label
      )
    }
  },
  {
    title: '交易状态',
    colKey: 'paymentStatus',
    width: 120,
    minWidth: '120px',
    cell: (h, { row }) => {
      const statusList = {
        1: {
          label: '待支付'
        },
        2: {
          label: '已支付'
        },
        3: {
          label: '已关闭'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-dot-${row.paymentStatus}`
        },
        statusList[row.paymentStatus].label
      )
    }
  },
  {
    align: 'left',
    fixed: 'right',
    width: 154,
    minWidth: '154px',
    colKey: 'op',
    title: '操作'
  }
]
