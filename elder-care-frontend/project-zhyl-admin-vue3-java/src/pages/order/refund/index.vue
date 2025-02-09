<!-- 退款列表页 -->
<template>
  <div class="min-h subscribe bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      @set-refund-no="setRefundNo"
      @handle-clear="handleClear"
      @handle-search="handleSearch"
      @handle-reset="handleReset"
    ></SearchFormBox>
    <!-- end -->
    <!-- tab导航 -->
    <div class="marg-main newBox">
      <SwitchBar
        ref="tabBar"
        :data="refundStatusData"
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
    <!-- 新增，编辑弹窗 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      :data="baseData"
      @handle-close="handleClose"
    >
    </DialogFrom>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStartTime, getEndTime } from '@/utils/date'
// 基本数据
import { refundStatusData } from '@/utils/commonData'
// 接口
import { getRefundList, getRefundDetails } from '@/api/order'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// 查看退款记录弹层
import DialogFrom from './components/DialogFrom.vue'
// ------定义变量------
const visible = ref(false) // 新增，编辑弹窗
const formRef = ref(null)
const listData = ref([]) // 列表数据
const baseData = ref({}) // 退款详情
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const refundId = ref() // 退款id
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
    const res: any = await getRefundList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 获取退款结果
const getRefundDetail = async () => {
  const params = {
    refundRecordNo: refundId.value
  }
  const res: any = await getRefundDetails(params)
  if (res.code === 200) {
    baseData.value = res.data
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
  getList()
}

// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 打开退款记录弹层
const handleOpen = (val) => {
  refundId.value = val.refundNo
  visible.value = true
  getRefundDetail()
}
// 关闭退款记录弹层
const handleClose = () => {
  visible.value = false
}
// 获取tab触发的当前值
const changeId = (val) => {
  if (val === 0) {
    pagination.value.refundStatus = ''
  } else {
    pagination.value.refundStatus = val
  }
  pagination.value.pageNum = 1
  getList()
}
// 设置退款编号
const setRefundNo = (val) => {
  pagination.value.refundNoStr = val
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'refundNoStr') {
    delete pagination.value.refundNoStr
  } else if (v === 'orderNo') {
    delete pagination.value.orderNo
  } else if (v === 'creator') {
    delete pagination.value.creator
  } else {
    delete pagination.value.startTime
    delete pagination.value.endTime
  }
  getList()
}
</script>
