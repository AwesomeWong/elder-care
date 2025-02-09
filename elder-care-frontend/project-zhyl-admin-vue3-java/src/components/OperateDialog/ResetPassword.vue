<!--操作弹层-->
<template>
  <div class="deleteDialog baseDialog">
    <t-dialog
      v-model:visible="dialogVisible"
      :footer="false"
      :on-close="handleClose"
    >
      <template #header>
        <!-- 自定义头部内容 -->
        <div class="custom-header">
          <!-- 插槽内容 -->
          <slot name="header">
            <!-- 默认的头部内容 -->
            <img src="@/assets/info-circle-filled@2x.png" alt="" />
            <h3 class="default-header">密码重置成功！</h3>
          </slot>
        </div>
      </template>
      <div class="content">
        密码已经初始化为“888itcast.CN764%…”，用户可登录养老系统进行修改。
      </div>
      <!-- 此操作将永久删除这条信息，是否继续？ -->
      <div class="dialog-footer">
        <button
          theme="primary"
          type="submit"
          class="bt wt-88"
          @click="handleClose"
        >
          <span>我知道了</span>
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
  }
})
// ------定义变量------
const emit = defineEmits(['handleClose']) // 子组件获取父组件事件传值
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
</script>
<style lang="less" scoped>
.custom-header {
  display: flex;
  align-items: center;
  .default-header {
    font-family: PingFangSC-SNaNpxibold;
    font-weight: 600;
    font-size: 16px;
    color: var(--color-black);
  }
  img {
    width: 21px;
    height: 21px;
    margin-right: 10px;
  }
}
.content {
  padding-left: 30px;
}
</style>
