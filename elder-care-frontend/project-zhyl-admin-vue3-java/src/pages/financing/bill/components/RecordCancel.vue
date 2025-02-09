<!-- 取消记录 -->
<template>
  <!-- 费用 -->
  <t-card
    v-if="orderData.reason !== undefined && baseData.billType === 1"
    title="取消记录"
  >
    <div class="info-block">
      <div class="info-item">
        <h1>取消人：</h1>
        <span
          >{{ orderData.updater ? orderData.updater : orderData.memberVo.name
          }}<span
            class="bt-small"
            :class="orderData.createType === 1 ? 'warBtn' : ''"
            >{{ orderData.createType === 1 ? '前台客户' : '后台用户' }}</span
          ></span
        >
      </div>
      <div class="info-item">
        <h1>取消时间：</h1>
        <span>{{ orderData.updateTime }}</span>
      </div>
      <div class="info-item">
        <h1>取消原因：</h1>
        <span>{{ orderData.reason }}</span>
      </div>
    </div>
  </t-card>
  <!-- 月度后台或者费用后台 -->
  <t-card v-else-if="baseData.remark !== undefined" title="取消记录">
    <!-- 月度 -->
    <div class="info-block">
      <div class="info-item">
        <h1>取消人：</h1>
        <span
          >{{ baseData.updater
          }}<span
            class="bt-small"
            :class="baseData.createType === 1 ? 'warBtn' : ''"
            >后台用户</span
          ></span
        >
      </div>
      <div class="info-item">
        <h1>取消时间：</h1>
        <span>{{ baseData.updateTime }}</span>
      </div>
      <div class="info-item wt-100">
        <h1>取消原因：</h1>
        <span>{{ baseData.remark }}</span>
      </div>
    </div>
  </t-card>

  <!-- end -->
</template>

<script setup lang="ts">
// 获取父组件值、方法
const props = defineProps({
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  orderData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
