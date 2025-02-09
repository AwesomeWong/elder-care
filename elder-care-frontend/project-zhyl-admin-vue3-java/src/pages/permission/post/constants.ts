export const COLUMNS = [
  {
    title: '职位名称',
    align: 'left',
    minWidth: 190,
    colKey: 'postName'
  },
  {
    title: '所在部门',
    colKey: 'deptVo',
    minWidth: 100,
    cell: (h, { row }) => {
      return h('span', row.deptVo ? row.deptVo.deptName : '--')
    }
  },
  {
    title: '创建日期',
    ellipsis: true,
    colKey: 'createDay',
    sortType: 'all',
    minWidth: 180
  },

  {
    title: '职位状态',
    ellipsis: true, // 文字超出宽度时显示省略号
    colKey: 'dataState',
    minWidth: 100,
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
    title: '职位说明',
    colKey: 'remark',
    // minWidth: 100,
    cell: (h, { row }) => {
      return h(
        'p',
        {
          class: `ellipsis`,
          title: row.remark
        },
        row.remark ? row.remark : '--'
      )
    },
    ellipsis: {
      theme: 'light',
      placement: 'bottom'
    }
  },
  {
    align: 'left',
    fixed: 'right',
    width: 180,
    minWidth: 160,
    colKey: 'op',
    title: '操作'
  }
]
