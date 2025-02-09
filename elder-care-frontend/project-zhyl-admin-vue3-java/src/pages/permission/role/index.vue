<!-- 权限管理 - 角色管理 -->
<template>
  <div class="roleAdmin min-h fx">
    <!-- 角色列表模块 - start -->
    <RoleList ref="childRole" @clickRow="getRowId" />
    <!-- 角色列表模块 - end -->
    <!-- 角色对应的权限模块 - start -->
    <div class="permissionCont pd-box">
      <div class="head fx fx-sb">
        <t-space direction="vertical">
          <t-radio-group
            v-model="activeInd"
            variant="default-filled"
            default-value="1"
            @change="handleChange"
          >
            <t-radio-button value="1">菜单权限</t-radio-button>
            <t-radio-button value="2">数据权限</t-radio-button>
          </t-radio-group>
        </t-space>
        <div class="btnContent">
          <button
            v-show="type === 'edit'"
            theme="primary"
            type="submit"
            class="bt-grey wt-60"
            @click="handleClose"
          >
            <span>取消</span>
          </button>
          <div class="bt" @click="subPermissionData">
            {{ !type ? '编辑' : '保存' }}
          </div>
        </div>
      </div>
      <!-- 菜单权限 - start -->
      <div v-show="activeInd === '1'">
        <MenuList
          :data="MenulistData"
          :defaultData="menuPmParams.checkedResourceNos"
          :type="type"
          @changeHandle="menuChangeHandle"
        ></MenuList>
      </div>
      <!-- 菜单权限 - end -->
      <!-- 数据权限 - start -->
      <div v-show="activeInd === '2'">
        <div class="dataPmCont fx">
          <div class="title">数据范围：</div>
          <t-radio-group
            v-model="dataPmParams.dataScope"
            default-value="1"
            :disabled="!type"
            @change="dataPmChange"
          >
            <t-radio value="4">全部</t-radio>
            <t-radio value="3">本级及子级</t-radio>
            <t-radio value="2">本级</t-radio>
            <t-radio value="1">个人</t-radio>
            <t-radio value="0">自定义</t-radio>
          </t-radio-group>
        </div>
        <div v-show="dataPmParams.dataScope === '0'" class="dataPmTree fx">
          <div class="label">组织：</div>
          <t-tree
            v-model="dataPmParams.checkedDeptNos"
            :data="MenuTreeData"
            expand-all
            checkable
            :disabled="!type"
          />
        </div>
      </div> 
      <!-- 数据权限 - end -->
    </div>
    <!-- 角色对应的权限模块 - end -->
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getMenuList, getDeptTree, editRolesAll } from '@/api/permission'
import RoleList from './components/RoleList.vue' // 菜单列表组件
import MenuList from './components/MenuList.vue' // 菜单列表组件
// 生命周期
onMounted(() => {
  getMenuListData()
  getTreeData()
})

