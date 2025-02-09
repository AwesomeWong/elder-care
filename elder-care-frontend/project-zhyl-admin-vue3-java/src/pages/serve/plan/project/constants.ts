export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  { title: '护理图片', width: 150, minWidth: '150px', colKey: 'image' },
  {
    title: '护理项目名称',
    minWidth: '150px',
    colKey: 'name'
  },
  {
    title: '价格（元）',
    minWidth: '160px',
    colKey: 'price'
  },
  {
    title: '单位',
    minWidth: '150px',
    colKey: 'unit'
  },
  {
    title: '排序',
    minWidth: '150px',
    colKey: 'orderNo'
  },
  {
    title: '创建人',
    minWidth: '200px',
    colKey: 'creator'
  },
  {
    title: '创建时间',
    minWidth: '180px',
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
