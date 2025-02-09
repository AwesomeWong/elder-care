<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt wt-120" @click="handleBulid()">新增护理计划</button>
      </div>
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="fixed"
        table-content-width="100%"
      >
        <!-- 序号 -->
        <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a
              class="btn-dl"
              :class="row.count ? 'disabled' : ''"
              @click="handleClickDelete(row)"
              >删除</a
            >
            <a
              class="font-bt"
              :class="row.count ? 'disabled' : ''"
              @click="handleEdit(row)"
              >编辑</a
            >
            <a class="font-bt" @click="handleLook(row)">查看</a>
            <a
              class="delete"
              :class="
                row.count && row.status === 1
                  ? 'disabled btn-dl'
                  : row.status === 1
                  ? 'btn-dl'
                  : 'font-bt'
              "
              @click="handleForbidden(row)"
              >{{ row.status === 1 ? '禁用' : '启用' }}</a
            >
          </div>
        </template>
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-table>
      <!-- 分页 -->
      <t-pagination
        v-if="total > 10"
        v-model="pagination.pageNum"
        v-model:pageSize="pagination.pageSize"
        :total="total"
        @change="onPageChange"
      />
      <!-- end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { COLUMNS } from '../constants' // 表格列
import NoData from '@/components/noData/index.vue'

// 获取父级数据
const props = defineProps({
  // 列表数据
  listData: {
    type: Object,
    default: () => {
      return []
    }
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  // 分页
  pagination: {
    type: Object,
    default: () => ({})
  },
  // 加载状态
  dataLoading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits([
  'getCurrent',
  'handleEdit',
  'handleBulid',
  'handleClickDelete',
  'handleForbidden',
  'handleLook'
])
// 监听器赋值
watch(props, (val) => {
  data.value = props.listData
})
// ------定义变量------
// 表格数据
const data: any = ref([])
// 行的key
const rowKey = 'index'
// 禁用
const handleForbidden = (val) => {
  if (!val.count) {
    emit('handleForbidden', val)
  }
}
// 打开编辑弹窗
const handleEdit = (val) => {
  if (!val.count) {
    emit('handleEdit', val)
  }
}
// 查看
const handleLook = (val) => {
  emit('handleLook', val.id)
}
// 点击删除
const handleClickDelete = (val) => {
  if (!val.count) {
    emit('handleClickDelete', val)
  }
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
</script>
