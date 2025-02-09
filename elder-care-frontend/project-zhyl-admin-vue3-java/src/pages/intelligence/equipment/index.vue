<!-- 设备管理列表页 -->
<template>
  <div class="min-h intelligenc bg-wt">
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      :product-data="productData"
      @handle-search="handleSearch"
      @get-current="getCurrent"
      @handle-edit="handleEdit"
      @handle-bulid="handleBulid"
      @handle-click-delete="handleClickDelete"
    ></TableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogFrom
      ref="formRef"
      :visible="visible"
      :title="title"
      :data="formBaseData"
      :man-info="oldManInfo"
      :floor-data="floorData"
      :product-data="productData"
      @handle-close="handleDialogClose"
      @handle-add="handleAdd"
      @handle-edit-form="handleEditForm"
      @handle-open="handleOpenDialog"
    >
    </DialogFrom>
    <!-- end -->
    <!-- 删除弹层 -->
    <Delete
      :visible="dialogDeleteVisible"
      :delete-text="operateText"
      @handle-delete="handleDelete"
      @handle-close="handleClose"
    ></Delete>
    <!-- end -->
    <!-- 老人选择弹层 -->
    <OldManSelect
      :dialog-visible="dialogOldVisible"
      :dialog-data="listOldManData"
      :pagination="paginationOld"
      :formData="formBaseData"
      @handle-search="handleOldSearch"
      @handle-reset="handleOldReset"
      @handle-close-dialog="handleCloseDialog"
      @get-current="getOldCurrent"
      @handle-select-old="handleSelectOld"
      @get-old-list="getOldList"
    ></OldManSelect>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import {
  getDeviceList,
  getProductList,
  addDevice,
  editDevice,
  deleteDevice,
  getDetail
} from '@/api/intelligence'
import { getSelectListByPage } from '@/api/oldMan'
import { getAllRoomList } from '@/api/liveIn'
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 表格列表
import DialogFrom from './components/DialogFrom.vue'
// 选择老人列表弹层
import OldManSelect from '@/components/OldManSelect/index.vue'
// ------定义变量------
const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const formBaseData = ref({}) // 弹窗表单内容
const title = ref('') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const iotId = ref('') // 设置删除id
const productKey = ref('') // 设置删除设备编码
const operateText = ref('设备') // 要操作的内容提示
const total = ref(0) // 总条数
const oldManInfo = ref({}) // 选择的老人数据数据
const formRef = ref(null)
const dialogOldVisible = ref(false) // 老人选择弹窗
const listOldManData = ref([]) // 获取所有老人
const floorData = ref([]) // 楼层信息
const productData = ref([]) // 产品数据
const productPagination = ref<Object | any>({
  pageSize: 100,
  currentPage: 1 // 默认当前页
})
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  currentPage: 1 // 默认当前页
})
// 老人弹层分页
const paginationOld = ref<Object | any>({
  pageSize: 5,
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
    pagination.value.productKey = productData.value[0].productKey
    getList()
  }
}
// 获取老人列表数据
const getOldList = async () => {
  const res: any = await getSelectListByPage(paginationOld.value) // 获取列表数据
  if (res.code === 200) {
    listOldManData.value = res.data.records
    paginationOld.value.total = Number(res.data.total)
  }
}
// 获取楼层，房间床位
// 获取楼层数据，因为有重复的id，所以把id做了特殊处理分别加了f\r\b
const getAllFloorList = async () => {
  const res: any = await getAllRoomList()
  if (res.code === 200) {
    floorData.value = res.data
    floorData.value.forEach((ele) => {
      ele.code = ele.name
      ele.ids = `f${ele.id}`
      ele.children = ele.roomVoList
      ele.children.forEach((val) => {
        val.ids = `r${val.id}`
        val.children = val.bedVoList
        val.children.forEach((obj) => {
          obj.ids = `b${obj.id}`
          obj.code = obj.bedNumber
        })
      })
    })
  }
}
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getDeviceList(pagination.value) // 获取列表数据
    if (res.data !== undefined) {
      listData.value = res.data.records
      total.value = Number(res.data.total)
    } else {
      listData.value = []
      total.value = 0
    }
  } finally {
    dataLoading.value = false
  }
}
// 获取详情数据
const getDetails = async () => {
  const params = {
    iotId: iotId.value,
    productKey: productKey.value
  }
  const res: any = await getDetail(params) // 获取列表数据
  if (res.code === 200) {
    formBaseData.value = res.data
    if (formBaseData.value.locationType === 0) {
      formBaseData.value.elderId = formBaseData.value.bindingLocation
      formBaseData.value.elderName = formBaseData.value.remark
    }
  }
}
// 添加
const handleAdd = async (val) => {
  const res: any = await addDevice(val)
  if (res.code === 200) {
    MessagePlugin.success('添加成功')
    handleDialogClose()
    setTime()
    formRef.value.handleClear()
  }
}
// 编辑
const handleEditForm = async (val) => {
  const res: any = await editDevice(val)
  if (res.code === 200) {
    MessagePlugin.success('编辑成功')
    handleDialogClose()
    setTime()
    formRef.value.handleClear()
  }
}

