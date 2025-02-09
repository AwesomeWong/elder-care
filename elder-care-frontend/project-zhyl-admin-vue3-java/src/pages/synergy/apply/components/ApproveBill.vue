<!-- 账单明细 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-card v-if="baseData.retreatBillVo" title="账单明细">
      <!-- 退费 -->
      <div v-if="baseData.retreatBillVo.dueBackList.length > 0" class="fillCon">
        <div class="titleInfo">
          <div class="lText">应退</div>
          <div class="rText">
            <span>待办：{{ baseData.retreatBillVo.dueBackList.length }}</span
            ><span>小计：{{ decimalsReplenish(dueBackSum) }}元</span>
          </div>
        </div>
        <div class="itemCon">
          <div
            v-for="(item, index) in baseData.retreatBillVo.dueBackList"
            :key="index"
          >
            <ul v-if="item.type === 0">
              <li class="fist wt-100">
                <div class="lText">
                  <label>账单编号：</label>{{ item.code
                  }}<span class="bt-small">月度账单</span>
                </div>
              </li>
              <li><label>账单月份：</label>{{ item.billMonth }}</li>
              <li>
                <label>可退金额：</label>{{ decimalsReplenish(item.amount) }}元
              </li>
              <li><label>实际天数：</label>{{ item.realDay }}天</li>
              <li><label>退款天数：</label>{{ item.dueBackDay }}天</li>
              <li>
                <label>实退金额：</label
                >{{ decimalsReplenish(item.realAmount) }}元
              </li>
              <li class="wt-100">
                <label>调整备注：</label>
                {{ item.remark ? item.remark : '无' }}
              </li>
            </ul>
            <ul v-if="item.type === 1" class="bg">
              <li class="fist wt-100">
                <div class="lText">
                  <label>账单编号：</label>{{ item.code
                  }}<span class="bt-small warBtn">费用账单</span>
                </div>
              </li>
              <li><label>护理项目名称：</label>{{ item.nursingName }}</li>
              <li>
                <label>可退金额：</label>{{ decimalsReplenish(item.amount) }}元
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- end -->
      <!-- 欠费 -->
      <div
        v-if="baseData.retreatBillVo.arrearageList.length > 0"
        class="fillCon"
      >
        <div class="titleInfo">
          <div class="lText">欠费</div>
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
            <span>小计：{{ decimalsReplenish(balanceSum) }}元</span>
          </div>
        </div>
        <div class="itemCon">
          <ul>
            <li>
              <label>可退押金：</label
              >{{ baseData.retreatBillVo.balanceVo.depositAmount }}元
            </li>
            <li>
              <label>实退金额：</label
              >{{
                decimalsReplenish(
                  baseData.retreatBillVo.balanceVo.arrearsAmount
                )
              }}元
            </li>
            <li class="fist wt-100">
              <label>调整备注：</label
              >{{
                baseData.retreatBillVo.balanceVo.description
                  ? baseData.retreatBillVo.balanceVo.description
                  : '无'
              }}
            </li>
          </ul>
          <ul class="bg">
            <li>
              <label>预缴款：</label
              >{{
                decimalsReplenish(
                  baseData.retreatBillVo.balanceVo.prepaidBalance
                )
              }}元
            </li>
          </ul>
        </div>
      </div>
      <!-- end -->
      <div class="total">
        最终退款金额 = 应退 - 欠费 +余额 =
        {{ moneySum }}
        元
      </div>
    </t-card>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { decimalsReplenish } from '@/utils/index'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 当前tab
  active: {
    type: Number,
    default: 0
  }
})
// -----定义方法------
// 应退小计
const dueBackSum = computed(() => {
  const data = props.baseData.retreatBillVo
  let realAmount = 0
  if (data && data.dueBackList.length > 0) {
    data.dueBackList.forEach((ele) => {
      if (ele.type === 1) {
        ele.realAmount = ele.amount
      }
      realAmount += ele.realAmount
    })
  }
  return realAmount
})
// 余额小计
const balanceSum = computed(() => {
  const data = props.baseData.retreatBillVo
  let bSum = 0
  if (data.balanceVo) {
    // 第三步、第四步的账单明细余额小计
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
  mSum = decimalsReplenish(
    dueBackSum.value - arrearageSum.value + balanceSum.value
  )
  return mSum
})
</script>
