export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  { title: '房间图片', width: 150, minWidth: '100px', colKey: 'photo' },
  {
    title: '房间类型',
    minWidth: '180px',
    colKey: 'name'
  },
  {
    title: '床位费用（元/月）',
    minWidth: '200px',
    colKey: 'price'
  },
  {
    title: '房型介绍',
    minWidth: '200px',
    ellipsis: true,
    colKey: 'introduction'
  },
  {
    title: '创建人',
    minWidth: '200px',
    colKey: 'creator'
  },
  {
    title: '创建时间',
    minWidth: '220px',
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
    width: 154,
    minWidth: '154px',
    colKey: 'op',
    title: '操作'
  }
]
