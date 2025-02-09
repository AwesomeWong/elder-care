<!-- 详情 -->
<template>
  <div class="detail-base">
    <div class="bg-wt min-steph">
      <!-- 基本信息 -->
      <BaseInfo :base-data="baseData"></BaseInfo>
      <!-- end -->
      <!-- 账单明细 -->
      <BaseInfoDetail :base-data="baseData"></BaseInfoDetail>
      <!-- end -->
      <!-- 支付记录 -->
      <div
        v-if="
          baseData.payableAmount < baseData.billAmount ||
          baseData.refundRecordVo.refundStatus !== undefined
        "
      >
        <RecordPay :base-data="baseData"></RecordPay>
      </div>
      <!-- end -->
      <!-- 退款记录 -->
      <div v-if="baseData.refundRecordVo.refundStatus !== undefined">
        <RecordRefund :data="baseData"></RecordRefund>
      </div>
      <!-- end -->
      <!-- 取消记录 -->
      <div>
        <RecordCancel
          v-if="!baseData.refundRecordVo.refundStatus"
          :base-data="baseData"
          :order-data="orderBaseData"
        ></RecordCancel>
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
import { billDetail } from '@/api/finance'
import { getDetails } from '@/api/order'
// 组件
// 基本信息
import BaseInfo from './components/BaseInfo.vue'
// 账单明细
import BaseInfoDetail from './components/BaseInfoDetail.vue'
// 支付记录
import RecordPay from './components/RecordPay.vue'
// 退款记录
import RecordRefund from './components/RecordRefund.vue'
// 取消记录
import RecordCancel from './components/RecordCancel.vue'
// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const baseData = ref<Object | any>({
  checkInConfigVo: {},
  tradingVo: {},
  elderVo: {},
  refundRecordVo: {}
})
const orderBaseData = ref({}) // 订单数据
const billId = ref('') // 账单id
// 生命周期
onMounted(() => {
  billId.value = route.query.id
  getBaseData()
})
// ------定义方法------
// // 获取列表数据
const getBaseData = async () => {
  const res: any = await billDetail(billId.value) // 获取列表数据
  if (res.code === 200) {
    baseData.value = res.data
    if (baseData.value.billType === 1) {
      getOrderBaseData(baseData.value.orderId)
    }
  }
}
// 获取订单数据
// // 获取数据
const getOrderBaseData = async (id) => {
  const res: any = await getDetails({ orderId: id }) // 获取数据
  if (res.code === 200) {
    orderBaseData.value = res.data
  }
}
// 返回
const handleReturn = () => {
  router.push({
    path: `/finance/enterAccount`
  })
}
</script>
