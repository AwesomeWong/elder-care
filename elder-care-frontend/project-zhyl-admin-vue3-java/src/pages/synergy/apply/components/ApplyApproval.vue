<!-- 申请审批  -->
<template>
  <div class="applyBaseInfo appluW">
    <!-- 审批结果 -->
    <t-card :title="title">
      <ApplyTip :base-data="baseData"></ApplyTip>
      <div class="applyRecord">
        <div class="titRecord">操作记录</div>
        <ApplyRecord :base-data="baseData"></ApplyRecord>
      </div>
    </t-card>
    <!-- end -->
  </div>
</template>
<script setup lang="ts">
// 申请审批提示
import ApplyTip from '@/components/ApplyTip/index.vue'
// 申请操作记录
import ApplyRecord from '@/components/ApplyRecord/index.vue'

// 获取父组件值、方法
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  active: {
    type: Number,
    default: 0
  }
})
</script>
