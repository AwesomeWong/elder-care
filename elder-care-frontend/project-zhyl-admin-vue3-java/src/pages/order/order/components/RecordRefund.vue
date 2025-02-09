<!-- 退款记录 -->
<template>
  <!-- 退款记录 -->
  <t-card title="退款记录">
    <div class="info-block">
      <div class="info-item">
        <h1>退款状态：</h1>
        <span v-if="data.refundRecordVo.refundStatus === 1" class="ft-cl-warn"
          >退款处理中</span
        >
        <span v-if="data.refundRecordVo.refundStatus === 2" class="font-bt"
          >退款成功</span
        >
        <span v-if="data.refundRecordVo.refundStatus === 3" class="ft-cl-err"
          >退款失败</span
        >
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
        <h1>申请时间：</h1>
        <span>{{ data.refundRecordVo.createTime }}</span>
      </div>
      <div class="info-item">
        <h1>退款原因：</h1>
        <span>{{ data.refundRecordVo.memo }}</span>
      </div>
      <div class="info-item">
        <h1>退款渠道：</h1>
        <span>原路退回</span>
      </div>
      <div class="info-item">
        <h1>退款方式：</h1>
        <span>微信</span>
      </div>
      <!-- 退款成功 -->
      <div v-if="data.refundRecordVo.refundStatus === 2" class="info-item">
        <h1>退款编号：</h1>
        <span>{{ data.refundRecordVo.refundNo }}</span>
      </div>
      <div v-if="data.refundRecordVo.refundStatus === 2" class="info-item">
        <h1>退款金额：</h1>
        <span
          >{{ decimalsReplenish(data.refundRecordVo.refundAmount) }} 元</span
        >
      </div>
      <!-- end -->
      <!-- 退款失败 -->
      <div v-if="data.refundRecordVo.refundStatus === 3" class="info-item">
        <h1 class="label-wt">失败状态码：</h1>
        <span>{{ data.refundRecordVo.refundCode }}</span>
      </div>
      <div v-if="data.refundRecordVo.refundStatus === 3" class="info-item">
        <h1>失败原因：</h1>
        <span>{{ data.refundRecordVo.refundMsg }}</span>
      </div>
      <!-- end -->
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
