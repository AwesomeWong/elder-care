<!-- 权限管理 - 部门管理 -->
<template>
  <div class="deptAdmin min-h bg-wt">
    <!-- 筛选区域 -->
    <searchFormBox
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    ></searchFormBox>
    <!-- end -->
    <!-- 表格 -->
    <tableList
      :list-data="listData"
      :pagination="pagination"
      @handleSetupContract="handleSetupContract"
      @handleBulid="handleBulid"
      @handleClickDelete="handleClickDelete"
      @handleClickDisable="handleClickDisable"
      @fetchData="fetchData"
    ></tableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <dialog-form
      ref="dialogForm"
      :visible="visible"
      :title="title"
      :data="DialogFormdata"
      :form-data="formData"
      @handleClose="handleClose"
      @fetchData="fetchData"
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
    <!-- end -->
    <!-- 禁用启用弹层 -->
    <Disable
      :visible="dialogDisableVisible"
      :dataState="currrentData.dataState"
      @handle-click="handleDisable"
      @handle-close="handleClose"
    ></Disable>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getDeptList, delDept, editDept, isEnableDept } from '@/api/permission'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import ProdDisabled from '@/components/Message/ProdDisabled.vue' // 删除弹窗
import Delete from '@/components/OperateDialog/index.vue' // 删除弹层
import Disable from '@/components/OperateDialog/disable.vue' // 禁用启用弹窗
import tableList from './components/TableList.vue' // 表格
import searchFormBox from './components/SearchForm.vue' // 搜索框表单

const visible = ref(false) // 新增，编辑弹窗
const listData = ref({}) // 列表数据
const dataLoading = ref(false)
const DialogFormdata = ref({}) // 弹窗表单内容
const title = ref('新增部门') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogDisableVisible = ref(false) // 控制禁用/启用弹层显示隐藏
const deleteText = ref('部门') // 删除的内容
const prodDisabledVisible = ref(false) // 生产环境禁用操作弹窗
const route = useRoute()
const url = ref('')
const currrentData = ref({} as any)
const dialogForm = ref(null)

// 分页
const pagination = ref({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})

// 搜索框表单
const searchForm = {
  deptName: '',
  dataStatus: undefined
}

// 监听路由变化
watch(
  () => route.path,
  (newValue) => {
    url.value = newValue
    // fetchData(pagination.value)
  }
)
const formData = ref({ ...searchForm }) // 表单内容
// 生命周期
onMounted(() => {
  fetchData({
    parentDeptNo: '100001000000000',
    deptName: '',
    dataStatus: ''
  })
})
// 搜索功能 - 根据搜索框的内容进行搜索
const handleSearch = (val) => {
  fetchData(val)
}
// 重置，清空搜索框
const handleReset = (val) => {
  // 清空搜索框的全部内容并且重新获取数据
  fetchData(val)
}
// 获取列表数据
const fetchData = async (val?: {
  parentDeptNo: string
  deptName: string
  dataStatus: string
}) => {
  const params = {
    ...val,
    parentDeptNo: '100001000000000'
  }
  dataLoading.value = true
  getDeptList(params)
    .then((res) => {
      if (res.code === 200) {
        listData.value = res.data
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}

// 点击禁用/启用
const handleClickDisable = (row) => {
  currrentData.value = row
  dialogDisableVisible.value = true
}

// 确认禁用/启用
const handleDisable = () => {
  dialogDisableVisible.value = false
  disableDeptData()
}

// 禁用/启用部门
const disableDeptData = async () => {
  console.log(currrentData.value, 'currrentData.value')
  isEnableDept({
    // id: currrentData.value.id,
    deptNo: currrentData.value.deptNo,
    parentDeptNo: currrentData.value.parentDeptNo,
    dataState: currrentData.value.dataState === '0' ? '1' : '0'
  })
    .then((res) => {
      console.log(res, 'err')
      if (res.code === 200) {
        MessagePlugin.success(
          `${currrentData.value.dataState === '0' ? '禁用' : '启用'}成功`
        )
        fetchData()
        dialogForm.value.fetchData()
      }
    })
    .catch((err) => {
      console.log(err, 'err')
      MessagePlugin.error(err.msg || `请求出错了！ 操作失败`)
    })
}

/* const disableDeptData = async () => {
  editDept({
    ...currrentData.value,
    dataState: currrentData.value.dataState === '0' ? '1' : '0'
  })
    .then((res) => {
      console.log(res, 'err')
      if (res.code === 200) {
        MessagePlugin.success(
          `${currrentData.value.dataState === '0' ? '禁用' : '启用'}成功`
        )
        fetchData()
      }
    })
    .catch((err) => {
      console.log(err, 'err')
      MessagePlugin.error(err.msg || `请求出错了！ 操作失败`)
    })
} */

// 点击删除
const delId = ref(NaN)
const handleClickDelete = (row: { deptNo: number; dataState: String }) => {
  if (row.dataState === '0') {
    MessagePlugin.error('启用状态下不可删除')
  } else {
    delId.value = row.deptNo
    dialogDeleteVisible.value = true
  }
}
// 确认删除
const handleDelete = () => {
  dialogDeleteVisible.value = false
  delDeptData()
}
// 删除部门
const delDeptData = async () => {
  dataLoading.value = true
  delDept(delId.value)
    .then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('删除成功')
        dataLoading.value = false
        fetchData()
        dialogForm.value.fetchData()
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
  dialogDisableVisible.value = false // 关闭禁用启用弹层
  prodDisabledVisible.value = false
}
// 点击新建
const handleBulid = () => {
  title.value = '新增部门'
  DialogFormdata.value = { parentDeptNo: '' }
  visible.value = true
}
// 点击编辑活行内修改
const handleSetupContract = (item) => {
  // 深拷贝 - 处理行参数
  if (item.tg === 'add') {
    title.value = '新增部门'
    DialogFormdata.value = { parentDeptNo: item.data.deptNo }
  } else {
    title.value = '编辑部门'
    DialogFormdata.value = JSON.parse(JSON.stringify(item.data))
  }

  // 显示弹窗
  visible.value = true
}
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less" scoped src="../index.less"></style>
