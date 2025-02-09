<!-- 健康能力评估-健康评估 -->
<template>
  <div :class="isCheck ? 'isCheck' : ''">
    <t-form ref="form" :data="formData" :rules="rules" :label-width="140">
      <h1 class="tit">疾病和用药情况</h1>
      <t-form-item label="疾病诊断：" name="diagnoseArr">
        <t-checkbox-group v-model="formData.diagnoseArr">
          <t-checkbox
            v-for="(item, index) in diseaseDiagnosisData"
            :key="index"
            :label="item"
            :value="item"
            :disabled="
              isCheck ||
              (baseData.retreat.flowStatus === 1 &&
                (item === '无疾病' ? null : isCheckdiagnose))
            "
            @change="handleCheck($event, item)"
          />
        </t-checkbox-group>
      </t-form-item>
      <t-form-item label="用药情况：" name="drugUsage">
        <t-table
          v-if="!isDrugUsage"
          ref="tableRef"
          row-key="key"
          :columns="FROMCOLUMNS"
          :data="familyUserData"
          :editable-row-keys="editableRowKeys"
          table-layout="auto"
          @row-edit="onRowEdit"
        >
          <template #name="{ row }">
            <t-textarea
              v-model="row.name"
              placeholder="请输入"
              class="t-textarea"
              name="description"
              :maxlength="20"
              :disabled="isCheck"
              clearable
            ></t-textarea>
          </template>
          <template #method="{ row }">
            <t-textarea
              v-model="row.method"
              placeholder="请输入"
              class="t-textarea"
              name="description"
              :disabled="isCheck"
              :maxlength="20"
              clearable
            ></t-textarea>
          </template>
          <template #dosage="{ row }">
            <t-textarea
              v-model="row.dosage"
              placeholder="请输入"
              class="t-textarea"
              name="description"
              :disabled="isCheck"
              :maxlength="20"
              clearable
            ></t-textarea>
          </template>
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

        <t-table
          v-else
          ref="tableRef"
          row-key="key"
          :columns="FROMCOLUMNS2"
          :data="baseUserData"
          table-layout="auto"
        >
        </t-table>
      </t-form-item>
      <h1 class="tit">近30天内风险事件</h1>
      <t-form-item label="跌倒：" name="tumble">
        <t-radio-group v-model="formData.tumble" default-value="1">
          <t-radio
            v-for="(item, index) in riskData"
            :key="index"
            :value="item"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="走失：" name="beLost">
        <t-radio-group v-model="formData.beLost" default-value="1">
          <t-radio
            v-for="(item, index) in riskData"
            :key="index"
            :disabled="isCheck"
            :value="item"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="噎食：" name="hiccought">
        <t-radio-group v-model="formData.hiccought" default-value="1">
          <t-radio
            v-for="(item, index) in riskData"
            :key="index"
            :value="item"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="自杀：" name="suicide">
        <t-radio-group v-model="formData.suicide" default-value="1">
          <t-radio
            v-for="(item, index) in riskData"
            :key="index"
            :value="item"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <t-form-item label="昏迷：" name="conk">
        <t-radio-group v-model="formData.conk" default-value="1">
          <t-radio
            v-for="(item, index) in riskData"
            :key="index"
            :value="item"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>
      <h1 class="tit">身体健康情况</h1>
      <t-form-item label="伤口情况：" name="woundArr">
        <t-checkbox-group v-model="formData.woundArr">
          <t-checkbox
            v-for="(item, index) in woundStatusData"
            :key="index"
            :label="item"
            :disabled="
              isCheck ||
              (baseData.retreat.flowStatus === 1 &&
                (item === '无' ? null : isCheckWound))
            "
            :value="item"
            @change="handleWound($event, item)"
          />
        </t-checkbox-group>
      </t-form-item>
      <t-form-item label="特殊医疗照护情况：" name="lookAfterArr">
        <t-checkbox-group v-model="formData.lookAfterArr">
          <t-checkbox
            v-for="(item, index) in specialStatusData"
            :key="index"
            :label="item"
            :disabled="
              isCheck ||
              (baseData.retreat.flowStatus === 1 &&
                (item === '无' ? null : isCheckAfter))
            "
            :value="item"
            @change="handleLookAfter($event, item)"
          />
        </t-checkbox-group>
      </t-form-item>
      <t-form-item label="自理能力：" name="selfAbility">
        <t-radio-group v-model="formData.selfAbility" default-value="1">
          <t-radio
            v-for="(item, index) in selfCareAbilityData"
            :key="index"
            :value="item"
            :disabled="isCheck"
            >{{ item }}</t-radio
          >
        </t-radio-group>
      </t-form-item>

      <t-form-item label="痴呆前兆：" name="sdementiaArr">
        <t-checkbox-group v-model="formData.sdementiaArr">
          <t-checkbox
            v-for="(item, index) in sdementiaData"
            :key="index"
            :label="item"
            :value="item"
            :disabled="isCheck"
          />
        </t-checkbox-group>
      </t-form-item>
      <t-form-item label="其他：" name="fitnessOther">
        <t-input
          v-model="formData.fitnessOther"
          :show-limit-number="isCheck ? false : true"
          :maxlength="20"
          class="wt-400"
          :disabled="isCheck"
        >
        </t-input>
      </t-form-item>
      <h1 class="tit">近期体检报告</h1>
      <t-form-item v-if="!isCheck" label="体检报告：" name="reportUrl">
        <t-upload
          ref="uploadRef"
          v-model="uploadFile"
          action="api/common/upload"
          :autoUpload="autoUpload"
          :size-limit="sizeLimit"
          tips="请上传pdf文件，大小在60M以内"
          accept=".pdf"
          @remove="remove"
          @fail="handleFail"
          @success="handleSuccess"
        ></t-upload>
      </t-form-item>
      <t-form-item v-else label="体检报告：">
        <span
          ><span class="padRight">{{ oldManName }}的体检报告.pdf</span
          ><i class=""
            ><a class="font-bt" :href="formData.reportUrl" target="black"
              >查看</a
            ></i
          >
          <!-- <i
            class="font-bt"
            @click="handleDown(formData.reportUrl, '体检报告文件')"
            >下载</i -->
          >
        </span>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Icon } from 'tdesign-icons-vue-next'
