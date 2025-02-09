<!-- 账单预览 -->
<template>
  <div class="dialogBox billDialog scrollTable">
    <t-dialog
      v-model:visible="formVisible"
      header="账单预览"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <template #body>
        <!-- 表单内容 -->
        <div class="">
          <div class="detailsList">
            <ul>
              <li>
                账单月份：<label>{{
                  costStartTime ? getYearMonthInfo(costStartTime) : '--'
                }}</label>
              </li>
              <li>
                老人姓名：<label>{{ billDataTime.name }}</label>
              </li>
              <li>
                账单周期：<label>{{ billPeriod ? billPeriod : '--' }}</label>
              </li>
              <li>
                共计天数：<label>{{ days ? days + '天' : '--' }}</label>
              </li>
            </ul>
            <div class="details">
              <label>费用结算：</label>
              <div class="billTable">
                <ul>
                  <li>类型</li>
                  <li>费用项目</li>
                  <li>服务内容</li>
                  <li>金额（元）</li>
                </ul>
                <div class="table">
                  <table>
                    <tr>
                      <td>添加项</td>
                      <td>护理费用</td>
                      <td>特级护理等级</td>
                      <td>
                        {{
                          billDataTime.nursingCost
                            ? decimalsReplenish(billDataTime.nursingCost)
                            : '--'
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>床位费用</td>
                      <td>特护房</td>
                      <td>
                        {{
                          billDataTime.bedCost
                            ? decimalsReplenish(billDataTime.bedCost)
                            : '--'
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>其他费用</td>
                      <td>其他</td>
                      <td>
                        {{
                          billDataTime.otherCost
                            ? decimalsReplenish(billDataTime.otherCost)
                            : '--'
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>小计</td>
                      <td>其他费用</td>
                      <td>其他</td>
                      <td>
                        <strong>
                          {{
                            addSubplan ? decimalsReplenish(addSubplan) : '--'
                          }}</strong
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>扣减项</td>
                      <td>医保支付</td>
                      <td>--</td>
                      <td>
                        {{
                          billDataTime.medicalInsurancePayment
                            ? '- ' +
                              decimalsReplenish(
                                billDataTime.medicalInsurancePayment
                              )
                            : '--'
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>政府补贴</td>
                      <td>--</td>
                      <td>
                        {{
                          billDataTime.governmentSubsidy
                            ? '- ' +
                              decimalsReplenish(billDataTime.governmentSubsidy)
                            : '--'
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>小计</td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>
                          {{
                            deduction
                              ? '- ' + decimalsReplenish(deduction)
                              : '--'
                          }}</strong
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>每月应付</td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>
                          {{
                            monthlyPayment === 0 || monthlyPayment
                              ? decimalsReplenish(monthlyPayment)
                              : '--'
                          }}</strong
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>本期应付</td>
                      <td></td>
                      <td></td>
                      <td>
                        {{
                          currentPeriod === 0 || currentPeriod
                            ? currentPeriod
                            : '--'
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>押金</td>
                      <td></td>
                      <td></td>
                      <td>
                        {{ decimalsReplenish(billDataTime.depositAmount) }}
                      </td>
                    </tr>
                    <tr>
                      <td>账单金额</td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>
                          {{
                            billAmount === 0 || billAmount
                              ? decimalsReplenish(billAmount)
                              : '--'
                          }}</strong
                        >
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  getDays,
  getMonthInfo,
  getYearMonthInfo,
  getDateInfo
} from '@/utils/date'
import { decimalsReplenish } from '@/utils/index'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  formData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
// 触发父级事件
const emit = defineEmits(['handleClose'])
// 表单数据
const costStartTime = ref(null)
const costEndTime = ref(null)
const formVisible = ref(false) // 弹窗
const days = ref(null) // 总的天数
const addSubplan = ref(null) // 添加项
const deduction = ref(null) // 扣减项
const monthlyPayment = ref(null) // 每月应付
const currentPeriod = ref(null) // 本期应付
const billAmount = ref(null) // 账单金额
const amountPayable = ref(null) // 应付金额
const billPeriod = ref(null)
const billDataTime = ref({})
// -----定义方法------
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
const getCurrentMonthLast = () => {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  const day = new Date(year, month, 0)
  return `${year}-${month}-${day.getDate()}`
}
watch(
  () => props.visible,
  (val) => {
    formVisible.value = props.visible
    if (val) {
      const baseData = props.formData
      if (props.baseData.retreat !== undefined) {
        billDataTime.value = {
          ...props.formData,
          name: props.baseData.retreat.elderDto.name
        }
      } else {
        billDataTime.value = {
          ...props.formData,
          costTime: [
            getDateInfo(props.formData.costStartTime),
            getDateInfo(props.formData.costEndTime)
          ]
        }
      }
      // 账单周期、共计天数
      if (
        billDataTime.value.costTime &&
        billDataTime.value.costTime.length > 0
      ) {
        costStartTime.value = billDataTime.value.costTime[0]
        costEndTime.value = billDataTime.value.costTime[1]
        const startDate = new Date(costStartTime.value)
        const startMonth = startDate.getMonth() + 1

        const endDate = new Date(costEndTime.value)
        const endMonth = endDate.getMonth() + 1
        if (startMonth === endMonth) {
          billPeriod.value = `${costStartTime.value}~${costEndTime.value}`
          // 总计天数
          days.value = getDays(costStartTime.value, costEndTime.value)
        } else {
          billPeriod.value = `${costStartTime.value}~${getCurrentMonthLast(
            costStartTime.value
          )}`
          // 总计天数
          days.value = getDays(
            costStartTime.value,
            getCurrentMonthLast(costStartTime.value)
          )
        }
      }
      // 添加项
      addSubplan.value =
        Number(baseData.nursingCost) +
        Number(baseData.bedCost) +
        Number(baseData.otherCost === undefined ? '0' : baseData.otherCost)
      // 扣减项
      deduction.value =
        Number(
          baseData.medicalInsurancePayment
            ? baseData.medicalInsurancePayment
            : 0
        ) + Number(baseData.governmentSubsidy ? baseData.governmentSubsidy : 0)
      // 每月应付
      monthlyPayment.value = addSubplan.value - deduction.value
      if (monthlyPayment.value < 0) {
        monthlyPayment.value = '0.00'
      }
      // 本期应付
      if (monthlyPayment.value >= 0 && costStartTime.value) {
        const getDays = getMonthInfo(costStartTime.value)
        currentPeriod.value = (
          monthlyPayment.value === '0.00'
            ? 0
            : (monthlyPayment.value / getDays.days) * days.value
        ).toFixed(2)
      }
      // 账单金额
      if (currentPeriod.value) {
        billAmount.value =
          Number(currentPeriod.value) + Number(baseData.depositAmount)
      }
      // 应付金额
      if (billAmount.value) {
        amountPayable.value = billAmount.value
      }
    }
  }
)
// 关闭弹层
const onClickCloseBtn = () => {
  emit('handleClose')
}
</script>
