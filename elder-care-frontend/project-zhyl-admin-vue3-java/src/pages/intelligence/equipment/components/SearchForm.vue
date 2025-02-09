<!-- 搜索框区域 -->
<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" :label-width="68">
      <t-row>
        <t-col>
          <t-form-item label="所属产品：" name="productKey">
            <t-select
              v-model="searchData.productKey"
              filterable
              placeholder="请选择"
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
          </t-form-item>
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
const emit: Function = defineEmits(['handleSearch'])
const form = ref(null)
// 搜索表单
const handleSearch = () => {
  emit('handleSearch')
}
</script>
