<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBox1">
      <!-- 新建按钮区域 -->
      <div class="newBox">
        <switchBar :data="tableBar" @changeId="changeId"></switchBar>
        <button class="bt newBoxbutton" @click="handleBulid()">新建</button>
      </div>
      <!-- 表格区域 -->
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
        @filter-change="FilterChange"
        @page-change="onPageChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <!-- 添加昵称 -->
        <template #name="{ row }">
          <div class="name">
            <span>
              <t-image-viewer :images="[row.headPortrait]">
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image">
                    <img
                      alt="test"
                      :src="row.headPortrait"
                      class="tdesign-demo-image-viewer__ui-image--img"
                    />
                    <div
                      class="tdesign-demo-image-viewer__ui-image--hover"
                      @click="open"
                    >
                      <!-- <span><browse-icon size="1.4em" /> 预览</span> -->
                    </div>
                  </div>
                </template>
              </t-image-viewer>
            </span>
            <span>{{ row.name }}</span>
          </div>
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
        <!-- 在表格中添加自定义列 -->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime }}</span>
          </div>
        </template>
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
import switchBar from '@/components/switchBar/switchBar.vue'
// tab切换组件
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
// 可用数据条数
const available = ref(0)
// 不可用数据条数
const unavailable = ref(0)

// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
  total.value = props.listData.length
  // 获取可用数据条数，为status为1和2的数据条数
  available.value = props.listData.filter(
    (item) => item.status === 1 || item.status === 2
  ).length
  if (available.value === 0) {
    available.value = Math.floor(
      Math.random() * (total.value - available.value)
    )
  }
  unavailable.value = total.value - available.value
  dataLoading.value = false
})
// 路由
const router = useRouter()
// 排序
const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
}) // 排序
// 表格数据
const data: any = ref([])
// 分页器数据
const pagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})

const rowKey = 'index' // 行的key
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

// 控制弹窗
// tab数据
const tableBar = ref([
  {
    name: '全部',
    id: '2',
    value: total
  },
  {
    name: '可用',
    id: '1',
    value: available
  },
  {
    name: '停用',
    id: '3',
    value: unavailable
  }
])

// tab切换
const changeId = (val: number) => {
  if (val === 1) {
    emit('fetchData', 1)
  } else if (val === 3) {
    emit('fetchData', 3)
  } else {
    emit('fetchData', 2)
  }
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
}
</style>
