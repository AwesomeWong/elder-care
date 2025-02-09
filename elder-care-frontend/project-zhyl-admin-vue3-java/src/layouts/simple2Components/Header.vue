<!-- 框架头部 -->
<template>
  <div :class="layoutCls">
    <t-head-menu :value="active" :class="menuCls" :theme="theme">
      <template #logo>
        <span
          v-if="showLogo"
          class="header-logo-container"
          @click="handleNav('/dashboard/base')"
        >
          <logo-full v-if="settingStore.mode === 'light'" class="t-logo" />
          <img v-else src="@/assets/logBlackTemFull.png" alt="" />
        </span>
        <div v-else class="header-operate-left">
          <t-button
            theme="default"
            shape="square"
            variant="text"
            @click="changeCollapsed"
          >
            <t-icon class="collapsed-icon" name="view-list" />
          </t-button>
        </div>
      </template>
      <template v-if="layout !== 'side'" #default>
        <topMenuContent class="header-menu" :nav-data="menu" :left="false" />
      </template>
      <template #operations>
        <div
          v-if="settingStore.layout === 'top'"
          class="topOperationsContainer"
        >
          <t-dropdown :min-column-width="135" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <!-- <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleNav('/user')"
                >
                  <t-icon name="user-circle"></t-icon>个人中心
                </t-dropdown-item> -->
                <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleOpen"
                >
                  <t-icon name="edit"></t-icon>修改密码
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <div class="baseInfo">
              <img
                :src="
                  userStore.userAvatar.avatar !== undefined
                    ? userStore.userAvatar.avatar
                    : avatar
                "
                class="headImg"
              />
              <div class="userName">{{ userStore.userAvatar.realName }}</div>
              <div><t-icon name="chevron-down" /></div>
            </div>
          </t-dropdown>
        </div>
        <div v-else class="operations-container">
          <!-- 搜索框 -->
          <!-- <search v-if="layout !== 'side'" :layout="layout" /> -->

          <!-- 全局通知 -->
          <!-- <notice /> -->
          <t-dropdown :min-column-width="135" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <!-- <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleNav('/user/index')"
                >
                  <t-icon name="user-circle"></t-icon>个人中心
                </t-dropdown-item> -->
                <!-- <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleLogout"
                >
                  <t-icon name="poweroff"></t-icon>退出登录
                </t-dropdown-item> -->
              </t-dropdown-menu>
            </template>
            <t-button class="header-user-btn" theme="default" variant="text">
              <template #icon>
                <t-icon class="header-user-avatar" name="user-circle" />
              </template>
              <div class="header-user-account">Tencent</div>
              <template #suffix><t-icon name="chevron-down" /></template>
            </t-button>
          </t-dropdown>
          <t-tooltip placement="bottom" content="系统设置">
            <t-button
              theme="default"
              shape="square"
              variant="text"
              @click="toggleSettingPanel"
            >
              <t-icon name="setting" />
            </t-button>
          </t-tooltip>
        </div>
      </template>
    </t-head-menu>
  </div>
  <PaddWord
    ref="pwd"
    :visible="visible"
    @handleClose="handleClose"
    @handleOpen="handleOpenOperate"
  ></PaddWord>
  <!-- 修改密码确认框 -->
  <OperateDialog
    :visible="visibleOperate"
    :title="operateTitle"
    :text="operateText"
    @handle-delete="handleOperate"
    @handle-close="handleOperateClose"
  ></OperateDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import { useSettingStore, useUserStore } from '@/store'
import { getActive } from '@/router'
import { prefix } from '@/config/global'
import LogoFull from '@/assets/test-img/assets-logo-full.svg?component'
import type { MenuRoute } from '@/types/interface'
import topMenuContent from './topMenuContent.vue'
import PaddWord from '../components/PaddWord.vue'
import OperateDialog from '@/components/OperateDialog/index.vue'
import { updatePwd } from '@/api/user'

const props = defineProps({
  theme: {
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: 'top'
  },
  showLogo: {
    type: Boolean,
    default: true
  },
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => []
  },
  isFixed: {
    type: Boolean,
    default: false
  },
  isCompact: {
    type: Boolean,
    default: false
  },
  maxLevel: {
    type: Number,
    default: 3
  }
})

const router = useRouter()
const settingStore = useSettingStore()
const userStore = useUserStore()
const visible = ref(false)
const visibleOperate = ref(false)
const operateTitle = ref('') // 操作弹层标题
const operateText = ref('') // 要操作的内容提示
const pwd = ref(null)
const avatar = ref(
  'https://yjy-oss-videos.oss-accelerate.aliyuncs.com/grzxhz.jpg'
)
// 打开设置
const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true
  })
}
// 点击
const active = computed(() => {
  const data = getActive()
  console.log(data, '头部导航')
  return `/${data.split('/')[1]}`
})

const layoutCls = computed(() =>
  settingStore.mode === 'black'
    ? [`${prefix}-header-layout modeStyle`]
    : [`${prefix}-header-layout`]
)

const menuCls = computed(() => {
  const { isFixed, layout, isCompact } = props
  return [
    {
      [`${prefix}-header-menu`]: !isFixed,
      [`${prefix}-header-menu-fixed`]: isFixed,
      [`${prefix}-header-menu-fixed-side`]: layout === 'side' && isFixed,
      [`${prefix}-header-menu-fixed-side-compact`]:
        layout === 'side' && isFixed && isCompact
    }
  ]
})

