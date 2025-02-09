<!--操作弹层-->
<template>
  <div class="deleteDialog baseDialog">
    <t-dialog
      v-model:visible="dialogVisible"
      :header="dataState === '0' ? '确认禁用' : '确认启用'"
      :footer="false"
      :on-close="handleClose"
      :on-confirm="handleSubmit"
    >
      <div v-if="dataState === '0'">禁用后将无法展现，是否继续？</div>
      <div v-else>启用后将进行展现，是否继续？</div>
      <div class="dialog-footer">
        <button
          theme="primary"
          type="submit"
          class="bt-grey wt-60"
          @click="handleClose"
        >
          <span>取消</span>
        </button>
        <button
          theme="primary"
          type="submit"
          class="bt wt-60 auto"
          @click="handleSubmit"
        >
          <span>{{ confirmText ? confirmText : '确定' }}</span>
        </button>
      </div>
    </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  dataState: {
    type: String,
    default: '0'
  },
  confirmText: {
    type: String,
    default: ''
  }
})
// ------定义变量------
const emit = defineEmits(['handleClose', 'handleClick']) // 子组件获取父组件事件传值
const dialogVisible = ref(false)
watch(
  () => props.visible,
  (newVal) => {
    dialogVisible.value = newVal
  }
)
// ------定义方法------
// 关闭弹层
const handleClose = () => {
  emit('handleClose')
}
// 提交确定删除
const handleSubmit = () => {
  emit('handleClick')
}
</script>