const childRole = ref(null)
const type = ref('')
const MenuTreeData = ref([]) // 将菜单部门分离报错
const activeInd = ref('1')
const dataLoading = ref(false)
// 获取菜单列表数据
const MenulistData = ref([])
const beforeTranslateMenulistData = ref([] as any)
const getMenuListData = async () => {
  dataLoading.value = true
  getMenuList()
    .then((res) => {
      dataLoading.value = false
      if (res.code === 200) {
        MenulistData.value = treeData(res.data)
        beforeTranslateMenulistData.value = res.data
        console.log(MenulistData.value, 'MenulistData.value')
      } else {
        MessagePlugin.error(res.msg)
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}

const handleChange = (val) => {

  console.log(type.value, val, '---')
  // 如果处于编辑状态切换tab则重置数据
  if (type.value === 'edit') {
    menuPmParams.checkedResourceNos = currentData.value.checkedResourceNos || []
    dataPmParams.dataScope = currentData.value.dataScope
    dataPmParams.checkedDeptNos = currentData.value.checkedDeptNos || []
  }
  type.value = ''
}
const currentData = ref()
const getRowId = (params) => {
  // console.log(params, 'params')
  type.value = ''
  menuPmParams.id = params.id
  menuPmParams.checkedResourceNos = params.checkedResourceNos || []
  currentData.value = params

  dataPmParams.id = params.id
  dataPmParams.dataScope = params.dataScope
  dataPmParams.checkedDeptNos = params.checkedDeptNos || []
}

// 列表数据处理为树
const treeData = (items) => {
  const result = [] // 结果集
  const itemMap = {}

  // 先转成map存储
  for (const item of items) {
    itemMap[item.resourceNo] = { ...item, children: [] }
  }
  for (const item of items) {
    const { resourceNo, parentResourceNo } = item
    const treeItem = itemMap[resourceNo]

    if (
      parentResourceNo === 100000000000000 ||
      parentResourceNo === '100000000000000'
    ) {
      result.push(treeItem)
    } else {
      if (!itemMap[parentResourceNo]) {
        itemMap[parentResourceNo] = { children: [] }
      }
      if (
        // 筛选掉被禁用的数据
        item.dataState === '0'
      ) {
        itemMap[parentResourceNo].children.push({
          ...treeItem,
          btnList: treeItem.children
            .filter((n) => n.resourceType === 'r')
            .map((item) => item.resourceNo)
        })
      }
      // 100001019002000该数据有问题
      // if (item.resourceNo === '100001019002000') {
      // }
    }
  }
  return result[0].children
}

// 获取部门树列表数据
const getTreeData = async () => {
  const res: any = await getDeptTree()
  if (res && res.code === 200) {
    MenuTreeData.value = treeProps(res.data.items)
  }
}

// 树的数据转化
const treeProps = (value: any[]) => {
  let data = []
  data = value
    ? value.map((el) => ({
        value: el.id,
        label: el.label,
        children: treeProps(el.children)
      }))
    : []
  return data
}

// 保存菜单权限 - 参数
const menuPmParams = reactive({
  id: NaN,
  checkedResourceNos: []
})
// 保存菜单权限 - 获取数据
const menuChangeHandle = (val, noSelect) => {
  console.log(menuPmParams.checkedResourceNos, '-------')
  menuPmParams.checkedResourceNos = [...val, ...menuPmParams.checkedResourceNos]
  if (noSelect?.length) {
    menuPmParams.checkedResourceNos = menuPmParams.checkedResourceNos.filter(
      (item) => noSelect.findIndex((item1) => item1 === item) === -1
    )
  }
  menuPmParams.checkedResourceNos = [
    ...new Set(menuPmParams.checkedResourceNos)
  ]
}

// 保存数据权限 - 参数
const dataPmParams = reactive({
  id: NaN,
  dataScope: '',
  checkedDeptNos: []
})
// 数据权限数据处理 - 数据交互
const dataPmChange = (val) => {
  dataPmParams.dataScope = val
}

// 取消编辑状态
const handleClose = () => {
  type.value = ''
  menuPmParams.checkedResourceNos = currentData.value.checkedResourceNos
  dataPmParams.dataScope = currentData.value.dataScope
  dataPmParams.checkedDeptNos = currentData.value.checkedDeptNos || []
}

// 权限数据的保存 - 点击保存按钮
const subPermissionData = async () => {
  // console.log(dataPmParams, menuPmParams)
  // return
  if (!type.value) {
    type.value = 'edit'
    return
  }
  // 数据权限和菜单权限数据处理 - 提交
  if (activeInd.value === '1') {
    editRolesAll(menuPmParams)
      .then((res) => {
        if (res.code === 200) {
          MessagePlugin.success(res.msg)
          type.value = ''
          childRole.value.fetchData()
        }
        // console.log(res)
      })
      .catch(() => {
        MessagePlugin.error('数据提交出错，请联系管理员')
      })
  } else {
    editRolesAll(dataPmParams)
      .then((res) => {
        if (res.code === 200) {
          MessagePlugin.success(res.msg)
          type.value = ''
          childRole.value.fetchData()
        }
        // console.log(res)
      })
      .catch(() => {
        MessagePlugin.error('数据提交出错，请联系管理员')
      })
  }

  // 等两个都返回的时候的时候进行处理
  // Promise.all([subData, subMenu])
  //   .then((res) => {
  //     const data = res.every((el) => el.code === 200)
  //     let msg = ''
  //     if (data) {
  //       res.forEach((el) => {
  //         if (el.code === 200) {
  //           msg = el.msg
  //         }
  //       })
  //       MessagePlugin.success(msg)
  //     } else {
  //       res.forEach((el) => {
  //         if (el.code !== 200) {
  //           msg = el.msg
  //         }
  //       })
  //       MessagePlugin.error(msg)
  //     }
  //   })
  //   .catch(() => {
  //     MessagePlugin.error('数据提交出错，请联系管理员')
  //   })
}
</script>

<style lang="less" scoped>
.roleAdmin {
  .permissionCont {
    background-color: #fff;
    .btnContent {
      display: flex;
      .bt-grey {
        margin-right: 20px;
      }
    }
    flex: 2;
    .head {
      padding-bottom: 20px;
      border-bottom: solid 1px var(--color-border);
    }
    .bt {
      width: 60px;
    }
    .dataPmCont {
      margin-top: 30px;
      .title {
        position: relative;
        top: 1px;
        padding-right: 10px;
      }
    }
    .dataPmTree {
      position: relative;
      padding: 40px 0 0 84px;
      .label {
        position: relative;
        line-height: 35px;
      }
    }
  }

  :deep(.t-pagination) {
    justify-content: center;
  }
}
</style>
