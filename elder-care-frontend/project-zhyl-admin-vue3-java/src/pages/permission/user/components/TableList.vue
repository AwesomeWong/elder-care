<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBulid()">新增用户</button>
      </div>
      <!-- 表格 -->
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :sort="sort"
        :filter-value="filterValue"
        :hide-sort-tips="true"
        :show-sort-column-bg-color="true"
        table-layout="auto"
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <!-- 描述 -->
        <template #description="{ row }">
          <div
            :class="{
              description: true,
              descriptionheight: row.description.length > 18
            }"
          >
            <span>{{ row.description }}</span>
            <span v-if="row.description.length > 36" class="hover">{{
              row.description
            }}</span>
          </div>
        </template>
        <!-- end -->
        <!-- 更新时间-->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime }}</span>
          </div>
        </template>
        <!-- end -->
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <a class="btn-dl btn-split-right" @click="delHandel(row)">删除</a>
          <a
            :class="`${
              row.dataState === '0' ? 'btn-dl' : ''
            } line btn-split-right font-bt`"
            @click="handleClickDisable(row)"
            >{{ row.dataState === '0' ? '禁用' : '启用' }}</a
          >
          <a class="font-bt line" @click="handleSetupContract(row)">编辑</a>
          <a class="font-bt btn-split-left" @click="restPasswordHandle(row)"
            >重置密码</a
          >
        </template>
        <!-- end -->
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-table>
      <!-- 分页 -->
      <t-pagination
        v-if="pagePagination.total > 10"
        v-model="pagePagination.pageNum"
        v-model:pageSize="pagePagination.pageSize"
        :total="pagePagination.total"
        @change="onPageChange"
      />
      <!-- end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { COLUMNS } from '../constants'
// 组件
import NoData from '@/components/noData/index.vue'

const props = defineProps({
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  pagination: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// 触发父组件事件
const emit = defineEmits([
  'getTreeData',
  'handleSetupContract',
  'handleBulid',
  'handleClickDelete',
  'getCurrent',
  'handleClickDisable',
  'handleRestPassword'
])
// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagePagination.value = props.pagination
  dataLoading.value = false
})

const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
}) // 排序
const data: any = ref([])
// 分页
const pagePagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
// 行的key
const rowKey = 'index'
// 过滤
const filterValue = ref({
  status: ''
})
// 加载状态
const dataLoading = ref(true)

// 排序
const sortChange = (val) => {
  // 将排序的结果赋值给sort
  sort.value = val
  // 调用onFilterChange方法进行排序
  onFilterChange()
}
// 模拟异步请求进行排序
const onFilterChange = () => {
  emit('getTreeData')
}
// 筛选
const FilterChange = (val) => {
  ONFilterChange(val)
}
// 模拟异步请求进行筛选
const ONFilterChange = (val) => {
  emit('getTreeData', val)
}
// 点击启用禁用
const handleClickDisable = (params) => {
  emit('handleClickDisable', params)
}
// 重置密码
const restPasswordHandle = (row) => {
  emit('handleRestPassword', row.id)
}
// 选中的行
const selectedRowKeys = ref([1, 2])
const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val
}
// 打开编辑弹窗
const handleSetupContract = (val) => {
  emit('handleSetupContract', val)
}
// 点击删除
const deleteIdx = ref(-1) // 删除的索引
const delHandel = (row: { rowIndex: any }) => {
  emit('handleClickDelete', row)
  deleteIdx.value = row.rowIndex
}

// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
// 点击翻页
const onPageChange = (val) => {
  emit('getCurrent', val)
}
</script>
<style lang="less" scoped src="../../index.less"></style>
<style lang="less" scoped>
.t-table {
  min-width: 700px;
  max-width: calc(100vw - 520px);
}
:deep(.t-table__pagination) {
  width: calc(100% - 230px);
}
.bg-wt .baseList .tableBoxs {
  padding: 0;
}
.baseList .newBoxbutton:hover {
  color: #fff !important;
}
</style>
