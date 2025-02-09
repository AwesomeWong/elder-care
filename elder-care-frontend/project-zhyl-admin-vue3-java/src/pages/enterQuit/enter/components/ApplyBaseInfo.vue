<!-- 申请资料 -->
<template>
  <div class="detail-base">
    <!-- 基本信息 -->
    <t-card v-if="active === 0" title="补全申请资料">
      <ApplyBaseInfo1
        :checkInfo="checkInfo"
        :base-data="baseData"
        :reviewInfo="reviewInfo"
      ></ApplyBaseInfo1>
    </t-card>
    <!-- end -->
    <div v-if="active === 1">
      <ApplyBaseInfo2
        :checkInfo="checkInfo"
        :base-data="baseData"
        :reviewInfo="reviewInfo"
      ></ApplyBaseInfo2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// 申请入住信息
import ApplyBaseInfo1 from './ApplyBaseInfo1.vue'
import ApplyBaseInfo2 from './ApplyBaseInfo2.vue'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  active: {
    type: Number,
    default: 0
  }
})
// ------定义变量------
const checkInfo = ref<Object | any>({}) // 用户信息
const reviewInfo = ref<Object | any>({}) // 健康状况
const reviewInfo1 = ref<Object | any>({}) // 能力评估
const reviewInfo2 = ref<Object | any>({}) // 评估报告
watch(
  () => props.baseData,
  (val) => {
    const data = props.baseData
    if (data.retreat.otherApplyInfo !== undefined) {
      checkInfo.value = data.retreat.otherApplyInfo
    }
    if (data.retreat.reviewInfo !== undefined) {
      reviewInfo.value = data.retreat.reviewInfo
    }
    if (data.retreat.reviewInfo1 !== undefined) {
      reviewInfo1.value = data.retreat.reviewInfo1
    }
    if (data.retreat.reviewInfo2 !== undefined) {
      reviewInfo2.value = data.retreat.reviewInfo2
    }
  }
)
</script>
