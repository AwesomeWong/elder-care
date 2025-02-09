export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '预约类型',
    minWidth: 180,
    colKey: 'type',
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '参观预约'
        },
        1: {
          label: '探访预约'
        }
      }
      return h('span', statusList[row.type].label)
    }
  },
  {
    title: '预约人姓名',
    minWidth: 180,
    colKey: 'name'
  },
  {
    title: '预约人手机号',
    minWidth: '200px',
    colKey: 'mobile'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'visitor'
  },
  {
    title: '预约时间',
    minWidth: 220,
    colKey: 'time'
  },
  {
    title: '创建人',
    minWidth: 180,
    colKey: 'creator'
  },
  {
    title: '创建时间',
    minWidth: 220,
    colKey: 'createTime'
  },
  {
    title: '预约状态',
    colKey: 'status',
    width: 120,
    minWidth: '120px',
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '待上门'
        },
        1: {
          label: '已完成'
        },
        2: {
          label: '已取消'
        },
        3: {
          label: '已过期'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-dot-${row.status}`
        },
        statusList[row.status].label
      )
    }
  },
  {
    align: 'left',
    fixed: 'right',
    width: 65,
    minWidth: 65,
    colKey: 'op',
    title: '操作'
  }
]
