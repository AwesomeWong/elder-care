<!-- 菜单新增、编辑弹窗 -->
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
          <span class="dialog-title">菜单配置</span>
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
          <t-form-item label="上级菜单： " name="parentResourceNo">
            <t-cascader
              v-model="formData.parentResourceNo"
              :keys="{ label: 'label', value: 'id', children: 'children' }"
              :options="options.arr"
              check-strictly
              filterable
            />
          </t-form-item>
          <t-form-item label="菜单名称：" name="resourceName">
            <t-input
              v-model="formData.resourceName"
              placeholder="请输入"
              clearable
              :maxlength="10"
              show-limit-number
            >
            </t-input>
          </t-form-item>
          <t-form-item
            v-show="formData.resourceType !== 'F'"
            label="菜单路径："
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
          <!-- <t-form-item
            v-show="formData.resourceType !== 'F'"
            label="菜单图标："
            name="icon"
          >
            <t-select-input
              :value="formData.icon"
              :popup-visible="popupVisible"
              :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
              style="width: 404px"
              placeholder="请选择下拉"
              clearable
              @popup-visible-change="onPopupVisibleChange"
            >
              <template #panel>
                <div class="iconCont">
                  <div class="head">
                    <t-radio-group v-model="iconValue" default-value="1">
                      <t-radio-button value="1">自定义</t-radio-button>
                      <t-radio-button value="2">Iconfont</t-radio-button>
                    </t-radio-group>
                  </div>
                  <ul v-show="iconValue === '1'" class="fx fx-wp ft-ct">
                    <li
                      v-for="item in iconfontListDate"
                      :key="item"
                      style="width: 90px"
                      @click="() => onOptionClick(item.font)"
                    >
                      <div
                        class="iconfont pt"
                        :class="item.font"
                        style="font-size: 22px"
                      ></div>
                      <span class="ft-12">{{ item.font }}</span>
                    </li>
                  </ul>
                  <ul
                    v-show="iconValue === '2'"
                    class="fx fx-wp ft-ct"
                    style=""
                  >
                    <li
                      v-for="item in iconList"
                      :key="item.icon"
                      style="width: 90px"
                      @click="() => onOptionClick(item.icon)"
                    >
                      <div class="pt" style="padding: 10px">
                        <div><icon-font size="22px" :name="item.stem" /></div>
                        <span class="ft-12">{{ item.icon }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>
              后置图标
              <template #suffixIcon>
                <icon-font size="16px" name="chevron-down" />
              </template>
            </t-select-input>
          </t-form-item> -->

          <t-form-item label="排序：" name="sortNo">
            <t-input-number
              v-model="formData.sortNo"
              :min="minNumber"
              :max="9999"
              @blur="textBlurNo"
              @onkeyup="handleOnkeyup"
              @change="textBlurNo"
            ></t-input-number>
          </t-form-item>

          <t-form-item
            v-show="formData.resourceType !== 'F'"
            label="菜单状态："
            name="dataState"
          >
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
import { ref, watch, onMounted, watchEffect, reactive } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
import { manifest, IconFont } from 'tdesign-icons-vue-next'
import { getMenuOptionsList, addMenu, editMenu } from '@/api/permission'
import { onkeyup } from '@/utils/index'
import iconfontList from '@/style/iconFont/iconfontjson.js'

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
  }
})
const resetType = ref('empty')
const emit: Function = defineEmits(['handleClose', 'fetchData'])
const formVisible = ref(false)
const minNumber = ref(0)
const formData = ref({
  parentResourceNo: '', // 父资源ID
  resourceType: 'm',
  icon: '',
  resourceName: '',
  requestPath: '',
  dataState: '',
  sortNo: 0
})
const cacheFromData = ref({})
const pageTitle = ref('')
const form = ref()
const options = reactive({
  arr: []
})
const iconList = ref()
// 生命周期
onMounted(() => {
  iconList.value = manifest
  cacheFromData.value = { ...formData.value }
  fetchData()
})

// icon自定义 下拉属性
const iconfontListDate = ref(iconfontList)
const popupVisible = ref(false)
const iconValue = ref('1')
const onOptionClick = (item) => {
  // selectValue.value = item
  formData.value.icon = item
  // 选中后立即关闭浮层
  popupVisible.value = false
}
const onPopupVisibleChange = (val) => {
  popupVisible.value = val
}

// 获取列表数据
const fetchData = async () => {
  // 获取菜单数据
  getMenuOptionsList({ level: 3 })
    .then((res) => {
      if (res.code === 200) {
        ;(options as any).arr = res.data.items
      }
    })
    .catch((val) => {
      console.log(val)
    })
}
// 数据提交
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (props.title === '新增菜单') {
      // 新增菜单
      addMenuQuest(formData.value)
    } else {
      // 编辑菜单
      editMenuQuest(formData.value)
    }
  }
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
// 添加菜单
const addMenuQuest = async (params) => {
  addMenu(params).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('菜单添加成功')
      emit('fetchData')
      onClickCloseBtn()
    }
  })
}
// 修改菜单
const editMenuQuest = (params) => {
  editMenu(params)
    .then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('菜单修改成功')
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
    if (val) {
      fetchData()
    }

    if (val) {
      const { data } = props
      if (props.title === '新增菜单') {
        // ;(formData.value as any) = { ...cacheFromData.value }
      } else {
        formData.value = JSON.parse(JSON.stringify(data))
      }
    }
  }
)

// 触发键盘
const handleOnkeyup = (val) => {
  onkeyup(val)
}

const baseRules = {
  parentResourceNo: [
    {
      required: true,
      message: '请选择上级菜单',
      type: 'error',
      trigger: 'change'
    }
  ],

  resourceName: [
    {
      required: true,
      message: '请输入菜单名称',
      type: 'error',
      trigger: 'change'
    },
    {
      min: 2,
      message: '菜单名称最少2个字',
      type: 'error',
      trigger: 'blur'
    }
  ],
  sortNo: [
    {
      required: true,
      message: '请输入排序',
      type: 'error',
      trigger: 'blur'
      // validator: (val) => {
      //   console.log(val, 'sortNosortNo')
      //   const reg = /^[1-9]\d*$/
      //   if (!reg.test(val)) {
      //     return {
      //       result: false,
      //       message: '请输入正确排序',
      //       type: 'error'
      //     }
      //   }
      //   return true
      // }
    }
  ]
}
const ortRules = {
  requestPath: [
    {
      required: true,
      message: '请输入菜单路由',
      type: 'error',
      trigger: 'change'
    }
  ],
  dataState: [
    {
      required: true,
      message: '请选择菜单状态',
      type: 'error',
      trigger: 'change'
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
  .t-form-item__icon,
  .t-form-item__sortNo {
    .t-form__label {
      text-align: right;
    }
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
