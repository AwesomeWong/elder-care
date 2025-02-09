export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 80,
    minWidth: 80,
    colKey: 'rowIndex'
  },
  {
    title: '设备名称',
    minWidth: 180,
    colKey: 'deviceName'
  },
  {
    title: '备注名称',
    minWidth: 180,
    colKey: 'noteName'
  },
  {
    title: '所属产品',
    minWidth: 200,
    colKey: 'productName'
  },
  {
    title: '功能名称',
    minWidth: 180,
    colKey: 'functionName'
  },
  {
    title: '接入位置',
    minWidth: 180,
    colKey: 'accessLocation'
  },
  {
    title: '数据值',
    minWidth: 180,
    colKey: 'dataValue'
  },
  {
    title: '报警时间',
    minWidth: 200,
    colKey: 'alarmTime'
  },
  {
    title: '处理结果',
    minWidth: 320,
    ellipsis: true,
    colKey: 'processingResult'
  },
  {
    title: '处理人',
    minWidth: 180,
    colKey: 'processor'
  },
  {
    title: '处理时间',
    minWidth: 300,
    colKey: 'processingTime'
  },
  {
    title: '状态',
    colKey: 'status',
    width: 120,
    minWidth: '120px',
    // // 添加筛选
    cell: (h, { row }) => {
      const statusList = {
        3: {
          label: '已处理'
        },
        2: {
          label: '待处理'
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
    width: 65,
    minWidth: '65px',
    colKey: 'op',
    title: '操作'
  }
]
