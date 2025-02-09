<!-- 简版布局 -->
<template>
  <div class="menuBox">
    <template v-for="item in list" :key="item.path">
      <!--  只有当路由不是第一级，且有子路由数量大于1，且不是最后一级 -->
      <template
        v-if="
          left
            ? !item.children.length
            : !(
                item.children.length > 0 &&
                item.children[0].children &&
                !item.redirect
              )
        "
      >
        <!-- 如果是外链 -->
        <t-menu-item
          v-if="getHref(item)"
          :name="item.path"
          :value="getPath(item)"
          @click="openHref(getHref(item)[0])"
        >
          <template #icon>
            <t-icon v-if="beIcon(item)" :name="item.icon" />
            <component
              :is="beRender(item).render"
              v-else-if="beRender(item).can"
              class="t-icon"
            />
          </template>
          {{ item.title }}
        </t-menu-item>
        <!-- 非外链 -->
        <t-menu-item
          v-else
          :name="item.path"
          :value="left ? getPathLeft(item) : getPath(item)"
          :to="item.path"
        >
          <!-- {{ item.path }} -->
          <!--{{ getPath(item) }}-->
          <!-- {{ getPathLeft(item) }} -->
          {{ item.title }}
          <!-- {{ getPathLeft(item) }} -->
        </t-menu-item>
      </template>
      <t-submenu
        v-else
        :name="item.path"
        :value="getPathLeft(item)"
        :title="`${item.title}`"
      >
        <top-menu-content
          v-if="item.children"
          class="sideNav"
          :nav-data="item.children"
          :left="true"
        />
      </t-submenu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue'
import type { PropType } from 'vue'
import isObject from 'lodash/isObject'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import type { MenuRoute } from '@/types/interface'
import { getActive } from '@/router'
import { useUserStore, usePermissionStore } from '@/store'

const props = defineProps({
  navData: {
    type: Array as PropType<MenuRoute[]>,
    default: () => []
  },
  // 用于防止子菜单点击出现左侧路由菜单闪烁问题
  isChildRoutes: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  }
})
const subActive = ref('')
const route = useRoute()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const { routers } = storeToRefs(permissionStore) // 静态路由
// 监听路由变化
watch(
  () => route.path,
  (newValue) => {
    subActive.value = newValue
    getRoutButton(newValue)
  }
)
onMounted(() => {
  getRoutButton(route.path)
})
const getRoutButton = (newRoute) => {
  findParent(userStore.trendsRouteButton, newRoute)
}
// 获取当前路由权限配置的按钮，有两种方法，一种是递归，一种是普通遍历
const findParent = (children, newRoute) => {
  children.forEach((ele) => {
    const index = newRoute.lastIndexOf('/')
    const lastSegment = newRoute.substring(index + 1)
    if (ele.children !== undefined) {
      if (lastSegment === ele.path) {
        userStore.setRouteNewButton(ele.children)
      }
      findParent(ele.children, newRoute)
    } else {
      userStore.setRouteNewButton([])
    }
  })
}
// 选择
const active = computed(() => getActive())
// 菜单列表
const list = computed(() => {
  const { navData } = props
  // console.log(getMenuList(navData), 'getMenuList(navData)')
  return getMenuList(navData)
})
// getMenuList是一个递归函数，用于将路由转换为菜单列表
const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return []
  }
  // 如果meta中有orderNo则按照从小到大排序
  list.sort((a, b) => {
    return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
  })
  return list
    .map((item) => {
      const path =
        basePath && !item.path.includes(basePath)
          ? `${basePath}/${item.path}`
          : item.path
      return {
        path: item.path,
        title: item.meta?.title,
        icon: item.meta?.icon || '',
        children: getMenuList(item.children, path),
        meta: item.meta,
        redirect: item.redirect,
        parent: item.parent
      }
    })
    .filter((item) => item.meta && item.meta.hidden !== true)
}

