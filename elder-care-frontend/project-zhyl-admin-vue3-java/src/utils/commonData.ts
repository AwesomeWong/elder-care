// 状态数据
export const statusData = [
  {
    id: 1,
    value: '启用'
  },
  {
    id: 0,
    value: '禁用'
  }
]
// 执行周期
export const periodData = [
  { label: '每日', value: 0 },
  { label: '每周', value: 1 },
  { label: '每月', value: 2 }
]
export const tabData = [
  {
    id: 1,
    name: '线索'
  },
  {
    id: 2,
    name: '线索池子'
  }
]
// 入住tab
export const checkIntabData = [
  { value: 0, name: '基本信息' },
  { value: 1, name: '家属信息' },
  { value: 2, name: '资料上传' }
]
// 入住评估tab
export const evaluatetabData = [
  { value: 0, name: '健康评估' },
  { value: 1, name: '能力评估' },
  { value: 2, name: '评估报告' }
]
// 预约登记tab
export const subscribeTabData = [
  {
    id: '',
    name: '全部'
  },
  {
    id: 0,
    name: '参观预约'
  },
  {
    id: 1,
    name: '探访预约'
  }
]
// 来访登记tab
export const subVisitTabData = [
  {
    id: '',
    name: '全部'
  },
  {
    id: 0,
    name: '参观来访'
  },
  {
    id: 1,
    name: '探访来访'
  }
]
// 状态数据
export const appTypeData = [
  {
    id: 0,
    name: '参观来访'
  },
  {
    id: 1,
    name: '探访来访'
  }
]
// 预约tab
export const subscribeStatus = [
  {
    id: 0,
    value: '待上门'
  },
  {
    id: 1,
    value: '已完成'
  },
  {
    id: 2,
    value: '已取消'
  },
  {
    id: 3,
    value: '已过期'
  }
]
// 合同状态
export const contractStatus = [
  {
    id: 0,
    value: '未生效'
  },
  {
    id: 1,
    value: '生效中'
  },
  {
    id: 2,
    value: '已过期'
  },
  {
    id: 3,
    value: '已失效'
  }
]
// 协同工作
export const operationStatus = [
  {
    id: null,
    value: '全部'
  },
  {
    id: 1,
    value: '申请中'
  },
  {
    id: 2,
    value: '已完成'
  },
  {
    id: 3,
    value: '已关闭'
  }
]
export const operationStatus2 = [
  {
    id: null,
    value: '全部'
  },
  {
    id: 1,
    value: '已完成'
  },
  {
    id: 2,
    value: '已关闭'
  }
]
// 任务安排tab
export const arrangeData = [
  {
    id: 1,
    value: '待执行'
  },
  {
    id: 2,
    value: '已执行'
  },
  {
    id: 3,
    value: '已取消'
  }
]
// 单据类型
export const invoicesType = [
  {
    id: 3,
    value: '入住'
  },
  {
    id: 1,
    value: '退住'
  },
  {
    id: 2,
    value: '请假'
  }
]
// 退住步骤信息
export const checkinStepsData = [
  {
    id: 0,
    value: '申请入住'
  },
  {
    id: 1,
    value: '入住评估'
  },
  {
    id: 2,
    value: '入住审批'
  },
  {
    id: 3,
    value: '入住配置'
  },
  {
    id: 4,
    value: '签约办理'
  }
]
// 入住步骤信息
export const quitStepsData = [
  {
    id: 0,
    value: '申请退住'
  },
  {
    id: 1,
    value: '申请审批'
  },
  {
    id: 2,
    value: '解除合同'
  },
  {
    id: 3,
    value: '调整账单'
  },
  {
    id: 4,
    value: '账单审批'
  },
  {
    id: 5,
    value: '退住审批'
  },
  {
    id: 6,
    value: '费用清算'
  }
]
// 退住原因
export const quitCauseData = [
  {
    id: 0,
    value: '老人个人原因'
  },
  {
    id: 1,
    value: '护理质量不高'
  },
  {
    id: 2,
    value: '服务不周'
  },
  {
    id: 3,
    value: '管理混乱'
  },
  {
    id: 4,
    value: '费用高昂'
  },
  {
    id: 5,
    value: '违规退住'
  },
  {
    id: 6,
    value: '其他'
  }
]
// 审批状态
export const approveStatusData = [
  {
    id: 1,
    value: '审批通过'
  },
  {
    id: 2,
    value: '审批拒绝'
  },
  // {
  //   id: 4,
  //   value: '退回'
  // },
  {
    id: 3,
    value: '驳回'
  }
]
// 退款方式
export const refundModeData = [
  {
    id: 0,
    value: '支付宝'
  },
  {
    id: 1,
    value: '微信'
  },
  {
    id: 2,
    value: '现金'
  },
  {
    id: 3,
    value: '网银'
  },
  {
    id: 4,
    value: '其他'
  }
]
// 退款方式
export const backlogStatusData = [
  {
    id: 0,
    value: '待处理'
  },
  {
    id: 1,
    value: '已处理'
  }
]
// 报警管理
export const tabStatusData = [
  {
    id: null,
    value: '全部'
  },
  {
    id: 0,
    value: '待处理'
  },
  {
    id: 1,
    value: '已处理'
  }
]
// 退款状态
export const refundStatusData = [
  {
    id: 0,
    value: '全部'
  },
  {
    id: 1,
    value: '退款处理中'
  },
  {
    id: 2,
    value: '退款成功'
  },
  {
    id: 3,
    value: '退款失败'
  }
]
// 订单状态
export const orderStatusData = [
  {
    id: '',
    value: '全部'
  },
  {
    id: 0,
    value: '待支付'
  },
  {
    id: 1,
    value: '待执行'
  },
  {
    id: 2,
    value: '已执行'
  },
  {
    id: 3,
    value: '已完成'
  },
  {
    id: 5,
    value: '已退款'
  },
  {
    id: 4,
    value: '已关闭'
  }
]
// 订单进度条
export const orderStepData = [
  {
    id: 0,
    value: '待支付'
  },
  {
    id: 1,
    value: '待执行'
  },
  {
    id: 2,
    value: '已执行'
  },
  {
    id: 3,
    value: '已完成'
  }
]
// 取消原因
export const cancelCauseData = [
  {
    id: 0,
    value: '不需要此项服务了'
  },
  {
    id: 1,
    value: '费用有点贵'
  },
  {
    id: 2,
    value: '临时有事'
  },
  {
    id: 3,
    value: '不方便服务'
  },
  {
    id: 4,
    value: '信息填写错误'
  },
  {
    id: 5,
    value: '重复下单'
  }
]
// 性别
export const sexData = [
  {
    id: 0,
    value: '男'
  },
  {
    id: 1,
    value: '女'
  }
]
// 关系
export const relationData = [
  { label: '子女', value: '0' },
  { label: '配偶', value: '1' },
  { label: '亲属', value: '2' },
  {
    value: '3',
    label: '朋友'
  },
  {
    value: '4',
    label: '社工'
  },
  {
    value: '5',
    label: '其他'
  }
]
// 账单tab
// 任务安排tab
export const billTabData = [
  {
    id: '',
    value: '全部'
  },
  {
    id: 0,
    value: '待支付'
  },
  {
    id: 1,
    value: '已支付'
  },
  {
    id: 2,
    value: '已关闭'
  }
]
// 性别
export const cutInData = [
  {
    id: 0,
    value: '老人'
  },
  {
    id: 1,
    value: '位置'
  }
]
export const facilityTabData = [
  {
    id: 0,
    name: '设备详情'
  },
  {
    id: 1,
    name: '物模型数据'
  }
]
export const modelTabData = [
  {
    id: 0,
    name: '运行状态'
  },
  {
    id: 1,
    name: '事件管理'
  }
]
export const timeData = [
  {
    id: 0,
    value: '1小时'
  },
  {
    id: 1,
    value: '24小时'
  },
  {
    id: 2,
    value: '7天'
  },
  {
    id: 3,
    value: '自定义'
  }
]
// 统计字段
export const statistFicalData = [
  {
    id: 0,
    value: '最新值'
  },
  {
    id: 1,
    value: '计数'
  },
  {
    id: 2,
    value: '求和'
  },
  {
    id: 3,
    value: '最小值'
  },
  {
    id: 4,
    value: '最大值'
  },
  {
    id: 5,
    value: '平均值'
  }
]
// 运算符
export const operatorData = [
  {
    id: 0,
    value: '>='
  },
  // {
  //   id: 1,
  //   value: '>'
  // },
  // {
  //   id: 2,
  //   value: '<='
  // },
  {
    id: 3,
    value: '<'
  }
  // {
  //   id: 4,
  //   value: '!='
  // }
]
// 持续周期
export const continuePeriodData = [
  {
    id: 0,
    value: '1'
  },
  {
    id: 1,
    value: '3'
  },
  {
    id: 2,
    value: '5'
  },
  {
    id: 3,
    value: '10'
  }
]
// 数据聚合周期
export const aggregationPeriodData = [
  {
    id: 0,
    value: 1
  },
  {
    id: 1,
    value: 5
  }
]
// 报警沉默周期
export const silenceCycleData = [
  {
    id: 0,
    value: 5
  },
  {
    id: 1,
    value: 10
  },
  {
    id: 2,
    value: 15
  },
  {
    id: 3,
    value: 30
  },
  {
    id: 4,
    value: 60
  },
  {
    id: 5,
    value: 3
  },
  {
    id: 6,
    value: 6
  },
  {
    id: 7,
    value: 12
  },
  {
    id: 8,
    value: 24
  }
]
