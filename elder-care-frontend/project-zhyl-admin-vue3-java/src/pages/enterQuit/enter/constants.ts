export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '单据编号',
    minWidth: 220,
    colKey: 'checkInCode'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'elderDto.name'
  },
  {
    title: '老人身份证号',
    minWidth: 220,
    colKey: 'elderDto.idCardNo'
  },
  {
    title: '入住床位',
    minWidth: 120,
    colKey: 'bedVo.bedNumber'
  },
  {
    title: '入住日期',
    minWidth: 160,
    colKey: 'checkInTime'
  },
  {
    title: '创建人',
    minWidth: 160,
    colKey: 'applicat'
  },
  {
    title: '创建时间',
    minWidth: 300,
    colKey: 'createTime'
  },

  {
    align: 'left',
    fixed: 'right',
    width: '65px',
    colKey: 'op',
    title: '操作'
  }
]
