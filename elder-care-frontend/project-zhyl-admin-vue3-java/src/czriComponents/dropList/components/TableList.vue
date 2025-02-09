<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBox1">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBulid()">新建</button>
      </div>
      <!-- 表格 -->
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :pagination="pagination"
        :disable-data-page="pagination.total <= 10"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :sort="sort"
        :filter-value="filterValue"
        :hide-sort-tips="true"
        :show-sort-column-bg-color="true"
        table-layout="auto"
        :expand-icon="expandIcon"
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @page-change="onPageChange"
        @select-change="rehandleSelectChange"
        @expand-change="rehandleExpandChange"
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
        <!-- 在表格中添加自定义列 -->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime }}</span>
          </div>
        </template>
        <!-- end -->
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <a class="btn-dl btn-split-right" @click="handleClickDelete(row)"
            >删除</a
          >
          <a class="font-bt line" @click="handleSetupContract(row)">编辑</a>
          <a class="font-bt btn-split-left" @click="handleClickDetail()"
            >查看</a
          >
        </template>
        <!-- end -->
        <!-- 展开 -->
        <template #expandedRow="{ row }">
          <div class="more-detail">
            <p>
              规则编号：<span>{{ row.index }}</span>
            </p>
            <p>
              规则名称：<span>{{ row.name }}</span>
            </p>
            <p>
              规则描述：<span>{{ row.description }}</span>
            </p>
          </div>
        </template>
        <!-- end -->
      </t-table>
      <!-- end -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListBase'
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { COLUMNS } from '../constants'
// 父组件传值
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
// 触发父组件
const emit = defineEmits([
  'fetchData',
  'handleSetupContract',
  'handleBulid',
  'handleClickDelete'
])
// 全部数据条数
const total = ref(0)
// 选中的行
const expandedRowKeys = ref([])
// 图标
const expandIcon = ref(true)
// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
  total.value = props.listData.length
  dataLoading.value = false
})
// 路由
const router = useRouter()
// 排序
const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
}) // 排序
const data: any = ref([])
// 分页
const pagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})

const rowKey = 'index' // 行的key
// 筛选
const filterValue = ref({
  status: ''
}) // 过滤
// 加载状态
const dataLoading = ref(true)

// 排序
const sortChange = (val) => {
  // 将排序的结果赋值给sort
  sort.value = val
  // 调用onFilterChange方法进行排序
  onFilterChange(val)
}
// 模拟异步请求进行排序
const onFilterChange = (val) => {
  emit('fetchData', val)
}
// 筛选
const FilterChange = (val) => {
  ONFilterChange(val)
}
// 模拟异步请求进行筛选
const ONFilterChange = (val) => {
  emit('fetchData', val)
}

// 选中的行
const selectedRowKeys = ref([1, 2])
const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val
}
// 点击查看详情
const handleClickDetail = () => {
  router.push('/detail/base')
}
// 打开编辑弹窗
const handleSetupContract = (val) => {
  emit('handleSetupContract', val)
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
// 展开列表
const rehandleExpandChange = (value, params) => {
  expandedRowKeys.value = value
}
// 点击翻页
const onPageChange = (val) => {
  pagination.value.defaultCurrent = val.current
  emit('fetchData', val)
}
</script>
<style lang="less" scoped src="../index.less"></style>
<style lang="less" scoped>
.newBox {
  margin-bottom: 16px;
  display: flex;
  .newBoxbutton {
    // 右对齐
    margin-left: auto;
    width: 88px;
    height: 32px;
    // 下对齐
    margin-bottom: auto;
    margin-top: auto;
  }
}
:deep(.t-table) {
  // min-width: 1000px;
  .t-table__expandable-icon-cell + td,
  .t-table__selection-cell + td,
  .t-table__expandable-icon-cell + th,
  .t-table__selection-cell + th td {
    padding-left: 20px !important;
  }
  td {
    padding-left: var(--space-main);
    padding-right: 10px;
  }
}
:deep(.t-table__row-full-element) {
  padding-left: 46px;
}
// 默认状态箭头指向
:deep(.t-table__expand-box) {
  transform: rotate(90deg);
  &:hover {
    color: var(--color-main);
  }
}
// 展开状态箭头指向
:deep(.t-positive-rotate-90) {
  transform: rotate(270deg);
}
.more-detail {
  padding-top: 4px;
  padding-bottom: 4px;
  p {
    color: var(--color-bk2);
    font-weight: 500;
    span {
      color: var(--color-bk3);
      font-weight: normal;
    }
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
