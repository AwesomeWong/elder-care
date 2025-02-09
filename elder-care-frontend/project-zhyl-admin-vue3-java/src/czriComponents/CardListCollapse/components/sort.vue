<!--排序-->
<template>
  <div class="dialogTable funBoxDialog">
    <t-dialog
      v-model:visible="dialogVisible"
      header="章排序"
      :footer="false"
      :on-close="handleClose"
      :on-confirm="handleSubmit"
      @close-btn-click="handleClose"
    >
      <div>
        <t-form ref="ruleFormRef" label-width="128px" class="demo-ruleForm">
          <t-form-item label="将本章移动至序号：" class="marg-b-0">
            <t-input-number
              v-model="num"
              :min="minNum"
              :max="itemData.length"
            ></t-input-number>
          </t-form-item>
        </t-form>
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
            class="bt wt-60"
            @click="handleSubmit"
          >
            <span>确定</span>
          </button>
        </div>
      </div>
    </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  dialogSortVisible: {
    type: Boolean,
    default: false
  },
  // 当前排序值
  sortValue: {
    type: Number,
    default: 0
  },
  // 最新值
  minNum: {
    type: Number,
    default: 0
  },
  // 当前章的总条数
  itemData: {
    type: Object,
    default: () => []
  }
})
// ------定义变量------
const emit = defineEmits(['getSortValue', 'handleClose']) // 子组件获取父组件事件传值
const num = ref(1) // 排序值
const dialogVisible = ref(false)
watch(
  () => props.dialogSortVisible,
  (newVal, oldVal) => {
    dialogVisible.value = newVal
  }
)
// ------定义方法------
// 搜索
const handleSubmit = async () => {
  emit('getSortValue', num.value)
  handleClose()
}
// 关闭弹层
const handleClose = () => {
  num.value = 1
  emit('handleClose')
}
</script>
