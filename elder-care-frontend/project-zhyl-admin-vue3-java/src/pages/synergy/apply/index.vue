<!-- 我的申请列表页 -->
<template>
  <div class="min-h subscribe bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      @handle-clear="handleClear"
      @handle-search="handleSearch"
      @handle-reset="handleReset"
    ></SearchFormBox>
    <!-- end -->
    <!-- tab导航 -->
    <div class="marg-main newBox">
      <SwitchBar
        ref="tabBar"
        :data="operationStatus"
        @change-id="changeId"
      ></SwitchBar>
      <div class="tabBtn">
        <button class="bt wt-120" @click="handleApply">发起申请</button>
      </div>
    </div>
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @handle-open="handleOpen"
      @get-current="getCurrent"
    ></TableList>
    <!-- end -->
    <!-- 选择申请类别 -->
    <ApplyClass
      :visible="visible"
      @handle-close="handleApplyClose"
    ></ApplyClass>
    <!-- end -->
    <!-- 操作弹层 -->
    <OperateDialog
      :visible="dialogVisible"
      :title="operateTitle"
      :text="operateText"
      @handle-delete="handleOperate"
      @handle-close="handleOperateClose"
    ></OperateDialog>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getStartTime, getEndTime } from '@/utils/date'
// 基本数据
import { operationStatus } from '@/utils/commonData'
// 接口
import { getApplicationList, cancelSubmit } from '@/api/synergy'
import { cancelCheckSubmit } from '@/api/checkin'
// 操作弹层
import OperateDialog from '@/components/OperateDialog/index.vue'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// 选择申请类别
import ApplyClass from './components/applyClass.vue'
// ------定义变量------
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const dialogVisible = ref(false) // 控制操作弹层显示隐藏
const operateTitle = ref('') // 操作弹层标题
const operateText = ref('') // 要操作的内容提示
const visible = ref(false) // 申请类别弹层
const applyObj = ref('') // 申请id
const tabBar = ref(null) // tab ref
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})
// 生命周期
onMounted(() => {
  getList()
})
// ------定义方法------
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getApplicationList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 搜索功能
const handleSearch = (time) => {
  pagination.value.pageNum = 1
  if (time.length > 0) {
    pagination.value.startTime = getStartTime(time[0])
    pagination.value.endTime = getEndTime(time[1])
  }
  getList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  pagination.value = {
    pageSize: 10,
    pageNum: 1
  }
  tabBar.value.currentId = 0
  getList()
}
// tab筛选需要重新定义状态
const changeId = (val) => {
  pagination.value.pageNum = 1
  if (val >= 0) {
    pagination.value.status = val
  }
  pagination.value.startTime = ''
  pagination.value.endTime = ''
  getList()
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 确认撤销
const handleOperate = async () => {
  if (applyObj.value.type === 1) {
    const parent = {
      retreatCode: applyObj.value.code,
      taskId: applyObj.value.id
    }
    const res: any = await cancelSubmit(parent)
    if (res.code === 200) {
      MessagePlugin.success('操作成功')
      handleOperateClose()
      getList()
    }
  } else if (applyObj.value.type === 2) {
    console.log('请假')
  } else {
    const parent = {
      id: Number(applyObj.value.checkInId),
      taskId: applyObj.value.id
    }
    const res: any = await cancelCheckSubmit(parent)
    if (res.code === 200) {
      MessagePlugin.success('操作成功')
      handleOperateClose()
      getList()
    }
  }
}
// 发起申请
const handleApply = () => {
  visible.value = true
}
// 打开撤销弹层
const handleOpen = (val) => {
  applyObj.value = val
  operateTitle.value = '确认撤销'
  operateText.value = '撤销已提交信息'
  dialogVisible.value = true
}
// 关闭操作弹层
const handleOperateClose = () => {
  dialogVisible.value = false
}
// 关闭发起申请弹层
const handleApplyClose = () => {
  visible.value = false
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'code') {
    delete pagination.value.code
  } else if (v === 'applicat') {
    delete pagination.value.applicat
  } else if (v === 'type') {
    delete pagination.value.type
  } else {
    delete pagination.value.startTime
    delete pagination.value.endTime
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
}
</script>
