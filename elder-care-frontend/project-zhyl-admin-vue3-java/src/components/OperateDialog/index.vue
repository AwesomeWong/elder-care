<!--操作弹层-->
<template>
  <div class="deleteDialog baseDialog">
    <t-dialog
      v-model:visible="dialogVisible"
      :header="title ? title : '确认删除'"
      :footer="false"
      :on-close="handleClose"
      :on-confirm="handleSubmit"
    >
      <div v-if="title === '确认驳回'">
        驳回申请后，该流程将自动驳回至发起人，是否继续？
      </div>
      <div v-else-if="title === '确认提交'">
        账单审批通过后，应退金额不可再次修改。完成退款操作后，退款金额将退到预缴款余额中，最终随退住办理完结时一起退还给老人，是否确定提交账单？
      </div>
      <div v-else-if="title === '确认返回'">
        信息未填写完整，离开当前页面数据将不会保存，是否继续？
      </div>
      <div v-else-if="title === '确认拒绝'">
        拒绝审批后，此流程将自动结束，无法进行流转，是否继续？
      </div>
      <div v-else-if="title === '确认修改'">
        密码修改成功后，需重新登录，是否继续？
      </div>
      <div v-else>
        <div v-if="text">此操作将{{ text }}，是否继续？</div>
        <div v-else>此操作将删除该{{ deleteText }}，是否继续？</div>
      </div>

      <!-- 此操作将永久删除这条信息，是否继续？ -->
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
  text: {
    type: String,
    default: ''
  },
  deleteText: {
    type: String,
    default: ''
  }
})
// ------定义变量------
const emit = defineEmits(['handleClose', 'handleDelete']) // 子组件获取父组件事件传值
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
  emit('handleDelete')
}
</script>
