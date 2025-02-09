<!-- 健康能力评估-报告评估 -->
<template>
  <div class="assessmentForm3" :class="isCheck ? 'isCheck' : ''">
    <t-form ref="form" :data="formData" :rules="rules" :label-width="140">
      <h1 class="tit titIcon">
        能力评估结果
        <t-popup
          class="placement bottom center titTpopup"
          content=""
          placement="bottom"
          show-arrow
          destroy-on-close
        >
          <t-icon name="error-circle-filled"></t-icon>
          <template #content>
            评估得分对应能力等级标准
            <table class="titTable">
              <tr>
                <th>等级名称</th>
                <th>等级标准</th>
              </tr>
              <tr>
                <td>能力完好</td>
                <td>总分10</td>
              </tr>
              <tr>
                <td>轻度失能</td>
                <td>总分11-20</td>
              </tr>
              <tr>
                <td>中度失能</td>
                <td>总分21-30</td>
              </tr>
              <tr>
                <td>中重度失能</td>
                <td>总分31-40</td>
              </tr>
              <tr>
                <td>重度失能</td>
                <td>总分41-50</td>
              </tr>
            </table>
          </template>
        </t-popup>
      </h1>
      <t-form-item label="各指标分数（分）：">
        <div class="targetScore">
          <span>自理能力得分：{{ formData.selfScore }}</span>
          <span>精神状态得分：{{ formData.spiritScore }}</span>
          <span>感知觉与社会参与得分：{{ formData.participationScore }}</span>
        </div>
      </t-form-item>
      <t-form-item label="评估总分（分）：">{{
        formData.assessmentTotal
      }}</t-form-item>
      <t-form-item label="能力初步等级：">{{ formData.grade }}</t-form-item>
      <h1 class="tit titIcon">
        护理等级结果
        <t-popup
          class="placement bottom center titTpopup"
          content=""
          placement="bottom"
          show-arrow
          destroy-on-close
        >
          <t-icon name="error-circle-filled"></t-icon>
          <template #content>
            依据健康评估信息表中的疾病和用药情况、近30天风险事件、身体健康情况、近期体检报告，确定是否存在导致能力等级变更的
            项目。若有以下情况之一，在原有能力级别提高一个级别：<br />1.
            确诊为认知障碍/痴呆； <br />2. 精神科专科医生诊断的精神类疾病；
            <br />3. 近30天内发生过2次及以上照护风险事件（如跌倒、自杀、走失等）
          </template>
        </t-popup>
      </h1>
      <t-form-item label="能力等级变更依据：" name="alteration">
        <t-checkbox-group v-model="formData.alteration">
          <t-checkbox
            v-for="(item, index) in gradeResultData"
            :key="index"
            :label="item"
            :disabled="isCheck"
            :value="item"
          />
        </t-checkbox-group>
      </t-form-item>
      <t-form-item class="otherBox" :requiredMark="false" name="other">
        <t-checkbox
          v-model="formData.otherCheck"
          label="其他"
          value="其他"
          :disabled="isCheck"
          @change="handleCheck"
        />
        <t-textarea
          v-model="formData.other"
          placeholder="请输入"
          show-limit-number
          :disabled="isCheck"
          :maxlength="100"
          @change="handleChange"
        >
        </t-textarea>
      </t-form-item>
      <t-form-item label="能力最终等级：" name="lastGrade">
        <t-radio-group v-model="formData.lastGrade" default-value="1">
          <t-radio
            v-for="(item, index) in gradeAbilityData"
            :key="index"
            :value="item"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/store'
