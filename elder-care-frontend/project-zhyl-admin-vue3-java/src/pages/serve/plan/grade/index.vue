<!-- 护理等级列表页 -->
<template>
  <div class="min-h serveGrade bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      @handle-clear="handleClear"
      @handle-search="handleSearch"
      @handle-reset="handleReset"
    ></SearchFormBox>
    <!-- end -->
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @get-current="getCurrent"
      @handle-edit="handleEdit"
      @handle-bulid="handleBulid"
      @handle-click-delete="handleClickDelete"
      @handle-forbidden="handleForbidden"
    ></TableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      :title="title"
      :data="formBaseData"
      :plan-data="nursPlanData"
      @handle-close="handleClose"
      @handle-add="handleAdd"
      @handle-edit-form="handleEditForm"
    >
    </DialogFrom>
    <!-- end -->
    <!-- 删除弹层 -->
    <Delete
      :visible="dialogDeleteVisible"
      :delete-text="operateText"
      @handle-delete="handleDelete"
      @handle-close="handleClose"
    ></Delete>
    <!-- end -->
    <!-- 禁用弹层 -->
    <Forbidden
      :visible="dialogVisible"
      :text="operateText"
      @handle-submit="handleForbiddenSub"
      @handle-close="handleForbiddenClose"
    ></Forbidden>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 接口
import {
  levelAdd,
  levelUpdate,
  getLevelList,
  getLevelDetails,
  getnursAllPlanList,
  levelDelete,
  levelStatus
} from '@/api/serve'
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// 禁用弹窗
import Forbidden from '@/components/Forbidden/index.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 表格列表
import DialogFrom from './components/DialogFrom.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// ------定义变量------
const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const formBaseData = ref({}) // 弹窗表单内容
const title = ref('') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogVisible = ref(false) // 禁用弹窗
const typeId = ref('') // 设置删除id
const typeStatus = ref(null) // 禁用启用
const operateText = ref('护理等级') // 要操作的内容提示
const statusText = ref('') // 启用禁用提示
const total = ref(0) // 总条数
const nursPlanData = ref([]) // 护理计划数据
const formRef = ref(null)
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})
// 生命周期
onMounted(() => {
  getList()
  getPlanList()
})
// ------定义方法------
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getLevelList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 获取护理计划列表
const getPlanList = async () => {
  const res: any = await getnursAllPlanList()
  if (res.code === 200) {
    nursPlanData.value = res.data.filter((val) => val.status === 1)
  }
}
// 获取详情数据
const getDetails = async (id) => {
  const res: any = await getLevelDetails(id) // 获取列表数据
  if (res.code === 200) {
    formBaseData.value = res.data
  }
}
// 添加
const handleAdd = async (val) => {
  const res: any = await levelAdd(val)
  if (res.code === 200) {
    MessagePlugin.success('添加成功')
    getList()
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 编辑
const handleEditForm = async (val) => {
  const res: any = await levelUpdate(val)
  if (res.code === 200) {
    MessagePlugin.success('编辑成功')
    getList()
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 确定禁用
const handleForbiddenSub = async () => {
  const params = {
    id: typeId.value,
    status: typeStatus.value
  }
  const res: any = await levelStatus(params)
  if (res.code === 200) {
    dialogVisible.value = false
    MessagePlugin.success(statusText.value)
    getList()
  }
}
// 搜索功能
const handleSearch = () => {
  pagination.value.pageNum = 1
  getList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  pagination.value = {
    pageSize: 10,
    pageNum: 1
  }
  getList()
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
}
// 新增房型
const handleBulid = () => {
  // // 显示弹窗
  title.value = '新增'
  visible.value = true
}
// 编辑
const handleEdit = (val) => {
  // 获取详情
  getDetails(val.id)
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题
  title.value = '编辑'
}
// 确认删除
const handleDelete = async () => {
  const res: any = await levelDelete(typeId.value)
  if (res.code === 200) {
    dialogDeleteVisible.value = false
    MessagePlugin.success('删除成功')
    getList()
  }
}
// 点击删除
const handleClickDelete = (val) => {
  typeId.value = val.id
  dialogDeleteVisible.value = true
}
// 禁用弹窗
const handleForbidden = (val) => {
  typeId.value = val.id
  if (val.status === 1) {
    dialogVisible.value = true
    typeStatus.value = 0
    statusText.value = '禁用成功'
  } else {
    typeStatus.value = 1
    handleForbiddenSub()
    statusText.value = '启用成功'
  }
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 关闭禁用弹窗
const handleForbiddenClose = () => {
  dialogVisible.value = false
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'name') {
    delete pagination.value.name
  } else {
    delete pagination.value.status
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
}
</script>
