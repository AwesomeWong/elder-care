<!-- 预约登记列表页 -->
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
    <div class="marg-main newBox mb-16">
      <SwitchBar
        ref="tabBar"
        :data="subscribeTabData"
        @change-id="changeId"
      ></SwitchBar>
    </div>

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
    <!-- 到院 -->
    <DialogFrom
      :visible="dialogVisible"
      @handle-close="handleClose"
      @handle-submit="handleSubmit"
    ></DialogFrom>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getStartTimeStr, getEndTimeStr } from '@/utils/date'
// 基本数据
import { subscribeTabData } from '@/utils/commonData'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 接口
import { getSubscribeList, visitTime } from '@/api/appointment'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// 搜索框表单
import DialogFrom from './components/DialogFrom.vue'
// ------定义变量------
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const dialogVisible = ref(false) // 控制删除弹层显示隐藏
const timeId = ref() // 到访id
const total = ref(0) // 总条数
const tabBar = ref(null)
// 分页
const pagination = ref<Object | any>({
  pageSize: 10, // 每页要显示的数量
  pageNum: 1 // 默认当前页
})
// 生命周期
onMounted(() => {
  // 进入页面先获取列表数据
  getList()
})
// ------定义方法------
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getSubscribeList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 预约等级提交表单
const handleSubmit = async (val) => {
  const params = {
    id: timeId.value,
    time: val
  }
  const res: any = await visitTime(params)
  if (res.code === 200) {
    handleClose()
    getList()
    MessagePlugin.success('操作成功')
  }
}
// 搜索功能
const handleSearch = (time) => {
  pagination.value.pageNum = 1
  if (time.length > 0) {
    pagination.value.startTime = getStartTimeStr(time[0]) // getStartTimeStr获取搜索开始时间戳
    pagination.value.endTime = getEndTimeStr(time[1]) // getStartTimeStr获取搜索结束时间戳
  }
  getList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  tabBar.value.currentId = 0
  pagination.value = {
    pageSize: 10,
    pageNum: 1
  }
  getList()
}
// tab筛选
const changeId = (val) => {
  pagination.value.pageNum = 1
  if (val >= 0) {
    pagination.value.type = val
  }

  getList()
}
// 打开到院弹层
const handleOpen = (val) => {
  timeId.value = val.id
  dialogVisible.value = true
}
// 关闭到院弹窗
const handleClose = () => {
  dialogVisible.value = false // 关闭弹层
}

// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'name') {
    delete pagination.value.name
  } else if (v === 'phone') {
    delete pagination.value.phone
  } else if (v === 'status') {
    delete pagination.value.status
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
