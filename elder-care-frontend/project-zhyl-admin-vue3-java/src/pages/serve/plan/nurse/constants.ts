export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '护理计划名称',
    minWidth: '150px',
    colKey: 'planName'
  },
  {
    title: '创建人',
    minWidth: '150px',
    colKey: 'creator'
  },
  {
    title: '创建时间',
    minWidth: '180px',
    colKey: 'createTime'
  },
  {
    title: '状态',
    colKey: 'status',
    width: 120,
    minWidth: '120px',
    cell: (h, { row }) => {
      const statusList = {
        1: {
          label: '启用'
        },
        0: {
          label: '禁用'
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
    width: 200,
    minWidth: '200px',
    colKey: 'op',
    title: '操作'
  }
]