// 增删改查1秒钟后刷新列表，因为阿里云创建设备有延时
const setTime = () => {
  setTimeout(() => {
    getList()
  }, 1000)
  clearTimeout()
}
// 搜索功能
const handleSearch = (val) => {
  pagination.value.productKey = val
  getList()
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
}
const handleDialogClose = () => {
  visible.value = false // 关闭新增弹窗
  delete formBaseData.value.deviceDescription
  delete formBaseData.value.name
  delete formBaseData.value.elderId
  delete formBaseData.value.id
}
// 新增
const handleBulid = () => {
  // 显示弹窗
  title.value = '新增'
  visible.value = true
  getAllFloorList()
}
// 编辑
const handleEdit = (val) => {
  iotId.value = val.iotId
  productKey.value = val.productKey
  // 获取详情
  getDetails()
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题
  title.value = '编辑'
  getAllFloorList()
}
// 确认删除
const handleDelete = async () => {
  const params = {
    iotId: iotId.value,
    productKey: productKey.value
  }
  const res: any = await deleteDevice(params)
  if (res.code === 200) {
    dialogDeleteVisible.value = false
    MessagePlugin.success('删除成功')
    setTime()
  }
}
// 点击删除
const handleClickDelete = (val) => {
  iotId.value = val.iotId
  productKey.value = val.productKey
  dialogDeleteVisible.value = true
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.currentPage = val.current
  pagination.value.pageSize = val.pageSize
  getList()
}
// 搜索功能
const handleOldSearch = () => {
  paginationOld.value.pageNum = 1
  getOldList()
}
// 重置，清空搜索框
const handleOldReset = () => {
  // 重置页码
  paginationOld.value = {
    pageSize: 5,
    pageNum: 1
  }
  getOldList()
}
// 翻页设置当前页
const getOldCurrent = (val) => {
  paginationOld.value.pageNum = val.current
  paginationOld.value.pageSize = val.pageSize
  getOldList()
}
// 打开老人弹层
const handleOpenDialog = (val) => {
  // 打开弹层前判断是否有选择得老人，如果是undefined，老人不提示回显
  if (val === undefined) {
    formBaseData.value.elderId = undefined
  }
  dialogOldVisible.value = true
  getOldList()
}
// 关闭普通列表弹层
const handleCloseDialog = () => {
  dialogOldVisible.value = false
  paginationOld.value = {
    pageSize: 5,
    pageNum: 1
  }
}
// 提交普通列表弹层
const handleSelectOld = (val) => {
  oldManInfo.value = val[0]
  formBaseData.value.name = val[0].name
  formBaseData.value.elderId = val[0].elderId
}
</script>
<style lang="less" scoped src="./../index.less"></style>