import { useUserStore } from '@/store'
import { download } from '@/utils/index'
// 组件
// 基本数据
import {
  diseaseDiagnosisData,
  riskData,
  woundStatusData,
  specialStatusData,
  selfCareAbilityData,
  sdementiaData
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
  }
})
// ------定义变量------
// 触发父级事件
const emit = defineEmits(['getInfoActive', 'setFamily'])
const form = ref() // 表单
// 表单数据
const formData = ref({
  diagnoseArr: [],
  woundArr: [],
  lookAfterArr: [],
  sdementiaArr: []
})
const userStore = useUserStore()
const autoUpload = ref(true) // 是否在选择文件后自动发起请求上传文件
const uploadFile = ref([]) // 绑定上传的文件
const oldManName = ref('')
const sizeLimit = ref({
  size: 60,
  unit: 'MB',
  message: '图片大小超过60m，请重新上传'
}) // 图片的大小限制
const downType = ref('application/pdf')
// 校验其他
const diagnoseValidator = (value) => {
  const str = value.filter((val) => val === '其他')
  if (
    str[0] === '其他' &&
    (formData.value.other === '' || formData.value.other === undefined)
  ) {
    return false
  }
  return true
}
const rules = {
  diagnoseArr: [
    {
      required: true,
      message: '疾病诊断为空，请选择疾病诊断',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: diagnoseValidator,
      message: '其他为空，请输入其他',
      trigger: 'blur'
    }
  ],
  tumble: [
    {
      required: true,
      message: '跌倒为空，请选择跌倒',
      type: 'error',
      trigger: 'change'
    }
  ],
  beLost: [
    {
      required: true,
      message: '走失为空，请选择走失',
      type: 'error',
      trigger: 'change'
    }
  ],
  hiccought: [
    {
      required: true,
      message: '噎食为空，请选择噎食',
      type: 'error',
      trigger: 'change'
    }
  ],
  suicide: [
    {
      required: true,
      message: '自杀为空，请选择自杀',
      type: 'error',
      trigger: 'change'
    }
  ],
  conk: [
    {
      required: true,
      message: '昏迷为空，请选择昏迷',
      type: 'error',
      trigger: 'change'
    }
  ],
  woundArr: [
    {
      required: true,
      message: '伤口情况为空，请选择伤口情况',
      type: 'error',
      trigger: 'change'
    }
  ],
  lookAfterArr: [
    {
      required: true,
      message: '特殊医疗照护情况为空，请选择特殊医疗照护情况',
      type: 'error',
      trigger: 'change'
    }
  ],
  selfAbility: [
    {
      required: true,
      message: '自理能力为空，请选择自理能力',
      type: 'error',
      trigger: 'change'
    }
  ],
  sdementiaArr: [
    {
      required: true,
      message: '痴呆前兆为空，请选择特痴呆前兆',
      type: 'error',
      trigger: 'change'
    }
  ],
  reportUrl: [
    {
      required: true,
      message: '体检报告为空，请上传体检报告',
      type: 'error',
      trigger: 'change'
    }
  ]
}
const FROMCOLUMNS = computed(() => {
  return [
    {
      title: '药物名称',
      colKey: 'name',
      minWidth: 200
    },
    {
      title: '服药方法',
      colKey: 'method',
      minWidth: 200
    },
    {
      title: '用药剂量',
      colKey: 'dosage',
      minWidth: 200
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
const FROMCOLUMNS2 = computed(() => {
  return [
    {
      title: '药物名称',
      colKey: 'name',
      minWidth: 200
    },
    {
      title: '服药方法',
      colKey: 'method',
      minWidth: 200
    },
    {
      title: '用药剂量',
      colKey: 'dosage',
      minWidth: 200
    }
  ]
})
const getBaseData = () => {
  const obj = {
    key: '0',
    name: '',
    method: '',
    dosage: ''
  }
  return [obj]
}
const familyUserData = ref<Object | any>(getBaseData())
const editableRowKeys = ref([])
const isAddData = ref(false)
const editMap = {}
const reviewInfo = ref<Object | any>({}) // 健康状况
const isCheck = ref(false) // 是否可以编辑，展示数据无需编辑
const isCheckdiagnose = ref(false) // 是否选中了无疾病
const isCheckWound = ref(false) // 是否选中了无
const isCheckAfter = ref(false)
const baseUserData = ref([]) // 要展示的用药情况
const isDrugUsage = ref(false) // 用药情况
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
  if (val.retreat !== undefined) {
    if (val.retreat.reviewInfo !== undefined) {
      formData.value = val.retreat.reviewInfo
      familyUserData.value = formData.value.familyUserData
    }

    if (
      val.retreat.familyUserData !== undefined &&
      val.retreat.familyUserData.length > 0
    ) {
      familyUserData.value = val.retreat.familyUserData
    }
  }

  oldManName.value = data.retreat.elderDto.name
  // 获取用药情况的数据
  if (data.retreat !== undefined && data.retreat.reviewInfo !== undefined) {
    reviewInfo.value = data.retreat.reviewInfo
    baseUserData.value = reviewInfo.value.familyUserData
    familyUserData.value = reviewInfo.value.familyUserData
    formData.value = reviewInfo.value
  }
  // 如果步骤是入住评估
  if (data.retreat.flowStatus === 1 && data.retreat.status === 1) {
    // 后端没有反数据，默认自动添加一条
    if (familyUserData.value.length === 0) {
      familyUserData.value = getBaseData()
    }
    isDrugUsage.value = false
  } else {
    isDrugUsage.value = true
  }
  // 回显体检报告文件
  if (
    val.retreat !== undefined &&
    val.retreat.reviewInfo !== undefined &&
    data.retreat.reviewInfo !== undefined
  ) {
    const obj = {
      name: reviewInfo.value.name,
      url: reviewInfo.value.reportUrl
    }
    uploadFile.value.push(obj)
  }

  // 判断详情里疾病诊断、伤口情况、特殊医疗照护情况是否选择的无
  if (data.retreat.flowStatus === 1) {
    if (formData.value.diagnoseArr.length) {
      formData.value.diagnoseArr.forEach((ele) => {
        if (ele === '无疾病') {
          isCheckdiagnose.value = true
        }
      })
    }

    formData.value.woundArr.forEach((ele) => {
      if (ele === '无') {
        isCheckWound.value = true
      }
    })
    formData.value.lookAfterArr.forEach((ele) => {
      if (ele === '无') {
        isCheckAfter.value = true
      }
    })
  }
  getRowKey()
})
// 编辑行后获取所有触发的数据
const onRowEdit = (params) => {
  // // 修改后的当前行赋值给原始数据
  const { row, col, value } = params
  const oldRowData = editMap[row.key]?.editedRow || row
  const editedRow = { ...oldRowData, [col.colKey]: value }
  editMap[row.key] = {
    ...params,
    editedRow
  }

  // ⚠️ 重要：以下内容应用于全量数据校验（单独的行校验不需要）
  const newData = [...familyUserData.value]
  newData[row.key] = editedRow
  familyUserData.value = newData
  formData.value.familyUserData = familyUserData.value
}
// 处理默认编辑
const getRowKey = () => {
  editableRowKeys.value = []
  if (familyUserData.value && familyUserData.value.length > 0) {
    familyUserData.value.forEach((ele, i) => {
      editableRowKeys.value.push(String(i))
    })
  }
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
    method: '',
    dosage: ''
  }
  familyUserData.value.push(obj)
  getRowKey()
}
// 移除图片时将图片设置为默认图片
const remove = () => {
  uploadFile.value = []
  formData.value.reportUrl = ''
}
// 上传图片失败
const handleFail = (file) => {
  MessagePlugin.error(`文件上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params) => {
  const reportUrl = params.response.data
  formData.value.reportUrl = reportUrl
  formData.value.name = params.file.name
  uploadFile.value[0].response.url = reportUrl
  uploadFile.value[0].url = reportUrl
}
// 触发疾病诊断
const handleCheck = (e, val) => {
  if (e) {
    if (val === '无疾病') {
      formData.value.diagnoseArr.forEach((ele, i) => {
        if (ele !== '无疾病') {
          formData.value.diagnoseArr.splice(i)
        }
      })
      isCheckdiagnose.value = true
      formData.value.other = ''
    }
  } else {
    isCheckdiagnose.value = false
    formData.value.other = ''
  }
}
// 触发伤口情况
const handleWound = (e, val) => {
  isCheckWound.value = isChange(e, val, formData.value.woundArr)
}
// 特殊医疗照护情况
const handleLookAfter = (e, val) => {
  isCheckAfter.value = isChange(e, val, formData.value.lookAfterArr)
}
// 是否触发了无
const isChange = (e, val, arr) => {
  if (e) {
    if (val === '无') {
      arr.forEach((ele, i) => {
        if (ele !== '无') {
          arr.splice(i)
        }
      })
      return true
    }
  } else {
    return false
  }
}
// TODO 暂时保留
// // 合同下载文件
// const handleDown = (url, name) => {
//   download(url, downType.value, name)
// }
// 向父组件暴露数据与方法
defineExpose({
  form,
  formData,
  familyUserData,
  isCheckdiagnose
})
</script>
