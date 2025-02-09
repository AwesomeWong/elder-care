<!-- 账单信息 -->
<template>
  <!-- 账单信息 -->
  <t-card title="账单信息">
    <div class="info-block">
      <div class="info-item">
        <h1 class="label-wt-long">账单编号：</h1>
        <span
          >{{ baseData.billNo
          }}<span v-if="baseData.billType === 0" class="bt-small">月度账单</span
          ><span v-else class="bt-small warBtn">费用账单</span></span
        >
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">账单月份：</h1>
        <span>{{
          baseData.billType === 0
            ? baseData.billMonth
            : getYearMonthInfo(baseData.createTime)
        }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">老人姓名：</h1>
        <span>{{ baseData.elderVo.name }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">老人身份证号：</h1>
        <span>{{ baseData.elderVo.idCardNo }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">账单金额（元）：</h1>
        <span>{{ decimalsReplenish(baseData.billAmount) }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">应付金额（元）：</h1>
        <span>{{ decimalsReplenish(baseData.payableAmount) }}</span>
      </div>
      <!-- 月度账单显示 -->
      <div v-if="baseData.billType === 0" class="info-item">
        <h1 class="label-wt-long">账单周期：</h1>
        <span
          >{{ getDateInfo(baseData.billStartTime) }} ~
          {{ getDateInfo(baseData.billEndTime) }}</span
        >
      </div>
      <div v-if="baseData.billType === 0" class="info-item">
        <h1 class="label-wt-long">共计天数（天）：</h1>
        <span>{{ baseData.totalDays }}</span>
      </div>
      <!-- end -->
      <!-- 费用账单显示 -->
      <div v-if="baseData.billType === 1" class="info-item lastText">
        <h1 class="label-wt-long">关联订单：</h1>
        <span class="font-bt" @click="handleOrder">{{ baseData.orderNo }}</span>
      </div>
      <!-- end -->
      <div class="info-item">
        <h1 class="label-wt-long">交易状态：</h1>
        <span
          class="status-dot"
          :class="'status-contract-' + baseData.transactionStatus"
          >{{
            baseData.transactionStatus === 1
              ? '已支付'
              : baseData.transactionStatus === 0
              ? '待支付'
              : '已关闭'
          }}</span
        >
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">支付截止时间：</h1>
        <span>{{ baseData.paymentDeadline }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">创建人：</h1>
        <span>{{
          baseData.billType === 0
            ? baseData.billStartTime === baseData.checkInConfigVo.costStartTime
              ? '系统'
              : baseData.creator
            : baseData.memberCreator
        }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">创建时间：</h1>
        <span>{{ baseData.createTime }}</span>
      </div>
    </div>
  </t-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { decimalsReplenish } from '@/utils/index'
import { getDateInfo, getYearMonthInfo } from '@/utils/date'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
const router = useRouter() // 获取全局
const handleOrder = () => {
  router.push({
    path: `/order/orderDetails`,
    query: { id: props.baseData.orderId }
  })
}
</script>
