<!-- 权限管理 - 菜单管理 -->
<template>
  <div class="menuAdmin min-h bg-wt">
    <!-- end -->
    <!-- 表格 -->
    <div class="bg-wt">
      <div class="fx dataBox baseList">
        <MenuList
          :key="activeIndex"
          :data="listData"
          :activeIndex="activeIndex"
          @fetchData="fetchData"
          @delHandle="handleClickDelete"
          @addHandle="handleBulid"
          @editHandle="handleSetupContract"
          @disableHandle="handleDisable"
          @activeHandle="activeHandle"
        ></MenuList>
        <BtnList
          ref="btnList"
          :resoureNo="resourceNoLeft"
          @handleSetupContract="handleSetupContractBtn"
          @handleBulid="handleBulidBtn"
          @handleClickDelete="handleClickDelete"
          @handleClickDisable="handleDisable"
        ></BtnList>
      </div>
    </div>

    <!-- 菜单新增，编辑弹窗 -->
    <dialog-form
      :visible="visible"
      :title="title"
      :data="DialogFormdata"
      :form-data="formData"
      @handleClose="handleClose"
      @fetchData="fetchData"
    />
    <!-- end -->
    <!-- end -->
    <!-- 按钮新增，编辑弹窗 -->
    <DialogFormBtn
      :visible="visibleBtn"
      :title="title"
      :data="DialogFormBtndata"
      :form-data="formBtnData"
      :resourceNo="resourceNoLeft"
      @handleClose="handleClose"
      @fetchData="activeHandle"
    />
    <!-- end -->
    <!-- 生产环境禁用操作弹窗 -->
    <ProdDisabled
      :confirm-visible="prodDisabledVisible"
      @handleClose="handleClose"
    ></ProdDisabled>
    <!-- end -->
    <!-- 删除弹层 -->
    <Delete
      :visible="dialogDeleteVisible"
      :delete-text="deleteText"
      @handle-delete="handleDelete"
      @handle-close="handleClose"
    ></Delete>
    <!-- end -->
    <!-- 禁用启用弹层 -->
    <Disable
      :visible="dialogDisableVisible"
      :dataState="currrentData.dataState"
      @handle-click="handleClickDisable"
      @handle-close="handleClose"
    ></Disable>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getMenuList, delMenu, enableMenu } from '@/api/permission'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import DialogFormBtn from './components/DialogFormBtn.vue' // 新增,编辑弹窗.
import ProdDisabled from '@/components/Message/ProdDisabled.vue' // 删除弹窗
import Delete from '@/components/OperateDialog/index.vue' // 删除弹层
import Disable from '@/components/OperateDialog/disable.vue' // 禁用启用弹窗
import MenuList from './components/MenuList.vue' // 左侧菜单列表
import BtnList from './components/BtnList.vue' // 左侧菜单列表

const visibleBtn = ref(false) // 按钮新增、编辑弹窗
const visible = ref(false) // 新增，编辑弹窗
const listData = ref({} as any) // 列表数据
const dataLoading = ref(false)
const DialogFormdata = ref({}) // 弹窗表单内容
const DialogFormBtndata = ref({}) // 按钮弹窗表单内容
const title = ref('添加菜单') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogDisableVisible = ref(false) // 控制禁用/启用弹层显示隐藏
const deleteText = ref('菜单') // 删除的内容
const prodDisabledVisible = ref(false) // 生产环境禁用操作弹窗
const route = useRoute()
const url = ref('')
const currrentData = ref({} as any)
const btnList = ref(null)
const isClickBtnDisable = ref()

// 搜索框表单
const searchForm = {
  resourceName: '',
  dataState: undefined
}

// 监听路由变化
watch(
  () => route.path,
  (newValue) => {
    url.value = newValue
  }
)
const formData = ref({ ...searchForm }) // 表单内容
const formBtnData = ref({})
// 生命周期
onMounted(() => {
  fetchData()
})

const resourceNoLeft = ref()
// 处理左侧点击获取右侧菜单数据
const activeHandle = (val) => {
  console.log('///')
  resourceNoLeft.value = val
  btnList.value.fetchData(val)
}

// const fetchBtnData = ()=>{

