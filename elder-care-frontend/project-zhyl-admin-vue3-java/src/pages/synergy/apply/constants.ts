export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 80,
    minWidth: 80,
    colKey: 'rowIndex'
  },
  {
    title: '单据编号',
    minWidth: 180,
    colKey: 'code'
  },
  {
    title: '单据标题',
    minWidth: 180,
    colKey: 'title'
  },
  {
    title: '单据类别',
    minWidth: 180,
    colKey: 'type'
  },
  {
    title: '申请人',
    minWidth: 180,
    colKey: 'applicat'
  },
  {
    title: '申请时间',
    minWidth: 300,
    colKey: 'applicationTime'
  },
  {
    title: '完成时间',
    minWidth: 300,
    colKey: 'finishTime'
  },
  {
    title: '流程状态',
    colKey: 'status',
    width: 120,
    minWidth: '120px',
    cell: (h, { row }) => {
      const statusList = {
        1: {
          label: '申请中'
        },
        2: {
          label: '已完成'
        },
        3: {
          label: '已关闭'
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
    width: 110,
    colKey: 'op',
    title: '操作'
  }
]
