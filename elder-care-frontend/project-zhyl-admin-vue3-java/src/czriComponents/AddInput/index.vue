<!--动态添加input-->
<template>
  <div v-for="(item, i) in baseData" :key="i" class="addInput">
    <t-input
      v-model="item.n"
      class="input-w"
      clearable
      placeholder="请输入内容"
    />
    <icon
      v-if="baseData.length > 1"
      name="minus-rectangle"
      @click="handleDelete(item)"
    />
    <icon v-if="i === 0" name="add-rectangle" @click="handleAdd" />
  </div>
</template>
<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next'
// 获取父组件值、方法
const props = defineProps({
  // 要添加的动态数据
  baseData: {
    type: Array<Object | any>,
    default: () => []
  }
})
// ------定义变量------
const emit = defineEmits(['handleInputAdd', 'handleInputDelete']) // 子组件获取父组件事件传值
// ------定义方法------
// 删除
const handleDelete = (val: any) => {
  const data = props.baseData
  const i = data.findIndex((item: any) => item.n === val.n && item.v === val.v)
  data.splice(i, 1)
  emit('handleInputDelete', data)
}
// 添加
const handleAdd = () => {
  const data = { n: '', v: '' }
  emit('handleInputAdd', data)
}
</script>