// getHref是一个函数，用于判断是否是外链
const getHref = (item: MenuRoute) => {
  const { frameSrc, frameBlank } = item.meta
  if (frameSrc && frameBlank) {
    return frameSrc.match(/(http|https):\/\/([\w.]+\/?)\S*/)
  }
  return null
}

// 左侧二级和三级菜单高亮显示逻辑
const getPathLeft = (item) => {
  if (
    active.value.includes(item.path) ||
    // 确保二级菜单也可以高亮
    (
      item.children.length &&
      item.children.filter(
        (item) => item.parent && active.value.includes(item.path)
      )
    ).length
  ) {
    return active.value
  }
  // 单独处理详情页的时候左侧导航栏的高亮情况
  if (
    active.value === '/enterQuit/enterDetails' &&
    !['quitManage', 'quitParent'].includes(item.path)
  ) {
    return active.value
  }
  if (
    active.value === '/enterQuit/quitDetails' &&
    !['enterManage', 'enterParent'].includes(item.path)
  ) {
    return active.value
  }
  if (
    active.value === '/liveIn/trackDetails' &&
    !['bed', 'houseType', 'houseSet', 'smartBed'].includes(item.path)
  ) {
    return active.value
  }
  if (
    active.value === '/serve/serveDetails' &&
    !['plan', 'grade', 'nurseProject', 'nursePlan', 'oldPeople'].includes(
      item.path
    )
  ) {
    return active.value
  }

  if (
    active.value === '/order/orderDetails' &&
    !['refund'].includes(item.path)
  ) {
    return active.value
  }

  if (
    active.value === '/finance/billDetails' &&
    !['prestore', 'topUp', 'balance', 'arrearage'].includes(item.path)
  ) {
    return active.value
  }

  if (
    ['/active/checkDetails', '/active/applyDetails'].includes(active.value) &&
    route.query.path === 'backlogAfter' &&
    !['apply'].includes(item.path)
  ) {
    return active.value
  }

  if (
    ['/active/checkDetails', '/active/applyDetails'].includes(active.value) &&
    route.query.path === 'apply' &&
    !['backlogAfter'].includes(item.path)
  ) {
    return active.value
  }

  if (
    active.value === '/intelligence/equiDetails' &&
    !['warn', 'facility', 'rule'].includes(item.path)
  ) {
    return active.value
  }
}
// const dealDetail = () => {}
// getPath是一个函数，用于判断当前路由是否为激活状态
const getPath = (item) => {
  // console.log(item, 'fffffffffffffffff')

  // console.log(item.meta?.single ? item.icon : item.path, active.value)
  return item.meta?.single ? item.redirect : item.path // item.meta.fullPath
  // return item.meta?.single ? item.path : item.meta.fullPath
  // return '/appointment/subscribe'
}
// beIcon是一个函数，用于判断是否是内置图标
const beIcon = (item: MenuRoute) => {
  return item.icon && typeof item.icon === 'string'
}

const beRender = (item: MenuRoute) => {
  if (isObject(item.icon) && typeof item.icon.render === 'function') {
    return {
      can: true,
      render: item.icon.render
    }
  }
  return {
    can: false,
    render: null
  }
}
// openHref是一个函数，用于打开外链
const openHref = (url: string) => {
  window.open(url)
}
</script>
<style lang="less" scoped>
.sideNav {
  :deep(.t-submenu) {
    .t-menu__item {
      color: #151515;
    }
  }
  // .t-default-menu .t-menu__item {
  //   padding: 0 18px 0 24px;
  // }
}

:deep(.t-submenu__item) {
  color: #151515;
  .t-icon {
    display: none;
  }
  .t-menu__content {
    margin-left: 3px;
    opacity: 0.56;
  }
  &:hover {
    .t-menu__content {
      opacity: 1;
    }
  }
}
.leftIcon {
  margin-right: 4px;
}
</style>
