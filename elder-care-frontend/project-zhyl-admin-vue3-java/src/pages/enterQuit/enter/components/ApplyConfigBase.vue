<!-- 入住配置 -->
<template>
  <div class="detail-base">
    <!-- 基本信息 -->
    <t-card title="入住设置">
      <div class="info-block">
        <div class="info-item">
          <h1>入住期限：</h1>
          <span
            >{{ getDateInfo(checkInConfigVo.checkInStartTime) }}~{{
              getDateInfo(checkInConfigVo.checkInEndTime)
            }}</span
          >
        </div>
        <div class="info-item">
          <h1>护理等级：</h1>
          <span>{{ nursingLevelVo.name }}</span>
        </div>
        <div class="info-item">
          <h1>入住床位：</h1>
          <span
            >{{ checkInConfigVo.floorName }}-{{ checkInConfigVo.code }}-{{
              checkInConfigVo.bedNo
            }}</span
          >
        </div>
      </div>
    </t-card>
    <!-- end -->
    <!-- 费用设置 -->
    <t-card title="费用设置">
      <div class="info-block">
        <div class="info-item">
          <h1 class="label-wt-long">费用期限：</h1>
          <span
            >{{ getDateInfo(checkInConfigVo.costStartTime) }}~{{
              getDateInfo(checkInConfigVo.costEndTime)
            }}</span
          >
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">押金(元)：</h1>
          <span>{{ decimalsReplenish(checkInConfigVo.depositAmount) }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">护理费用(元/月)：</h1>
          <span>{{ decimalsReplenish(checkInConfigVo.nursingCost) }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">床位费用(元/月)：</h1>
          <span>{{ decimalsReplenish(checkInConfigVo.bedCost) }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">其他费用(元/月)：</h1>
          <span>{{
            checkInConfigVo.otherCost
              ? decimalsReplenish(checkInConfigVo.otherCost)
              : '--'
          }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">医保支付(元/月)：</h1>
          <span>{{
            checkInConfigVo.medicalInsurancePayment
              ? decimalsReplenish(checkInConfigVo.medicalInsurancePayment)
              : '--'
          }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">政府补贴(元/月)：</h1>
          <span>{{
            checkInConfigVo.governmentSubsidy
              ? decimalsReplenish(checkInConfigVo.governmentSubsidy)
              : '--'
          }}</span>
        </div>
        <div class="info-item lastText">
          <h1 class="label-wt-long"></h1>
          <t-button @click="handleBill">账单预览</t-button>
        </div>
      </div>
    </t-card>
    <!-- end -->
    <BillDetails
      :visible="billVisible"
      :form-data="formData"
      @handleClose="handleClose"
    ></BillDetails>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDateInfo } from '@/utils/date'
import { decimalsReplenish } from '@/utils/index'
// 账单预览
import BillDetails from './BillDetails.vue'
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
const checkInConfigVo = ref<Object | any>({}) // 入住设置
const nursingLevelVo = ref<Object | any>({}) // 护理等级
const billVisible = ref(false) // 账单预览弹层
const formData = ref({}) // 账单预览信息
onMounted(() => {
  const data = props.baseData.retreat
  if (data.checkInConfigVo && data.checkInConfigVo !== undefined) {
    checkInConfigVo.value = data.checkInConfigVo
    nursingLevelVo.value = data.nursingLevelVo
  }
})
// 账单预览
const handleBill = () => {
  formData.value = {
    ...props.baseData.retreat.checkInConfigVo,
    name: props.baseData.retreat.title
  }
  billVisible.value = true
}
// 关闭账单预览
const handleClose = () => {
  billVisible.value = false
}
</script>
