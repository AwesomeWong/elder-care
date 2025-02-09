<!-- 退款记录 -->
<template>
  <!-- 退款记录 -->
  <t-card title="退款记录">
    <!-- 费用账单 -->
    <div v-if="data.billType === 1" class="info-block">
      <div class="info-item">
        <h1 class="label-wt-130">订单编号：</h1>
        <span>{{ data.orderNo }}</span>
      </div>
      <div class="info-item">
        <h1>订单状态：</h1>
        <span>已退款</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-130">退款状态：</h1>
        <span class="font-bt">退款成功</span>
      </div>
      <div class="info-item">
        <h1>申请人：</h1>
        <span
          >{{
            data.refundRecordVo.creator
              ? data.refundRecordVo.creator
              : data.refundRecordVo.adminCreator
          }}<span
            class="bt-small"
            :class="data.refundRecordVo.createType === 1 ? 'warBtn' : ''"
            >{{
              data.refundRecordVo.createType === 1 ? '前台客户' : '后台用户'
            }}</span
          ></span
        >
      </div>
      <div class="info-item">
        <h1 class="label-wt-130">申请时间：</h1>
        <span>{{ data.refundRecordVo.createTime }}</span>
      </div>
      <div class="info-item">
        <h1>退款原因：</h1>
        <span>{{ data.refundRecordVo.memo }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-130">退款渠道：</h1>
        <span>原路退回</span>
      </div>
      <div class="info-item">
        <h1>退款方式：</h1>
        <span>微信</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-130">微信支付退款单号：</h1>
        <span>{{ data.refundRecordVo.refundNo }}</span>
      </div>
      <div class="info-item">
        <h1>退款金额：</h1>
        <span
          >{{ decimalsReplenish(data.refundRecordVo.refundAmount) }} 元</span
        >
      </div>
      <div class="info-item">
        <h1 class="label-wt-130">退款时间：</h1>
        <span>{{ data.refundRecordVo.updateTime }}</span>
      </div>
      <!-- end -->
    </div>
    <!-- end -->
    <!-- 月度账单 -->
    <div v-else class="info-block">
      <div class="info-item">
        <h1>申请人：</h1>
        <span
          >{{
            data.refundRecordVo.creator
              ? data.refundRecordVo.creator
              : data.refundRecordVo.adminCreator
          }}<span
            class="bt-small"
            :class="data.refundRecordVo.createType === 1 ? 'warBtn' : ''"
            >{{
              data.refundRecordVo.createType === 1 ? '前台客户' : '后台用户'
            }}</span
          ></span
        >
      </div>
      <div class="info-item">
        <h1>提交时间：</h1>
        <span>{{ data.refundRecordVo.updateTime }}</span>
      </div>
      <div class="info-item">
        <h1>退款方式：</h1>
        <span>预缴款</span>
      </div>
      <div class="info-item">
        <h1>实际天数：</h1>
        <span>{{ data.refundRecordVo.memo }}</span>
      </div>
      <div class="info-item">
        <h1>退款天数：</h1>

        <span>{{ data.refundRecordVo.refundMsg }}</span>
      </div>
      <div class="info-item">
        <h1>实退金额：</h1>
        <span>{{ data.refundRecordVo.refundAmount }}</span>
      </div>
      <div v-if="data.refundRecordVo.remark" class="info-item wt-100">
        <h1>调整备注：</h1>
        <span>{{ data.refundRecordVo.remark }}</span>
      </div>
    </div>
    <!-- end -->
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
