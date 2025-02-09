<!-- tab栏切换组件 -->
<template>
  <div class="sw-box">
    <span
      v-for="(item, index) in data"
      :key="index"
      :class="{ title: true, line: currentId == index }"
      @click="changeId(item.id, index)"
      >{{ item.name
      }}<span v-if="item.value" class="value">{{ item.value }}</span></span
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Type from './type'

// 父组件传值
const props = defineProps({
  data: {
    type: Array<Type>,
    default: []
  }
})
// 触发父组件事件
const emit: Function = defineEmits(['changeId'])
// 当前选中id
const currentId = ref(0)
// 点击切换
const changeId = (id, index) => {
  currentId.value = index
  emit('changeId', id)
}
// 向父组件暴露数据与方法
defineExpose({
  currentId
})
</script>
<style lang="less" scoped>
// tab栏
.sw-box {
  font-family: PingFangSC-SNaNpxibold;
  font-weight: 400;
  font-size: 16px;
  color: var(--color-bk3);
  background-color: #f2f2f2;
  height: 38px;
  display: flex;
  align-items: center;
  // width: 300px;
  border-radius: 2px;
  padding-left: 5px;
  padding-right: 5px;
  .title {
    margin-right: 40px;
    position: relative;
    cursor: pointer;
    width: 98px;
    margin-right: 0;
    color: #999;
    font-size: 14px;
    // 左右居中
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: var(--color-main);
    }
  }
  .line {
    color: var(--color-main);
    height: 28px;
    line-height: 28px;
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    font-weight: 500;
    color: var(--color-bk2) !important;
  }
}
.value {
  margin-left: 5px;
}
</style>
