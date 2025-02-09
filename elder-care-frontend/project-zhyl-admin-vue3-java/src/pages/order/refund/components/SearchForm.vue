<!-- 搜索框区域 -->
<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" :label-width="70">
      <t-row>
        <t-col>
          <t-form-item label="退款编号：" name="refundNoStr">
            <t-input
              v-model="searchData.refundNoStr"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @input="handleInput"
              @blur="handleBlur"
              @clear="handleClear('refundNoStr')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="订单编号：" name="orderNo">
            <t-input
              v-model="searchData.orderNo"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('orderNo')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="申请人：" name="creator">
            <t-input
              v-model="searchData.creator"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('creator')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="申请时间：" name="timeData">
            <t-date-range-picker
              v-model="timeData"
              :placeholder="['开始日期', '结束日期']"
              clearable
              @change="handleDate"
            />
          </t-form-item>
        </t-col>
        <!-- 按钮区域 -->
        <t-col class="searchBtn">
          <button type="button" class="bt-grey wt-60" @click="handleReset()">
            重置
          </button>
          <button type="button" class="bt wt-60" @click="handleSearch()">
            搜索
          </button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { operationStatus } from '@/utils/commonData'
// 获取父组件值、方法
const props = defineProps({
  // 搜索对象
  searchData: {
    type: Object,
    default: () => ({})
  }
})
// 触发父组件的方法
const emit: Function = defineEmits([
  'handleSearch',
  'handleReset',
  'handleClear',
  'setRefundNo'
])
const form = ref(null)
const timeData = ref([]) // 时间选择
const operationData = ref([])
onMounted(() => {
  operationData.value = [...operationStatus]
  operationData.value.splice(0, 1)
  console.log(operationData.value)
  // operationData.value.splice(0, 1)
})
// 重置表单
const handleReset = () => {
  timeData.value = []
  form.value.reset()
  emit('handleReset')
}
// 搜索表单
const handleSearch = () => {
  emit('handleSearch', timeData.value)
}
const handleDate = (value, context) => {
  if (context.trigger === 'clear') {
    emit('handleClear', context.trigger)
  }
}
// 禁止舒服中文
const handleInput = (e) => {
  e.target.value = setReg(e.target.value)
  emit('setRefundNo', e.target.value)
}
const handleBlur = (val) => {
  val = val.replace(/[^0-9-]/g, '')
  emit('setRefundNo', setReg(val))
}
// 只能输入数字和-
const setReg = (val) => {
  return val.replace(/[^0-9-]/g, '')
}
// 清空
const handleClear = (v) => {
  emit('handleClear', v)
}
</script>
