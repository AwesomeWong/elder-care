<!-- 费用清算 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-card title="完成账单清算">
      <div class="contractTit">
        <span>账单明细</span>
        <span class="titTip"
          ><t-icon class="warnIcon"></t-icon
          >完成欠费缴费和余额退款后，方可完成退住办理</span
        >
      </div>
      <!-- 欠费 -->
      <div
        v-if="baseData.retreatBillVo.arrearageList.length > 0"
        class="fillCon"
      >
        <div class="titleInfo">
          <div class="lText">
            欠费
            <t-tooltip
              class="placement right-full align"
              content=""
              :show-arrow="false"
              placement="right"
            >
              <template #content>
                可联系老人及家属进行线下支付或充值预缴款</template
              >
              <t-icon class="warnIcon"></t-icon>
            </t-tooltip>
          </div>
          <div class="rText">
            <span>待办：{{ baseData.retreatBillVo.arrearageList.length }}</span
            ><span>小计：{{ decimalsReplenish(arrearageSum) }}元</span>
          </div>
        </div>
        <div class="itemCon">
          <ul
            v-for="(item, index) in baseData.retreatBillVo.arrearageList"
            :key="index"
            class="bg"
          >
            <li class="fist wt-100">
              <div class="lText">
                <label>账单编号：</label>{{ item.code
                }}<span class="bt-small">{{
                  item.type === 0 ? '月度账单' : '订单'
                }}</span>
              </div>
            </li>
            <li><label>账单月份：</label>{{ item.billMonth }}</li>
            <li>
              <label>应付金额：</label>{{ decimalsReplenish(item.amount) }}元
            </li>
          </ul>
        </div>
      </div>
      <!-- end -->
      <!-- 余额 -->
      <div v-if="baseData.retreatBillVo.balanceVo" class="fillCon">
        <div class="titleInfo">
          <div class="lText">余额</div>
          <div class="rText">
            <span>小计：{{ balanceSum }}元</span>
          </div>
        </div>
        <div class="itemCon">
          <ul class="bg">
            <li>
              <label>剩余预缴款：</label
              >{{ baseData.retreatBillVo.balanceVo.prepaidBalance }}元
            </li>
          </ul>
        </div>
      </div>
      <!-- end -->
      <div class="total">
        <div class="text">
          最终退款金额 = 余额 - 欠费 = {{ decimalsReplenish(moneySum) }}元
        </div>
        <div v-if="baseData.retreat.status === 1" class="footBtn">
          <span
            class="bt"
            :class="
              baseData.retreat.status === 1 &&
              baseData.retreatBillVo.arrearageList.length === 0 &&
              baseData.retreatBillVo.balanceVo &&
              baseData.retreatBillVo.balanceVo.prepaidBalance > 0
                ? ''
                : 'bt-forbid'
            "
            @click="handleOpen"
            >{{
              uploadData.refundVoucherUrl ? '编辑退款凭证' : '上传退款凭证'
            }}</span
          >
        </div>
      </div>
    </t-card>
    <!-- end -->
    <!-- 退款凭证上传 -->
    <UploadVoucher
      ref="fromRef"
      :visible="visible"
      :data="uploadData"
      @handle-close="handleClose"
      @handle-upload="handleUpload"
    ></UploadVoucher>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { decimalsReplenish } from '@/utils/index'
// 接口
import { uploadRefundVoucher, getUploadRefund } from '@/api/synergy'
// 组件
import UploadVoucher from './UploadVoucher.vue'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  isVallidate: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
const emit: Function = defineEmits(['upLoadSuccess'])
// 触发父级事件
const visible = ref(false) // 退款凭证弹窗
const fromRef = ref(null)
const uploadData = ref({}) // 获取上传凭证的详情
watch(
  () => props.baseData,
  (val) => {
    getUpload()
  }
)
// -----定义方法------
onMounted(() => {
  getUpload()
})
// 余额小计
const balanceSum = computed(() => {
  const data = props.baseData.retreatBillVo

  let bSum = 0
  if (data.balanceVo) {
    bSum = data.balanceVo.arrearsAmount + data.balanceVo.prepaidBalance
  }
  return bSum
})
// 欠费小计
const arrearageSum = computed(() => {
  const data = props.baseData.retreatBillVo
  let aSum = 0
  if (data && data.arrearageList.length > 0) {
    data.arrearageList.forEach((ele) => {
      aSum += ele.amount
    })
  }
  return aSum
})
// 总计金额
const moneySum = computed(() => {
  let mSum = 0
  mSum = balanceSum.value - arrearageSum.value
  return mSum
})
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
}
const handleOpen = () => {
  if (
    props.baseData.retreat.status === 1 &&
    props.baseData.retreatBillVo.arrearageList.length === 0 &&
    props.baseData.retreatBillVo.balanceVo &&
    props.baseData.retreatBillVo.balanceVo.prepaidBalance > 0
  ) {
    visible.value = true
    getUpload()
  }
}
const getUpload = async () => {
  const params = {
    retreatId: props.baseData.retreat.id
  }
  const res: any = await getUploadRefund(params)
  if (res.code === 200) {
    uploadData.value = res.data
    if (uploadData.value.refundVoucherUrl) {
      emit('upLoadSuccess', false)
    }
  }
}
// 上传退款凭证
const handleUpload = async (val) => {
  const params = {
    ...val,
    retreatCode: props.baseData.retreat.retreatCode,
    refundAmount: moneySum.value
  }
  const res: any = await uploadRefundVoucher(params)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    emit('upLoadSuccess', false)
    getUpload()
    handleClose()
  }
}
</script>
