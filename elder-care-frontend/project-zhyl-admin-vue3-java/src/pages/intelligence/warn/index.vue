<!-- 报警规则列表页 -->
<template>
  <div class="min-h serveGrade bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      :product-data="productData"
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
      @handle-click-delete="handleClickDelete"
      @handle-forbidden="handleForbidden"
    ></TableList>
    <!-- end -->
    <!-- 删除弹层 -->
    <Delete
      :visible="dialogDeleteVisible"
      :delete-text="operateText"
      @handle-delete="handleDelete"
      @handle-close="handleClose"
    ></Delete>
    <!-- end -->
    <!-- 禁用弹层 -->
    <Forbidden
      :visible="dialogVisible"
      :text="operateText"
      @handle-submit="handleForbiddenSub"
      @handle-close="handleForbiddenClose"
    ></Forbidden>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 接口
import {
  getWarnList,
  getProductList,
  deleteRule,
  statusRule
} from '@/api/intelligence'
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// 禁用弹窗
import Forbidden from '@/components/Forbidden/index.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// ------定义变量------
const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogVisible = ref(false) // 禁用弹窗
const ruleId = ref('') // 设置删除id
const typeStatus = ref(null) // 禁用启用
const operateText = ref('规则') // 要操作的内容提示
const statusText = ref('') // 启用禁用提示
const total = ref(0) // 总条数
const productData = ref([]) // 产品数据
const productPagination = ref<Object | any>({
  pageSize: 100,
  currentPage: 1 // 默认当前页
})
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})
// 生命周期
onMounted(() => {
  getProduct()
})
// ------定义方法------
// 获取产品列表
const getProduct = async () => {
  const res: any = await getProductList(productPagination.value)
  if (res.code === 200) {
    productData.value = res.data.list.productInfo
    getList()
  }
}
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getWarnList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 确定禁用
const handleForbiddenSub = async () => {
  const params = {
    id: ruleId.value,
    status: typeStatus.value
  }
  const res: any = await statusRule(params)
  if (res.code === 200) {
    dialogVisible.value = false
    MessagePlugin.success(statusText.value)
    getList()
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
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
}
// 确认删除
const handleDelete = async () => {
  const res: any = await deleteRule(ruleId.value)
  if (res.code === 200) {
    dialogDeleteVisible.value = false
    MessagePlugin.success('删除成功')
    getList()
  }
}
// 点击删除
const handleClickDelete = (val) => {
  ruleId.value = val.id
  dialogDeleteVisible.value = true
}
// 禁用弹窗
const handleForbidden = (val) => {
  console.log(val)
  ruleId.value = val.id
  if (val.status === 1) {
    dialogVisible.value = true
    typeStatus.value = 0
    statusText.value = '禁用成功'
  } else {
    typeStatus.value = 1
    handleForbiddenSub()
    statusText.value = '启用成功'
  }
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 关闭禁用弹窗
const handleForbiddenClose = () => {
  dialogVisible.value = false
}
// 清空搜索表单
const handleClear = (v) => {
  if (v === 'alertRuleName') {
    delete pagination.value.alertRuleName
  } else if (v === 'productKey') {
    delete pagination.value.productKey
  } else if (v === 'functionName') {
    delete pagination.value.functionName
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
}
</script>
