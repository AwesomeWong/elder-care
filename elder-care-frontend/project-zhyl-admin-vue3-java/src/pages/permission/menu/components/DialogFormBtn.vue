<!-- 按钮新增、编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <!-- 对话框头部 -->
      <template #header>
        <div class="dialog-header">
          <span class="dialog-title">{{ pageTitle }}</span>
          <span class="information"></span>
        </div>
      </template>
      <template #body>
        <!-- 表单内容 -->
        <t-form
          ref="form"
          :data="formData"
          :rules="rules"
          :label-width="80"
          label-align="right"
          on-cancel="onClickCloseBtn"
          :reset-type="resetType"
          @submit="onSubmit"
        >
          <t-form-item label="按钮名称：" name="resourceName">
            <t-input
              v-model="formData.resourceName"
              placeholder="请输入"
              :maxlength="10"
              show-limit-number
              clearable
            >
            </t-input>
          </t-form-item>
          <t-form-item
            v-show="formData.resourceType !== 'F'"
            label="按钮路径："
            name="requestPath"
          >
            <t-input
              v-model="formData.requestPath"
              placeholder="请输入 "
              clearable
              :maxlength="50"
              show-limit-number
            >
            </t-input>
          </t-form-item>
          <t-form-item label="按钮状态：" name="dataState">
            <t-radio-group
              v-model="formData.dataState"
              :default-value="formData.dataState"
            >
              <t-radio :value="'0'">启用</t-radio>
              <t-radio :value="'1'">禁用</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item style="float: right" class="dialogBtnBox">
            <div class="bt bt-grey btn-submit" @click="onClickCloseBtn">
              <span>取消</span>
            </div>
            <button theme="primary" type="submit" class="bt btn-submit">
              <span>确定</span>
            </button>
          </t-form-item>
        </t-form>
        <!-- end -->
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, watchEffect } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
import { addMenu, editMenu } from '@/api/permission'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: '添加菜单'
  },
  resourceNo: {
    type: String
  }
})
const resetType = ref('empty')
const emit: Function = defineEmits(['handleClose', 'fetchData'])
const formVisible = ref(false)
const formData = ref({
  parentResourceNo: '', // 父资源ID
  resourceType: 'r',
  resourceName: '',
  requestPath: '',
  dataState: ''
})
const pageTitle = ref('')
const form = ref()
// 生命周期
onMounted(() => {
  // cacheFromData.value = { ...formData.value }
})

// 数据提交
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (props.title === '新增按钮') {
      // 新增菜单
      addMenuQuest(formData.value)
    } else {
      // 编辑菜单
      editMenuQuest(formData.value)
    }
  }
}

// 添加菜单
const addMenuQuest = async (params) => {
  // console.log(params, '添加菜单')
  addMenu({ ...params, parentResourceNo: props.resourceNo }).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('按钮新增成功')
      emit('fetchData', props.resourceNo)
      onClickCloseBtn()
    }
  })
}
// 修改菜单
const editMenuQuest = (params) => {
  editMenu(params)
    .then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('按钮修改成功')
        emit('fetchData', props.resourceNo)
        onClickCloseBtn()
      }
    })
    .catch((err) => {
      MessagePlugin.error(`请求出错了！ ${err.message}`)
    })
}
// 关闭弹框
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  formVisible.value = false
  emit('handleClose')
}
// 点击叉号关闭
// // 监听器，监听props.visible的变化，控制弹框的显示隐藏
watch(
  () => props.visible,
  (val) => {
    pageTitle.value = props.title
    formVisible.value = props.visible
    console.log(val, props, '-------------')
    // fetchData()
    if (val) {
      const { data } = props
      if (props.title === '新增按钮') {
        // ;(formData.value as any) = { ...cacheFromData.value }
      } else {
        formData.value = JSON.parse(JSON.stringify(data))
      }
      // formData.value.parentResourceNo =
      //   data.parentResourceNo !== undefined ? String(data.resourceNo) : ''
    }
  }
)

const baseRules = {
  resourceName: [
    {
      required: true,
      message: '请输入菜单名称',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
const ortRules = {
  requestPath: [
    {
      required: true,
      message: '请输入菜单路由',
      type: 'error',
      trigger: 'blur'
    }
  ],
  dataState: [
    {
      required: true,
      message: '请选择菜单状态',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 表单校验
const rules: any = ref({ ...baseRules, ...ortRules })
watchEffect(() => {
  rules.value =
    formData.value.resourceType === 'F'
      ? baseRules
      : { ...baseRules, ...ortRules }
})
</script>
<style lang="less" scoped>
:deep(.t-form) {
  .t-form__item {
    display: flex;
    justify-content: center;
  }
  .t-form__controls {
    width: 404px;
    margin-left: 0px !important;
  }
}
.iconCont {
  padding: 10px;
  ul {
    padding-top: 10px;
    height: 400px;
    overflow-y: scroll;
    align-items: flex-start;
    justify-content: flex-start;
    li {
      padding-bottom: 10px;
    }
  }
}
.btn-submit {
  margin-left: 15.5px;
  width: 60px;
}

.nickname {
  margin-right: 2px;
  z-index: 100;
  color: var(--color-bk4);
}

:deep(.t-textarea__limit) {
  color: var(--color-bk4);
  right: 10px;
}

.information {
  margin-left: 10px;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-bk4);
}

// 弹框出现方式
.dialog-form {
  .t-dialog__wrap {
    .t-dialog__position .t-dialog--top {
      background-color: #fff;
    }
  }
}
</style>
