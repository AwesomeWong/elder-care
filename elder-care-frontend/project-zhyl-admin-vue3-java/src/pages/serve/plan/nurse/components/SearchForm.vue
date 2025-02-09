<!-- 搜索框区域 -->
<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" :label-width="98">
      <t-row>
        <t-col>
          <t-form-item label="护理计划名称：" name="name">
            <t-input
              v-model="searchData.name"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('name')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="状态：" name="status">
            <t-select
              v-model="searchData.status"
              clearable
              filterable
              placeholder="请选择"
              @clear="handleClear('status')"
            >
              <t-option
                v-for="(item, index) in statusData"
                :key="index"
                :value="item.id"
                :label="item.value"
                title=""
              ></t-option>
            </t-select>
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
import { statusData } from '@/utils/commonData'
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
