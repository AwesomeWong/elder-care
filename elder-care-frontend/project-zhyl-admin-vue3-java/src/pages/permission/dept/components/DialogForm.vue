<!-- 新增、编辑弹窗 -->
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
          :label-width="95"
          on-cancel="onClickCloseBtn"
          :reset-type="resetType"
          @submit="onSubmit"
        >
          <t-form-item label="上级部门：" name="parentDeptNo">
            <t-cascader
              v-model="formData.parentDeptNo"
              :keys="{ label: 'label', value: 'id', children: 'children' }"
              :options="options"
              check-strictly
              filterable
            />
          </t-form-item>
          <t-form-item label="部门名称：" name="deptName">
            <t-input
              v-model="formData.deptName"
              placeholder="请输入 "
              clearable
              :maxlength="10"
              show-limit-number
            >
            </t-input>
          </t-form-item>
          <t-form-item label="排序：" name="sortNo">
            <t-input-number
              v-model="formData.sortNo"
              :min="minNumber"
              @blur="textBlurNo"
              @onkeyup="handleOnkeyup"
              @change="textBlurNo"
            ></t-input-number>
          </t-form-item>
          <t-form-item label="部门状态：" name="dataState">
            <t-radio-group
              v-model="formData.dataState"
              :default-value="formData.dataState"
            >
              <t-radio :value="'0'">启用</t-radio>
              <t-radio :value="'1'">禁用</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="部门负责人：">
            <t-select
              v-model="formData.leaderId"
              clearable
              filterable
              placeholder="请选择"
            >
              <t-option
                v-for="(item, index) in userData"
                :key="index"
                :value="item.id"
                :label="item.realName"
                title=""
              >
                {{ item.realName }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="部门说明：" name="remark"
            ><t-textarea
              v-model="formData.remark"
              placeholder="请输入"
              :maxlength="300"
            >
            </t-textarea>
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
        <!-- <t-enhanced-table
          ref="tableRef"
          table-layout="auto"
          row-key="id"
          :tree="{ childrenKey: 'children' }"
          :data="options"
          :columns="TEST_COLUMNS"
          class="tableRef"
        ></t-enhanced-table> -->
        <!-- end -->
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
import { TEST_COLUMNS } from '../constants' // 表格列
import {
  getDeptTree,
  addDept,
  editDept,
  getAllUserList
} from '@/api/permission'
import { onkeyup } from '@/utils/index'

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
    default: '新建部门'
  }
})

const resetType = ref('empty')
const emit: Function = defineEmits(['handleClose', 'fetchData'])
const formVisible = ref(false)
const minNumber = ref(0)
const formData = ref({
  deptName: '',
  leaderId: '',
  parentDeptNo: '',
  // userTotal: '',
  dataState: '',
  sortNo: 0,
  remark: ''
})
const pageTitle = ref('')
const form = ref()
const options = ref([])
const userData = ref([]) // 用户列表数据
// 生命周期
onMounted(() => {
  fetchData()
  getUserList()
})
// 触发键盘
const handleOnkeyup = (val) => {
  onkeyup(val)
}
// 监听排序
const textBlurNo = () => {
  const data = Number(formData.value.sortNo)
  if (data <= 0) {
    formData.value.sortNo = 0
  } else if (data >= 9999) {
    formData.value.sortNo = 9999
  }
}

// 获取列表数据
const fetchData = async () => {
  // 获取部门数据
  getDeptTree()
    .then((res) => {
      if (res.code === 200) {
        ;(options as any).value = res.data.items
        console.log(options.value, '-------------')
      }
    })
    .catch((err) => {
      MessagePlugin.error(`部门数据获取失败! ${err.message}`)
    })
}
// 获取有用户列表
const getUserList = async () => {
  // 获取部门数据
  getAllUserList().then((res) => {
    if (res.code === 200) {
      userData.value = res.data
    }
  })
}
// 数据提交
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (props.title === '新增部门') {
      // 新增部门
      addDeptQuest(formData.value)
    } else {
      // 编辑部门
      editDeptQuest(formData.value)
    }
  }
}
// 添加部门
const addDeptQuest = async (params) => {
  addDept(params).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('部门添加成功')
      fetchData()
      emit('fetchData')
      onClickCloseBtn()
    }
  })
}
// 修改部门
const editDeptQuest = (params) => {
  editDept(params)
    .then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('部门修改成功')
        fetchData()
        emit('fetchData')
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
  formData.value.sortNo = 0
  formData.value.leaderId = ''
  formVisible.value = false
  emit('handleClose')
}
// 通过监听弹窗处理添加部门和修改部门的数据
watch(
  () => props.visible,
  (val) => {
    pageTitle.value = props.title
    formVisible.value = props.visible
    console.log(props, 'props')
    if (val) {
      const { data } = props
      if (props.title === '新增部门') {
        formData.value.parentDeptNo = data.parentDeptNo
      } else {
        formData.value = JSON.parse(JSON.stringify(data))
      }
      ;(formData as any).value.parentDeptNo =
        data.parentDeptNo !== undefined ? String(data.parentDeptNo) : ''
      console.log(formData.value, 'val')
    }
  }
)
defineExpose({ fetchData })
// 表单校验
const rules = {
  dataState: [
    // 调用次数校验
    {
      required: true,
      message: '请选择部门状态',
      type: 'error',
      trigger: 'blur'
    }
  ],
  parentDeptNo: [
    // 调用次数校验
    {
      required: true,
      message: '请选择上级部门',
      type: 'error',
      trigger: 'change'
    }
  ],
  deptName: [
    // 调用次数校验
    {
      required: true,
      message: '请输入部门名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  sortNo: [
    {
      required: true,
      message: '请输入显示排序',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
</script>
<style lang="less" scoped>
:deep(.tableRef) {
  .t-table__content {
    width: 100%;
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

:deep(.t-form-item__remark) {
  .t-form__label {
    padding-left: 12px;
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

:deep(.t-form-item__sortNo) {
  .t-form__label {
    text-align: right;
  }
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
