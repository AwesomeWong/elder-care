<!-- 预交款表页 -->
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
    <div class="marg-main newBox">
      <div class="tabBtn">
        <button class="bt wt-60" @click="handleOpen">充值</button>
      </div>
    </div>
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @get-current="getCurrent"
    ></TableList>
    <!-- end -->
    <!-- 充值 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      :old-man-data="oldManData"
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
// 接口
import { getBeforehandList, creatRecharge } from '@/api/finance'
import { getOldManList } from '@/api/oldMan'
// 充值弹层
import DialogFrom from './components/DialogFrom.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// ------定义变量------
const visible = ref(false) // 充值弹层
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const formRef = ref(null) // 上传充值凭证ref
const billId = ref('') // 业务系统订单号
const oldManData = ref([]) // 老人数据
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
    const res: any = await getBeforehandList(pagination.value) // 获取列表数据
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
// 充值
const handleSub = async (val) => {
  const res: any = await creatRecharge(val)
  if (res.code === 200) {
    MessagePlugin.success('充值成功')
    getList()
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
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
// 充值弹层
const handleOpen = (id) => {
  billId.value = id
  visible.value = true
  getOldList()
}
// 关闭弹窗
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
