<!-- 支付记录 -->
<template>
  <!-- 支付记录-已支付 -->
  <t-card title="支付记录">
    <!-- tradingOrderNo 有数据就是小程序支付线上 线上支付（小程序）-->
    <div v-for="(item, index) in baseData.tradingVo" :key="index">
      <div v-if="item.tradingChannel === '小程序支付'" class="info-block">
        <div class="info-item">
          <h1>支付人：</h1>
          <span>{{ item.memberCreator }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">支付人手机号：</h1>
          <span>{{ item.phone }}</span>
        </div>
        <div class="info-item">
          <h1>支付时间：</h1>
          <span>{{ item.updateTime }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">支付渠道：</h1>
          <span>线上支付</span>
        </div>
        <div class="info-item">
          <h1>支付方式：</h1>
          <span>微信</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">微信支付订单号：</h1>
          <span>{{ item.tradingOrderNo }}</span>
        </div>
        <div class="info-item">
          <h1>支付金额：</h1>
          <span>{{ decimalsReplenish(item.tradingAmount) }}元</span>
        </div>
      </div>
      <!-- 线上支付（预缴款） -->
      <div v-else-if="item.tradingChannel === '预交款支付'" class="info-block">
        <div class="info-item">
          <h1>支付时间：</h1>
          <span>{{ item.createTime }}</span>
        </div>
        <div class="info-item">
          <h1>支付渠道：</h1>
          <span>线上支付</span>
        </div>
        <div class="info-item">
          <h1>支付方式：</h1>
          <span>预缴款支付</span>
        </div>
        <div class="info-item">
          <h1>支付金额：</h1>
          <span>{{ decimalsReplenish(item.tradingAmount) }}元</span>
        </div>
      </div>
      <!-- end -->
      <!-- 线下支付 -->
      <div v-else class="info-block">
        <div class="info-item">
          <h1>操作人：</h1>
          <span>{{ item.creator }}</span>
        </div>
        <div class="info-item">
          <h1>支付时间：</h1>
          <span>{{ item.createTime }}</span>
        </div>
        <div class="info-item">
          <h1>支付渠道：</h1>
          <span>线下支付</span>
        </div>
        <div class="info-item">
          <h1>支付方式：</h1>
          <span>{{ item.tradingChannel }}</span>
        </div>
        <div class="info-item wt-100">
          <h1>支付凭证：</h1>
          <span class="img">
            <t-image-viewer :images="[item.memo]">
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="item.memo"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span><ZoomInIcon size="1.8em" /></span>
                  </div>
                </div>
              </template>
            </t-image-viewer>
          </span>
        </div>
        <div class="info-item wt-100">
          <h1>支付备注：</h1>
          <span>{{ item.remark }}</span>
        </div>
      </div>
      <!-- end -->
    </div>
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { ZoomInIcon } from 'tdesign-icons-vue-next'
import { decimalsReplenish } from '@/utils/index'
// 获取父组件值、方法
const props = defineProps({
  // 所有的老人数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
