<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        所属产品：
        <t-select
          v-model="productKey"
          filterable
          placeholder="请选择"
          class="wt-300"
          @change="handleSearch"
        >
          <t-option
            v-for="(item, index) in productData"
            :key="index"
            :value="item.productKey"
            :label="item.productName"
            title=""
          ></t-option>
        </t-select>
        <button class="bt wt-120" @click="handleBulid()">新增设备</button>
      </div>
      <t-table
        :data="listData"
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
        <!-- 接入位置 -->
        <template #remark="{ row }">
          {{ getStr(row.remark) }}
        </template>
        <!-- end -->
        <!-- 设备状态 -->
        <!-- <template #deviceStatus="{ row }">
          <span v-if="row.deviceStatus === 'ONLINE'">在线</span>
          <span v-else-if="row.deviceStatus === 'OFFLINE'">离线</span>
          <span v-else-if="row.deviceStatus === 'UNACTIVE'">未激活</span>
          <span v-else>已禁用</span>
        </template> -->
        <!-- end -->
        <template #creator="{ row }">
          {{ row.creator ? row.creator : '--' }}
        </template>
        <!-- 操作栏 -->
        <!-- 节点类型 -->
        <template #type="{ row }"> 直连设备 </template>
        <!-- end -->
        <!-- 节点类型 -->
        <template #utcModified="{ row }">{{
          row.utcModified !== undefined ? getTateDt(row.utcModified) : '--'
        }}</template>
        <!-- end -->
        <template #op="{ row }">
          <div class="operateCon">
            <a class="btn-dl" @click="handleClickDelete(row)">删除</a>
            <a class="font-bt" @click="handleEdit(row)">编辑</a>
            <a class="font-bt" @click="handleOpen(row)">查看</a>
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
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { COLUMNS } from '../constants' // 表格列
import { getTateDt } from '@/utils/date'
import { getStr } from '@/utils/index'
// 组件
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
  },
  // 所属产品
  productData: {
    type: Array,
    default: () => []
  }
})
// 监听父级传过来的数据
watch(props, (val) => {
  productKey.value = val.pagination.productKey
})
// ------定义变量------
const router = useRouter() // 获取全局
const productKey = ref('') // 产品key
// 行的key
const rowKey = 'index'
const emit = defineEmits([
  'handleOpen',
  'getCurrent',
  'handleEdit',
  'handleBulid',
  'handleClickDelete',
  'handleSearch'
])
// 打开编辑弹窗
const handleEdit = (val) => {
  emit('handleEdit', val)
}
// 点击删除
const handleClickDelete = (row) => {
  emit('handleClickDelete', row)
}
// 打开操作弹窗
const handleOpen = (val) => {
  router.push({
    path: `/intelligence/equiDetails`,
    query: { iotId: val.iotId, productKey: val.productKey }
  })
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
const handleSearch = () => {
  emit('handleSearch', productKey.value)
}
</script>
