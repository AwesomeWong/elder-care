<!-- 查看护理计划弹窗 -->
<template>
  <div class="dialogBox tableDialog roomDialog">
    <t-dialog
      v-model:visible="formVisible"
      header="查看护理计划"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <template #body>
        <!-- 表单内容 -->
        <div class="">
          <t-form
            ref="form"
            :data="formData"
            :label-width="110"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
          >
            <t-form-item label="护理计划名称：">
              {{ formData.planName }}
            </t-form-item>
            <t-form-item label="护理项目：">
              <div class="scrollTable dialogHeight">
                <t-table
                  ref="tableRef"
                  row-key="key"
                  :columns="FROMCOLUMNS"
                  :data="formData.projectPlans"
                  :editable-row-keys="editableRowKeys"
                  table-layout="auto"
                  :scroll="{ type: 'virtual', rowHeight: 48, bufferSize: 10 }"
                  :height="423"
                >
                  <template #executeCycle="{ row }">
                    <span v-if="row.executeCycle === 0">每日</span>
                    <span v-else-if="row.executeCycle === 1">每周</span>
                    <span v-else>每月</span>
                  </template>
                </t-table>
              </div>
            </t-form-item>
          </t-form>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  //   详情数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 所有项目
  projectData: {
    type: Array<Object | any>,
    default: () => {
      return []
    }
  }
})

// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'handleClose',
  'fetchData',
  'handleAdd',
  'handleEdit',
  'selectChange'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
const formData = ref<Object | any>({}) // 表单数据
const tableRef = ref(null)

const editableRowKeys = ref([])
// 保存变化过的行信息
const FROMCOLUMNS = computed(() => {
  return [
    {
      title: '护理项目名称',
      colKey: 'projectName'
    },
    {
      title: '期望服务时间',
      colKey: 'executeTime'
    },
    {
      title: '执行周期',
      colKey: 'executeCycle'
    },
    {
      title: '执行频次(次)',
      width: 116,
      colKey: 'executeFrequency'
    }
  ]
})
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
  }
)
// 监听器，监听父级传递的data值，控制表单数据
watch(
  () => props.baseData,
  (val) => {
    formData.value = val
  }
)
// -----定义方法------
// 点击取消关闭
const onClickCloseBtn = () => {
  emit('handleClose')
}
</script>
<style scoped>
.t-table__content {
  overflow: initial;
}
</style>
