export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 80,
    minWidth: 80,
    colKey: 'rowIndex'
  },
  {
    title: '报警规则名称',
    minWidth: 180,
    colKey: 'alertRuleName'
  },
  {
    title: '所属产品',
    minWidth: 180,
    colKey: 'productName'
  },
  {
    title: '功能名称',
    minWidth: 200,
    colKey: 'functionName'
  },
  {
    title: '关联设备',
    minWidth: 180,
    colKey: 'deviceName'
  },
  {
    title: '报警规则条件',
    minWidth: 220,
    ellipsis: true,
    colKey: 'rules'
  },
  {
    title: '报警生效时段',
    minWidth: 300,
    colKey: 'alertEffectivePeriod'
  },
  {
    title: '创建人',
    minWidth: 160,
    colKey: 'creator'
  },
  {
    title: '创建时间',
    minWidth: 300,
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
