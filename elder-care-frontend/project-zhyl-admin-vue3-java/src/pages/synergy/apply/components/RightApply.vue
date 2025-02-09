<!-- 申请审批  -->
<template>
  <div class="applyBaseInfo">
    <!-- 操作记录-->
    <t-card
      v-if="
        (baseData.retreat.status === 1 &&
          baseData.retreat.flowStatus === 1 &&
          active !== 0) ||
        (baseData.retreat.status === 1 &&
          baseData.retreat.flowStatus === 3 &&
          baseData.isShow === 0 &&
          active !== 0) ||
        (baseData.retreat.status === 1 &&
          baseData.retreat.flowStatus === 4 &&
          active === 4) ||
        (baseData.retreat.status === 1 &&
          baseData.retreat.flowStatus === 5 &&
          active === 5)
      "
      title="审批结果"
    >
      <div class="dialog-form">
        <t-form ref="form" :data="formData" :rules="rules" :label-width="80">
          <t-form-item label="审批结果：" name="auditStatus" class="lastText">
            <t-radio-group
              v-model="formData.auditStatus"
              @change="handleChange"
            >
              <t-radio
                v-for="(item, index) in approveStatus"
                :key="index"
                :value="item.id"
                >{{ item.value }}</t-radio
              >
            </t-radio-group>
          </t-form-item>
          <t-form-item
            :label="labelText + '：'"
            name="opinion"
            class="lastText"
          >
            <t-textarea
              v-model="formData.opinion"
              placeholder="请输入"
              class="t-textarea"
              name="description"
              :maxlength="200"
              clearable
            >
            </t-textarea>
          </t-form-item>
        </t-form>
      </div>
    </t-card>
    <!-- end -->
    <!-- 操作记录-->
    <t-card title="操作记录">
      <div
        ref="apply"
        class="applyRecord"
        :class="height > 600 ? 'scroll' : ''"
      >
        <ApplyRecord :base-data="baseData" :active="active"></ApplyRecord>
      </div>
    </t-card>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 基础数据
import { approveStatusData } from '@/utils/commonData'
// 申请操作记录
import ApplyRecord from '@/components/ApplyRecord/index.vue'

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
// 表单数据
const form = ref() // 表单
const formData = ref<Object | any>({})
const approveStatus = ref([])
const labelText = ref('审批意见')
const apply = ref(null)
const height = ref(0) // 右侧高度
// 表单校验
const rules = {
  auditStatus: [
    {
      required: true,
      message: '审批结果为空，请选择审批结果',
      type: 'error',
      trigger: 'change'
    }
  ],
  opinion: [
    {
      required: true,
      message: '审批意见为空，请填写审批意见',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
onMounted(() => {
  height.value = apply.value.clientHeight
  approveStatus.value = approveStatusData
})
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
}
// 触发选项
const handleChange = (val) => {
  if (val === 3) {
    labelText.value = '驳回原因'
  } else {
    labelText.value = '审批意见'
  }
}
// 向父组件暴露数据与方法
defineExpose({
  form,
  formData,
  handleClear
})
</script>
