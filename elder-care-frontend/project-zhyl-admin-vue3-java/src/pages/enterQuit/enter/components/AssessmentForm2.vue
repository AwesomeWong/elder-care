<!-- 健康能力评估-能力评估 -->
<template>
  <div class="assessmentBox2" :class="isCheck ? 'isCheck isAssessment' : ''">
    <t-form ref="form" :data="formData" :rules="rules" :label-width="140">
      <h1 class="tit">自理能力评估</h1>
      <t-form-item label="" name="radio1">
        <template #label>
          1. 进食：使用适当的器具将食物送入嘴中并咽下
          <span
            >得分：{{
              formData.radio1Score ? formData.radio1Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio1"
          @change="handleRadio($event, 0)"
        >
          <t-radio
            v-for="(item, index) in assessmentData"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="" name="radio2">
        <template #label>
          2. 洗澡：清洗和擦干身体
          <span
            >得分：{{
              formData.radio2Score ? formData.radio2Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio2"
          @change="handleRadio($event, 1)"
        >
          <t-radio
            v-for="(item, index) in assessmentData"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="" name="radio3">
        <template #label>
          3. 修饰：指洗脸、刷牙、梳头、刮脸、剪指（趾）甲等
          <span
            >得分：{{
              formData.radio3Score ? formData.radio3Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio3"
          @change="handleRadio($event, 2)"
        >
          <t-radio
            v-for="(item, index) in assessmentData"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <h1 class="tit">精神状态</h1>
      <t-form-item label="" name="radio4">
        <template #label>
          4. 时间/空间定向：知道并确认时间、空间的能力
          <span
            >得分：{{
              formData.radio4Score ? formData.radio4Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio4"
          @change="handleRadio($event, 3)"
        >
          <t-radio
            v-for="(item, index) in assessmentData4"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="" name="radio5">
        <template #label>
          5. 人物定向：知道并确认人物的能力
          <span
            >得分：{{
              formData.radio5Score ? formData.radio5Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio5"
          @change="handleRadio($event, 4)"
        >
          <t-radio
            v-for="(item, index) in assessmentData5"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="" name="radio6">
        <template #label>
          6. 记忆：短时和长时记忆、瞬时、近期和远期记忆能力
          <span
            >得分：{{
              formData.radio6Score ? formData.radio6Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio6"
          @change="handleRadio($event, 5)"
        >
          <t-radio
            v-for="(item, index) in assessmentData6"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <h1 class="tit">感知觉与社会参与</h1>
      <t-form-item label="" name="radio7">
        <template #label>
          7. 视力：感受存在的光线并感受物体的大小、形状的能力
          <span
            >得分：{{
              formData.radio7Score ? formData.radio7Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio7"
          @change="handleRadio($event, 6)"
        >
          <t-radio
            v-for="(item, index) in assessmentData7"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="" name="radio8">
        <template #label>
          8.听力：能够辨别声音的方位、音调、音量和音质的有关能力（可借助平时使用助听设备等）
          <span
            >得分：{{
              formData.radio8Score ? formData.radio8Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio8"
          @change="handleRadio($event, 7)"
        >
          <t-radio
            v-for="(item, index) in assessmentData8"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="" name="radio9">
        <template #label>
          9.
          执行日常事务：计划、安排并完成日常事务，包括但不限于洗衣服、小金额购物、服药管理分
          <span
            >得分：{{
              formData.radio9Score ? formData.radio9Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio9"
          @change="handleRadio($event, 8)"
        >
          <t-radio
            v-for="(item, index) in assessmentData9"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="" name="radio10">
        <template #label>
          10. 使用交通工具外出分
          <span
            >得分：{{
              formData.radio10Score ? formData.radio10Score : '--'
            }}</span
          >
        </template>
        <t-radio-group
          v-model="formData.radio10"
          @change="handleRadio($event, 9)"
        >
          <t-radio
            v-for="(item, index) in assessmentData10"
            :key="index"
            :value="index"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store'
// 组件
// 基本数据
import {
  assessmentData,
  assessmentData4,
  assessmentData5,
  assessmentData6,
  assessmentData7,
  assessmentData8,
  assessmentData9,
  assessmentData10
} from '@/utils/baseData'

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
const formData = ref<Object | any>({})
const userStore = useUserStore()
const isCheck = ref(false) // 是否可以编辑，展示数据无需编辑
// 表单校验
const rules = {
  radio1: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio2: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio3: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio4: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio5: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio6: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio7: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio8: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio9: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ],
  radio10: [
    {
      required: true,
      message: '选项为空，请选择选项',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// -----定义方法------
onMounted(() => {
  // 获取本地储存的数据
  const val = userStore.$state.enterBaseData
  const data = props.baseData
  if (data.retreat.flowStatus === 1 && data.retreat.status === 1) {
    isCheck.value = false
  } else {
    isCheck.value = true
  }
  if (val.retreat !== undefined && val.retreat.reviewInfo1 !== undefined) {
    formData.value = val.retreat.reviewInfo1
  }

  if (data !== undefined && data.retreat !== undefined) {
    if (data.retreat.reviewInfo1 !== undefined) {
      formData.value = data.retreat.reviewInfo1
    }
  }
})
// 能力评估选择单选
const handleRadio = (val, num) => {
  let radioVal = 0
  if (val === 0) {
    radioVal = 1
  } else if (val === 1) {
    radioVal = 2
  } else if (val === 2) {
    radioVal = 3
  } else if (val === 3) {
    radioVal = 4
  } else {
    radioVal = 5
  }
  // 计算分数
  switch (num) {
    case 0:
      formData.value.radio1Score = radioVal
      break
    case 1:
      formData.value.radio2Score = radioVal
      break
    case 2:
      formData.value.radio3Score = radioVal
      break
    case 3:
      formData.value.radio4Score = radioVal
      break
    case 4:
      formData.value.radio5Score = radioVal
      break
    case 5:
      formData.value.radio6Score = radioVal
      break
    case 6:
      formData.value.radio7Score = radioVal
      break
    case 7:
      formData.value.radio8Score = radioVal
      break
    case 8:
      formData.value.radio9Score = radioVal
      break
    default:
      formData.value.radio10Score = radioVal
      break
  }
}
// 向父组件暴露数据与方法
defineExpose({
  form,
  formData
})
</script>
