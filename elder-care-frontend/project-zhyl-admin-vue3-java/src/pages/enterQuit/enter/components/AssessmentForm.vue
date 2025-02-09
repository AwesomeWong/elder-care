<!-- 入住评估 -->
<template>
  <div class="dialog-form assessmentForm">
    <!-- 补全申请资料 -->
    <t-card title="健康能力评估">
      <SwitchBar
        ref="tabBar"
        :data="evaluatetabData"
        @change-id="getActiveId"
      ></SwitchBar>
      <!-- 健康评估 -->
      <div v-if="active === 0">
        <AssessmentForm1
          ref="assessmentForm1"
          :base-data="baseData"
        ></AssessmentForm1>
      </div>

      <!-- end -->
      <!-- 能力评估 -->
      <div v-if="active === 1">
        <AssessmentForm2
          ref="assessmentForm2"
          :base-data="baseData"
        ></AssessmentForm2>
      </div>
      <!-- end -->
      <!-- 评估报告 -->
      <div v-if="active === 2">
        <AssessmentForm3
          ref="assessmentForm3"
          :base-data="baseData"
        ></AssessmentForm3>
      </div>
      <!-- end -->
    </t-card>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/store'
import { evaluatetabData } from '@/utils/commonData'
// 组件
import SwitchBar from '@/components/switchBar/switchBartop.vue'
// 健康评估
import AssessmentForm1 from './AssessmentForm1.vue'
// 能力评估
import AssessmentForm2 from './AssessmentForm2.vue'
// 评估报告
import AssessmentForm3 from './AssessmentForm3.vue'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  infoActive: {
    type: Number,
    default: 0
  },
  isSave: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
// 触发父级事件
const emit = defineEmits(['getInfoActive', 'setFamily'])
const assessmentForm2 = ref() // 表单
const assessmentForm3 = ref() // 表单
const active = ref(0) // 当前tab选中的值
const tabBar = ref(null) // tabref
// 表单数据
const formData = ref<Object | any>({})
const userStore = useUserStore()
// 健康评估
const assessmentForm1 = ref(null) // 健康评估ref
// -----定义方法------
watch(props, (val) => {
  if (val.isSave) {
    const obj = userStore.$state.enterBaseData
    formData.value = obj
    if (val.infoActive > 0) {
      active.value = val.infoActive
      tabBar.value.currentId = active.value
    }
  }
})
// 获取tab当前值
const getActiveId = (val, index) => {
  active.value = index
  emit('getInfoActive', active.value)
}
// 向父组件暴露数据与方法
defineExpose({
  assessmentForm1,
  assessmentForm2,
  assessmentForm3
})
</script>
