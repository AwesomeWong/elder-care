export const COLUMNS = [
  {
    title: '规则编号',
    align: 'left',
    width: 160,
    minWidth: '97px',
    colKey: 'index'
  },
  {
    title: '描述',
    colKey: 'description',
    width: 200,
    minWidth: '280px',
    cell: { col: 'status' }
  },
  {
    title: '服务调用次数',
    ellipsis: true,
    sorter: true,
    sortType: 'all',
    colKey: 'serviceCallNumber'
  },
  {
    title: '状态',

    ellipsis: true, // 文字超出宽度时显示省略号
    colKey: 'status',
    // 添加筛选
    filter: {
      type: 'single',
      list: [
        {
          label: '关闭',
          value: 0
        },
        {
          label: '运行中',
          value: 1
        },
        {
          label: '已上线',
          value: 2
        },
        {
          label: '异常',
          value: 3
        }
      ],
      showConfirmAndReset: true
    },
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '关闭'
        },
        1: {
          label: '运行中'
        },
        2: {
          label: '已上线'
        },
        3: {
          label: '异常'
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
    title: '更新时间',
    ellipsis: true,
    colKey: 'updateTime',
    sorter: true,
    sortType: 'all',
    minWidth: '180px'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 125,
    minWidth: '125px',
    colKey: 'op',
    title: '操作'
  }
]