// 组件
// 基本数据
import { gradeResultData, gradeAbilityData } from '@/utils/baseData'

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
const form = ref() // 表单
// 表单数据
const formData = ref({
  alteration: []
})
const userStore = useUserStore()
const reviewInfo2 = ref<Object | any>({})
const isCheck = ref(false) // 是否可以编辑，展示数据无需编辑
const diagnoseValidator = (value) => {
  console.log(value)
  if (value === undefined || value === '') {
    return false
  }
  return true
}
// 表单校验
const rulesVisiti = {
  alteration: [
    {
      required: true,
      message: '能力等级变更依据为空，请选择能力等级变更依据',
      type: 'error',
      trigger: 'change'
    }
  ],
  lastGrade: [
    {
      required: true,
      message: '能力最终等级为空，请选择能力最终等级',
      type: 'error',
      trigger: 'change'
    }
  ]
}
const rulesOtherVisiti = {
  other: [
    {
      validator: diagnoseValidator,
      required: true,
      message: '其他为空，请输入其他',
      type: 'error',
      trigger: 'blur'
    }
  ]
}

const rules = computed(() => {
  const val = formData.value
  if (val.otherCheck && (val.other === '' || val.other === undefined)) {
    return { ...rulesVisiti, ...rulesOtherVisiti }
  }
  return rulesVisiti
})
// -----定义方法------
onMounted(() => {
  // 获取本地储存的数据
  const val = userStore.$state.enterBaseData
  const data = props.baseData
  let baseVal = {}

  if (data.retreat.flowStatus === 1 && data.retreat.status === 1) {
    isCheck.value = false
  } else {
    isCheck.value = true
  }
  const oldTime = new Date(data.retreat.updateTime).getTime()
  if (val.updateTime > oldTime) {
    baseVal = val
  } else if (data.retreat.reviewInfo2 !== undefined) {
    baseVal = data
  }
  // if (val) {

  if (data.retreat !== undefined) {
    if (data.retreat.reviewInfo2 !== undefined) {
      formData.value = data.retreat.reviewInfo2
      // if (data.retreat.flowStatus === 1) {
      //   isCheck.value = false
      // } else {
      //   isCheck.value = true
      // }
    }
    console.log(baseVal.retreat)
    if (baseVal.retreat !== undefined) {
      if (baseVal.retreat.reviewInfo1 !== undefined) {
        const reviewInfo1 = baseVal.retreat.reviewInfo1
        // 自理得分
        formData.value.selfScore =
          reviewInfo1.radio1Score +
          reviewInfo1.radio2Score +
          reviewInfo1.radio3Score
        // 精神状态得分
        formData.value.spiritScore =
          reviewInfo1.radio4Score +
          reviewInfo1.radio5Score +
          reviewInfo1.radio6Score
        // 感知觉与社会参与得分
        formData.value.participationScore =
          reviewInfo1.radio7Score +
          reviewInfo1.radio8Score +
          reviewInfo1.radio9Score +
          reviewInfo1.radio10Score
        // 评估总分
        formData.value.assessmentTotal =
          formData.value.selfScore +
          formData.value.spiritScore +
          formData.value.participationScore
        // 等级
        const total = formData.value.assessmentTotal
        if (total === 10) {
          formData.value.grade = '能力完好'
        } else if (total >= 11 && total <= 20) {
          formData.value.grade = '轻度失能'
        } else if (total >= 21 && total <= 30) {
          formData.value.grade = '中度失能'
        } else if (total >= 31 && total <= 40) {
          formData.value.grade = '中重度失能'
        } else {
          formData.value.grade = '重度失能'
        }
      }
    }
  }

  // }

  // if (data.retreat !== undefined) {
  //   if (data.retreat.reviewInfo2 !== undefined) {
  //     // reviewInfo2.value = JSON.parse(data.retreat.reviewInfo2)
  //     reviewInfo2.value = data.retreat.reviewInfo2
  //     if (data.retreat.flowStatus === 1) {
  //       isCheck.value = false
  //     } else {
  //       isCheck.value = true
  //     }
  //     console.log(reviewInfo2.value)
  //     // formData.value = reviewInfo2.value
  //   }
  // }
})
// 触发是否选择了其他
const handleCheck = (val) => {
  if (!val) {
    formData.value.other = ''
  }
}
// 触发其他
const handleChange = (val) => {
  if (val === '') {
    formData.value.otherCheck = false
  } else {
    formData.value.otherCheck = true
  }
}
defineExpose({
  form,
  formData
})
</script>
