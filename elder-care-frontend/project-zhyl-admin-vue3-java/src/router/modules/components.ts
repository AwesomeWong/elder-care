import Layout from '@/layouts/index.vue'
import htIcon from '@/assets/test-img/icon-ht.svg'
import FormIcon from '@/assets/test-img/icon_menu_cheliang.svg'
import GrzxIcon from '@/assets/test-img/icon-cwgl.svg'
import liveInIcon from '@/assets/test-img/icon_menu_zaizhu.svg'

const normalRouter = [
  {
    path: '/appointment',
    name: 'appointment',
    component: Layout,
    redirect: '/appointment/subscribe',
    meta: {
      title: '预约管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'track',
        name: 'track',
        meta: {
          title: '预约来访',
          icon: GrzxIcon
        }
      },
      {
        path: 'subscribe',
        name: 'subscribe',
        parent: 'track',
        component: () => import('@/pages/appointment/subscribe/index.vue'),
        meta: {
          title: '预约登记'
        }
      },
      {
        path: 'comeVisit',
        name: 'comeVisit',
        parent: 'track',
        component: () => import('@/pages/appointment/comeVisit/index.vue'),
        meta: {
          title: '来访登记'
        }
      }
    ]
  },
  {
    path: '/enterQuit',
    name: 'enterQuit',
    component: Layout,
    redirect: '/enterQuit/enterManage',
    meta: {
      title: '入退管理',
      single: true
    },
    children: [
      {
        path: 'enterParent',
        name: 'enterParent',
        component: () => import('@/pages/enterQuit/enter/index.vue'),
        meta: {
          title: '入住管理'
        }
      },
      {
        path: 'enterManage',
        name: 'enterManage',
        parent: 'enterParent',
        component: () => import('@/pages/enterQuit/enter/index.vue'),
        meta: {
          title: '入住办理'
        }
      },
      {
        path: 'enterDetails',
        name: 'enterDetails',
        parent: 'enterParent',
        component: () => import('@/pages/enterQuit/enter/details.vue'),
        meta: {
          title: '入住申请',
          hidden: true
        }
      },
      {
        path: 'quitParent',
        name: 'quitParent',
        component: () => import('@/pages/enterQuit/quit/index.vue'),
        meta: {
          title: '退住管理'
        }
      },
      {
        path: 'quitManage',
        name: 'quitManage',
        parent: 'quitParent',
        component: () => import('@/pages/enterQuit/quit/index.vue'),
        meta: {
          title: '退住办理'
        }
      },
      {
        path: 'quitDetails',
        name: 'quitDetails',
        parent: 'quitParent',
        component: () => import('@/pages/synergy/apply/details.vue'),
        meta: {
          title: '退住申请',
          hidden: true
          // fmeta: { path: '/liveIn/track', title: '合同跟踪' }
        }
      }
    ]
  },

  {
    path: '/liveIn',
    name: 'liveIn',
    component: Layout,
    redirect: '/liveIn/trackAfter',
    meta: {
      title: '在住管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'trackParent',
        name: 'trackParent',
        component: () => import('@/pages/liveIn/contract/index.vue'),
        meta: {
          title: '合同管理',
          icon: GrzxIcon
        }
      },
      {
        path: 'trackAfter',
        name: 'trackAfter',
        parent: 'trackParent',
        component: () => import('@/pages/liveIn/contract/index.vue'),
        meta: {
          title: '合同跟踪'
        }
      },
      {
        path: 'trackDetails',
        name: 'trackDetails',
        parent: 'trackParent',
        component: () => import('@/pages/liveIn/contract/details.vue'),
        meta: {
          title: '合同详情',
          hidden: true,
          fmeta: { path: '/liveIn/track', title: '合同跟踪' }
        }
      },
      {
        path: 'bed',
        name: 'LiveInBed',
        component: () => import('@/pages/liveIn/bed/houseType/index.vue'),
        meta: {
          title: '床位管理',
          icon: GrzxIcon
        }
      },
      {
        path: 'houseType',
        name: 'houseType',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'LiveInBed',
        component: () => import('@/pages/liveIn/bed/houseType/index.vue'),
        meta: {
          title: '床位房型'
        }
      },
      {
        path: 'houseSet',
        name: 'houseSet',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'LiveInBed',
        component: () => import('@/pages/liveIn/bed/houseSet/index.vue'),
        meta: {
          title: '房型设置'
        }
      },
      {
        path: 'smartBed',
        name: 'smartBed',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'LiveInBed',
        component: () => import('@/pages/liveIn/bed/smartBed/index.vue'),
        meta: {
          title: '智能床位'
        }
      }
    ]
  },
  {
    path: '/serve',
    name: 'serve',
    component: Layout,
    redirect: '/serve/grade',
    meta: {
      title: '服务管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'plan',
        name: 'plan',
        meta: {
          title: '护理计划',
          icon: GrzxIcon
        }
      },
      {
        path: 'grade',
        name: 'grade',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'plan',
        component: () => import('@/pages/serve/plan/grade/index.vue'),
        meta: {
          title: '护理等级'
        }
      },
      {
        path: 'nurseProject',
        name: 'nurseProject',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'plan',
        component: () => import('@/pages/serve/plan/project/index.vue'),
        meta: {
          title: '护理项目'
        }
      },
      {
        path: 'nursePlan',
        name: 'nursePlan',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'plan',
        component: () => import('@/pages/serve/plan/nurse/index.vue'),
        meta: {
          title: '护理计划'
        }
      },
      {
        path: 'task',
        name: 'task',
        meta: {
          title: '护理任务',
          icon: GrzxIcon
        }
      },
      {
        path: 'arrange',
        name: 'arrange',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'task',
        component: () => import('@/pages/serve/task/index.vue'),
        meta: {
          title: '任务安排'
        }
      },
      {
        path: 'oldPeople',
        name: 'oldPeople',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'task',
        component: () => import('@/pages/serve/task/oldPeople/index.vue'),
        meta: {
          title: '负责老人'
        }
      },
      {
        path: 'serveDetails',
        name: 'serveDetails',
        parent: 'task',
        component: () => import('@/pages/serve/task/details.vue'),
        meta: {
          title: '任务详情',
          hidden: true,
          fmeta: { path: '/serve/arrange', title: '任务安排' }
        }
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/olist',
    meta: {
      title: '订单管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: '/',
        name: 'orderParent',
        // component: () => import('@/pages/order/order/index.vue'),
        meta: {
          title: '订单管理',
          icon: GrzxIcon
        }
      },
      {
        path: 'olist',
        name: 'olist',
        parent: 'orderParent',
        component: () => import('@/pages/order/order/index.vue'),
        meta: {
          title: '订单管理'
        }
      },
      {
        path: 'refund',
        name: 'refund',
        parent: 'orderParent',
        component: () => import('@/pages/order/refund/index.vue'),
        meta: {
          title: '退款管理'
        }
      },
      {
        path: 'orderDetails',
        name: 'orderDetails',
        parent: 'orderParent',
        component: () => import('@/pages/order/order/details.vue'),
        meta: {
          title: '订单详情',
          hidden: true
          // fmeta: { path: '/liveIn/track', title: '合同跟踪' }
        }
      }
    ]
  },
  {
    path: '/finance',
    name: 'finance',
    component: Layout,
    redirect: '/finance/enterAccount',
    meta: { title: '财务管理', single: true },
    children: [
      {
        path: 'bill',
        name: 'financeParent',
        component: () => import('@/pages/financing/bill/index.vue'),
        meta: { title: '账单管理', icon: GrzxIcon }
      },
      {
        path: 'enterAccount',
        name: 'enterAccount',
        parent: 'financeParent',
        component: () => import('@/pages/financing/bill/index.vue'),
        meta: {
          title: '入账列表'
        }
      },
      {
        path: 'arrearage',
        name: 'arrearage',
        parent: 'financeParent',
        component: () => import('@/pages/financing/arrearage/index.vue'),
        meta: {
          title: '欠费老人'
        }
      },
      {
        path: 'prestore',
        name: 'prestoreParent',
        component: () => import('@/pages/financing/bill/index.vue'),
        meta: { title: '预存管理', icon: GrzxIcon }
      },
      {
        path: 'topUp',
        name: 'topUp',
        parent: 'prestoreParent',
        component: () => import('@/pages/financing/prestore/index.vue'),
        meta: {
          title: '预缴款充值'
        }
      },
      {
        path: 'balance',
        name: 'balance',
        parent: 'prestoreParent',
        component: () => import('@/pages/financing/balance/index.vue'),
        meta: {
          title: '余额查询'
        }
      },
      {
        path: 'billDetails',
        name: 'details',
        parent: 'prestoreParent',
        component: () => import('@/pages/financing/bill/details.vue'),
        meta: {
          title: '账单详情',
          hidden: true,
          fmeta: { path: '/finance/enterAccount', title: '账单列表' }
        }
      }
    ]
  },
  {
    path: '/client',
    name: 'client',
    component: Layout,
    redirect: '/client/list',
    meta: {
      title: '客户管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/pages/client/index.vue'),
        meta: {
          title: '客户信息'
        }
      }
    ]
  },
  // {
  //   path: '/user',
  //   name: 'user',
  //   redirect: '/user/index',
  //   meta: { title: '用户管理', icon: GrzxIcon, single: true },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'consumerIndex',
  //       component: () => import('@/pages/user/personal/index.vue'),
  //       meta: { title: '个人中心', icon: GrzxIcon }
  //     }
  //   ]
  // },
  {
    path: '/permission',
    name: 'permission',
    component: Layout,
    redirect: '/permission/user',
    meta: { title: '权限管理', icon: GrzxIcon, single: true },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/pages/permission/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/pages/permission/role/index.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/pages/permission/menu/index.vue'),
        meta: {
          title: '资源管理'
        }
      },
      {
        path: 'dept',
        name: 'dept',
        component: () => import('@/pages/permission/dept/index.vue'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/pages/permission/post/index.vue'),
        meta: {
          title: '职位管理'
        }
      }
    ]
  },
  {
    path: '/active',
    name: 'active',
    component: Layout,
    redirect: '/active/backlogAfter',
    meta: {
      title: '协同工作',
      single: true
    },
    children: [
      {
        path: 'backlog',
        name: 'backlogParent',
        component: () => import('@/pages/synergy/backlog/index.vue'),
        meta: {
          title: '协同工作'
        }
      },
      {
        path: 'backlogAfter',
        name: 'backlogAfter',
        parent: 'backlogParent',
        component: () => import('@/pages/synergy/backlog/index.vue'),
        meta: {
          title: '我的待办'
        }
      },
      {
        path: 'apply',
        name: 'applyParent',
        parent: 'backlogParent',
        component: () => import('@/pages/synergy/apply/index.vue'),
        meta: {
          title: '我的申请'
        }
      },
      {
        path: 'checkDetails',
        name: 'checkDetails',
        parent: 'backlogParent',
        component: () => import('@/pages/enterQuit/enter/details.vue'),
        meta: {
          title: '入住申请',
          hidden: true,
          fmeta: { path: '/active/backlog', title: '协同工作' }
        }
      },
      {
        path: 'applyDetails',
        name: 'applyDetails',
        parent: 'applyParent',
        component: () => import('@/pages/synergy/apply/details.vue'),
        meta: {
          title: '退住申请',
          hidden: true,
          fmeta: { path: '/active/backlog', title: '协同工作' }
        }
      },
      {
        path: 'selectHouse',
        name: 'selectHouse',
        // parent的值最后会添加到对应菜单下的子菜单
        parent: 'backlogParent',
        component: () => import('@/pages/liveIn/bed/houseType/index.vue'),
        meta: {
          title: '床位房型',
          hidden: true,
          fmeta: { path: '/active/backlog', title: '协同工作' }
        }
      }
    ]
  },
  {
    path: '/intelligence',
    name: 'intelligence',
    component: Layout,
    redirect: '/intelligence/equipment',
    meta: { title: '智能监测', single: true },
    children: [
      {
        path: 'equi',
        name: 'equipmentParent',
        component: () => import('@/pages/intelligence/equipment/index.vue'),
        meta: { title: '设备管理', icon: GrzxIcon }
      },
      {
        path: 'equipment',
        name: 'equipment',
        parent: 'equipmentParent',
        component: () => import('@/pages/intelligence/equipment/index.vue'),
        meta: {
          title: '设备管理'
        }
      },
      {
        path: 'equiDetails',
        name: 'equiDetails',
        parent: 'equipmentParent',
        component: () => import('@/pages/intelligence/equipment/details.vue'),
        meta: {
          title: '设备详情',
          hidden: true,
          fmeta: { path: '/intelligence/equipment', title: '设备管理' }
        }
      },
      {
        path: 'warn',
        name: 'warnParent',
        component: () => import('@/pages/intelligence/facility/index.vue'),
        meta: { title: '报警管理', icon: GrzxIcon }
      },
      {
        path: 'facility',
        name: 'facility',
        parent: 'warnParent',
        component: () => import('@/pages/intelligence/facility/index.vue'),
        meta: {
          title: '报警数据'
        }
      },
      {
        path: 'rule',
        name: 'rule',
        parent: 'warnParent',
        component: () => import('@/pages/intelligence/warn/index.vue'),
        meta: {
          title: '报警规则'
        }
      },
      {
        path: 'ruleDetails',
        name: 'ruleDetails',
        parent: 'warnParent',
        component: () => import('@/pages/intelligence/warn/details.vue'),
        meta: {
          title: '报警规则详情',
          hidden: true
          // fmeta: { path: '/intelligence/equipment', title: '报警管理' }
        }
      }
    ]
  },
  {
    path: '/userCenter',
    component: Layout,
    name: 'consumerIndex',
    redirect: '/userCenter/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/pages/user/personal/index.vue'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  }
]

export default normalRouter
