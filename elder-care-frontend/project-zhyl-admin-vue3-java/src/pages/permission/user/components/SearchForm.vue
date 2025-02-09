<!-- 搜索框 -->
<template>
  <!-- 表单 -->
  <div class="formBox">
    <t-form ref="form" :data="formData" :label-width="70">
      <t-row>
        <t-col>
          <t-form-item label="姓名：" name="realName">
            <t-input
              v-model="formData.realName"
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
          <t-form-item label="邮箱：" name="email">
            <t-input
              v-model="formData.email"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @enter="handleEnter"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="用户状态：" name="dataState">
            <t-select
              v-model="formData.dataState"
              class="form-item-content"
              :options="STATUS"
              placeholder="请选择"
              clearable
            />
          </t-form-item>
        </t-col>

        <t-col class="searchBtn">
          <button class="bt-grey wt-60" @click="handleReset()">重置</button>
          <button class="bt wt-60" @click="handleSearch()">搜索</button>
        </t-col>
      </t-row>
    </t-form>
  </div>
  <!-- end -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { STATUS } from '@/constants'
// 表单数据
// 目前搜索中没有角色的搜索
const formData = ref({
  realName: '',
  email: '',
  dataState: ''
})
// 触发父组件的方法
const emit: Function = defineEmits(['handleSearch', 'handleReset'])
// 搜索表单
const searchForm = {
  realName: '',
  email: '',
  dataState: ''
}
// tdesign默认输入框enter回车会触发搜索通过该方法去阻止
const handleEnter = (e, $event) => {
  $event.e.preventDefault()
}
// 重置表单
const handleReset = () => {
  formData.value = { ...searchForm }
  emit('handleSearch', formData.value)
}
// 搜索表单
const handleSearch = () => {
  emit('handleSearch', formData.value)
}
</script>

<style lang="less" scoped src="../../index.less"></style>
<style lang="less" scoped>
.bg-wt .baseList .formBox {
  margin: 0 var(--space-main) var(--space-main);
  padding: 0 0 var(--space-main);
  .t-form {
    margin: 0 -8px;
  }
  :deep(.searchBtn) {
    padding-left: 0px !important;
  }
}
</style>
