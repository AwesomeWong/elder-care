<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
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
        <!-- 充值金额 -->
        <template #rechargeAmount="{ row }">
          {{
            isDecimals(row.rechargeAmount)
              ? row.rechargeAmount
              : row.rechargeAmount + '.00'
          }}
        </template>
        <!-- end -->
        <!-- 凭证 -->
        <template #rechargeVoucher="{ row }">
          <div class="name">
            <span>
              <t-image-viewer :images="[row.rechargeVoucher]">
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image">
                    <img
                      alt="test"
                      :src="row.rechargeVoucher"
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
import { isDecimals } from '@/utils/validate'
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
  }
})
// ------定义变量------
// 行的key
const rowKey = 'index'
const emit = defineEmits(['getCurrent'])
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
