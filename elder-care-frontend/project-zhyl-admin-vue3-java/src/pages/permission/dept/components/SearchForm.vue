<!-- 搜索框区域 -->
<template>
  <div class="formBox">
    <t-form ref="form" :data="formData" :label-width="70">
      <t-row>
        <t-col>
          <t-form-item label="部门名称：" name="name">
            <t-input
              v-model="formData.deptName"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              :maxlength="10"
              @enter="handleEnter"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="部门状态：" name="status">
            <t-select
              v-model="formData.dataState"
              class="form-item-content"
              :options="STATUS"
              placeholder="请选择"
              clearable
            />
          </t-form-item>
        </t-col>
        <!-- 按钮区域 -->
        <t-col class="searchBtn">
          <button class="bt-grey wt-60" @click="handleReset()">重置</button>
          <button class="bt wt-60" @click="handleSearch()">搜索</button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { STATUS } from '@/constants'

// 表单数据
const formData = ref({
  deptName: '',
  dataState: ''
})
// 触发父组件的方法
const emit: Function = defineEmits(['handleSearch', 'handleReset'])

const searchForm = {
  deptName: '',
  dataState: ''
}
// tdesign默认输入框enter回车会触发搜索通过该方法去阻止
const handleEnter = (e, $event) => {
  $event.e.preventDefault()
}
// 重置表单
const handleReset = () => {
  formData.value = { ...searchForm }
  emit('handleReset', formData.value)
}
// 搜索表单
const handleSearch = () => {
  emit('handleSearch', formData.value)
}
</script>
<style lang="less" scoped>
.formBox .t-row > div.t-col:last-child {
  max-width: 250px !important;
}
</style>
<style lang="less" scoped src="../../index.less"></style>
