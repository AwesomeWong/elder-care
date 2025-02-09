<!-- 订单列表页 -->
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
        :data="orderStatusData"
        @change-id="changeId"
      ></SwitchBar>
    </div>
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @handle-cancel="handleCancel"
      @handle-refund="handleRefund"
      @get-current="getCurrent"
    ></TableList>
    <!-- end -->
    <!-- 取消弹层 -->
    <Cancel
      ref="cancel"
      :visible="visibleCancel"
      @handleClose="handleCancelClose"
      @handleSubmit="handleCancelSubmit"
    ></Cancel>
    <!-- end -->
    <!-- 退款弹层 -->
    <Refund
      ref="refund"
      :visible="visibleRefund"
      @handle-close="handleRefundClose"
      @handle-submit="handleRefundSubmit"
    ></Refund>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getStartTimeStr, getEndTimeStr } from '@/utils/date'
// 基本数据
import { orderStatusData } from '@/utils/commonData'
// 接口
import { getOrderList, orderCancel, orderRefund } from '@/api/order'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// 取消弹层
import Cancel from './components/Cancel.vue'
// 退款弹层
import Refund from './components/Refund.vue'
// ------定义变量------
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const visibleCancel = ref(false) // 取消弹层
const visibleRefund = ref(false) // 退款弹层
const orderId = ref() // 订单id
const cancel = ref(null) // 取消弹层 ref
const refund = ref(null) // 退款弹层ref
const isChick = ref(false) // 是否触发了提交按钮
const tabBar = ref(null)
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
    const res: any = await getOrderList(pagination.value) // 获取列表数据
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
  tabBar.value.currentId = 0
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
// tab筛选
const changeId = (val) => {
  if (val >= 0) {
    pagination.value.status = val
  }
  pagination.value.pageNum = 1
  getList()
}
// 取消
const handleCancel = (val) => {
  orderId.value = val.id
  visibleCancel.value = true
}
// 关闭取消弹层
const handleCancelClose = () => {
  visibleCancel.value = false
}
// 确定取消
const handleCancelSubmit = async (val) => {
  const params = {
    orderId: orderId.value,
    reason: val.reason
  }
  if (!isChick.value) {
    isChick.value = true
    const res: any = await orderCancel(params)
    if (res.code === 200) {
      MessagePlugin.success(`取消成功`)
      setTimeout(() => {
        isChick.value = false
      }, 3000)
      handleCancelClose()
      cancel.value.handleClear()
      getList()
    }
  }
}
// 确认退款
const handleRefundSubmit = async (val) => {
  const params = {
    tradingOrderNo: orderId.value,
    tradingChannel: val.tradingChannel
  }
  if (!isChick.value) {
    isChick.value = true
    const res: any = await orderRefund(params)
    if (res.code === 200) {
      MessagePlugin.success(`退款成功`)
      setTimeout(() => {
        isChick.value = false
      }, 3000)
      handleCancelClose()
      refund.value.handleClear()
      getList()
    }
  }
}
// 退款
const handleRefund = (val) => {
  orderId.value = val.tradingOrderNo
  visibleRefund.value = true
}
// 关闭退款弹层
const handleRefundClose = () => {
  visibleRefund.value = false
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'orderNo') {
    delete pagination.value.orderNo
  } else if (v === 'elderlyName') {
    delete pagination.value.elderlyName
  } else if (v === 'creator') {
    delete pagination.value.creator
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
