<!-- 基础表格组件 需要注意的是此页面的操作按钮都是权限配置的，用v-hasRole 来控制-->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button v-hasRole="['新增']" class="bt wt-120" @click="handleBulid()">
          新增护理项目
        </button>
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
        <!-- 价格 -->
        <template #price="{ row }">{{
          isDecimals(row.price) ? row.price : row.price + '.00'
        }}</template>
        <!-- end -->
        <!-- 图片 -->
        <template #image="{ row }">
          <div class="name">
            <span>
              <t-image-viewer :images="[row.image]">
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image">
                    <img
                      alt="test"
                      :src="row.image"
                      class="tdesign-demo-image-viewer__ui-image--img"
                    />
                    <div
                      class="tdesign-demo-image-viewer__ui-image--hover"
                      @click="open"
                    >
                      <ZoomInIcon size="1.4em" />
                    </div>
                  </div>
                </template>
              </t-image-viewer>
            </span>
          </div>
        </template>
        <!-- 操作栏 -->
        <template #op="{ row }">
          <!-- 如果此项目被计划绑定了，禁止，增删改查 -->
          <div class="operateCon">
            <a
              v-hasRole="['删除']"
              class="btn-dl"
              :class="row.count > 0 ? 'disabled' : ''"
              @click="handleClickDelete(row)"
              >删除</a
            >
            <a
              v-hasRole="['编辑']"
              class="font-bt"
              :class="row.count > 0 ? 'disabled' : ''"
              @click="handleEdit(row)"
              >编辑</a
            >
            <a
              v-hasRole="['禁用']"
              class="delete"
              :class="
                row.count > 0 && row.status === 1
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
import { ZoomInIcon } from 'tdesign-icons-vue-next'
import { COLUMNS } from '../constants' // 表格列
import NoData from '@/components/noData/index.vue'
import { isDecimals } from '@/utils/validate'

const props = defineProps({
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  pagination: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 加载状态
  dataLoading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits([
  'handleEdit',
  'handleBulid',
  'handleClickDelete',
  'handleForbidden',
  'getCurrent'
])
// ------定义变量------
// 行的key
const rowKey = 'index'

// 禁用
const handleForbidden = (row) => {
  if (row.count === 0 || row.count == undefined) {
    emit('handleForbidden', row)
  }
}
// 打开编辑弹窗
const handleEdit = (row) => {
  if (row.count === 0 || row.count == undefined) {
    emit('handleEdit', row)
  }
}
// 点击删除
const handleClickDelete = (row) => {
  if (row.count === 0 || row.count == undefined) {
    emit('handleClickDelete', row)
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
