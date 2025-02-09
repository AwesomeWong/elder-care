export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '护理等级名称',
    colKey: 'name',
    width: 200,
    minWidth: 200,
    cell: { col: 'status' }
  },
  {
    title: '执行护理计划',
    minWidth: '200px',
    colKey: 'planName'
  },
  {
    title: '护理费用（元/月）',
    minWidth: '180px',
    colKey: 'fee'
  },
  {
    title: '等级说明',
    width: '188px',
    ellipsis: true,
    colKey: 'description'
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
    // // 添加筛选
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
