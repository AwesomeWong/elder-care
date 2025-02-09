<!-- 入账列表页 -->
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
    <!-- tab导航 -->
    <div class="marg-main newBox">
      <SwitchBar
        ref="tabBar"
        :data="billTabData"
        @change-id="changeId"
      ></SwitchBar>
      <div class="tabBtn">
        <button class="bt wt-120" @click="handleCreat">生成月度账单</button>
      </div>
    </div>
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @handle-open="handleOpen"
      @get-current="getCurrent"
      @handle-cancel-open="handleCancelOpen"
    ></TableList>
    <!-- end -->
    <!-- 支付 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      @handle-close="handleClose"
      @handle-sub="handleSub"
    >
    </DialogFrom>
    <!-- end -->
    <!-- 生成账单 -->
    <CreatBillFrom
      ref="billFormRef"
      :visible="billVisible"
      :old-man-data="oldManData"
      @handle-close="handleBillClose"
      @handle-sub="handleBillSub"
    ></CreatBillFrom>
    <!-- end -->
    <!-- 取消 -->
    <CancelFrom
      ref="cancelFormRef"
      :visible="cancelVisible"
      :old-man-data="oldManData"
      @handle-close="handleCancelClose"
      @handle-sub="handleCancelSub"
    ></CancelFrom>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 基本数据
import { billTabData } from '@/utils/commonData'
// 接口
import { getBillList, createBill, cancelBill, billPay } from '@/api/finance'
import { getOldManList } from '@/api/oldMan'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// 表单
import DialogFrom from './components/DialogFrom.vue'
// 生成账单
import CreatBillFrom from './components/CreatBillFrom.vue'
// 取消
import CancelFrom from './components/CancelFrom.vue'
// ------定义变量------
const visible = ref(false) // 支付弹层
const billVisible = ref(false) // 生成订单
const cancelVisible = ref(false) // 取消弹层
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const billId = ref('') // 业务系统订单号
const formRef = ref(null) // 上传支付凭证ref
const billFormRef = ref(null) // 生成账单ref
const cancelFormRef = ref(null) // 取消ref
const oldManData = ref([]) // 老人数据
const isCheck = ref(false) // 是否可以触发确认按钮
const tabBar = ref(null) // tab ref
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
    const res: any = await getBillList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 获取老人列表数据
const getOldList = async () => {
  const res: any = await getOldManList() // 获取列表数据
  if (res.code === 200) {
    oldManData.value = res.data
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
  tabBar.value.currentId = 0
  pagination.value = {
    pageSize: 10,
    pageNum: 1
  }
  getList()
}
// 支付
const handleSub = async (val) => {
  const parent = {
    ...val,
    productOrderNo: billId.value
  }
  const res: any = await billPay(parent)
  if (res.code === 200) {
    MessagePlugin.success('支付成功')
    getList()
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 生成订单提交
const handleBillSub = async (val) => {
  if (isCheck.value) {
    return false
  }
  if (!isCheck.value) {
    isCheck.value = true
    const res: any = await createBill(val)
    if (res.code === 200) {
      MessagePlugin.success('操作成功')
      setTimeout(() => {
        isCheck.value = false
        clearTimeout()
      }, 1000)
      getList()
      handleBillClose()
      billFormRef.value.handleClear()
    } else {
      isCheck.value = false
    }
  }
}
// 取消
const handleCancelSub = async (val) => {
  const res: any = await cancelBill(val, billId.value)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    getList()
    handleCancelClose()
    cancelFormRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 获取tab触发的当前值
const changeId = (val) => {
  pagination.value = {
    pageSize: pagination.value.pageSize,
    transactionStatus: val
  }
  pagination.value.pageNum = 1
  getList()
}
// 生成账单
const handleCreat = () => {
  billVisible.value = true
  getOldList()
}
// 关闭生成账单弹层
const handleBillClose = () => {
  billVisible.value = false
}

// 清空搜索表单
const handleClear = (v) => {
  if (v === 'billNo') {
    delete pagination.value.billNo
  } else if (v === 'elderName') {
    delete pagination.value.elderName
  } else if (v === 'elderIdCard') {
    delete pagination.value.elderIdCard
  } else {
    delete pagination.value.startTime
    delete pagination.value.endTime
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
}
// 支付弹层
const handleOpen = (id) => {
  billId.value = id
  visible.value = true
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
}
// 打开取消弹层
const handleCancelOpen = (val) => {
  billId.value = val.id
  cancelVisible.value = true
}
// 关闭取消弹层
const handleCancelClose = () => {
  cancelVisible.value = false
}
</script>
