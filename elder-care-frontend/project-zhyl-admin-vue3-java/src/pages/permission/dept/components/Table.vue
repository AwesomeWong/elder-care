<!-- 基础表格组件 -->
<template>
  <div class="innerTable">
    <t-table
      row-key="deptNo"
      :data="listData"
      :columns="COLUMNS"
      :show-header="false"
      :expanded-row-keys="expandedRowKeys"
      :expandIcon="listData.length ? true : false"
      :expand-on-row-click="expandOnRowClick"
      @expand-change="rehandleExpandChange"
    >
      <!-- 更新时间-->
      <template #updateTime="{ row }">
        <div class="updateTime">
          <span>{{ row.updateTime || `2023-3-23 3:33:33` }}</span>
        </div>
      </template>
      <!-- end -->
      <template #op="{ row }">
        <a class="btn-dl line btn-split-right" @click="handleClickDelete(row)"
          >删除</a
        >
        <a
          :class="`${
            row.dataState === '0' ? 'btn-dl' : ''
          } line btn-split-right`"
          @click="handleClickDisable(row)"
          >{{ row.dataState === '0' ? '禁用' : '启用' }}</a
        >
        <a class="font-bt line" @click="handleSetupContract(row, 'edit')"
          >编辑</a
        >
        <a
          class="font-bt btn-split-left"
          @click="handleSetupContract(row, 'add')"
          >新增部门</a
        >
      </template>
      <!-- 展开 -->
      <template #expandedRow="{ row }">
        <Table
          :rowData="row"
          @handleSetupContract="handleSetupContract"
          @handleBulid="handleBulid"
          @handleClickDelete="handleClickDelete"
          @handleClickDisable="handleClickDisable"
          @fetchData="fetchData"
        ></Table>
      </template>
    </t-table>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { COLUMNS } from '../constants' // 表格列
import { getDeptList } from '@/api/permission'

const expandOnRowClick = ref(false)
const expandedRowKeys = ref([])

const props = defineProps({
  rowData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits([
  'fetchData',
  'handleSetupContract',
  'handleBulid',
  'handleClickDelete',
  'handleClickDisable'
])

const dataLoading = ref(false)
const listData = ref([])
// 获取列表数据
const fetchDeptData = async (deptId: string) => {
  dataLoading.value = true
  const params = { parentDeptNo: deptId, pageNum: 1, pageSize: 10 }
  console.log(deptId, 'deptId')
  getDeptList(params)
    .then((res) => {
      if (res.code === 200) {
        ;(listData as any).value = res.data
      }
    })
    .catch((err) => {
      // MessagePlugin.error(`请求出错了！ ${err.message}`)
      dataLoading.value = false
    })
}

// 展开列表
const rehandleExpandChange = (value) => {
  expandedRowKeys.value = value
}

watchEffect(() => {
  if (props.rowData) {
    console.log(props.rowData, 'props.rowData')
    fetchDeptData(props.rowData.deptNo)
  }
})
// 打开编辑弹窗
const handleSetupContract = (val, tg) => {
  // 这个方法可能是递归子组件来的 所有需要判断
  if (val.tg) {
    emit('handleSetupContract', { ...val })
  } else {
    emit('handleSetupContract', { data: val, tg })
  }
}
// 点击禁用/启用
const handleClickDisable = (row: { rowIndex: any }) => {
  emit('handleClickDisable', row)
}
// 点击删除
const deleteIdx = ref(-1) // 删除的索引
const handleClickDelete = (row: { rowIndex: any }) => {
  emit('handleClickDelete', row)
  deleteIdx.value = row.rowIndex
}
// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
// 事件传递 - 递归组件的且套
const fetchData = () => {
  console.log('table')
  emit('fetchData')
}
</script>
<style lang="less" scoped>
:deep(.t-table .t-table__expandable-icon-cell::before) {
  /* 修改展开图标样式 */
  background-image: url(@/assets/icon-shouqi@2x.png);
  width: 20px;
  height: 20px;
}
</style>
<style lang="less" scoped src="../../index.less"></style>
