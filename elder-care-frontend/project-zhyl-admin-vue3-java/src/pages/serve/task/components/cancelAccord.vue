<!-- 护理信息 -->
<template>
  <!-- 取消信息 -->
  <t-card title="取消记录">
    <div class="info-block">
      <div class="info-item">
        <h1 class="label-wt-long">取消人：</h1>
        <span>{{ baseData.updater }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">取消时间：</h1>
        <span>{{ baseData.updateTime }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">取消原因：</h1>
        <span>{{ baseData.cancelReason }}</span>
      </div>
    </div>
  </t-card>
</template>

<script setup lang="ts">
// 获取父组件值、方法
defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
// 触发父级事件
</script>
<style lang="less" scoped>
.info-block {
  display: block;
}
</style>
