<!-- 我的待办列表页 -->
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
        :data="backlogStatusData"
        @change-id="changeId"
      ></SwitchBar>
    </div>
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @get-current="getCurrent"
    ></TableList>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStartTime, getEndTime } from '@/utils/date'
// 基本数据
import { backlogStatusData } from '@/utils/commonData'
// 接口
import { getBacklogList } from '@/api/synergy'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// ------定义变量------
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const tabBar = ref(null) // tab ref
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1,
  reqType: 0,
  isHandle: 0 // 默认当前页
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
    const res: any = await getBacklogList(pagination.value) // 获取列表数据
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
    pageNum: 1,
    reqType: 0,
    isHandle: 0
    // isHandle: pagination.value.isHandle
  }
  tabBar.value.currentId = 0
  getList()
}

// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 获取tab触发的当前值
const changeId = (val) => {
  pagination.value.pageNum = 1
  pagination.value.isHandle = val
  getList()
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'code') {
    delete pagination.value.code
  } else if (v === 'applicat') {
    delete pagination.value.applicat
  } else if (v === 'type') {
    delete pagination.value.type
  } else if (v === 'status') {
    delete pagination.value.status
  } else {
    delete pagination.value.startTime
    delete pagination.value.endTime
  }
  pagination.value = {
    ...pagination.value,
    isHandle: pagination.value.isHandle === 1 ? 1 : 0
  }
  getList()
}
</script>
