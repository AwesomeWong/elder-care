<!-- 调整账单 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-form ref="form" :label-width="88">
      <t-card title="调整费用账单" class="freeOrder">
        <div class="contractTit">
          <span>账单明细</span>
          <span class="titTip"
            ><t-icon class="warnIcon"></t-icon
            >提交账单审批前，需在入账列表中处理未缴账单，若未处理，则无法提交</span
          >
        </div>
        <!-- 应退 -->
        <div v-if="dueBackList.length > 0" class="fillCon">
          <div class="titleInfo">
            <div class="lText">应退</div>
            <div class="rText">
              <span>待办：{{ dueBackList.length }}</span
              ><span>小计：{{ decimalsReplenish(dueBackSum) }}元</span>
            </div>
          </div>
          <div class="itemCon">
            <ul v-for="(item, index) in dueBackList" :key="index">
              <li class="fist wt-100">
                <div class="lText">
                  <label>账单编号：</label>{{ item.code
                  }}<span class="bt-small">{{
                    item.type === 0 ? '月度账单' : '费用账单'
                  }}</span>
                </div>
              </li>
              <li v-if="item.type === 0">
                <label>账单月份：</label>{{ item.billMonth }}
              </li>
              <li>
                <label>可退金额：</label>{{ decimalsReplenish(item.amount) }}元
              </li>
              <li v-if="item.type === 0">
                <label>实际天数：</label>{{ item.realDay }}天
              </li>
              <li v-if="item.type === 0">
                <label>退款天数：</label>{{ item.dueBackDay }}天
              </li>
              <li v-if="item.type === 0">
                <label>实退金额：</label
                ><t-input-number
                  v-model="item.realAmount"
                  :min="0"
                  :step="10"
                  placeholder="0.00"
                  :decimal-places="2"
                  :disabled="baseData.retreat.status !== 1"
                  @blur="textBlurDueBack(item)"
                  @onkeyup="handleOnkeyup"
                  @change="textBlurDueBack(item)"
                ></t-input-number>
              </li>
              <li v-if="item.type === 0" class="wt-100">
                <label>调整备注：</label>
                <t-textarea
                  v-model="item.remark"
                  :disabled="baseData.retreat.status !== 1"
                  class="wt-400"
                  placeholder="请输入"
                  :maxlength="50"
                >
                </t-textarea>
              </li>
              <li v-if="item.type === 1">
                <label>护理项目名称：</label>{{ item.nursingName }}
              </li>
            </ul>
          </div>
        </div>
        <!-- end -->
        <!-- 欠费 -->
        <div v-if="arrearageList.length > 0" class="fillCon">
          <div class="titleInfo">
            <div class="lText">欠费</div>
            <div class="rText">
              <span>待办：{{ arrearageList.length }}</span
              ><span>小计：{{ decimalsReplenish(arrearageSum) }}元</span>
            </div>
          </div>
          <div class="itemCon">
            <ul v-for="(item, index) in arrearageList" :key="index" class="bg">
              <li class="fist wt-100">
                <div class="lText">
                  <label>账单编号：</label>{{ item.code
                  }}<span class="bt-small">{{
                    item.type === 0 ? '月度账单' : '费用账单'
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
        <div class="fillCon">
          <div class="titleInfo">
            <div class="lText">余额</div>
            <div class="rText">
              <span>小计：{{ decimalsReplenish(balanceSum) }}元</span>
            </div>
          </div>
          <div class="itemCon">
            <!-- balanceVo -->
            <ul>
              <li class="fist wt-100">
                <label>可退押金：</label
                >{{ decimalsReplenish(balanceVo.depositAmount) }}元
              </li>
              <li>
                <label>实退金额：</label
                ><t-input-number
                  v-model="balanceVo.arrearsAmount"
                  :min="0"
                  :step="10"
                  :disabled="baseData.retreat.status !== 1"
                  placeholder="0.00"
                  :decimal-places="2"
                  @blur="textBlurPrice(balanceVo.arrearsAmount)"
                  @onkeyup="handleOnkeyup"
                  @change="textBlurPrice"
                ></t-input-number>
              </li>
              <li class="wt-100">
                <label>调整备注：</label>
                <t-textarea
                  v-model="balanceVo.description"
                  class="wt-400"
                  :disabled="baseData.retreat.status !== 1"
                  placeholder="请输入"
                  :maxlength="50"
                >
                </t-textarea>
              </li>
              <li>
                <label>预缴款：</label
                >{{ decimalsReplenish(balanceVo.prepaidBalance) }}元
              </li>
            </ul>
          </div>
        </div>
        <!-- end -->
        <!-- 未缴 -->
        <div v-if="unpaidList.length > 0" class="fillCon">
          <div class="titleInfo">
            <div class="lText">未缴</div>
            <div class="rText">
              <span>待办：{{ unpaidList.length }}</span
              ><span>小计：{{ decimalsReplenish(unpaidSum) }}元</span>
            </div>
          </div>
          <div class="itemCon">
            <ul v-for="(item, index) in unpaidList" :key="index" class="bg">
              <li class="fist wt-100">
                <div class="lText">
                  <label>账单编号：</label>{{ item.code
                  }}<span class="bt warBtn">费用账单</span>
                </div>
              </li>
              <li><label>护理项目名称：</label>{{ item.nursingName }}</li>
              <li>
                <label>应付金额：</label>{{ decimalsReplenish(item.amount) }}元
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
    </t-form>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { onkeyup, decimalsReplenish } from '@/utils/index'
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
// ------定义变量------
const arrearageList = ref<Object | any>([]) // 欠费数据
const arrearageSum = ref(0) // 欠费小计
const balanceVo = ref<Object | any>({}) // 余额数据
const balanceSum = ref(0) // 余额小计
const dueBackList = ref<Object | any>([]) // 应退数据
const dueBackSum = ref(0) // 应退小计
const unpaidList = ref<Object | any>([]) // 未交费用数据
const unpaidSum = ref(0) // 未缴小计
const moneySum = ref(0) // 总计金额
onMounted(() => {
  arrearageList.value = props.baseData.retreatBillVo.arrearageList
  balanceVo.value = props.baseData.retreatBillVo.balanceVo
  dueBackList.value = props.baseData.retreatBillVo.dueBackList
  unpaidList.value = props.baseData.retreatBillVo.unpaidList
  if (balanceVo.value) {
    balanceVo.value.arrearsAmount = balanceVo.value.depositAmount
    balanceSum.value =
      Number(balanceVo.value.arrearsAmount) + balanceVo.value.prepaidBalance
  } else {
    balanceVo.value = {}
    balanceVo.value.arrearsAmount = 0
    balanceVo.value.depositAmount = 0
    balanceVo.value.prepaidBalance = 0
  }

  // 应退小计
  dueBackList.value.forEach((ele) => {
    ele.realAmount = ele.amount
    dueBackSum.value += Number(ele.realAmount)
  })
  // 欠费小计
  arrearageList.value.forEach((ele) => {
    arrearageSum.value += ele.amount
  })
  // 未缴小计
  unpaidList.value.forEach((ele) => {
    unpaidSum.value += ele.amount
  })
  // 总计金额
  handleSum()
})
// -----定义方法------
// // 监听金额
const textBlurPrice = (val) => {
  if (val > balanceVo.value.depositAmount) {
    MessagePlugin.error('实退金额不可大于可退押金，请重新输入')
    balanceVo.value.arrearsAmount = balanceVo.value.depositAmount
  }
  if (
    balanceVo.value.arrearsAmount === '0.00' ||
    balanceVo.value.arrearsAmount === undefined
  ) {
    balanceVo.value.arrearsAmount = 0.0
  }
  balanceSum.value =
    Number(balanceVo.value.arrearsAmount) + balanceVo.value.prepaidBalance
  // 总计金额
  handleSum()
}
// 监听应退金额
const textBlurDueBack = (item) => {
  dueBackSum.value = 0
  dueBackList.value.forEach((ele) => {
    if (item.code === ele.code && item.realAmount > ele.amount) {
      MessagePlugin.error('实退金额不可大于可退金额，请重新输入')
      ele.realAmount = ele.amount
    }
    dueBackSum.value += Number(ele.realAmount)
  })
  // 总计金额
  handleSum()
}
// 总计金额
const handleSum = () => {
  moneySum.value = decimalsReplenish(
    dueBackSum.value - arrearageSum.value + balanceSum.value
  )
}
// 触发键盘
const handleOnkeyup = (val) => {
  onkeyup(val)
}
// 向父组件暴露数据与方法
defineExpose({
  arrearageList, // 欠费
  balanceVo, // 余额数据
  dueBackList, // 应退数据
  unpaidList, // 未交费用数据
  balanceSum, // 余额小计
  dueBackSum, // 应退小计
  arrearageSum, // 欠费小计
  moneySum // 最终退款金额
})
</script>
