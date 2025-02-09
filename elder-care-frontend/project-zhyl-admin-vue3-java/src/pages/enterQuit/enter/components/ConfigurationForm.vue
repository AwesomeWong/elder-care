<!-- 入住配置表单 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :label-width="148"
      :reset-type="resetType"
    >
      <t-card title="入住设置">
        <t-form-item label="入住期限：" name="checkInTime">
          <t-date-range-picker
            v-model="formData.checkInTime"
            :disable-date="{ before: dayjs().subtract(1, 'day').format() }"
            :time-picker-props="timePickerProps"
            :placeholder="['开始日期', '结束日期']"
            clearable
          />
        </t-form-item>
        <t-form-item label="护理等级：" class="label-wt" name="nursingLevelId">
          <t-select
            v-model="formData.nursingLevelId"
            clearable
            filterable
            placeholder="请选择"
            class="wt-300"
            @change="handleNursing"
          >
            <t-option
              v-for="(item, index) in nursData"
              :key="index"
              :value="item.id"
              :label="item.name"
              title=""
            >
              {{ item.name }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="入住床位：" name="bedId" class="lastText">
          <span
            v-if="formData && formData.bedNumber !== undefined"
            class="bedSelect"
            >{{
              formData.floorName +
              '-' +
              formData.code +
              '-' +
              formData.bedNumber
            }}</span
          >
          <t-button @click="handleBed">{{
            formData.bedNumber ? '重新选择' : '选择入住床位'
          }}</t-button>
        </t-form-item>
      </t-card>
      <!-- 申请信息 -->
      <t-card title="">
        <template #title
          >费用设置<t-popup
            class="placement bottom center titTpopup"
            content="该费用为月账单，每月1号收当月费用"
            placement="bottom"
            show-arrow
            destroy-on-close
          >
            <t-icon name="error-circle-filled"></t-icon></t-popup
        ></template>
        <t-form-item label="费用期限：" name="costTime" class="lastText">
          <t-date-range-picker
            v-model="formData.costTime"
            :disable-date="{ before: dayjs().subtract(1, 'day').format() }"
            :time-picker-props="timePickerProps"
            :placeholder="['开始日期', '结束日期']"
            clearable
            class="wt-240"
            @change="handleCheck"
          />
        </t-form-item>
        <t-form-item label="押金（元）：" class="lastText">
          <span class="method">+</span>
          <t-input
            v-model="formData.depositAmount"
            class="form-item-content wt-240"
            type="search"
            placeholder="请输入"
            clearable
            :readonly="true"
          />
        </t-form-item>
        <t-form-item
          label="护理费用（元/月）："
          name="nursingCost"
          class="lastText"
        >
          <span class="method">+</span>
          <t-input-number
            v-model="formData.nursingCost"
            :min="0"
            :step="10"
            placeholder="0.00"
            :decimal-places="2"
            :disabled="formData.nursingLevelId === undefined"
            @blur="textBlurPrice($event, 1)"
            @change="textBlurPrice($event, 1)"
          ></t-input-number>
        </t-form-item>
        <t-form-item
          label="床位费用（元/月）："
          name="bedCost"
          class="lastText"
        >
          <span class="method">+</span>
          <t-input-number
            v-model="formData.bedCost"
            :min="0"
            :step="10"
            placeholder="0.00"
            :decimal-places="2"
            :disabled="formData.bedId === undefined"
            @blur="textBlurPrice($event, 2)"
            @change="textBlurPrice($event, 2)"
          ></t-input-number>
        </t-form-item>
        <t-form-item label="其他费用（元/月）：" class="lastText">
          <span class="method">+</span>
          <t-input-number
            v-model="formData.otherCost"
            :min="0"
            :step="10"
            placeholder="0.00"
            :decimal-places="2"
            @blur="textBlurPrice($event, 3)"
            @change="textBlurPrice($event, 3)"
          ></t-input-number>
        </t-form-item>
        <t-form-item label="医保支付（元/月）：" class="lastText">
          <span class="method">-</span>
          <t-input-number
            v-model="formData.medicalInsurancePayment"
            :min="0"
            :step="10"
            placeholder="0.00"
            :decimal-places="2"
            @blur="textBlurPrice($event, 4)"
            @change="textBlurPrice($event, 4)"
          ></t-input-number>
        </t-form-item>
        <t-form-item label="政府补贴（元/月）：" class="lastText">
          <span class="method">-</span>
          <t-input-number
            v-model="formData.governmentSubsidy"
            :min="0"
            :step="10"
            placeholder="0.00"
            :decimal-places="2"
            @blur="textBlurPrice($event, 5)"
            @change="textBlurPrice($event, 5)"
          ></t-input-number>
        </t-form-item>
        <t-form-item>
          <t-button @click="handleBill">账单预览</t-button>
        </t-form-item>
      </t-card>
      <!-- end -->
    </t-form>
    <!-- end -->
    <BillDetails
      :visible="billVisible"
      :form-data="formData"
      :base-data="baseData"
      @handleClose="handleClose"
    ></BillDetails>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { getLevelAllList } from '@/api/serve'
import { getDateInfo } from '@/utils/date'
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
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['getVallidate', 'getNewCostTime'])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const router = useRouter() // 获取全局
const route = useRoute() // 获取局部
// 表单数据
const formData = ref<Object | any>({
  depositAmount: '3000.00'
})
const nursData = ref([]) // 护理等级列表
const billVisible = ref(false) // 账单预览弹层
// 表单校验
const rules = {
  checkInTime: [
    {
      required: true,
      message: '入住期限为空，请选择入住期限',
      type: 'error',
      trigger: 'change'
    }
  ],
  nursingLevelId: [
    {
      required: true,
      message: '护理等级为空，请选择护理等级',
      type: 'error',
      trigger: 'change'
    }
  ],
  bedId: [
    {
      required: true,
      message: '入住床位为空，请选择入住床位',
      type: 'error',
      trigger: 'change'
    }
  ],
  costTime: [
    {
      required: true,
      message: '费用期限为空，请选择费用期限',
      type: 'error',
      trigger: 'change'
    }
  ],
  nursingCost: [
    {
      required: true,
      message: '护理费用为空，请输入护理费用',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 0.01,
      message: '护理费用为空，请输入护理费用',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: (val) => {
        const retreatVal = props.baseData.retreat.checkInConfigVo
        let routeRetreatVal = null
        if (route.query.obj !== undefined) {
          routeRetreatVal = JSON.parse(decodeURIComponent(route.query.obj))
        }
        let valStr = null
        // 如果是地址栏里自带的数据执行
        if (
          routeRetreatVal &&
          formData.value.nursingLevelId === routeRetreatVal.nursingLevelId
        ) {
          valStr = routeRetreatVal.nursingCost
        } else if (
          // 如果是后端反的详情执行
          retreatVal !== undefined &&
          formData.value.nursingLevelId === retreatVal.nursingLevelId
        ) {
          valStr = retreatVal.nursingCost
        } else {
          // 选择后的护理等级
          valStr = formData.value.fee
        }
        console.log(val, valStr)
        if (val < valStr * 0.9 || val > valStr * 1.1) {
          return false
        }
        return true
      },
      message: '该费用已超出/低于原费用10%，请重新输入',
      type: 'error',
      trigger: 'change'
    }
  ],
  bedCost: [
    {
      required: true,
      message: '床位费用为空，请输入床位费用',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 0.01,
      message: '床位费用为空，请输入床位费用',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: (val) => {
        // 费用上下浮动不能超过10%
        let bedSelectData = {}
        if (route.query.obj !== undefined) {
          bedSelectData = JSON.parse(decodeURIComponent(route.query.obj))
        } else {
          bedSelectData = props.baseData.retreat.checkInConfigVo
        }
        if (
          val < bedSelectData.bedCost * 0.9 ||
          val > bedSelectData.bedCost * 1.1
        ) {
          return false
        }
        return true
      },
      message: '该费用已超出/低于原费用10%，请重新输入',
      type: 'error',
      trigger: 'change'
    }
  ]
}
const timePickerProps = computed(() => {
  return {
    disableTime: () => {
      if (pickDate.value === dayjs().format('YYYY-MM-DD')) {
        return {
          hour: [0, 1, 2, 3, 4, 5, 6]
        }
      }
      return {}
    }
  }
})
// -----定义方法------
onMounted(() => {
  if (route.query.obj !== undefined) {
    // 获取地址栏信息
    const bedSelectData = JSON.parse(decodeURIComponent(route.query.obj))
    // 获取床位id
    if (bedSelectData.bedId !== undefined) {
      formData.value.bedId = bedSelectData.bedId
    }
    // 获取床位号
    if (bedSelectData.bedNumber !== undefined) {
      formData.value.bedNumber = bedSelectData.bedNumber
    }
    // 获取房间名字
    if (bedSelectData.code !== undefined) {
      formData.value.code = bedSelectData.code
    }
    // 获取楼层id
    if (bedSelectData.floorId !== undefined) {
      formData.value.floorId = bedSelectData.floorId
    }
    // 获取楼层名字
    if (bedSelectData.floorName !== undefined) {
      formData.value.floorName = bedSelectData.floorName
    }
    // 获取房间id
    if (bedSelectData.roomId !== undefined) {
      formData.value.roomId = bedSelectData.roomId
    }
    if (bedSelectData.price !== undefined) {
      formData.value.bedCost = bedSelectData.price
      formData.value.price = bedSelectData.price
    }
    // 获取入住期限回显
    if (bedSelectData.checkInTime !== undefined) {
      formData.value.checkInTime = bedSelectData.checkInTime
    }
    // 获取费用期限回显
    if (bedSelectData.costTime !== undefined) {
      formData.value.costTime = bedSelectData.costTime
    }
    // 获取护理等级
    if (bedSelectData.nursingLevelId !== undefined) {
      formData.value.nursingLevelId = bedSelectData.nursingLevelId
    }
    // 获取护理费用回显
    if (bedSelectData.nursingCost !== undefined) {
      formData.value.nursingCost = bedSelectData.nursingCost
    }
    // 获取床位费用回显
    if (bedSelectData.bedCost !== undefined) {
      formData.value.bedCost = bedSelectData.bedCost
    }
    // 获取其他费用回显
    if (bedSelectData.otherCost !== undefined) {
      formData.value.otherCost = bedSelectData.otherCost
    }
    // 获取医保支付
    if (bedSelectData.medicalInsurancePayment !== undefined) {
      formData.value.medicalInsurancePayment =
        bedSelectData.medicalInsurancePayment
    }
    // 获取政府补贴
    if (bedSelectData.governmentSubsidy !== undefined) {
      formData.value.governmentSubsidy = bedSelectData.governmentSubsidy
    }
  } else {
    // 获取后端返回的数据
    const checkInData = props.baseData.retreat.checkInConfigVo
    if (checkInData) {
      formData.value.depositAmount = `${checkInData.depositAmount}.00`
      formData.value.elderId = checkInData.elderId
      formData.value.governmentSubsidy = checkInData.governmentSubsidy
      formData.value.id = checkInData.id
      formData.value.medicalInsurancePayment =
        checkInData.medicalInsurancePayment
      formData.value.nursingCost = checkInData.nursingCost
      formData.value.nursingLevelId = checkInData.nursingLevelId
      formData.value.otherCost = checkInData.otherCost
      formData.value.checkInTime = [
        getDateInfo(checkInData.checkInStartTime),
        getDateInfo(checkInData.checkInEndTime)
      ]
      formData.value.costTime = [
        getDateInfo(checkInData.costStartTime),
        getDateInfo(checkInData.costEndTime)
      ]
    }
  }
  getList()
})
// 获取等级列表
const getList = async () => {
  const res: any = await getLevelAllList()
  if (res.code === 200) {
    nursData.value = res.data
  }
}
// 监听课程价格
const textBlurPrice = (val, num) => {
  let data = null
  if (num === 1) {
    data = Number(formData.value.nursingCost)
    formData.value.nursingCost = data < 0 ? '0.00' : formData.value.nursingCost
  } else if (num === 2) {
    data = Number(formData.value.bedCost)
    formData.value.bedCost = data < 0 ? '0.00' : formData.value.bedCost
  } else if (num === 3) {
    data = Number(formData.value.otherCost)
    formData.value.otherCost = data < 0 ? '0.00' : formData.value.otherCost
  } else if (num === 4) {
    data = Number(formData.value.medicalInsurancePayment)
    formData.value.medicalInsurancePayment =
      data < 0 ? '0.00' : formData.value.medicalInsurancePayment
  } else {
    data = Number(formData.value.governmentSubsidy)
    formData.value.governmentSubsidy =
      data < 0 ? '0.00' : formData.value.governmentSubsidy
  }
}
// 选择床位
const handleBed = () => {
  router.push({
    path: `/active/selectHouse`,
    query: {
      type: 'config',
      code: route.query.code,
      assigneeId: route.query.assigneeId,
      taskId: route.query.taskId,
      obj: formData.value
        ? encodeURIComponent(JSON.stringify(formData.value))
        : null
    }
  })
}
// 账单预览
const handleBill = () => {
  billVisible.value = true
}
// 关闭账单预览
const handleClose = () => {
  billVisible.value = false
}
// 选择护理等级显示护理费用
const handleNursing = (val) => {
  if (val !== undefined) {
    const obj = nursData.value.find((item) => item.id === val)
    formData.value.nursingCost = obj.fee
    formData.value.fee = obj.fee
  } else {
    formData.value.nursingCost = ''
    formData.value.fee = ''
  }
}
// 触发时间
const handleCheck = (val) => {
  emit('getNewCostTime', val)
}
// 向父组件暴露数据与方法
defineExpose({
  form,
  formData
})
</script>
