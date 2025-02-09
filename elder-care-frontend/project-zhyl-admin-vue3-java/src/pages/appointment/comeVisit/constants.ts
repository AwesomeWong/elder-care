export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '来访类型',
    minWidth: 180,
    colKey: 'type',
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '参观来访'
        },
        1: {
          label: '探访来访'
        }
      }
      return h('span', statusList[row.type].label)
    }
  },
  {
    title: '来访人姓名',
    minWidth: 180,
    colKey: 'name'
  },
  {
    title: '来访人手机号',
    minWidth: '200px',
    colKey: 'mobile'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'visitor'
  },
  {
    title: '来访时间',
    minWidth: 200,
    colKey: 'time'
  },
  {
    title: '创建人',
    minWidth: 180,
    colKey: 'creator'
  },
  {
    title: '创建时间',
    width: 180,
    minWidth: 180,
    colKey: 'createTime'
  }
]
