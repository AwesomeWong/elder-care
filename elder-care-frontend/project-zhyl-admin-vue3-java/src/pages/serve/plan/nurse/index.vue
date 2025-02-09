<!-- 护理计划列表页 -->
<template>
  <div class="min-h serveProject bg-wt">
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
      @handleLook="handleLook"
    ></TableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      :title="title"
      :base-data="formBaseData"
      :project-data="projectData"
      @handle-close="handleClose"
      @handle-add="handleAdd"
      @handle-edit="handleEditForm"
    >
    </DialogFrom>
    <!-- end -->
    <!-- 查看 -->
    <DialogLook
      ref="lookRef"
      :visible="lookVisible"
      :base-data="formBaseData"
      @handle-close="handleLookClose"
    ></DialogLook>
    <!-- end -->
    <!-- 删除弹层 -->
    <Delete
      :visible="dialogDeleteVisible"
      :delete-text="operateText"
      @handle-delete="handleDelete"
      @handle-close="handleDeleteClose"
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
  planAdd,
  planUpdate,
  getPlanList,
  getPlanDetails,
  getAllProjectList,
  planDelete,
  planStatus
} from '@/api/serve'
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// 禁用弹窗
import Forbidden from '@/components/Forbidden/index.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 表单
import DialogFrom from './components/DialogFrom.vue'
// 查看
import DialogLook from './components/DialogLook.vue'
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
const operateText = ref('护理计划') // 要操作的内容提示
const statusText = ref('') // 启用禁用提示
const total = ref(0) // 总条数
const projectData = ref([]) // 护理计划数据
const formRef = ref(null)
const lookVisible = ref(false)
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})
// 生命周期
onMounted(() => {
  getList()
  getAllProject()
})
// ------定义方法------
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getPlanList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 获取所有护理项目列表
const getAllProject = async () => {
  const res: any = await getAllProjectList()
  if (res.code === 200) {
    projectData.value = res.data
  }
}
// 获取详情数据
const getDetails = async (id) => {
  const res: any = await getPlanDetails(id) // 获取列表数据
  if (res.code === 200) {
    formBaseData.value = res.data
  }
}
// 添加
const handleAdd = async (val) => {
  const res: any = await planAdd(val)
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
  const res: any = await planUpdate(val)
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
  const res: any = await planStatus(params)
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
  getAllProject()
  getList()
}
// 新增房型
const handleBulid = () => {
  // 显示弹窗
  title.value = '新增'
  visible.value = true
}
// 编辑
const handleEdit = (val) => {
  // 获取详情

  getDetails(val.id)
  // 显示弹窗
  visible.value = true
  // 将弹窗的标题
  title.value = '编辑'
}
// 确认删除
const handleDelete = async () => {
  const res: any = await planDelete(typeId.value)
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
// 关闭删除弹层
const handleDeleteClose = () => {
  dialogDeleteVisible.value = false
}
// 关闭禁用弹窗
const handleForbiddenClose = () => {
  dialogVisible.value = false
}
// 查看
const handleLook = (id) => {
  lookVisible.value = true
  getDetails(id)
}
// 关闭查看弹层
const handleLookClose = () => {
  lookVisible.value = false

  getAllProject()
  getList()
  formBaseData.value = {}
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
