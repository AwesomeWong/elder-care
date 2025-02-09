<!-- 基础列表页 -->
<template>
  <div class="min-h liveInBox bg-wt pd-box">
    <!-- 表格 -->
    <TableList
      :list-data="listData"
      @handle-edit="handleEdit"
      @handle-bulid="handleBulid"
      @handle-click-delete="handleClickDelete"
      @handle-forbidden="handleForbidden"
    ></TableList>
    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogFrom
      ref="fromRef"
      :visible="visible"
      :title="title"
      :data="formBaseData"
      @handle-close="handleClose"
      @handle-add="handleAdd"
      @handle-edit-form="handleEditForm"
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
  getRoomTypesList,
  getRoomTypeDetails,
  roomTypesDelete,
  roomTypesAdd,
  roomTypesEdit,
  roomTypesStatus
} from '@/api/liveIn'
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// 禁用弹窗
import Forbidden from '@/components/Forbidden/index.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 表格列表
import DialogFrom from './components/DialogFrom.vue'
// ------定义变量------
const visible = ref(false) // 新增，编辑弹窗
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const formBaseData = ref({}) // 弹窗表单内容
const title = ref('') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogVisible = ref(false) // 禁用弹窗
const typeId = ref('') // 房型设置id
const typeStatus = ref(null) // 禁用启用
const statusText = ref('') // 启用禁用提示
const operateText = ref('房型') // 要操作的内容提示
const fromRef = ref(null)
// 生命周期
onMounted(() => {
  getList()
})
// ------定义方法------
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getRoomTypesList() // 获取列表数据
    if (res.code === 200) {
      listData.value = res.data
    }
  } finally {
    dataLoading.value = false
  }
}
// 获取详情数据
const getDetails = async (id) => {
  const res: any = await getRoomTypeDetails(id) // 获取列表数据
  if (res.code === 200) {
    formBaseData.value = res.data
  }
}
// 确定禁用
const handleForbiddenSub = async () => {
  const params = {
    id: typeId.value,
    status: typeStatus.value
  }
  const res: any = await roomTypesStatus(params)
  if (res.code === 200) {
    dialogVisible.value = false
    MessagePlugin.success(statusText.value)
    getList()
  }
}
// 添加
const handleAdd = async (val) => {
  const res: any = await roomTypesAdd(val)
  if (res.code === 200) {
    MessagePlugin.success('添加成功')
    getList()
    handleClose()
    fromRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 编辑
const handleEditForm = async (val) => {
  const res: any = await roomTypesEdit(typeId.value, val)
  if (res.code === 200) {
    MessagePlugin.success('编辑成功')
    getList()
    handleClose()
    fromRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
}
// 新增房型
const handleBulid = () => {
  // 显示弹窗
  title.value = '新增'
  visible.value = true
}
// 编辑房型
const handleEdit = (val) => {
  // 获取详情
  getDetails(val.id)
  typeId.value = val.id
  // 显示弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '编辑'
}
// 确认删除
const handleDelete = async () => {
  const res: any = await roomTypesDelete(typeId.value)
  if (res.code === 200) {
    dialogDeleteVisible.value = false
    MessagePlugin.success('删除成功')
    getList()
  }
}
// 点击删除
const handleClickDelete = (val) => {
  typeId.value = val.id
  dialogDeleteVisible.value = true
}
// 禁用弹窗
const handleForbidden = (val) => {
  typeId.value = val.id
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
// 关闭禁用弹窗
const handleForbiddenClose = () => {
  dialogVisible.value = false
}
</script>
<style lang="less" src="./../../index.less"></style>
