<!-- 搜索框区域 -->
<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" :label-width="98">
      <t-row>
        <t-col>
          <t-form-item label="报警规则名称：" name="alertRuleName">
            <t-input
              v-model="searchData.alertRuleName"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('alertRuleName')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="所属产品：" name="productKey">
            <t-select
              v-model="searchData.productKey"
              clearable
              filterable
              placeholder="请选择"
              @clear="handleClear('productKey')"
            >
              <t-option
                v-for="(item, index) in productData"
                :key="index"
                :value="item.productKey"
                :label="item.productName"
                title=""
              ></t-option>
            </t-select>
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="功能名称：" name="functionName">
            <t-input
              v-model="searchData.functionName"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('functionName')"
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
import { ref } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  // 搜索对象
  searchData: {
    type: Object,
    default: () => ({})
  },
  // 所属产品
  productData: {
    type: Array,
    default: () => []
  }
})
// 触发父组件的方法
const emit: Function = defineEmits([
  'handleSearch',
  'handleReset',
  'handleClear'
])
const form = ref(null)
// 重置表单
const handleReset = () => {
  form.value.reset()
  emit('handleReset')
}
// 搜索表单
const handleSearch = () => {
  emit('handleSearch')
}
// 清空
const handleClear = (v) => {
  emit('handleClear', v)
}
</script>
