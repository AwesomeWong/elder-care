<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt wt-88" @click="handleBulid()">新增房型</button>
      </div>
      <t-table
        :data="data"
        :columns="COLUMNS"
        row-key="key"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="fixed"
        table-content-width="100%"
      >
        <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
        <!-- 价格 -->
        <template #price="{ row }">{{
          isDecimals(row.price) ? row.price : row.price + '.00'
        }}</template>
        <!-- end -->
        <!-- 房间图片 -->
        <template #photo="{ row }">
          <div class="name">
            <span>
              <t-image-viewer :images="[row.photo]">
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image">
                    <img
                      alt="test"
                      :src="row.photo"
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
        <!-- 更新时间-->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime }}</span>
          </div>
        </template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a
              class="btn-dl"
              :class="row.roomCount > 0 ? 'disabled' : ''"
              @click="handleClickDelete(row)"
              >删除</a
            >
            <a
              class="font-bt"
              :class="row.roomCount > 0 ? 'disabled' : ''"
              @click="handleEdit(row)"
              >编辑</a
            >
            <a
              :class="row.status === 0 ? 'font-bt' : 'btn-dl'"
              @click="handleForbidden(row)"
              >{{ row.status === 0 ? '启用' : '禁用' }}</a
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { ZoomInIcon } from 'tdesign-icons-vue-next'
import { COLUMNS } from '../constants' // 表格列
import { isDecimals } from '@/utils/validate'
import NoData from '@/components/noData/index.vue'
// 获取父级数据
const props = defineProps({
  // 列表数据
  listData: {
    type: Object,
    default: () => {
      return []
    }
  }
})
const emit = defineEmits([
  'handleEdit',
  'handleBulid',
  'handleClickDelete',
  'handleForbidden'
])
// 监听器赋值
watch(props, () => {
  data.value = props.listData
  dataLoading.value = false
})
// 表格数据
const data: any = ref([])
// 加载状态
const dataLoading = ref(true)

// 禁用
const handleForbidden = (val) => {
  emit('handleForbidden', val)
}
// 打开编辑弹窗
const handleEdit = (row) => {
  // 房间下有床位，禁止编辑
  if (row.roomCount === 0) {
    emit('handleEdit', row)
  }
}
// 点击删除
const handleClickDelete = (row) => {
  // 房间下有床位，禁止删除
  if (row.roomCount === 0) {
    emit('handleClickDelete', row)
  }
}
// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
</script>
