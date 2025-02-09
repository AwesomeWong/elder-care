<!-- 支付记录 -->
<template>
  <!-- 支付记录-已支付 -->
  <t-card title="支付记录">
    <div class="info-block">
      <div class="info-item">
        <h1>交易状态：</h1>
        <span class="status-dot" :class="'status-dot-' + data.paymentStatus">{{
          data.paymentStatus === 2
            ? '已支付'
            : data.paymentStatus === 1
            ? '待支付'
            : '已关闭'
        }}</span>
      </div>
      <div v-if="data.paymentStatus === 2" class="info-item">
        <h1 class="label-wt-long">支付渠道：</h1>
        <span>线上支付</span>
      </div>
      <div v-if="data.paymentStatus === 2" class="info-item">
        <h1>支付方式：</h1>
        <span>微信</span>
      </div>
      <div v-if="data.paymentStatus === 2" class="info-item">
        <h1 class="label-wt-long">微信支付订单号：</h1>
        <span>{{ data.tradingVo.tradingOrderNo }}</span>
      </div>
      <div v-if="data.paymentStatus === 2" class="info-item">
        <h1>支付金额：</h1>
        <span>{{ decimalsReplenish(data.tradingVo.tradingAmount) }} 元</span>
      </div>
    </div>
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { decimalsReplenish } from '@/utils/index'
// 获取父组件值、方法
const props = defineProps({
  // 所有的老人数据
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
