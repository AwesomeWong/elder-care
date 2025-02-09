import { TdBaseTableProps } from 'tdesign-vue-next'

interface DashboardPanel {
  total?: string
  data?: Object
}

interface TendItem {
  type: number
  num?: string
  title?: string
  name: string
  date: string
}
// 数据概览
// 老人数量
export const OLDMAN_NUM_A: Object | Array<DashboardPanel> = {
  total: '643',
  data: [
    { value: 21, name: '外出中' },
    { value: 622, name: '在院中' }
  ]
}
export const OLDMAN_NUM_B: Object | Array<DashboardPanel> = {
  total: '655',
  data: [
    { value: 11, name: '外出中' },
    { value: 644, name: '在院中' }
  ]
}
export const OLDMAN_NUM_C: Object | Array<DashboardPanel> = {
  total: '649',
  data: [
    { value: 17, name: '外出中' },
    { value: 632, name: '在院中' }
  ]
}
// 床位数量
export const BED_NUM_A: Object | Array<DashboardPanel> = {
  total: '812',
  data: [
    { value: 169, name: '空闲中' },
    { value: 643, name: '入住中' }
  ]
}
export const BED_NUM_B: Object | Array<DashboardPanel> = {
  total: '812',
  data: [
    { value: 157, name: '空闲中' },
    { value: 655, name: '入住中' }
  ]
}
export const BED_NUM_C: Object | Array<DashboardPanel> = {
  total: '812',
  data: [
    { value: 163, name: '空闲中' },
    { value: 649, name: '入住中' }
  ]
}
// 服务单数量（笔）
export const SERVE_NUM_A: Object | Array<DashboardPanel> = {
  total: 100.05,
  data: [
    { value: 6.17, name: '护理计划外' },
    { value: 93.88, name: '护理计划内' }
  ]
}
export const SERVE_NUM_B: Object | Array<DashboardPanel> = {
  total: 100.35,
  data: [
    { value: 6.17, name: '护理计划外' },
    { value: 94.18, name: '护理计划内' }
  ]
}
export const SERVE_NUM_C: Object | Array<DashboardPanel> = {
  total: 100.66,
  data: [
    { value: 6.18, name: '护理计划外' },
    { value: 94.48, name: '护理计划内' }
  ]
}
// 员工数量（人）
export const STAFF_NUM_A: Object | Array<DashboardPanel> = {
  total: 202,
  data: [
    { value: 18, name: '管理层' },
    { value: 184, name: '普通员工' }
  ]
}
export const STAFF_NUM_B: Object | Array<DashboardPanel> = {
  total: 204,
  data: [
    { value: 18, name: '管理层' },
    { value: 186, name: '普通员工' }
  ]
}
export const STAFF_NUM_C: Object | Array<DashboardPanel> = {
  total: 204,
  data: [
    { value: 18, name: '管理层' },
    { value: 186, name: '普通员工' }
  ]
}
// 收入金额（元）
export const MONEY_NUM_A: Object | Array<DashboardPanel> = {
  total: 401.23,
  data: [
    { value: 92.59, name: '服务费用' },
    { value: 308.64, name: '月度费用' }
  ]
}
export const MONEY_NUM_B: Object | Array<DashboardPanel> = {
  total: 410.81,
  data: [
    { value: 92.85, name: '服务费用' },
    { value: 317.96, name: '月度费用' }
  ]
}
export const MONEY_NUM_C: Object | Array<DashboardPanel> = {
  total: 411.92,
  data: [
    { value: 93.1, name: '服务费用' },
    { value: 318.82, name: '月度费用' }
  ]
}
// 今日数据
export const TODAY_TIME = [
  '0:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
]
// 收益情况
export const TODAY_NUM_A = {
  incomeData: [
    0.0, 0.0, 0.0, 0.0, 0.0, 629.22, 450, 480.45, 2032.22, 5900.12, 4569, 3476,
    1020.22, 2409.39, 3647.13, 3838.2, 2232.29, 1753.45, 2777.93, 2459.27,
    2495.92, 722.8, 489.22, 0.0
  ],
  refundData: [
    0.0, 0.0, 0.0, 0.0, 0.0, 110, 200, 1300, 3799.22, 3567.23, 2200, 1387,
    374.33, 2389.38, 4877.13, 2890.22, 1343.73, 1347.69, 1351.83, 350.27,
    2342.86, 346.06, 350.88, 0.0
  ]
}
export const TODAY_NUM_B = {
  incomeData: [
    0.0, 0.0, 0.0, 0.0, 0.0, 778.22, 380.0, 320, 2789.09, 3767.98, 4728,
    2978.03, 1273.33, 1821.94, 2295.2, 2349.02, 3479.22, 1503.34, 2533.36,
    2602.07, 2461.21, 716.24, 276.22, 0
  ],
  refundData: [
    0.0, 0.0, 0.0, 0.0, 0.0, 255.0, 200, 1450, 2200, 3656.98, 2239.03, 1973,
    338.23, 2725.84, 2342, 1349, 1435.72, 1345.91, 1344.12, 346.82, 2346.68,
    348.09, 352.05, 0
  ]
}
export const TODAY_NUM_C = {
  incomeData: [
    0.0, 0.0, 0.0, 0.0, 0.0, 778.98, 480, 170, 290.22, 2345.98, 2387, 3746.93,
    2300.22, 2764.96, 3689.23, 3478, 2295.2, 1676.81, 2841.43, 2579.56, 2678.19,
    338.74, 256.02, 0
  ],
  refundData: [
    0.0, 0.0, 0.0, 0.0, 0.0, 300, 20.39, 1840, 1899.23, 2234.03, 2297.02,
    1298.22, 1299, 2892.88, 2390, 1344.23, 1349.02, 346.35, 1343.47, 348.42,
    2345.23, 341.19, 343.79, 0
  ]
}
// 本周
export const WEEK_DATA = [
  '第一天',
  '第二天',
  '第三天',
  '第四天',
  '第五天',
  '第六天',
  '第七天'
]

