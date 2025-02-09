<!-- 申请操作记录  -->
<template>
  <!-- 退住逻辑 -->
  <div v-if="baseData.type === 1">
    <t-steps
      layout="vertical"
      :current="
        baseData.accraditationRecords
          ? String(baseData.accraditationRecords.length)
          : null
      "
      readonly
    >
      <t-step-item
        v-for="(item, index) in baseData.accraditationRecords"
        :key="index"
        title=""
        content=""
        :class="
          item.auditStatus === 2
            ? 'stepRefuse'
            : item.auditStatus === 3 ||
              item.auditStatus === 4 ||
              item.auditStatus === 5
            ? 'stepTurn'
            : ''
        "
      >
        <template #title>
          {{ item.currentStep }}<span class="time">{{ item.createTime }}</span>
        </template>
        <template #content>
          <div class="userInfo">
            {{ item.approverName }}
            <span v-if="item.currentStep === '发起申请-申请退住'"
              >(已发起)</span
            >
            <span v-if="item.handleType === 0 && item.auditStatus === 1"
              >(已通过)</span
            >
            <span
              v-if="
                item.handleType === 1 &&
                item.auditStatus === 1 &&
                item.currentStep !== '发起申请-申请退住'
              "
              >(已处理)</span
            >
            <span v-if="item.auditStatus === 2">(已拒绝)</span>
            <span v-if="item.auditStatus === 3">(已驳回)</span>
            <span v-if="item.auditStatus === 4">(已撤回)</span>
            <span v-if="item.auditStatus === 5">(已撤销)</span>
          </div>
          <div
            v-if="
              (item.opinion &&
                item.auditStatus === 1 &&
                item.handleType === 0) ||
              item.auditStatus === 2 ||
              item.auditStatus === 3
            "
            class="applyOpinion"
          >
            {{ item.opinion }}
          </div>
        </template>
      </t-step-item>

      <t-step-item v-if="lastData && lastData.nextStep" class="stepApprove">
        <template #title> {{ lastData.nextStep }}</template>

        <template #content>
          <div class="userInfo">
            {{ lastData.nextApprover }}（{{
              baseData.retreat.flowStatus === 1 ||
              baseData.retreat.flowStatus === 4 ||
              baseData.retreat.flowStatus === 5
                ? '审批中'
                : '处理中'
            }}）
          </div>
        </template>
      </t-step-item>
    </t-steps>
  </div>
  <!-- 入住逻辑 -->
  <div v-if="baseData.type === 3">
    <t-steps
      layout="vertical"
      :current="
        baseData.accraditationRecords
          ? String(baseData.accraditationRecords.length)
          : null
      "
      readonly
    >
      <t-step-item
        v-for="(item, index) in baseData.accraditationRecords"
        :key="index"
        title=""
        content=""
        :class="
          item.auditStatus === 2
            ? 'stepRefuse'
            : item.auditStatus === 3 ||
              item.auditStatus === 4 ||
              item.auditStatus === 5
            ? 'stepTurn'
            : ''
        "
      >
        <template #title>
          {{ item.currentStep }}<span class="time">{{ item.createTime }}</span>
        </template>
        <template #content>
          <div class="userInfo">
            {{ item.approverName }}
            <span v-if="item.currentStep === '发起申请-申请入住'"
              >(已发起)</span
            >
            <span v-if="item.handleType === 0 && item.auditStatus === 1"
              >(已通过)</span
            >
            <span
              v-if="
                item.handleType === 1 &&
                item.auditStatus === 1 &&
                item.currentStep !== '发起申请-申请入住'
              "
              >(已处理)</span
            >
            <span v-if="item.auditStatus === 2">(已拒绝)</span>
            <span v-if="item.auditStatus === 3">(已驳回)</span>
            <span v-if="item.auditStatus === 4">(已撤回)</span>
            <span v-if="item.auditStatus === 5">(已撤销)</span>
          </div>
          <div
            v-if="
              (item.opinion &&
                item.auditStatus === 1 &&
                item.handleType === 0) ||
              item.auditStatus === 2 ||
              item.auditStatus === 3
            "
            class="applyOpinion"
          >
            {{ item.opinion }}
          </div>
        </template>
      </t-step-item>

      <t-step-item v-if="lastData && lastData.nextStep" class="stepApprove">
        <template #title> {{ lastData.nextStep }}</template>

        <template #content>
          <div class="userInfo">
            {{ lastData.nextApprover }}（{{
              baseData.retreat.flowStatus === 2 ? '审批中' : '处理中'
            }}）
          </div>
        </template>
      </t-step-item>
    </t-steps>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 获取父组件值、方法
const props = defineProps({
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
// ------定义变量------
const lastData = ref<Object | any>({})
// 触发父级事件
onMounted(() => {
  if (props.baseData.accraditationRecords) {
    lastData.value =
      props.baseData.accraditationRecords[
        props.baseData.accraditationRecords.length - 1
      ]
  }
})
</script>
