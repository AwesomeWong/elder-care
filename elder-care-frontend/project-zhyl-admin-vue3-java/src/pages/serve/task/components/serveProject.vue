<!-- 护理项目 -->
<template>
  <!-- 护理项目 -->
  <t-card title="护理项目" :class="baseData.status === 1 ? 'noBottomLine' : ''">
    <div class="info-block">
      <div class="info-item">
        <h1 class="label-wt-long">护理项目名称：</h1>
        <span>{{ baseData.projectName }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">关联单据：</h1>
        <span>{{ baseData.relNo }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">执行状态：</h1>
        <span>{{
          baseData.status === 1
            ? '待执行'
            : baseData.status === 2
            ? '已执行'
            : '已取消'
        }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">项目类型：</h1>
        <span>{{ baseData.taskType === 2 ? '护理计划内' : '护理计划外' }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">创建人：</h1>
        <span>{{ baseData.taskType === 2 ? '系统' : baseData.creator }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">创建时间：</h1>
        <span>{{ baseData.createTime }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">期望服务时间：</h1>
        <span>{{ baseData.estimatedServerTime }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">备注信息：</h1>
        <span>{{ baseData.remark || '--' }}</span>
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
.noBottomLine {
  :deep(.t-card__body) {
    border-bottom: none !important;
  }
}
</style>