// 本周
export const WEEK_NUM_A = {
  incomeData: ['14248', '13593', '14297', '13929', '14919', '13932', '14066'],
  refundData: ['3393', '3024', '2970', '3254', '3170', '3223', '2964']
}
export const WEEK_NUM_B = {
  incomeData: ['13785', '14634', '13636', '13846', '14038', '14845', '14607'],
  refundData: ['2981', '3033', '3105', '3311', '3326', '3141', '3302']
}
export const WEEK_NUM_C = {
  incomeData: ['14002', '14128', '13995', '14551', '14421', '14295', '14235'],
  refundData: ['3137', '3035', '3083', '3262', '3067', '3189', '3486']
}
// 本月
export const MONTH_NUM_A = {
  incomeData: [
    '13689',
    '14114',
    '13872',
    '14248',
    '13593',
    '14297',
    '13929',
    '14919',
    '13932',
    '14066',
    '13816',
    '13405',
    '14287',
    '14241',
    '14382',
    '14117',
    '14703',
    '14498',
    '14674',
    '13686',
    '14732',
    '13528',
    '13994',
    '13719',
    '14292',
    '13902',
    '14321',
    '14548',
    '14188',
    '14381',
    '13547'
  ],
  refundData: [
    '3123',
    '3107',
    '3248',
    '3393',
    '3024',
    '2970',
    '3254',
    '3170',
    '3223',
    '2964',
    '3484',
    '3454',
    '3092',
    '3213',
    '3377',
    '3405',
    '3059',
    '3033',
    '3094',
    '3141',
    '3439',
    '3489',
    '3286',
    '3384',
    '3262',
    '3347',
    '2980',
    '3332',
    '3426',
    '3429',
    '3347'
  ]
}
export const MONTH_NUM_B = {
  incomeData: [
    14, 823.0, 3058.0, 14596.0, 3290.0, 14042.0, 3350.0, 13785.0, 2981.0,
    14634.0, 3033.0, 13636.0, 3105.0, 13846.0, 3311.0, 14038.0, 3326.0, 14845.0,
    3141.0, 14607.0, 3302.0, 13583.0, 3144.0, 13797.0, 3040.0, 13775.0, 2962.0,
    14760.0, 3166.0, 14626.0, 3444.0, 13990.0, 3403.0, 14265.0, 3050.0, 13868.0,
    3035.0, 13781.0, 3312.0, 14184.0, 3296.0, 14542.0, 3111.0, 13839.0, 3074.0,
    14358.0, 3395.0, 13547.0, 3371.0, 13686.0, 3360.0, 13867.0, 3172.0, 14096.0,
    3461.0, 14266.0, 969.0, 14871.0, 3253.0, 14961.0, 3092.0, 13902.0
  ],
  refundData: [
    3058, 3290, 3350, 2981, 3033, 3105, 3311, 3326, 3141, 3302, 3144, 3040,
    2962, 3166, 3444, 3403, 3050, 3035, 3312, 3296, 3111, 3074, 3395, 3371,
    3360, 3172, 3461, 2969, 3253, 3092, 3371
  ]
}
export const MONTH_NUM_C = {
  incomeData: [
    14356, 14408, 13942, 14002, 14128, 13995, 14551, 14421, 14295, 14235, 13996,
    13579, 14899, 14292, 13867, 14187, 13696, 14908, 14435, 14424, 14218, 14168,
    13640, 14226, 14184, 14732, 13362, 13464, 14212, 14858, 14184
  ],
  refundData: [
    3016, 3035, 3331, 3137, 3035, 3083, 3262, 3067, 3189, 3486, 3462, 3024,
    3186, 3231, 3036, 3449, 3367, 3113, 3314, 3032, 3225, 3284, 3063, 3391,
    3063, 3173, 3327, 3271, 3306, 3425, 3360
  ]
}
// 入退情况
// 今日
export const TODAY_EARNING_NUM_A = {
  incomeData: [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 2, 4, 1, 4, 3, 0, 2, 3, 1, 1, 0, 0, 0
  ],
  refundData: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 4, 4, 0, 0, 0, 0
  ]
}
export const TODAY_EARNING_NUM_B = {
  incomeData: [
    0, 0, 0, 0, 0, 0, 1, 2, 4, 3, 0, 1, 3, 3, 3, 4, 1, 2, 1, 1, 0, 0, 0, 0
  ],
  refundData: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 1, 1, 2, 1, 1, 1, 3, 1, 1, 0, 0, 0
  ]
}
export const TODAY_EARNING_NUM_C = {
  incomeData: [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 0, 0
  ],
  refundData: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 2, 2, 1, 1, 1, 2, 0, 1, 0, 0
  ]
}
// 本周
export const WEEK_EARNING_NUM_A = {
  incomeData: [24, 0, 14, 13, 11, 10, 20],
  refundData: [21, 17, 12, 13, 19, 24, 12]
}
export const WEEK_EARNING_NUM_B = {
  incomeData: [29, 18, 26, 6, 28, 19, 18],
  refundData: [17, 8, 23, 23, 22, 21, 16]
}
export const WEEK_EARNING_NUM_C = {
  incomeData: [15, 16, 13, 15, 5, 19, 17],
  refundData: [21, 15, 27, 20, 24, 15, 16]
}
// 本月
export const MONTH_EARNING_NUM_A = {
  incomeData: [
    12, 19, 10, 24, 0, 14, 13, 11, 10, 20, 8, 15, 9, 9, 21, 13, 21, 21, 13, 28,
    13, 12, 14, 18, 17, 22, 10, 20, 30, 22, 17
  ],
  refundData: [
    19, 19, 27, 21, 17, 12, 13, 19, 24, 12, 11, 12, 17, 24, 8, 14, 18, 21, 9,
    33, 11, 24, 24, 18, 16, 32, 27, 25, 10, 16, 16
  ]
}
export const MONTH_EARNING_NUM_B = {
  incomeData: [
    8, 26, 22, 29, 18, 26, 6, 28, 19, 18, 23, 4, 25, 18, 18, 5, 29, 18, 28, 7,
    12, 11, 23, 8, 15, 10, 7, 25, 12, 13, 12
  ],
  refundData: [
    9, 28, 7, 17, 8, 23, 23, 22, 21, 16, 20, 20, 21, 21, 14, 7, 29, 33, 14, 9,
    25, 16, 16, 6, 12, 14, 9, 11, 9, 20, 15
  ]
}
export const MONTH_EARNING_NUM_C = {
  incomeData: [
    5, 8, 14, 15, 16, 13, 15, 5, 19, 17, 16, 14, 2, 18, 14, 6, 6, 13, 10, 16, 7,
    7, 32, 13, 6, 17, 20, 14, 24, 9, 14
  ],
  refundData: [
    14, 21, 16, 21, 15, 27, 20, 24, 15, 16, 30, 19, 25, 14, 14, 10, 16, 15, 17,
    18, 19, 11, 19, 13, 29, 8, 8, 14, 22, 26, 10
  ]
}
// 服务情况
// 今日
export const TODAY_SERVE_NUM_A = [
  54, 64, 34, 50, 63, 89, 102, 132, 124, 179, 147, 142, 160, 99, 112, 138, 102,
  167, 144, 122, 94, 63, 59, 52
]
export const TODAY_SERVE_NUM_B = [
  74, 56, 34, 44, 62, 67, 110, 128, 137, 176, 140, 139, 157, 108, 121, 123, 117,
  143, 141, 163, 102, 61, 61, 52
]
export const TODAY_SERVE_NUM_C = [
  84, 60, 32, 49, 47, 67, 87, 129, 122, 164, 125, 115, 142, 97, 113, 109, 112,
  115, 129, 153, 102, 82, 46, 49
]
// 本周
export const WEEK_SERVE_NUM_A = [2492, 2656, 2789, 2578, 2656, 2767, 2521]
export const WEEK_SERVE_NUM_B = [2516, 2267, 2678, 2567, 2878, 2567, 2878]
export const WEEK_SERVE_NUM_C = [2330, 2467, 2565, 2376, 2567, 2545, 2754]
// 本月
export const MONTH_SERVE_NUM_A = [
  2720, 2713, 2728, 2492, 2656, 2789, 2578, 2656, 2767, 2521, 2672, 2773, 2890,
  2838, 2690, 2529, 2491, 2745, 2869, 2811, 2904, 2796, 2822, 2592, 2961, 2883,
  2766, 2540, 2759, 2973, 2869
]
export const MONTH_SERVE_NUM_B = [
  2762, 2799, 2762, 2516, 2267, 2678, 2567, 2878, 2567, 2878, 2869, 2718, 2645,
  2638, 2884, 2617, 2852, 2691, 2856, 2698, 2940, 2861, 3003, 2633, 2778, 2712,
  2780, 2846, 2686, 2812, 2566
]
export const MONTH_SERVE_NUM_C = [
  2760, 2776, 2513, 2330, 2467, 2565, 2376, 2567, 2545, 2754, 2856, 2688, 2800,
  2750, 2665, 2889, 2881, 2672, 2801, 2927, 2675, 2611, 2552, 2915, 3022, 2579,
  2835, 2628, 2849, 2667, 2722
]
// 待办事项
export const BACKLOG_DATA_A: Array<TendItem> = [
  {
    type: 3,
    num: 'RZ202310181126491',
    title: '刘信俊的入住申请',
    name: '宋湘婷',
    date: '2023-10-18 11:26:00'
  },
  {
    type: 3,
    num: 'RZ202310181144772',
    title: '李美治的入住申请',
    name: '王姿吟',
    date: '2023-10-18 11:44:00'
  },
  {
    type: 1,
    num: 'TZ202310181217777',
    title: '汤筠霞的退住申请',
    name: '马荣真',
    date: '2023-10-18 12:17:00'
  }
]
export const BACKLOG_DATA_B: Array<TendItem> = [
  {
    type: 1,
    num: 'TZ202310220800769',
    title: '张昆元的退住申请',
    name: '龚静雯',
    date: '2023-10-22 08:00:00'
  },
  {
    type: 1,
    num: 'TZ202310230932323',
    title: '林国芸的退住申请',
    name: '曹智强',
    date: '2023-10-23 09:32:00'
  },
  {
    type: 3,
    num: 'RZ202310232217987',
    title: '游石如的入住申请',
    name: '葛真珍',
    date: '2023-10-23 22:17:00'
  }
]
export const BACKLOG_DATA_C: Array<TendItem> = [
  {
    type: 3,
    num: 'RZ202310131703287',
    title: '陈冠廷的入住申请',
    name: '叶静宜',
    date: '2023-10-13 17:03:00'
  },
  {
    type: 1,
    num: 'TZ202310131829109',
    title: '庾雅婷的退住申请',
    name: '曹智强',
    date: '2023-10-13 18:29:00'
  },
  {
    type: 3,
    num: 'TZ202310132102640',
    title: '陈采勇的退住申请',
    name: '林宜蓁',
    date: '2023-10-13 21:02:00'
  }
]
// 预约总览
export const SUBSCRIBE_DATA = [
  [
    {
      type: 1,
      phone: '17062479244',
      name: '张伟',
      time: '09:00'
    },
    {
      type: 1,
      phone: '17395096135',
      name: '林建华',
      time: '12:00'
    },
    {
      type: 2,
      phone: '13470504971',
      name: '马荣真',
      time: '18:00'
    }
  ],
  [
    {
      type: 1,
      phone: '16133295231',
      name: '李思远',
      time: '07:35'
    },
    {
      type: 1,
      phone: '13505066198',
      name: '王刚',
      time: '11:20'
    },
    {
      type: 2,
      phone: '15650105031',
      name: '张宏伟',
      time: '18:00'
    }
  ],
  [
    {
      type: 1,
      phone: '17705167560',
      name: '黄成立',
      time: '12:00'
    },
    {
      type: 2,
      phone: '17714515848',
      name: '周安',
      time: '13:00'
    },
    {
      type: 2,
      phone: '14144928346',
      name: '刘翱川云',
      time: '14:00'
    }
  ],
  [
    {
      type: 2,
      phone: '19424354614',
      name: '杨雪莉',
      time: '09:00'
    },
    {
      type: 2,
      phone: '16472588080',
      name: '陈琳',
      time: '15:00'
    },
    {
      type: 2,
      phone: '19321315213',
      name: '徐秀娟',
      time: '16:30'
    }
  ],
  [
    {
      type: 1,
      phone: '19334274595',
      name: '刘强',
      time: '07:45'
    },
    {
      type: 2,
      phone: '13267734773',
      name: '陈鹏',
      time: '08:00'
    },
    {
      type: 1,
      phone: '15240724014',
      name: '袁文轩',
      time: '09:00'
    }
  ],
  [
    {
      type: 2,
      phone: '19224279107',
      name: '刘毅豪',
      time: '09:50'
    },
    {
      type: 1,
      phone: '13267739898',
      name: '许浩然',
      time: '10:00'
    },
    {
      type: 1,
      phone: '15424276235',
      name: '王婷',
      time: '11:15'
    }
  ],
  [
    {
      type: 1,
      phone: '15576572508',
      name: '谢杰',
      time: '11:10'
    },
    {
      type: 2,
      phone: '14779915659',
      name: '李婉娜',
      time: '11:30'
    },
    {
      type: 2,
      phone: '13047879330',
      name: '陈进',
      time: '11:45'
    }
  ],
  [
    {
      type: 1,
      phone: '19161592761',
      name: '袁洋',
      time: '08:00'
    },
    {
      type: 1,
      phone: '13348740172',
      name: '张晓丽',
      time: '12:00'
    },
    {
      type: 2,
      phone: '14144969481',
      name: '刘鑫',
      time: '18:00'
    }
  ],
  [
    {
      type: 1,
      phone: '15378283924',
      name: '张雨静涵',
      time: '07:00'
    },
    {
      type: 1,
      phone: '15018246673',
      name: '张豪',
      time: '14:00'
    },
    {
      type: 1,
      phone: '16157278889',
      name: '刘莉',
      time: '18:00'
    }
  ],
  [
    {
      type: 2,
      phone: '16006983031',
      name: '王美惠',
      time: '09:00'
    },
    {
      type: 1,
      phone: '14440882401',
      name: '刘易空麟',
      time: '09:20'
    },
    {
      type: 2,
      phone: '19546590654',
      name: '孙鹏',
      time: '16:00'
    }
  ],
  [
    {
      type: 2,
      phone: '18024078717',
      name: '吴浩',
      time: '11:10'
    },
    {
      type: 1,
      phone: '13645156008',
      name: '赵雨薇',
      time: '11:15'
    },
    {
      type: 2,
      phone: '13625298333',
      name: '郑宇',
      time: '11:20'
    }
  ],
  [
    {
      type: 1,
      phone: '19142821142',
      name: '孙佳琳',
      time: '10:20'
    },
    {
      type: 1,
      phone: '16251340113',
      name: '周浩',
      time: '13:05'
    },
    {
      type: 1,
      phone: '14487596705',
      name: '章美西子',
      time: '17:20'
    }
  ],
  [
    {
      type: 1,
      phone: '19428172648',
      name: '陈琳',
      time: '13:00'
    },
    {
      type: 2,
      phone: '18024127039',
      name: '赵文斌',
      time: '13:30'
    },
    {
      type: 2,
      phone: '15692374458',
      name: '郭文',
      time: '14:20'
    }
  ],
  [
    {
      type: 2,
      phone: '14440994509',
      name: '刘芳菲',
      time: '10:45'
    },
    {
      type: 1,
      phone: '19648676758',
      name: '孙思怡宁',
      time: '11:10'
    },
    {
      type: 2,
      phone: '17065016573',
      name: '王志强',
      time: '14:20'
    }
  ],
  [
    {
      type: 1,
      phone: '18726744874',
      name: '徐瑶',
      time: '10:00'
    },
    {
      type: 2,
      phone: '19224335967',
      name: '周雅静',
      time: '11:00'
    },
    {
      type: 2,
      phone: '16251317275',
      name: '陈璐璐',
      time: '17:40'
    }
  ],
  [
    {
      type: 2,
      phone: '16411066720',
      name: '林怡萱',
      time: '08:05'
    },
    {
      type: 2,
      phone: '13446950500',
      name: '许萍',
      time: '18:20'
    },
    {
      type: 2,
      phone: '17025237863',
      name: '周明轩',
      time: '18:25'
    }
  ],
  [
    {
      type: 1,
      phone: '13047816688',
      name: '李文彬',
      time: '09:00'
    },
    {
      type: 1,
      phone: '17198850244',
      name: '陈美丽',
      time: '12:00'
    },
    {
      type: 2,
      phone: '19142966809',
      name: '张雪',
      time: '18:00'
    }
  ],
  [
    {
      type: 1,
      phone: '17124507049',
      name: '周安',
      time: '08:40'
    },
    {
      type: 2,
      phone: '15424407939',
      name: '孙建华',
      time: '11:00'
    },
    {
      type: 2,
      phone: '14670165974',
      name: '徐秀娟',
      time: '17:00'
    }
  ],
  [
    {
      type: 2,
      phone: '15650156172',
      name: '潘长海',
      time: '07:40'
    },
    {
      type: 1,
      phone: '13509246375',
      name: '邹建林',
      time: '10:25'
    },
    {
      type: 2,
      phone: '16807345805',
      name: '吴平',
      time: '18:40'
    }
  ],
  [
    {
      type: 2,
      phone: '19161477491',
      name: '方文涛',
      time: '09:00'
    },
    {
      type: 1,
      phone: '15134262211',
      name: '赵良',
      time: '08:50'
    },
    {
      type: 2,
      phone: '16736752076',
      name: '田立志',
      time: '20:00'
    }
  ]
]

export const SALE_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 65
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: '客户名称',
    width: 150
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 100,
    title: '较上周'
  },
  {
    align: 'center',
    colKey: 'count',
    title: '订单量',
    width: 100
  },
  {
    align: 'center',
    colKey: 'date',
    width: 140,
    title: '合同签订日期'
  },
  {
    align: 'center',
    colKey: 'operation',
    title: '操作',
    width: 74,
    fixed: 'right'
  }
]

export const BUY_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: '排名',
    width: 65
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    width: 150,
    title: '供应商名称'
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 100,
    title: '较上周'
  },
  {
    align: 'center',
    colKey: 'count',
    title: '订单量',
    width: 100
  },
  {
    align: 'center',
    colKey: 'date',
    width: 140,
    title: '合同签订日期'
  },
  {
    align: 'center',
    colKey: 'operation',
    title: '操作',
    width: 74,
    fixed: 'right'
  }
]
