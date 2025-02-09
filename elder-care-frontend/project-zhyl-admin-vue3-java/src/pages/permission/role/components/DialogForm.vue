<!-- 角色新增、编辑弹窗 -->
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
          label-align="left"
          on-cancel="onClickCloseBtn"
          :reset-type="resetType"
          @submit="onSubmit"
        >
          <t-form-item label="角色名称: " name="roleName">
            <t-input
              v-model="formData.roleName"
              :maxlength="10"
              show-limit-number
              placeholder="请输入角色名称"
              clearable
            />
          </t-form-item>
          <t-form-item label="角色状态:" name="dataState">
            <t-radio-group
              v-model="formData.dataState"
              :default-value="formData.dataState"
            >
              <t-radio :value="'0'">启用</t-radio>
              <t-radio :value="'1'">禁用</t-radio>
            </t-radio-group>
          </t-form-item>
          <!-- <t-form-item label="角色说明:" name="remark"
            ><t-textarea
              v-model="formData.remark"
              placeholder="请输入"
              :maxlength="300"
            >
            </t-textarea>
          </t-form-item> -->
          <t-form-item style="float: right" class="footer-btn">
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
import { ref, watch } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
import { addRoles, editRoles } from '@/api/permission'

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
    default: '添加角色'
  }
})
const resetType = ref('empty')
const emit: Function = defineEmits(['handleClose', 'fetchData'])
const formVisible = ref(false)
const formData = ref({
  roleName: '',
  dataState: ''
})
const pageTitle = ref('')
const form = ref()

// 数据提交
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (props.title === '新增角色') {
      // 新增角色
      addDeptQuest(formData.value)
    } else {
      // 编辑角色
      editDeptQuest(formData.value)
    }
  }
}
// 添加角色
const addDeptQuest = async (params) => {
  addRoles(params).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('角色添加成功')
      emit('fetchData')
      onClickCloseBtn()
    }
  })
}
// 修改角色
const editDeptQuest = (params) => {
  editRoles(params)
    .then((res) => {
      onClickCloseBtn()
      if (res.code === 200) {
        MessagePlugin.success('角色修改成功')
        emit('fetchData')
      } else {
        MessagePlugin.error(`${res.msg}`)
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

// 监听器，监听props.visible的变化，控制弹框的显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    pageTitle.value = props.title
  }
)
// 监听器，给表单赋值
watch(
  () => props.data,
  (val) => {
    formData.value = JSON.parse(JSON.stringify(val))
    console.log(formData.value, 'formData.value')
  }
)

// 表单校验
const rules = {
  roleName: [
    {
      required: true,
      message: '请输入角色名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  dataState: [
    {
      required: true,
      message: '请选择角色状态',
      type: 'error',
      trigger: 'change'
    }
  ]
}
</script>
<style lang="less" scoped>
:deep(.footer-btn) {
  .t-form__controls-content {
    justify-content: end;
  }
}
:deep(.t-form-item__remark) {
  .t-form__label {
    padding-left: 12px;
  }
}
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
