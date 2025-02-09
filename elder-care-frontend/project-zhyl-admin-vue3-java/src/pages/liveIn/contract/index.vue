<!-- 合同列表页 -->
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
import { getStartTimeStr, getEndTimeStr } from '@/utils/date'
// 接口
import { getContractList } from '@/api/liveIn'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// ------定义变量------
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
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
    const res: any = await getContractList(pagination.value) // 获取列表数据
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
    pagination.value.startTime = getStartTimeStr(time[0])
    pagination.value.endTime = getEndTimeStr(time[1])
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
  getList()
}

// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'contractNo') {
    pagination.value.contractNo = ''
  } else if (v === 'elderName') {
    pagination.value.elderName = ''
  } else if (v === 'status') {
    pagination.value.status = ''
  } else {
    pagination.value.startTime = ''
    pagination.value.endTime = ''
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
}
</script>
