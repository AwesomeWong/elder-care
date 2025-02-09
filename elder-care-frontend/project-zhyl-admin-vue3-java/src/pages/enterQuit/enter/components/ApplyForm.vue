<!-- 申请入住 -->
<template>
  <div class="dialog-form cleckInForm">
    <!-- 补全申请资料 -->
    <t-card title="补全申请资料">
      <SwitchBar
        ref="tabBar"
        :data="checkIntabData"
        @change-id="getActiveId"
      ></SwitchBar>
      <!-- 基本信息 -->
      <div v-if="active === 0">
        <t-form ref="form" :data="formData" :rules="rules" :label-width="88">
          <t-form-item label="老人姓名：" name="name">
            <t-input
              v-model="formData.name"
              placeholder="请输入"
              class="wt-300"
              clearable
              show-limit-number
              :maxlength="10"
            >
            </t-input>
          </t-form-item>
          <t-form-item label="老人身份证号：" class="label-wt" name="idCardNo">
            <t-input
              v-model="formData.idCardNo"
              placeholder="请输入"
              class="wt-300"
              show-limit-number
              :maxlength="18"
              clearable
              @blur="handleCardNo"
            >
            </t-input>
          </t-form-item>
          <t-form-item label="性别：" name="sex">
            <t-radio-group v-model="formData.sex">
              <t-radio
                v-for="(item, index) in sexData"
                :key="index"
                :value="item.id"
                :disabled="disabled"
                >{{ item.value }}</t-radio
              >
            </t-radio-group>
          </t-form-item>
          <t-form-item label="出生日期：" class="label-wt">
            <t-input
              v-model="formData.birthdate"
              placeholder="出生日期"
              class="wt-300"
              :disabled="disabled"
            >
            </t-input>
          </t-form-item>
          <t-form-item label="年龄：">
            <t-input
              v-model="formData.age"
              placeholder="年龄"
              class="wt-300"
              :disabled="disabled"
            >
            </t-input>
          </t-form-item>
          <t-form-item label="联系方式：" class="label-wt" name="phone">
            <t-input
              v-model="formData.phone"
              placeholder="请输入"
              class="wt-300"
              clearable
              show-limit-number
              :maxlength="11"
              @change="handlePhone"
            >
            </t-input>
          </t-form-item>
          <t-form-item label="家庭住址：" class="lastText" name="address">
            <t-textarea
              v-model="formData.address"
              placeholder="请输入"
              class="t-textarea"
              name="description"
              :maxlength="100"
              clearable
              show-limit-number
            >
            </t-textarea>
          </t-form-item>
          <t-form-item label="民族：">
            <t-select
              v-model="formData.nationality"
              clearable
              filterable
              placeholder="请选择"
              class="wt-300"
            >
              <t-option
                v-for="(item, index) in nationalityData"
                :key="index"
                :value="item"
                :label="item"
                title=""
              />
            </t-select>
          </t-form-item>
          <t-form-item label="政治面貌：" class="label-wt">
            <t-select
              v-model="formData.politicStatus"
              clearable
              filterable
              placeholder="请选择"
              class="wt-300"
            >
              <t-option
                v-for="(item, index) in politicsStatusData"
                :key="index"
                :value="item"
                :label="item"
                title=""
              />
            </t-select>
          </t-form-item>
          <t-form-item label="宗教信仰：">
            <t-select
              v-model="formData.religion"
              clearable
              filterable
              placeholder="请选择"
              class="wt-300"
            >
              <t-option
                v-for="(item, index) in religionData"
                :key="index"
                :value="item"
                :label="item"
                title=""
              />
            </t-select>
          </t-form-item>
          <t-form-item label="婚姻状况：" class="label-wt">
            <t-select
              v-model="formData.maritalStatus"
              clearable
              filterable
              placeholder="请选择"
              class="wt-300"
            >
              <t-option
                v-for="(item, index) in maritalStatusData"
                :key="index"
                :value="item"
                :label="item"
                title=""
              />
            </t-select>
          </t-form-item>
          <t-form-item label="文化程度：">
            <t-select
              v-model="formData.education"
              clearable
              filterable
              placeholder="请选择"
              class="wt-300"
            >
              <t-option
                v-for="(item, index) in degreeEducationData"
                :key="index"
                :value="item"
                :label="item"
                title=""
              />
            </t-select>
          </t-form-item>
          <t-form-item label="经济来源：" class="label-wt">
            <t-select
              v-model="formData.sourceFinance"
              clearable
              filterable
              placeholder="请选择"
              class="wt-300"
            >
              <t-option
                v-for="(item, index) in sourceFinanceData"
                :key="index"
                :value="item"
                :label="item"
                title=""
              />
            </t-select>
          </t-form-item>
          <t-form-item label="特长爱好：">
            <t-input
              v-model="formData.hobby"
              placeholder="请输入"
              class="wt-300"
              :maxlength="20"
              clearable
              show-limit-number
            >
            </t-input>
          </t-form-item>
          <t-form-item label="医疗保障：" class="label-wt">
            <t-select
              v-model="formData.medicalSecurity"
              clearable
              filterable
              placeholder="请选择"
              class="wt-300"
            >
              <t-option
                v-for="(item, index) in safeguardData"
                :key="index"
                :value="item"
                :label="item"
                title=""
              />
            </t-select>
          </t-form-item>
          <t-form-item label="医保卡号：">
            <t-input
              v-model="formData.medicineCard"
              placeholder="请输入"
              class="wt-300"
              :maxlength="19"
              clearable
              show-limit-number
            >
            </t-input>
          </t-form-item>
        </t-form>
      </div>

      <!-- end -->
      <!-- 家属信息 -->
      <div v-if="active === 1">
        <t-table
          ref="tableRef"
          row-key="key"
          :columns="FROMCOLUMNS"
          :data="familyUserData"
          :editable-row-keys="editableRowKeys"
          table-layout="auto"
          @row-edit="onRowEdit"
          @row-validate="onRowValidate"
        >
          <!-- 操作栏 -->
          <template #op="{ row, rowIndex }">
            <div class="addInput">
              <icon
                v-if="familyUserData.length > 1"
                name="minus-rectangle"
                @click="handleDelete(row, rowIndex)"
              />
              <icon
                v-if="rowIndex === 0 && !isAddData"
                name="add-rectangle"
                @click="handleRowAdd"
              />
            </div>
          </template>
          <!-- end -->
        </t-table>
      </div>
      <!-- end -->
      <!-- 资料上传 -->
      <div v-if="active === 2">
        <Upload ref="upload" :urls="urls"></Upload>
      </div>
      <!-- end -->
    </t-card>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { Icon } from 'tdesign-icons-vue-next'
