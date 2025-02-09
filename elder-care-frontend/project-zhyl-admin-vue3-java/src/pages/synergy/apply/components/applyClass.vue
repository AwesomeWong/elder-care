<!-- 申请单据类别弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="选择申请单据类别"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <template #body>
        <!-- 表单内容 -->
        <div class="dialogCenter">
          <t-form
            ref="form"
            :data="formData"
            :rules="rules"
            :label-width="108"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @reset="onClickCloseBtn"
            @submit="onSubmit"
          >
            <t-form-item label="单据类别：" name="status">
              <t-radio-group v-model="formData.status">
                <t-radio
                  v-for="(item, index) in invoicesType"
                  :key="index"
                  :value="item.id"
                  >{{ item.value }}</t-radio
                >
              </t-radio-group>
            </t-form-item>
            <t-form-item class="dialog-footer">
              <div>
                <button class="bt bt-grey wt-60" type="reset">取消</button>
                <button theme="primary" type="submit" class="bt wt-60">
                  <span>确定</span>
                </button>
              </div>
            </t-form-item>
          </t-form>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ValidateResultContext, MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
// 基础数据
import { invoicesType } from '@/utils/commonData'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['handleClose'])
const router = useRouter() // 获取全局
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
const userStore = useUserStore()
// 表单数据
const formData = ref<Object | any>({})

// 表单校验
const rules = {
  status: [
    {
      required: true,
      message: '单据类别为空，请选择单据类别',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (formData.value.status === 1) {
      onClickCloseBtn()
      router.push({
        path: `/active/applyDetails`
      })
    } else if (formData.value.status === 2) {
      MessagePlugin.info('程序小哥哥正在开发中!')
    } else {
      onClickCloseBtn()
      userStore.setEnterBaseData({})
      router.push({
        path: `/active/checkDetails`
      })
    }
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// 向父组件暴露数据与方法
defineExpose({
  handleClear
})
</script>
