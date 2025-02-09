export const COLUMNS = [
  {
    title: '按钮名称',
    align: 'left',
    colKey: 'resourceName',
    minWidth: 120
  },
  {
    title: '按钮状态',
    width: `15vw`,
    ellipsis: true, // 文字超出宽度时显示省略号
    colKey: 'dataState',
    cell: (h, { row }) => {
      const statusList = {
        '0': {
          label: '启用'
        },
        '1': {
          label: '禁用'
        }
      }
      return h(
        'span',
        {
          class: `status-dot status-dot-${row.dataState === '0' ? '1' : '0'}`
        },
        statusList[row.dataState].label
      )
    }
  },
  {
    align: 'left',
    fixed: 'right',
    width: 220,
    minWidth: 220,
    colKey: 'op',
    title: '操作'
  }
]
