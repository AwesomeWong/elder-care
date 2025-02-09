export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '合同编号',
    minWidth: 180,
    colKey: 'contractNo'
  },
  {
    title: '合同名称',
    minWidth: 180,
    colKey: 'name'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'elderName'
  },
  {
    title: '老人身份证号',
    minWidth: '200px',
    colKey: 'idCardNo'
  },
  {
    title: '合同期限',
    minWidth: 350,
    colKey: 'time'
  },
  {
    title: '合同状态',
    colKey: 'status',
    width: 120,
    minWidth: '120px',
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '未生效'
        },
        1: {
          label: '生效中'
        },
        2: {
          label: '已过期'
        },
        3: {
          label: '已失效'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-contract-${row.status}`
        },
        statusList[row.status].label
      )
    }
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
    align: 'left',
    fixed: 'right',
    width: 70,
    minWidth: '70px',
    colKey: 'op',
    title: '操作'
  }
]