import { MessagePlugin, Input, Select } from 'tdesign-vue-next'
import {
  isCardID,
  validatePhone,
  getBirthday,
  validateIdentityNum
} from '@/utils/validate'
import { useUserStore } from '@/store'
// 组件
import SwitchBar from '@/components/switchBar/switchBartop.vue'
import Upload from './upload.vue'
import { getIsCard } from '@/api/oldMan'
// 基本数据
import { sexData, relationData, checkIntabData } from '@/utils/commonData'
import {
  nationalityData,
  politicsStatusData,
  religionData,
  maritalStatusData,
  degreeEducationData,
  sourceFinanceData,
  safeguardData
} from '@/utils/baseData'

// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 本地储存的基本信息
  storageData: {
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
const emit = defineEmits(['getInfoActive', 'setFamily', 'setIsSave'])
const form = ref() // 表单
const tableRef = ref()
// 基本信息
const disabled = ref(true) // 是否只读
const active = ref(0) // 当前tab选中的值
const tabBar = ref(null) // tabref

// 表单数据
const formData = ref<Object | any>({})
const userStore = useUserStore()
// 校验老人是否入住
const validateIsCard = async (val) => {
  if (val !== undefined) {
    const res: any = await getIsCard({ idCard: val })
    if (res.code === 200) {
      if (res.data !== undefined && val === res.data.idCardNo) {
        return false
      }
      return true
    }
  } else {
    return false
  }
}
// 表单校验
const rules = {
  name: [
    {
      required: true,
      message: '老人姓名为空，请输入老人姓名',
      type: 'error',
      trigger: 'blur'
    }
  ],
  idCardNo: [
    {
      required: true,
      message: '老人身份证号为空，请输入老人身份证号',
      trigger: 'blur'
    },
    {
      validator: isCardID,
      message: '身份证格式错误，请重新输入',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateIsCard,
      message: '该老人已入住，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '联系方式为空，请输入联系方式',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePhone,
      message: '手机号格式错误，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ],
  address: [
    {
      required: true,
      message: '家庭住址为空，请输入家庭住址',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 家属信息
// 保存变化过的行信息
const FROMCOLUMNS = computed(() => {
  return [
    {
      title: '家属姓名',
      colKey: 'name',
      minWidth: 200,
      // 编辑状态相关配置，全部集中在 edit
      edit: {
        component: Input,
        props: {
          clearable: true,
          // autofocus: true,
          maxlength: 10
        },
        validateTrigger: 'change',
        // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
        abortEditOnEvent: ['onEnter'],
        // 编辑完成，退出编辑态后触发
        onEdited: (context) => {
          familyUserData.value.splice(context.rowIndex, 1, context.newRowData)
          MessagePlugin.success('Success')
        },
        rules: [{ required: true, message: '不能为空' }],
        // 默认是否为编辑状态
        defaultEditable: true
      }
    },
    {
      title: '家属联系方式',
      colKey: 'phone',
      minWidth: 200,
      edit: {
        component: Input,
        props: {
          clearable: true,
          // autofocus: true,
          maxlength: 11
        },
        abortEditOnEvent: ['blur'],
        rules: [
          {
            validator: (val) => {
              const reg =
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

              if (val === '') {
                MessagePlugin.error('家属信息不完整，请输入家属信息')
              } else {
                if (reg.test(val)) {
                  return true
                }
                MessagePlugin.error('手机号格式错误，请重新输入')
              }
            }
          }
        ],
        // 默认是否为编辑状态
        defaultEditable: true
      }
    },
    {
      title: '与老人关系',
      colKey: 'refId',
      minWidth: 200,
      cell: (h, { row }) =>
        relationData.find((t) => t.value === row.refId)?.label,
      edit: {
        component: Select,
        props: {
          clearable: true,
          options: relationData
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false
      }
    },
    {
      align: 'left',
      fixed: 'right',
      width: 100,
      minWidth: 100,
      colKey: 'op',
      title: '操作'
    }
  ]
})
const getBaseData = () => {
  const obj = {
    key: '0',
    name: '',
    phone: '',
    refId: '',
    refName: ''
  }
  return [obj]
}
const familyUserData = ref<Object | any>(getBaseData())
const editableRowKeys = ref([])
const isAddData = ref(false)
const editMap = {}
// 资料上传
const upload = ref(null)
const urls = ref({}) // 资料
// -----定义方法------
// 监听器，监听父级传递的data值，控制表单数据
watch(props, (val) => {
  if (val.isSave) {
    const obj = userStore.$state.enterBaseData
    if (obj.otherApplyInfo !== undefined) {
      formData.value = userStore.$state.enterBaseData.otherApplyInfo
    }
    if (obj.memberElderDtos !== undefined && obj.memberElderDtos.length > 0) {
      familyUserData.value = obj.memberElderDtos
    }
  }
  if (val.infoActive > 0) {
    active.value = val.infoActive
    tabBar.value.currentId = active.value
  }
})
onMounted(() => {
  if (props.baseData.type) {
    formData.value = props.baseData.retreat.otherApplyInfo
    urls.value = {
      url1: props.baseData.retreat.url1,
      url2: props.baseData.retreat.url2,
      url3: props.baseData.retreat.url3
    }
    const arr = []

    props.baseData.retreat.memberElderDtos.forEach((ele) => {
      // 把数据处理下付给data，用来回显页面数据
      const obj = {
        key: '0',
        id: ele.id,
        name: ele.name,
        phone: ele.phone,
        refId: ele.refId,
        refName: ele.refName
      }
      arr.push(obj)
    })
    familyUserData.value = arr
  } else {
    // 获取本地储存的数据
    const val = userStore.$state.enterBaseData
    if (val.retreat !== undefined) {
      if (val.retreat.otherApplyInfo !== undefined) {
        formData.value = val.retreat.otherApplyInfo
      }

      if (
        val.retreat.memberElderDtos !== undefined &&
        val.retreat.memberElderDtos.length > 0
      ) {
        familyUserData.value = val.retreat.memberElderDtos
      }
    }
  }

  getRowKey()
})
// 获取tab当前值
const getActiveId = (val, index) => {
  active.value = index
  emit('getInfoActive', active.value)
}
// 基本信息
// 获取性别、出生日期和年龄
const handleCardNo = () => {
  const data = getBirthday(formData.value.idCardNo)
  const isCard = isCardID(formData.value.idCardNo)
  if (isCard) {
    formData.value.sex = data.sex
    formData.value.birthdate = data.birthdate
    formData.value.age = data.age
  }
}
// 家属信息
// 编辑行后获取所有触发的数据
const onRowEdit = (params) => {
  // // 修改后的当前行赋值给原始数据
  const { row, col, value, rowIndex } = params
  relationData.forEach((ele) => {
    if (ele.value === value) {
      row.refName = ele.label
    }
  })
  const oldRowData = editMap[row.key]?.editedRow || row
  const editedRow = { ...oldRowData, [col.colKey]: value }
  editMap[row.key] = {
    ...params,
    editedRow
  }
  // ⚠️ 重要：以下内容应用于全量数据校验（单独的行校验不需要）
  const newData = [...familyUserData.value]
  newData[rowIndex] = editedRow
  familyUserData.value = newData
}
// 处理默认编辑
const getRowKey = () => {
  editableRowKeys.value = []
  familyUserData.value.forEach((ele, i) => {
    editableRowKeys.value.push(String(i))
  })
}
// 删除一条护理项目
const handleDelete = (val, index) => {
  familyUserData.value.splice(index, 1)
  isAddData.value = false
}
// 添加
const handleRowAdd = () => {
  const obj = {
    key:
      familyUserData.value.length > 0
        ? String(familyUserData.value.length)
        : '0',
    name: '',
    phone: '',
    refId: '',
    refName: ''
  }
  familyUserData.value.push(obj)
  getRowKey()
}
// 家属信息保存
const onRowValidate = () => {
  // 查询数据有没有填写完整
  tableRef.value.validateTableData().then((params) => {
    const cellKeys = Object.keys(params.result)
    const firstError = params.result[cellKeys[0]]
    if (firstError) {
      MessagePlugin.error('家属信息为空，请重新输入')
      emit('setIsSave', false)
    } else {
      MessagePlugin.success('保存成功')
      emit('setFamily', familyUserData.value)
      emit('setIsSave', true)
    }
  })
}
// 判断是否填写的数字
const handlePhone = (val) => {
  const isNumber = validateIdentityNum(val)
  if (!isNumber) {
    formData.value.phone = ''
  }
}
defineExpose({
  form,
  onRowValidate, // 家属信息保存
  formData, // 表单数据
  upload, // 资料上传ref
  familyUserData // 家属信息
})
</script>
