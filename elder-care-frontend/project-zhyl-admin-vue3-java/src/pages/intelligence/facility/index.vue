<!-- 老人报警列表页 -->
<template>
  <div class="min-h bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      @handle-search="handleSearch"
      @handle-reset="handleReset"
      @handle-clear="handleClear"
    ></SearchFormBox>
    <!-- end -->
    <!-- tab导航 -->
    <div class="marg-main newBox">
      <SwitchBar
        ref="tabBar"
        :data="tabStatusData"
        @change-id="changeId"
      ></SwitchBar>
    </div>
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @get-current="getCurrent"
      @handle-open="handleOpen"
    ></TableList>
    <!-- end -->
    <!-- 处理结果弹窗 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      @handle-close="handleClose"
      @handle-sub="handleSub"
    >
    </DialogFrom>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { tabStatusData } from '@/utils/commonData'
import { getStartTimeStr, getEndTimeStr } from '@/utils/date'
// 接口
import { getDeviceDataList, deviceUpdate } from '@/api/intelligence'
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// 表单
import DialogFrom from './components/DialogFrom.vue'
// ------定义变量------
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const visible = ref(false) // 账单弹层
const disposeId = ref('')
const activeIndex = ref(null)
const formRef = ref(null) // 处理结果ref
const tabBar = ref(null) // tab 切换
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1,
  status: -1
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
    const res: any = await getDeviceDataList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 处理
// 处理结果提交
const handleSub = async (val) => {
  const params = {
    ...val,
    id: disposeId.value
  }
  const res: any = await deviceUpdate(params)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleClose()
    formRef.value.handleClear()
    getList()
  }
}
// 搜索功能
const handleSearch = (time) => {
  pagination.value.pageNum = 1
  if (time.length > 0) {
    pagination.value.startTime = getStartTimeStr(time[0])
    pagination.value.endTime = getEndTimeStr(time[1])
  }
  getList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  tabBar.value.currentId = 0
  pagination.value = {
    pageSize: 10,
    pageNum: 1,
    status: -1
  }
  getList()
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 打开处理结果弹层
const handleOpen = (val) => {
  disposeId.value = val.id
  visible.value = true
}
// 关闭处理结果弹层
const handleClose = () => {
  visible.value = false
}
// 获取tab索引值
const changeId = (val) => {
  activeIndex.value = val
  pagination.value.pageNum = 1
  if (val === 0) {
    pagination.value.status = 2
  } else if (val === 1) {
    pagination.value.status = 3
  } else {
    pagination.value.status = -1
  }
  getList()
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'deviceName') {
    delete pagination.value.deviceName
  } else if (v === 'clear') {
    delete pagination.value.startTime
    delete pagination.value.endTime
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
}
</script>
