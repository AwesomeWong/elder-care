<!-- 欠费老人列表页 -->
<template>
  <div class="min-h subscribe bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      @handle-search="handleSearch"
      @handle-reset="handleReset"
      @handle-clear="handleClear"
    ></SearchFormBox>
    <!-- end -->
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @get-current="getCurrent"
      @handle-open="handleOpen"
    ></TableList>
    <!-- end -->
    <!-- 账单 -->
    <DialogFrom
      ref="formRef"
      :elder-name="elderName"
      :dialogVisible="visible"
      @handle-close="handleClose"
    >
    </DialogFrom>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 接口
import { getArrearsList } from '@/api/finance'
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
const elderName = ref('')
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1
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
    const res: any = await getArrearsList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
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
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 打开账单弹层
const handleOpen = (val) => {
  elderName.value = val.elderVo.name
  visible.value = true
}
// 关闭账单弹层
const handleClose = () => {
  visible.value = false
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'elderName') {
    delete pagination.value.elderName
  } else if (v === 'bedNo') {
    delete pagination.value.bedNo
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
}
</script>
