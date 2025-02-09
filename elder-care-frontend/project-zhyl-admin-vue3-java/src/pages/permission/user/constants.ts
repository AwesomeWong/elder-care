export const COLUMNS = [
  {
    title: '姓名',
    colKey: 'realName',
    cell: { col: 'status' },
    minWidth: 100
  },
  {
    title: '邮箱',
    colKey: 'email',
    minWidth: 120
  },
  {
    title: '所在部门',
    colKey: 'dept',
    minWidth: 160
  },
  {
    title: '所属职位',
    minWidth: '120px',
    colKey: 'post'
  },
  {
    title: '性别',
    colKey: 'sex',
    minWidth: 70,
    cell: (h, { row }) => {
      const sexList = {
        0: {
          label: '男'
        },
        1: {
          label: '女'
        },
        2: {
          label: '未知'
        }
      }
      return h('span', !row.sex ? '--' : sexList[row.sex].label)
    }
  },
  {
    title: '手机',
    colKey: 'mobile',
    minWidth: 120,
    cell: (h, { row }) => {
      return h('span', row.mobile ? row.mobile : '--')
    }
  },
  {
    title: '绑定角色',
    minWidth: 140,
    colKey: 'roleLabels',
    cell: (h, { row }) => {
      return h(
        'p',
        {
          class: `ellipsis2`,
          title: row.roleLabels && row.roleLabels.join('、')
        },
        row.roleLabels && row.roleLabels.join('、')
      )
    }
  },
  {
    title: '用户状态',
    minWidth: 70,
    ellipsis: true, // 文字超出宽度时显示省略号
    colKey: 'dataState',
    cell: (h, { row }) => {
      const statusList = {
        0: {
          label: '启用'
        },
        1: {
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
    width: 230,
    minWidth: '230px',
    colKey: 'op',
    title: '操作'
  }
]