// }
const activeIndex = ref('')
// 获取列表数据
const fetchData = async (val?: valType | string) => {
  let tag = false
  let params = {}
  if (typeof val === 'string') {
    tag = true
  } else {
    params = {
      // parentDeptNo: val?.parentDeptNo || '0',
      // resourceType: 'm',
      ...val
    }
  }

  dataLoading.value = true

  getMenuList(params as any)
    .then(async (res) => {
      if (res.code === 200) {
        listData.value = await treeData(res.data)
        console.log(res.data, listData.value, 'listData.value')
        btnList.value.fetchData(
          listData.value.length && listData.value[0].children[0].resourceNo
        )
        resourceNoLeft.value =
          listData.value.length && listData.value[0].children[0].resourceNo
        // 修改成功后重新后去 路由
        if (tag) {
          // await getRuterInfo().then(async (res) => {
          //   await userStore.setRoute(res.data)
          // })
        }
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
  // getMenuTreeList()
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
      // console.log(item, '--------------')
      // 筛选资源类型只包括目录和菜单的数据
      if (['m', 'c', 'M'].includes(item.resourceType)) {
        // console.log(item, '进来了么')
        itemMap[parentResourceNo].children.push(treeItem)
      }
    }
  }
  console.log(result, itemMap, 'resultresultresultresult')
  return result
}

// 点击删除
const delId = ref(NaN)
const handleClickDelete = (params, type) => {
  if (params.dataState === '0') {
    MessagePlugin.error('启用状态下不可删除')
  } else {
    delId.value = params.resourceNo
    dialogDeleteVisible.value = true
    if (type === 'btn') {
      deleteText.value = '按钮'
      isClickBtnDisable.value = true
    }
  }
}

// 确认删除
const handleDelete = () => {
  dialogDeleteVisible.value = false
  delMenuData()
}
// 删除菜单
const delMenuData = async () => {
  dataLoading.value = true
  delMenu(delId.value)
    .then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('删除成功')
        dataLoading.value = false
        if (isClickBtnDisable.value) {
          btnList.value.fetchData(resourceNoLeft.value)
          isClickBtnDisable.value = false
        } else {
          fetchData()
        }
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}
// 关闭弹窗
const handleClose = () => {
  title.value = ''
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
  prodDisabledVisible.value = false
  dialogDisableVisible.value = false
  visibleBtn.value = false
}
// 点击新建
const handleBulid = (val?: any) => {
  title.value = '新增菜单'
  visible.value = true
  if (val) {
    DialogFormdata.value = JSON.parse(JSON.stringify(val))
  } else {
    DialogFormdata.value = []
  }
}
const handleBulidBtn = () => {
  title.value = '新增按钮'
  visibleBtn.value = true
  DialogFormBtndata.value = {}
}

// 按钮编辑
const handleSetupContractBtn = (val) => {
  DialogFormBtndata.value = JSON.parse(JSON.stringify(val))
  visibleBtn.value = true
  title.value = '编辑按钮'
}
// 点击编辑
const handleSetupContract = (val) => {
  // 深拷贝
  DialogFormdata.value = JSON.parse(JSON.stringify(val))
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '编辑菜单'
}
// 点击禁用/启用
const handleDisable = (val, type) => {
  console.log(val, 'val')
  currrentData.value = val
  dialogDisableVisible.value = true
  if (type) isClickBtnDisable.value = true
}
// 确认禁用/启用
const handleClickDisable = () => {
  dialogDisableVisible.value = false
  disableDeptData()
}
// 禁用/启用部门
const disableDeptData = async () => {
  enableMenu({
    // ...currrentData.value,
    resourceNo: currrentData.value.resourceNo,
    parentResourceNo: currrentData.value.parentResourceNo,
    dataState: currrentData.value.dataState === '0' ? '1' : '0'
  })
    .then(async (res) => {
      console.log(res, 'err')
      if (res.code === 200) {
        MessagePlugin.success(
          `${currrentData.value.dataState === '0' ? '禁用' : '启用'}成功`
        )
        if (isClickBtnDisable.value) {
          await btnList.value.fetchData(resourceNoLeft.value)
          isClickBtnDisable.value = false
        } else {
          await fetchData()
        }
      }
    })
    .catch((err) => {
      console.log(err, 'err')
      MessagePlugin.error(err.msg || `请求出错了！ 操作失败`)
    })
}
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less" scoped src="../index.less"></style>
<style lang="less" scoped>
.dataBox {
  padding-top: 0px;
}
</style>
