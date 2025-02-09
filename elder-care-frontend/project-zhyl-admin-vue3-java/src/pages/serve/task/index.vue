<!-- 护理等级列表页 -->
<template>
  <div class="min-h serveGrade bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      :project-data="nursProjectData"
      @handle-clear="handleClear"
      @handle-search="handleSearch"
      @handle-reset="handleReset"
    ></SearchFormBox>
    <!-- end -->
    <!-- tab导航 -->
    <div class="marg-main newBox">
      <SwitchBar
        ref="tabBar"
        :data="arrangeData"
        @change-id="changeId"
      ></SwitchBar>
    </div>
    <!-- 表格 -->
    <TableList
      :taskStatus="pagination.status"
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      :dataLoading="dataLoading"
      @handleCancel="handleCancel"
      @handleTime="handleTime"
      @handleExecute="handleExecute"
      @get-current="getCurrent"
      @handle-edit="handleEdit"
      @handle-click-delete="handleClickDelete"
      @handle-forbidden="handleForbidden"
    ></TableList>
    <!-- end -->
    <!-- 取消弹窗 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      :title="title"
      :data="formBaseData"
      @handle-close="handleClose"
      @handle-edit-form="handleEditForm"
    >
    </DialogFrom>
    <!-- end -->
    <!-- 改期弹层 -->
    <DialogFormTime
      :visible="dialogVisible"
      :timeData="timeData"
      @handle-close="handleClose"
      @handle-submit="handleSubmitTime"
    ></DialogFormTime>
    <!-- end -->
    <!-- 执行弹层 -->
    <DialogFormExecute
      ref="formRef"
      :visible="dialogVisibleExecute"
      @handle-close="handleClose"
      @handle-submit="handleSubmit"
    ></DialogFormExecute>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { arrangeData } from '@/utils/commonData'
// 接口
import {
  cancelPlan,
  changePlanTime,
  getArrangeList,
  getLevelDetails,
  getAllProjectList,
  executePlan,
  levelStatus
} from '@/api/serve'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 取消原因弹窗
import DialogFrom from './components/DialogFrom.vue'
// 改期弹窗
import DialogFormTime from './components/DialogFormTime.vue'
// 执行弹窗
import DialogFormExecute from './components/DialogFormExecute.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// ------定义变量------
const dialogVisibleExecute = ref(false) // 执行弹窗
const visible = ref(false) // 取消弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const formBaseData = ref({}) // 弹窗表单内容
const title = ref('填写取消原因') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogVisible = ref(false) // 改期弹窗
const typeId = ref('') // 设置删除id
const typeStatus = ref(null) // 禁用启用
const statusText = ref('') // 启用禁用提示
const total = ref(0) // 总条数
const nursProjectData = ref([]) // 护理计划数据
const formRef = ref(null)
const taskId = ref(null) // 护理任务ID
const timeData = ref('')
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1, // 默认当前页
  status: 1,
  startTime: '',
  endTime: ''
})
// 生命周期
onMounted(() => {
  getList()
  getProjectList()
})
// ------定义方法------
// 获取列表数据
const getList = async () => {
  dataLoading.value = true
  try {
    const res: any = await getArrangeList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 获取护理项目列表
const getProjectList = async () => {
  const res: any = await getAllProjectList()
  if (res.code === 200) {
    nursProjectData.value = res.data
  }
}
// 获取详情数据
const getDetails = async (id) => {
  const res: any = await getLevelDetails(id) // 获取列表数据
  if (res.code === 200) {
    formBaseData.value = res.data
  }
}
const handleSubmitTime = async (val) => {
  const res: any = await changePlanTime({ ...val, ...{ taskId: taskId.value } })
  if (res.code === 200) {
    MessagePlugin.success('修改成功')
    getList()
    handleClose()
  } else {
    MessagePlugin.error(res.msg)
  }
}
const handleSubmit = async (val) => {
  console.log(val, 'val')
  const res: any = await executePlan({
    ...val,
    ...{ taskId: taskId.value },
    ...{ estimatedServerTime: val.estimatedServerTime }
  })
  if (res.code === 200) {
    MessagePlugin.success('执行成功')
    getList()
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 打开执行弹窗
const handleExecute = (row) => {
  dialogVisibleExecute.value = true
  taskId.value = row.id
  console.log(row, 'row')
}
// 打开改期弹窗
const handleTime = (row) => {
  dialogVisible.value = true
  taskId.value = row.id
  timeData.value = row.estimatedServerTime
}
// 打开取消原因弹窗
const handleCancel = (row) => {
  visible.value = true
  taskId.value = row.id
}
// 取消任务
const handleEditForm = async (val) => {
  const res: any = await cancelPlan({ ...val, ...{ taskId: taskId.value } })
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
const handleSearch = (params) => {
  pagination.value.pageNum = 1
  if (params.length) {
    pagination.value.startTime = new Date(params[0]).getTime()
    pagination.value.endTime = new Date(params[1]).getTime()
  }

  getList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  // pagination.value = {
  //   pageSize: 10,
  //   pageNum: 1
  // }
  pagination.value.pageSize = 10
  pagination.value.pageNum = 1
  pagination.value.startTime = ''
  pagination.value.endTime = ''
  pagination.value.nurseId = ''
  pagination.value.projectId = ''
  pagination.value.elderName = ''
  delete pagination.value.startTime
  delete pagination.value.endTime
  delete pagination.value.elderName
  delete pagination.value.projectId
  delete pagination.value.nurseId
  getList()
}
// tab筛选
const changeId = (val) => {
  if (val >= 0) {
    pagination.value.status = val
  }
  pagination.value.pageNum = 1
  getList()
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭取消弹窗
  dialogVisible.value = false // 关闭改期弹窗
  dialogVisibleExecute.value = false // 关闭执行记录弹窗
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
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'elderName') {
    delete pagination.value.elderName
  } else if (v === 'nurseName') {
    delete pagination.value.nurseName
  } else if (v === 'projectId') {
    delete pagination.value.projectId
  } else {
    delete pagination.value.startTime
    delete pagination.value.endTime
  }
  getList()
}
</script>
