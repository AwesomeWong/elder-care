export const COLUMNS = [
  {
    title: '部门名称',
    align: 'left',
    colKey: 'deptName',
    minWidth: '157px'
  },
  {
    title: '部门负责人',
    ellipsis: true,
    colKey: 'leaderName'
  },
  {
    title: '排序',
    ellipsis: true,
    colKey: 'sortNo'
  },
  {
    title: '创建日期',
    ellipsis: true,
    colKey: 'createDay',
    width: `15vw`,
    sortType: 'all'
  },
  {
    title: '部门状态',
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
    title: '部门说明',
    colKey: 'remark',
    width: 100,
    cell: (h, { row }) => {
      return h(
        'p',
        {
          class: `ellipsis`,
          title: row.remark
        },
        row.remark ? row.remark : '--'
      )
    }
  },
  {
    align: 'left',
    fixed: 'right',
    width: 210,
    minWidth: '240px',
    colKey: 'op',
    title: '操作'
  }
]

export const TEST_COLUMNS = [
  {
    title: '部门名称',
    align: 'left',
    colKey: 'label',
    minWidth: '157px'
  }
]
