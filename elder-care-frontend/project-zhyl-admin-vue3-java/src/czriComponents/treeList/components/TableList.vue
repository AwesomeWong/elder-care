<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBox1">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBulid()">新建</button>
      </div>
      <!-- 树状列表 -->
      <t-enhanced-table
        class="treeList"
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :disable-data-page="pagination.total < 9"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :sort="sort"
        :tree="treeConfig"
        :filter-value="filterValue"
        :hide-sort-tips="true"
        :show-sort-column-bg-color="true"
        table-layout="auto"
        @page-change="onPageChange"
        @tree-expand-change="onTreeExpandChange"
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <!-- 更改树形的展开图标 -->
        <template #treeExpandAndFoldIcon="{ row, type }">
          <ChevronUpCircleIcon
            v-if="type == 'fold'"
            size="16px"
            class="tree-fold tree-icon"
          />
          <ChevronDownCircleIcon
            v-if="type == 'expand'"
            size="16px"
            class="tree-expand tree-icon"
          />
        </template>
        <!-- end -->
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
      </t-enhanced-table>
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
import { ref, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronUpCircleIcon,
  ChevronDownCircleIcon
} from 'tdesign-icons-vue-next' // 图标
import { log } from 'console'
import { COLUMNS } from '../constants' // 表头
// 接收数据
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
  'fetchData',
  'handleSetupContract',
  'handleBulid',
  'handleClickDelete'
])
// 全部数据条数
const total = ref(0)
// 树形结构配置
const treeConfig = reactive({
  childrenKey: 'list',
  treeNodeColumnIndex: 0,
  indent: 42
})
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
const lazyLoadingData = ref(null) // 懒加载数据
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
// 展开懒加载,修改展开内容的样式
const onTreeExpandChange = (context) => {
  if (context.row.list === true) {
    lazyLoadingData.value = context.row
  }
  // 修改展开内容的样式
  setTimeout(() => {
    for (
      let i = 0;
      i <= document.querySelectorAll('.t-table__tree-leaf-node').length - 1;
      i++
    ) {
      for (
        let j = 0;
        j <=
        document
          .querySelectorAll('.t-table__tree-leaf-node')
          [i].parentNode.parentNode.querySelectorAll('td').length -
          1;
        j++
      ) {
        document
          .querySelectorAll('.t-table__tree-leaf-node')
          [i].parentNode.parentNode.querySelectorAll('td')[
          j
        ].style.borderColor = 'transparent'
        document
          .querySelectorAll('.t-table__tree-leaf-node')
          [i].parentNode.parentNode.querySelectorAll('td')[j].style.height =
          '22px'
        document
          .querySelectorAll('.t-table__tree-leaf-node')
          [i].parentNode.parentNode.querySelectorAll('td')[j].style.boxSizing =
          'content-box'
        document
          .querySelectorAll('.t-table__tree-leaf-node')
          [i].parentNode.parentNode.querySelectorAll('td')[
          j
        ].style.paddingBottom = '16px'
      }
    }
    // 解决框线
    for (
      let i = 0;
      i <= document.querySelectorAll('.tree-icon').length - 1;
      i++
    ) {
      let treeDom = <any>document.querySelectorAll('.tree-icon')[i].className
      // 如果document.querySelectorAll('.tree-icon')[i]的类名包含tree-fold，则为其之后下一个兄弟节点添加样式
      if (treeDom.animVal.indexOf('tree-fold') !== -1) {
        for (
          let j = 0;
          j <=
          document
            .querySelectorAll('.tree-icon')
            [i].parentNode.parentNode.parentNode.parentNode.querySelectorAll(
              'td'
            ).length -
            1;
          j++
        ) {
          if (i < document.querySelectorAll('.tree-icon').length - 1) {
            document
              .querySelectorAll('.tree-icon')
              [
                i + 1
              ].parentNode.parentNode.parentNode.parentNode.querySelectorAll(
                'td'
              )[j].style.borderTop = '1px solid var(--color-border)'
          } else {
            // 解决最后一行框线
            for (
              let i = 0;
              i <=
              document.querySelectorAll('.t-table__tree-leaf-node').length - 1;
              i++
            ) {
              for (
                let j = 0;
                j <=
                document
                  .querySelectorAll('.t-table__tree-leaf-node')
                  [i].parentNode.parentNode.querySelectorAll('td').length -
                  1;
                j++
              ) {
                document
                  .querySelectorAll('.t-table__tree-leaf-node')
                  [
                    document.querySelectorAll('.t-table__tree-leaf-node')
                      .length - 1
                  ].parentNode.parentNode.querySelectorAll('td')[
                  j
                ].style.borderBottom = '1px solid var(--color-border)'
              }
            }
          }
          let parentDom = <any>(
            document.querySelectorAll('.tree-icon')[i].parentNode.parentNode
              .parentNode.parentNode.nextSibling
          )
          parentDom.querySelectorAll('td')[j].style.paddingTop = '16px'
        }
      }
      if (i < document.querySelectorAll('.tree-icon').length - 1) {
        let treeDom1 = <any>(
          document.querySelectorAll('.tree-icon')[i + 1].className
        )
        if (
          treeDom.animVal.indexOf('tree-expand') !== -1 &&
          treeDom1.animVal.indexOf('tree-expand') !== -1
        ) {
          for (
            let j = 0;
            j <=
            document
              .querySelectorAll('.tree-icon')
              [i].parentNode.parentNode.parentNode.parentNode.querySelectorAll(
                'td'
              ).length -
              1;
            j++
          ) {
            document
              .querySelectorAll('.tree-icon')
              [
                i + 1
              ].parentNode.parentNode.parentNode.parentNode.querySelectorAll(
                'td'
              )[j].style.borderTop = 'none'
          }
        }
      }
    }
    const timer = setTimeout(() => {
      lazyLoadingData.value = null
      clearTimeout(timer)
    }, 50)
  }, 30)
}
// 切换分页
const onPageChange = (val) => {
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
}
:deep(table tr td) {
  height: 48px;
  &:first-child {
    padding-left: 18px;
  }
}
:deep(.t-table__row-full-element) {
  padding-left: 24px;
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
.tree-icon {
  color: var(--color-bk4);
}
.t-table__tree-leaf-node {
  // 调整父级的父级的样式
  &:parent {
    font-size: 12px;
  }
}
:deep(.t-table td) {
  box-sizing: content-box;
}
:deep(.t-table--column-fixed .t-table__cell--fixed-right) {
  min-width: 125px;
}
</style>
