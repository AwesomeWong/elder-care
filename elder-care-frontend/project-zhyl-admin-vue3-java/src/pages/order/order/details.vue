<!-- 详情 -->
<template>
  <div class="order detail-base">
    <div class="bg-wt stepContainer mb-24">
      <!-- step -->
      <t-steps :current="defaultCurrent" :readonly="true">
        <t-step-item title="已下单" :content="baseData.createTime" />
        <t-step-item v-if="baseData.status !== 4" title="已支付" content="">
          <template #content>
            {{
              baseData.tradingVo.updateTime && baseData.status > 0
                ? baseData.tradingVo.updateTime
                : null
            }}
          </template>
        </t-step-item>
        <t-step-item
          v-if="
            ((baseData.status === 0 || baseData.status === 1) &&
              baseData.nursingTaskVo &&
              !baseData.nursingTaskVo.taskImage) ||
            ((baseData.status === 5 ||
              baseData.status === 3 ||
              baseData.status === 2) &&
              baseData.nursingTaskVo &&
              baseData.nursingTaskVo.taskImage)
          "
          title="已执行"
          content=""
        >
          <template #content>
            {{
              baseData.nursingTaskVo &&
              baseData.nursingTaskVo.updateTime &&
              baseData.nursingTaskVo.taskImage
                ? baseData.nursingTaskVo.updateTime
                : null
            }}
          </template>
        </t-step-item>
        <t-step-item
          v-if="baseData.status === 4"
          title="已关闭"
          :content="baseData.updateTime"
        />
        <t-step-item
          v-else-if="baseData.status === 5"
          title="已退款"
          :content="baseData.refundRecordVo.updateTime"
        />
        <t-step-item v-else title="已完成">
          <template #content>
            {{
              baseData.updateTime && baseData.status === 3
                ? baseData.updateTime
                : null
            }}
          </template>
        </t-step-item>
      </t-steps>
    </div>
    <!-- end -->
    <div class="bg-wt min-steph">
      <!-- 申请信息 -->
      <div v-if="defaultCurrent === 0 && !baseData.refundRecordVo.refundStatus">
        <BaseInfo :data="baseData"></BaseInfo>
        <RecordPay :data="baseData"></RecordPay>
      </div>
      <!-- end -->
      <div v-if="defaultCurrent === 1 && !baseData.refundRecordVo.refundStatus">
        <BaseInfo :data="baseData"></BaseInfo>
        <RecordPay :data="baseData"></RecordPay>
      </div>
      <!-- 已执行或者已完成 -->
      <div
        v-if="
          (defaultCurrent === 2 || defaultCurrent === 3) &&
          !baseData.refundRecordVo.refundStatus
        "
      >
        <BaseInfo :data="baseData"></BaseInfo>
        <RecordPay :data="baseData"></RecordPay>
        <RecordExecutel :data="baseData"></RecordExecutel>
      </div>
      <!-- end -->
      <!-- 已关闭 -->
      <div v-if="defaultCurrent === 4 && !baseData.refundRecordVo.refundStatus">
        <BaseInfo :data="baseData"></BaseInfo>
        <RecordPay :data="baseData"></RecordPay>
        <RecordCancel
          v-if="
            baseData.status === 4 &&
            baseData.reason &&
            baseData.reason !== '超时未关闭'
          "
          :data="baseData"
        ></RecordCancel>
      </div>
      <!-- end -->
      <!-- 已退款 -->
      <div
        v-if="
          ((baseData.status === 1 || baseData.status === 2) &&
            baseData.refundRecordVo.refundStatus === 1) ||
          (baseData.status === 5 && baseData.refundRecordVo.refundStatus === 2)
        "
      >
        <BaseInfo :data="baseData"></BaseInfo>
        <RecordPay :data="baseData"></RecordPay>
        <!-- 执行记录 -->
        <RecordExecutel
          v-if="baseData.nursingTaskVo && baseData.nursingTaskVo.taskImage"
          :data="baseData"
        ></RecordExecutel>
        <!-- 退款记录 -->
        <RecordRefund :data="baseData"></RecordRefund>
      </div>
      <!-- end -->
    </div>
  </div>
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 接口
import { getDetails } from '@/api/order'
// 组件
// 基本信息
import BaseInfo from './components/BaseInfo.vue'
// 支付记录
import RecordPay from './components/RecordPay.vue'
// 执行记录
import RecordExecutel from './components/RecordExecutel.vue'
// 取消记录
import RecordCancel from './components/RecordCancel.vue'
// 退款记录
import RecordRefund from './components/RecordRefund.vue'
// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const defaultCurrent = ref(0) // step 当前的选择
const baseData = ref<Object | any>({
  bedVo: {},
  elderVo: {},
  memberVo: {},
  nursingProjectVo: {},
  refundRecordVo: {},
  tradingVo: {}
})
const orderId = ref('')
// 生命周期
onMounted(() => {
  orderId.value = route.query.id
  getBaseData()
})
// ------定义方法------
// // 获取数据
const getBaseData = async () => {
  const res: any = await getDetails({ orderId: orderId.value }) // 获取数据
  if (res.code === 200) {
    baseData.value = res.data
    defaultCurrent.value = baseData.value.status
  }
}
// 返回
const handleReturn = () => {
  router.push({
    path: `/order/olist`
  })
}
</script>
