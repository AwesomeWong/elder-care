export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '退款编号',
    minWidth: 220,
    colKey: 'refundNo'
  },
  {
    title: '订单编号',
    minWidth: 220,
    colKey: 'orderNo'
  },
  {
    title: '退款金额（元）',
    minWidth: 180,
    colKey: 'refundAmount'
  },
  {
    title: '申请人',
    minWidth: '180px',
    colKey: 'creator'
  },
  {
    title: '申请时间',
    minWidth: 300,
    colKey: 'createTime'
  },
  {
    title: '退款时间',
    minWidth: 300,
    colKey: 'updateTime'
  },
  {
    title: '订单状态',
    colKey: 'orderStatus',
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
          class: `status-dot status-dot-${row.orderStatus}`
        },
        row.orderStatus ? statusList[row.orderStatus].label : ''
      )
    }
  },
  {
    title: '退款状态',
    colKey: 'refundStatus',
    width: 120,
    minWidth: '120px',
    cell: (h, { row }) => {
      const statusList = {
        2: {
          label: '退款成功'
        },
        1: {
          label: '退款处理中'
        },
        3: {
          label: '退款失败'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-refund-${row.refundStatus}`
        },
        statusList[row.refundStatus].label
      )
    }
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
