<!-- 基础表格组件 -->
<template>
  <div class="BtnList baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBulid()">按钮配置</button>
      </div>
      <t-table
        :data="listData"
        :columns="COLUMNS"
        row-key="resourceId"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="auto"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <!-- 更新时间-->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime || `2023-3-23 3:33:33` }}</span>
          </div>
        </template>
        <!-- end -->
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <a class="btn-dl btn-split-right" @click="handleClickDelete(row)"
            >删除</a
          >
          <a
            :class="`${
              row.dataState === '0' ? 'btn-dl' : ''
            } line btn-split-right`"
            @click="handleClickDisable(row)"
            >{{ row.dataState === '0' ? '禁用' : '启用' }}</a
          >
          <a
            class="font-bt btn-split-left btn-split-right"
            @click="handleSetupContract(row)"
            >编辑</a
          >

          <a class="font-bt line" @click="handleSearch">查看</a>
        </template>
        <!-- end -->
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { COLUMNS } from '../constants' // 表格列
import { getMenuList } from '@/api/permission'
// 组件
import NoData from '@/components/noData/index.vue'

const listData = ref()

const emit = defineEmits([
  'fetchData',
  'handleSetupContract',
  'handleBulid',
  'handleClickDelete',
  'handleClickDisable'
])
// 点击禁用/启用
const handleClickDisable = (row: { rowIndex: any }) => {
  emit('handleClickDisable', row, 'btn')
}
const fetchData = (val) => {
  const params = {
    parentResourceNo: val,
    resourceType: 'r'
  }
  dataLoading.value = true
  getMenuList(params as any)
    .then(async (res) => {
      if (res.code === 200) {
        listData.value = res.data
        dataLoading.value = false
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
  console.log('btn获取列表接口')
}
const handleSearch = () => {
  return MessagePlugin.info('程序员小哥哥实现中')
}
// 排序
const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
})

// 加载状态
const dataLoading = ref(false)

// 排序
const sortChange = (val: { sortBy: string }) => {
  // 将排序的结果赋值给sort
  sort.value = val
  // 调用onFilterChange方法进行排序
  onFilterChange(val)
}
// 模拟异步请求进行排序
const onFilterChange = (val: any) => {
  emit('fetchData', val)
}

// 选中的行
const selectedRowKeys = ref([1, 2])
const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val
}
// 打开编辑弹窗
const handleSetupContract = (val: any) => {
  emit('handleSetupContract', val)
}
// 点击删除
const deleteIdx = ref(-1) // 删除的索引
const handleClickDelete = (row) => {
  emit('handleClickDelete', row, 'btn')
  deleteIdx.value = row.rowIndex
}
// 点击新建
const handleBulid = (val?: Object) => {
  emit('handleBulid', val)
}
defineExpose({ fetchData })
</script>
<style lang="less" scoped src="../../index.less"></style>
<style lang="less" scoped>
.BtnList {
  flex: 1;
  :deep(.t-table th) {
    background-color: white !important;
  }
  .newBox {
    margin-top: 20px;
  }
}
</style>