// 改变侧边栏
const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !settingStore.isSidebarCompact
  })
}
// 点击跳转
const handleNav = (url) => {
  router.push(url)
}
// 点击回到登录页
const handleOpen = () => {
  visible.value = true
}
// 是否确认修改密码弹层
const handleOpenOperate = () => {
  visibleOperate.value = true
  operateTitle.value = '确认修改'
  operateText.value = '密码修改成功后，需重新登录，是否继续？'
}
// 关闭修改密码弹层
const handleClose = () => {
  visible.value = false
}
// 确认修改
const handleOperate = async () => {
  const val = pwd.value.formData
  const parent = {
    pw: val.newPassword,
    oldPw: val.oldPassword
  }
  const res: any = await updatePwd(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleOperateClose()
    handleClose()
    pwd.value.handleClear()
    router.push({
      path: '/login',
      query: {
        redirect: encodeURIComponent(router.currentRoute.value.fullPath)
      }
    })
  }
}
//
const handleOperateClose = () => {
  visibleOperate.value = false
}
</script>
<style lang="less" scoped>
.setShow {
  cursor: pointer;
  color: #000;
  padding: 3px 6px;
  z-index: 1002;
  line-height: 16px;
  .t-icon {
    width: 16px;
    height: 16px;
  }
}
.modeStyle .setShow {
  color: var(--color-white);
  &:hover {
    color: #000;
  }
}
.@{starter-prefix}-header {
  &-menu-fixed {
    position: fixed;
    top: 0;
    z-index: 1001;

    &-side {
      left: 232px;
      right: 0;
      z-index: 10;
      width: auto;
      transition: all 0.3s;
      &-compact {
        left: 64px;
      }
    }
  }

  &-logo-container {
    cursor: pointer;
    display: inline-flex;
  }
}
.header-menu {
  flex: 1 1 1;
  display: flex;
  :deep(li.t-menu__item:first-child) {
    margin-top: 0px !important;
  }

  :deep(.t-menu__item) {
    min-width: unset;
    padding: 0px 12px 0 8px;
    // TOTO 框架修改
    height: 56px;
    // height: 30px;
    margin-bottom: 0px !important;
    margin-right: 8px;
    // color: var(--color-black);
    // TOTO 框架修改
    // border-radius: 0px;
    border-radius: 0px;
    .t-icon {
      display: none;
      height: 24px;
      width: 24px;
    }
  }
  :deep(
      .t-menu__item:hover:not(.t-is-active):not(.t-is-opened):not(
          .t-is-disabled
        ):not(.t-submenu__item)
    ) {
    color: var(--color-white) !important;
    // color: var(--color-main) !important;
    background-color: transparent !important;
  }
  :deep(.t-menu__item.t-is-active) {
    color: var(--color-main);
    background-color: #dff5f3;
    .t-menu__content {
      color: var(--color-link) !important;
    }
    .t-icon {
      display: block;
    }
  }
}
:deep(.t-menu__item-spacer) {
  color: var(--color-white);
}
.operations-container {
  display: flex;
  align-items: center;
  margin-right: 12px;

  .t-popup__reference {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-button {
    margin: 0 8px;
    &.header-user-btn {
      margin: 0;
    }
  }

  .t-icon {
    font-size: 20px;
    &.general {
      margin-right: 16px;
    }
  }
}

.header-operate-left {
  display: flex;
  margin-left: 20px;
  align-items: normal;
  line-height: 0;

  .collapsed-icon {
    font-size: 20px;
  }
}

.header-logo-container {
  width: 128px;
  height: 31px;
  display: flex;
  margin-left: 24px;
  color: var(--td-text-color-primary);

  .t-logo {
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.header-user-account {
  display: inline-flex;
  align-items: center;
  color: var(--td-text-color-primary);
  .t-icon {
    margin-left: 4px;
    font-size: 16px;
  }
}

:deep(.t-head-menu__inner) {
  border-bottom: 1px solid var(--td-border-level-1-color);
  .t-submenu {
    margin-bottom: 0px;
  }
}

:deep(.modeStyle .t-head-menu__inner) {
  background-color: #000;
}

.t-menu--light {
  .header-user-account {
    color: var(--td-text-color-primary);
  }
}
.t-menu--dark {
  .t-head-menu__inner {
    border-bottom: 1px solid var(--td-gray-color-10);
  }
  .header-user-account {
    color: rgba(255, 255, 255, 0.55);
  }
  .t-button {
    --ripple-color: var(--td-gray-color-10) !important;
    &:hover {
      background: var(--td-gray-color-12) !important;
    }
  }
}

.operations-dropdown-container-item {
  width: 100%;
  display: flex;
  align-items: center;

  .t-icon {
    margin-right: 8px;
  }

  :deep(.t-dropdown__item) {
    .t-dropdown__item__content {
      display: flex;
      justify-content: center;
    }
    .t-dropdown__item__content__text {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }

  :deep(.t-dropdown__item) {
    width: 100%;
    margin-bottom: 0px;
  }
  &:last-child {
    :deep(.t-dropdown__item) {
      margin-bottom: 8px;
    }
  }
}
</style>
