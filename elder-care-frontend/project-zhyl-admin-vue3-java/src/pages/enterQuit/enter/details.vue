<!-- 详情 -->
<template>
  <div class="apply detail-base checkInDetail">
    <div class="bg-wt stepContainer mb-24">
      <!-- step -->
      <t-steps :current="defaultCurrent" @change="handleStep">
        <t-step-item
          v-for="(item, index) in checkinStepsData"
          :key="index"
          :class="index <= approveData.retreat.flowStatus ? 'flowStatus' : ''"
          :title="item.value"
        />
      </t-steps>
    </div>
    <!-- end -->
    <div class="bg-wt min-steph height">
      <!-- 申请信息 -->
      <div v-if="defaultCurrent === 0" id="menuFlag0">
        <div v-if="checkInCode !== ''" class="baseCon">
          <div class="baseL">
            <div
              v-if="
                approveData.retreat.status === 1 &&
                approveData.retreat.flowStatus === 0 &&
                approveData.isShow === 1
              "
            >
              <ApplyForm
                ref="applyForm"
                :storageData="localStorageData"
                :base-data="approveData"
                :is-save="isSave"
                :info-active="infoActive"
                @setIsSave="setIsSave"
                @setFamily="setFamily"
                @getVallidate="getVallidate"
                @getInfoActive="getInfoActive"
              ></ApplyForm>
            </div>
            <div v-else>
              <ApplyBaseInfo
                :base-data="approveData"
                :active="defaultCurrent"
              ></ApplyBaseInfo>
            </div>
          </div>
          <div class="baseR">
            <RightApply
              ref="rightApply"
              :base-data="approveData"
              :active="defaultCurrent"
              @getVallidate="getVallidate"
            ></RightApply>
          </div>
        </div>
        <div v-else class="stepForm">
          <ApplyForm
            ref="applyForm"
            :storageData="localStorageData"
            :base-data="approveData"
            :is-save="isSave"
            :info-active="infoActive"
            @setIsSave="setIsSave"
            @setFamily="setFamily"
            @getVallidate="getVallidate"
            @getInfoActive="getInfoActive"
          ></ApplyForm>
        </div>
      </div>
      <!-- end -->
      <!-- 入住评估 -->
      <div v-if="defaultCurrent === 1" id="menuFlag1">
        <div
          v-if="
            approveData.isShow === 1 ||
            (approveData.retreat.status !== 3 &&
              approveData.retreat.status !== 1)
          "
          class="baseCon"
        >
          <div class="baseL">
            <div v-if="approveData.retreat.flowStatus === 1">
              <AssessmentForm
                ref="assessmentRef"
                :base-data="approveData"
                :active="defaultCurrent"
                :is-save="isSave"
                :info-active="infoActive"
                @getInfoActive="getInfoActive"
              ></AssessmentForm>
            </div>
            <div v-else>
              <ApplyBaseInfo
                :base-data="approveData"
                :active="defaultCurrent"
              ></ApplyBaseInfo>
            </div>
          </div>
          <div class="baseR">
            <RightApply
              ref="rightApply"
              :base-data="approveData"
              :active="defaultCurrent"
              @getVallidate="getVallidate"
            ></RightApply>
          </div>
        </div>
        <!-- end -->
        <!-- 操作记录 -->
        <div
          v-if="
            (approveData.isShow === 0 && approveData.retreat.status === 1) ||
            (approveData.isShow === 0 && approveData.retreat.status === 3)
          "
          class="bg-wt mb-24"
        >
          <div class="applyApproval">
            <ApplyApproval
              :title="resultTitle"
              :base-data="approveData"
              :active="defaultCurrent"
            ></ApplyApproval>
          </div>
        </div>
        <!-- end -->
      </div>
      <!-- end -->
      <!-- 入住审批 -->
      <div v-if="defaultCurrent === 2" id="menuFlag2">
        <div v-if="approveData.isShow === 1" class="baseCon">
          <div class="baseL">
            <!-- 基本信息 -->
            <ApplyBase
              :base-data="approveData"
              :active="defaultCurrent"
            ></ApplyBase>
            <!-- end -->
          </div>
          <div class="baseR">
            <RightApply
              ref="rightApply"
              :base-data="approveData"
              :active="defaultCurrent"
              @getVallidate="getVallidate"
            ></RightApply>
          </div>
        </div>
        <!-- 操作记录 -->
        <div v-else class="bg-wt mb-24">
          <div class="applyApproval">
            <ApplyApproval
              :title="resultTitle"
              :base-data="approveData"
              :active="defaultCurrent"
            ></ApplyApproval>
          </div>
        </div>
        <!-- end -->
      </div>
      <!-- end -->
      <!-- 入住配置 -->
      <div v-if="defaultCurrent === 3" id="menuFlag3">
        <div v-if="approveData.isShow === 1" class="baseCon">
          <div class="baseL">
            <div v-if="approveData.retreat.flowStatus === 3">
              <!-- 配置表单 -->
              <ConfigurationForm
                ref="configRef"
                :base-data="approveData"
                @getNewCostTime="getNewCostTime"
              ></ConfigurationForm>
              <!-- end -->
            </div>
            <div v-else>
              <ApplyConfigBase :base-data="approveData"></ApplyConfigBase>
            </div>
          </div>
          <div class="baseR">
            <RightApply
              ref="rightApply"
              :base-data="approveData"
              :active="defaultCurrent"
              @getVallidate="getVallidate"
            ></RightApply>
          </div>
        </div>
        <!-- 操作记录 -->
        <div v-else class="bg-wt mb-24">
          <div class="applyApproval">
            <ApplyApproval
              :title="resultTitle"
              :base-data="approveData"
              :active="defaultCurrent"
            ></ApplyApproval>
          </div>
        </div>
        <!-- end -->
      </div>
      <!-- end -->
      <!-- 签约办理 -->
      <div v-if="defaultCurrent === 4" id="menuFlag4">
        <div v-if="approveData.isShow === 1" class="baseCon">
          <div class="baseL">
            <!-- 办理表单 -->
            <div
              v-if="
                approveData.retreat.flowStatus === 4 &&
                approveData.retreat.status === 1
              "
            >
              <TransactForm
                ref="transactForm"
                :base-data="approveData"
                :active="defaultCurrent"
              ></TransactForm>
            </div>
            <!-- end -->
            <div v-else>
              <SignBaseInfo :base-data="approveData"></SignBaseInfo>
            </div>
          </div>
          <div class="baseR">
            <RightApply
              ref="rightApply"
              :base-data="approveData"
              :active="defaultCurrent"
              @getVallidate="getVallidate"
            ></RightApply>
          </div>
        </div>
        <!-- 操作记录 -->
        <div
          v-if="approveData.isShow === 0 && approveData.retreat.status === 1"
          class="bg-wt mb-24"
        >
          <div class="applyApproval">
            <ApplyApproval
              :title="resultTitle"
              :base-data="approveData"
              :active="defaultCurrent"
            ></ApplyApproval>
          </div>
        </div>
        <!-- end -->
      </div>
      <!-- end -->
    </div>
  </div>
  <!-- TODO 暂时去掉此功能-->
  <!-- <div class="boxBottom fx fx-ct bg-wt" :class="footFlex ? 'footFlex' : ''"> -->
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
    <!-- 当前操作的人可以撤回自己申请 -->
    <button
      v-if="approveData.isRevocation"
      theme="primary"
      class="bt wt-60"
      @click="handleRevocation"
    >
      撤回
    </button>
    <!-- 驳回后可编辑、申请审批、入住评估、入住审批、入住配置、签约办理显示提交按钮 -->
    <!-- status 1审批中2完成3关闭 -->
    <!-- flowStatus 0申请入住、1入住评估、2入住审批、3入住配置、4签约办理 -->
    <!-- defaultCurrent当前的step步骤条状态 -->
    <button
      v-if="!isShowSave && !approveData.isRevocation"
      theme="primary"
      class="bt wt-60"
      @click="handleSave"
    >
      保存
    </button>
    <button
      v-if="
        (checkInCode === '' && isShowSave) ||
        (defaultCurrent === 0 &&
          isShowSave &&
          approveData.retreat.status === 1 &&
          approveData.retreat.flowStatus === 0 &&
          approveData.isShow === 1) ||
        (defaultCurrent === 1 &&
          isShowSave &&
          approveData.retreat.flowStatus === 1 &&
          approveData.isShow === 1 &&
          approveData.retreat.status !== 3) ||
        (defaultCurrent === 2 &&
          isShowSave &&
          approveData.retreat.flowStatus === 2 &&
          approveData.isShow === 1) ||
        (defaultCurrent === 3 &&
          isShowSave &&
          approveData.retreat.flowStatus === 3 &&
          approveData.isShow === 1 &&
          approveData.retreat.status !== 3) ||
        (defaultCurrent === 4 &&
          isShowSave &&
          approveData.retreat.status === 1 &&
          approveData.retreat.flowStatus === 4 &&
          approveData.isShow === 1)
      "
      class="bt wt-60"
      :class="isVallidate ? 'bt-forbid' : ''"
      theme="primary"
      @click="handleSub"
    >
      提交
    </button>
  </div>
  <!-- 操作弹层 -->
  <OperateDialog
    :visible="dialogVisible"
    :title="operateTitle"
    :text="operateText"
    @handle-delete="handleOperate"
    @handle-close="handleOperateClose"
  ></OperateDialog>
  <!-- end -->
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import dayjs from 'dayjs'
import { useUserStore } from '@/store'
import { validatePhone, validateIdentityNum } from '@/utils/validate'
// 基本数据
import { checkinStepsData } from '@/utils/commonData'
// 接口
import {
  applyCheckIn,
  getCheckInfo,
  assessmentCheckIn,
  checkInSubmit,
  rejectSubmit,
  turnSubmit,
  configSubmit,
  revocationSubmit,
  signSubmit
} from '@/api/checkin'

// 组件
// 操作弹层
import OperateDialog from '@/components/OperateDialog/index.vue'
// 申请退住
import ApplyForm from './components/ApplyForm.vue'
// 基本信息
import ApplyBaseInfo from './components/ApplyBaseInfo.vue'
import ApplyBase from './components/ApplyBase.vue'
// 入住评估
import AssessmentForm from './components/AssessmentForm.vue'
// 入住配置
import ConfigurationForm from './components/ConfigurationForm.vue'
// 入住办理
import TransactForm from './components/TransactForm.vue'
// 左侧操作记录
import RightApply from './components/RightApply.vue'
import ApplyApproval from './components/ApplyApproval.vue'
// 入住配置详情
import ApplyConfigBase from './components/ApplyConfigBase.vue'
// 签约办理
import SignBaseInfo from './components/SignBaseInfo.vue'

// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const userStore = useUserStore() // 储存器
const defaultCurrent = ref(0) // step 当前的选择
const applyForm = ref(null) // 申请表单的ref
const rightApply = ref(null) // 第二部，申请审批
const configRef = ref(null) // 入住配置ref
const assessmentRef = ref(null) // 调整账单ref
const isVallidate = ref(true) // 是否校验完成
const resultTitle = ref('') // 是审批结果还是处理结果
const dialogVisible = ref(false) // 控制操作弹层显示隐藏
const operateTitle = ref('') // 操作弹层标题
const operateText = ref('') // 要操作的内容提示
const checkInCode = ref('') // 获取待办编号
const assigneeId = ref('') // 代理人id
const approveData = ref<Object | any>({
  retreat: {}
}) // 获取的审批信息
const taskId = ref('') // 待办任务id或者申请任务id
const isChickStep = ref(false) // 是否触发了tab步骤
const defaultActive = ref(-1) // 需要传给后端的当前状态
const isRevocation = ref(false) // 是否触发了撤回按钮
const isTurn = ref(false) // 是否驳回
const isRefuse = ref(false) // 审批时是否触发了拒绝
const footFlex = ref(false) // 定位底部提交按钮
const infoActive = ref(0) // 获取基本信息tab值
const localStorageData = ref({}) // 本地信息
const isShowSave = ref(false) // 显示保存还是提交按钮
const baseSaveData = ref({}) // 需要保存的表单信息
const isShowTab3 = ref(false) // 是否显示提交按钮，申请入住和入住评估里面都有3个tab，到第3个tab可以体提交表单
const transactForm = ref(null) // 签约办理
const isSave = ref(false) // 是否触发过保存按钮
const localData = ref(userStore.$state.enterBaseData) // 本地历史数据
const isBack = ref(false) // 是否触发了返回按钮
const isChick = ref(false) // 是否触发了提交按钮，触发3秒后才可以再次触发
// 生命周期
onMounted(() => {
  // 如果是从待办列表中进来的，利用待办编号来获取申请表单查询
  if (route.query.code !== undefined) {
    checkInCode.value = route.query.code
    assigneeId.value = route.query.assigneeId
    taskId.value = route.query.taskId
    getFromData()
  } else {
    defaultCurrent.value = 0
    isVallidate.value = false
  }
  getLocalData() // 获取本地储存的数据
  nextTick(() => {
    window.addEventListener('scroll', scrollToTop, true) // 添加页面滚动事件
  })
})
// TODO根据元素的高度判断是否显示 版权
const height = () => {
  nextTick(() => {
    const val = document.getElementById(`menuFlag${defaultCurrent.value}`)
    const height = Number(window.getComputedStyle(val).height.slice(0, -2))
    const viewHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    if (viewHeight - 295 > height) {
      footFlex.value = true
    } else {
      footFlex.value = false
    }
  })
}
// 获取本地储存的数据,回显在页面
const getLocalData = () => {
  const val = userStore.$state.enterBaseData
  if (val.retreat !== undefined) {
    if (val.retreat.elderDto !== undefined) {
      baseSaveData.value = {
        ...val,
        retreat: {
          ...baseSaveData.value.retreat,
          elderDto: val.retreat.elderDto
        }
      }
    }
    if (
      val.retreat.memberElderDtos !== undefined &&
      val.retreat.memberElderDtos.length > 0
    ) {
      baseSaveData.value = {
        ...val,
        retreat: {
          ...baseSaveData.value.retreat,
          memberElderDtos: val.retreat.memberElderDtos
        }
      }
    }
    if (val.retreat.otherApplyInfo !== undefined) {
      baseSaveData.value = {
        ...val,
        retreat: {
          ...baseSaveData.value.retreat,
          otherApplyInfo: val.retreat.otherApplyInfo
        }
      }
    }
    if (val.retreat.reviewInfo !== undefined) {
      approveData.value.retreat.reviewInfo = val.retreat.reviewInfo
      baseSaveData.value = {
        ...val,
        retreat: {
          ...baseSaveData.value.retreat,
          reviewInfo: val.retreat.reviewInfo
        }
      }
    }
    if (val.retreat.reviewInfo1 !== undefined) {
      approveData.value.retreat.reviewInfo1 = val.retreat.reviewInfo1
      baseSaveData.value = {
        ...val,
        retreat: {
          ...baseSaveData.value.retreat,
          reviewInfo1: val.retreat.reviewInfo1
        }
      }
    }
    if (val.retreat.reviewInfo2 !== undefined) {
      approveData.value.retreat.reviewInfo2 = val.retreat.reviewInfo2
      baseSaveData.value = {
        ...val,
        retreat: {
          ...baseSaveData.value.retreat,
          reviewInfo2: val.retreat.reviewInfo2
        }
      }
    }
  }
}
// ------定义方法------
// 滚动事件，控制底部按钮距离底部的高度
const scrollToTop = (e) => {
  e.stopPropagation()
  if (e.target.className === 't-layout czri-layout') {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (scrollTop + clientHeight === scrollHeight) {
      footFlex.value = true
    } else {
      footFlex.value = false
    }
  }
}
// 获取退住表单查询详情
const getFromData = async () => {
  const parent = {
    code: checkInCode.value,
    assigneeId: assigneeId.value,
    flowStatus: defaultActive.value,
    taskId: taskId.value
  }
  const res: any = await getCheckInfo(parent)
  if (res.code === 200) {
    approveData.value = res.data
    approveData.value.retreat = res.data.checkIn
    approveData.value.retreat.id = Number(approveData.value.retreat.id)
    const newTime = localData.value.updateTime // 本地保存的时间
    const oldTime = new Date(approveData.value.retreat.updateTime).getTime() // 后端获取的更新时间
    // 判断本地数据是最新的还是后台返回的详情数据是最新的(本地保存数据的时候存了一个当前时间)
    if (
      newTime > oldTime &&
      (approveData.value.retreat.flowStatus === 0 ||
        approveData.value.retreat.flowStatus === 1)
    ) {
      // 获取本地储存的数据
      getLocalData()
    } else {
      // 否则获取后台返回的详情
      // 需要把后端返回的字符串对象转为对象
      if (approveData.value.retreat.elderDto !== undefined) {
        // 第一步:获取老人信息
        approveData.value.retreat.elderDto = res.data.checkIn.elderDto
        baseSaveData.value = {
          ...baseSaveData.value,
          retreat: {
            ...baseSaveData.value.retreat,
            elderDto: approveData.value.retreat.elderDto
          }
        }
      }
      // 第一步:获取家属信息
      if (
        approveData.value.retreat.memberElderDtos !== undefined &&
        approveData.value.retreat.memberElderDtos.length > 0
      ) {
        approveData.value.retreat.memberElderDtos =
          res.data.checkIn.memberElderDtos
        baseSaveData.value = {
          ...baseSaveData.value,
          retreat: {
            ...baseSaveData.value.retreat,
            memberElderDtos: approveData.value.retreat.memberElderDtos
          }
        }
      }
      // 第一步:获取其他信息
      if (approveData.value.retreat.otherApplyInfo !== undefined) {
        approveData.value.retreat.otherApplyInfo = JSON.parse(
          res.data.checkIn.otherApplyInfo
        )
        baseSaveData.value = {
          ...baseSaveData.value,
          retreat: {
            ...baseSaveData.value.retreat,
            otherApplyInfo: approveData.value.retreat.otherApplyInfo
          }
        }
      }
      // 第二步:健康能力评估-监控评估
      if (approveData.value.retreat.reviewInfo !== undefined) {
        approveData.value.retreat.reviewInfo = JSON.parse(
          approveData.value.retreat.reviewInfo
        )
        baseSaveData.value = {
          ...baseSaveData.value,
          retreat: {
            ...baseSaveData.value.retreat,
            reviewInfo: approveData.value.retreat.reviewInfo
          }
        }
      }
      // 第二步:健康能力评估-能力评估
      if (approveData.value.retreat.reviewInfo1 !== undefined) {
        approveData.value.retreat.reviewInfo1 = JSON.parse(
          approveData.value.retreat.reviewInfo1
        )
        baseSaveData.value = {
          ...baseSaveData.value,
          retreat: {
            ...baseSaveData.value.retreat,
            reviewInfo1: approveData.value.retreat.reviewInfo1
          }
        }
      }
      // 第二步:健康能力评估-评估报告
      if (approveData.value.retreat.reviewInfo2 !== undefined) {
        approveData.value.retreat.reviewInfo2 = JSON.parse(
          approveData.value.retreat.reviewInfo2
        )
        baseSaveData.value = {
          ...baseSaveData.value,
          retreat: {
            ...baseSaveData.value.retreat,
            reviewInfo2: approveData.value.retreat.reviewInfo2
          }
        }
      }
    }
    // 保存在本地
    userStore.setEnterBaseData(baseSaveData.value)
    if (approveData.value.retreat.flowStatus === 2) {
      resultTitle.value = '审批结果'
    } else {
      resultTitle.value = '处理结果'
    }
    // // 驳回的数据，是否显示提交按钮
    if (approveData.value.retreat) {
      isVallidate.value = false
    }
    // // 首次加载数据设置默认的step步骤，显示当前的处理著状态
    if (!isChickStep.value) {
      defaultCurrent.value = res.data.checkIn.flowStatus
    }
    isShowTab3.value = userStore.$state.isShowTab3
    // 1、当前是编状态，处理步骤是0并且后台返回的0，第一步才可以显示保存按钮
    // 2、当前是编状态，处理步骤是1并且后台返回的1，第二步才可以显示保存按钮
    // 3、只有前两步并且是可编辑状态才会有保存按钮
    if (
      ((defaultCurrent.value === 0 &&
        approveData.value.retreat.flowStatus === 0) ||
        (defaultCurrent.value === 1 &&
          approveData.value.retreat.flowStatus === 1)) &&
      infoActive.value !== 2 &&
      approveData.value.retreat.status === 1 &&
      approveData.value.isShow === 1
    ) {
      isShowSave.value = false
    } else {
      isShowSave.value = true
    }
  }
  height()
}
// 申请入住提交
const handleFormSub = async (parent) => {
  const res: any = await applyCheckIn(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    isSave.value = false
    userStore.setEnterBaseData({})
    handleIsChick()
    router.push({
      path: `/active/apply`
    })
  } else {
    getIsChick()
  }
}
// 按钮触发3秒后才可以再次触发
const handleIsChick = () => {
  setTimeout(() => {
    getIsChick()
    clearTimeout()
  }, 3000)
}
// 触发按钮可以触发
const getIsChick = () => {
  isChick.value = false
}
// 触发按钮可以触发
const getIsOpenChick = () => {
  isChick.value = true
}
// 提交
const handleSub = () => {
  if (isChick.value) {
    return false
  }
  // 第一步表单提交
  if (defaultCurrent.value === 0) {
    let data = {}
    const obj = userStore.$state.enterBaseData
    if (
      // data.retreat !== undefined &&
      obj.retreat.otherApplyInfo &&
      obj.retreat.memberElderDtos &&
      obj.retreat.memberElderDtos.length > 0
    ) {
      data = userStore.$state.enterBaseData
    } else {
      data = approveData.value
    }
    applyForm.value.upload.form.validate().then((valid) => {
      if (valid === true) {
        getIsOpenChick()
        const urls = applyForm.value.upload.formData
        if (
          data.retreat !== undefined &&
          data.retreat.otherApplyInfo !== undefined &&
          data.retreat.elderDto !== undefined &&
          data.retreat.memberElderDtos !== undefined
        ) {
          const parent = {
            otherApplyInfo: JSON.stringify(data.retreat.otherApplyInfo),
            elderDto: data.retreat.elderDto,
            memberElderDtos: data.retreat.memberElderDtos,
            url1: urls.url1,
            url2: urls.url2,
            url3: urls.url3,
            taskId: taskId.value,
            id: approveData.value.retreat.id
          }
          isSave.value = false
          baseSaveData.value = {
            ...baseSaveData.value,
            url1: urls.url1,
            url2: urls.url2,
            url3: urls.url3
          }
          userStore.setEnterBaseData(baseSaveData.value)
          // 申请入住提交
          handleFormSub(parent)
        } else {
          MessagePlugin.error('申请资料不完整，请继续填写！')
        }
      }
    })
  }
  // 第二步
  if (defaultCurrent.value === 1) {
    assessmentRef.value.assessmentForm3.form.validate().then(async (valid) => {
      if (valid === true) {
        getIsOpenChick()
        const data = userStore.$state.enterBaseData
        if (
          data.retreat.reviewInfo !== undefined &&
          data.retreat.reviewInfo1 !== undefined
        ) {
          dialogVisible.value = true
          operateTitle.value = '确认申请'
          operateText.value = '发起入住审批'
        } else {
          MessagePlugin.error('健康能力评估不完整，请继续填写！')
        }
      }
    })
  }
  // 入住审批
  if (defaultCurrent.value === 2) {
    rightApply.value.form.validate().then((valid) => {
      if (valid === true) {
        getIsOpenChick()
        approveSub()
      }
    })
  }
  // 第三步配置提交
  if (defaultCurrent.value === 3) {
    const configVallue = configRef.value.formData
    configRef.value.form.validate().then(async (valid) => {
      if (valid === true) {
        getIsOpenChick()
        delete configVallue.createTime
        const parent = {
          ...configVallue,
          checkInStartTime: `${configVallue.checkInTime[0]} 00:00:00`,
          checkInEndTime: `${configVallue.checkInTime[1]} 00:00:00`,
          costStartTime: `${configVallue.costTime[0]} 00:00:00`,
          costEndTime: `${configVallue.costTime[1]} 00:00:00`,
          elderId: approveData.value.retreat.elderId,
          taskId: taskId.value,
          checkInId: approveData.value.retreat.id,
          id:
            approveData.value.retreat.checkInConfigVo !== undefined
              ? approveData.value.retreat.checkInConfigVo.id
              : null
        }
        const res: any = await configSubmit(parent)
        if (res.code === 200) {
          MessagePlugin.success('操作成功')
          handleIsChick()
          router.push({
            path: `/active/backlogAfter`
          })
        } else {
          getIsChick()
        }
      }
    })
  }
  // // 第四步签约办理
  if (defaultCurrent.value === 4) {
    const configVallue = transactForm.value.formData
    transactForm.value.form.validate().then(async (valid) => {
      if (valid === true) {
        getIsOpenChick()
        const parent = {
          ...configVallue,
          taskId: taskId.value,
          checkInId: approveData.value.retreat.id,
          startTime: `${configVallue.startTime}`,
          endTime: `${configVallue.endTime}`,
          signDate: `${dayjs(configVallue.signDate).format(
            'YYYY-MM-DD'
          )} 00:00:00`
        }
        const isPhone = validatePhone(parent.memberPhone)
        if (!isPhone) {
          MessagePlugin.error('手机号格式错误，请重新输入')
          handleIsChick()
          return false
        }
        const res: any = await signSubmit(parent)
        if (res.code === 200) {
          MessagePlugin.success('操作成功')
          handleIsChick()
          router.go(-1)
        } else {
          getIsChick()
        }
      }
    })
  }
}
// 审批提交
const approveSub = () => {
  // 根据选中的审批结果的状态去判断调用的提交接口
  const auditStatus = rightApply.value.formData.auditStatus
  let parent = {}
  // 审批通过
  if (auditStatus === 1) {
    parent = {
      id: approveData.value.retreat.id,
      message: rightApply.value.formData.opinion,
      taskId: taskId.value
    }
    applyApproval(parent)
  } else if (auditStatus === 2) {
    // 拒绝
    operateTitle.value = '确认拒绝'
    dialogVisible.value = true
    isRefuse.value = true
  } else {
    // 驳回时候先弹出确认弹层
    operateTitle.value = '确认驳回'
    dialogVisible.value = true
    isTurn.value = true
  }
}
// 申请审批通过提交
const applyApproval = async (parent) => {
  const res: any = await checkInSubmit(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    router.go(-1)
  } else {
    getIsChick()
  }
}
// 拒绝提交
const refuseSub = async () => {
  const parent = {
    id: approveData.value.retreat.id,
    message: rightApply.value.formData.opinion,
    taskId: taskId.value
  }
  const res: any = await rejectSubmit(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    router.go(-1)
  } else {
    getIsChick()
  }
}
// 驳回提交
const turnSub = async () => {
  const parent = {
    id: approveData.value.retreat.id,
    message: rightApply.value.formData.opinion,
    taskId: taskId.value
  }
  const res: any = await turnSubmit(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    router.go(-1)
  } else {
    getIsChick()
  }
}
// 确定撤回
// 撤回
const handleRevocationSub = async () => {
  const parent = {
    id: approveData.value.retreat.id,
    taskId: taskId.value,
    flowStatus: approveData.value.retreat.flowStatus
  }
  const res: any = await revocationSubmit(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    router.go(-1)
  } else {
    getIsChick()
  }
}
// 数据是否填写完毕
const getVallidate = (val) => {
  isVallidate.value = val
}
// 获取入住基本信息的tab值
const getInfoActive = (val) => {
  infoActive.value = val
  localStorageData.value = userStore.$state.enterBaseData
  // 申请资料必须是在第三步和资料填写完整下下可以显示提交按钮
  isShowTab3.value = userStore.$state.isShowTab3
  if (infoActive.value === 2) {
    isShowSave.value = true
  } else {
    isShowSave.value = false
  }
}
// 触发步骤
const handleStep = (val) => {
  if (checkInCode.value === '') {
    return false
  }
  if (approveData.value.retreat.flowStatus >= val) {
    if (val === 2) {
      resultTitle.value = '审批结果'
    } else {
      resultTitle.value = '处理结果'
    }
    if (val > approveData.value.flowStatus) {
      return false
    }
    isChickStep.value = true
    defaultCurrent.value = val
    defaultActive.value = val
    isVallidate.value = true
    isShowSave.value = true
    getFromData()
    height()
  }
}
// 关闭操作弹层
const handleOperateClose = () => {
  dialogVisible.value = false
  isChick.value = false
}
// 评估提交
const assessmentSub = async (parent) => {
  const res: any = await assessmentCheckIn(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    userStore.setEnterBaseData({})
    router.go(-1)
  } else {
    getIsChick()
  }
}
// 确认操作
const handleOperate = async () => {
  // 撤回
  if (isRevocation.value) {
    handleRevocationSub()
  } else if (isTurn.value) {
    // 驳回
    turnSub()
  } else if (isRefuse.value) {
    // 拒绝
    refuseSub()
  } else if (
    !isBack.value &&
    defaultCurrent.value === 1 &&
    approveData.value.retreat.flowStatus === 1
  ) {
    const data = userStore.$state.enterBaseData
    const parent = {
      reviewInfo: JSON.stringify(data.retreat.reviewInfo),
      reviewInfo1: JSON.stringify(data.retreat.reviewInfo1),
      reviewInfo2: JSON.stringify(assessmentRef.value.assessmentForm3.formData),
      id: approveData.value.retreat.id,
      taskId: taskId.value
    }

    baseSaveData.value = {
      retreat: {
        ...baseSaveData.value.retreat,
        reviewInfo2: assessmentRef.value.assessmentForm3.formData
      }
    }
    // 存入缓存
    userStore.setEnterBaseData(baseSaveData.value)
    assessmentSub(parent)
  } else if (isBack.value) {
    isBack.value = false
    if (route.path === '/active/checkDetails') {
      router.push({
        path: `/active/backlogAfter`
      })
    }
    if (route.path === '/enterQuit/enterDetails') {
      router.push({
        path: `/enterQuit/enterManage`
      })
    }
  }
}
// 撤回
const handleRevocation = () => {
  operateTitle.value = '确认撤回'
  operateText.value = '撤回已提交信息'
  isRevocation.value = true
  dialogVisible.value = true
}
// 是否可以保存
const setIsSave = (val) => {
  isSave.value = val
}
// 保存本地
const handleSave = () => {
  // 第一步申请入住保存
  if (defaultCurrent.value === 0) {
    // 基本信息
    if (infoActive.value === 0) {
      applyForm.value.form.validate().then(async (valid) => {
        const value = applyForm.value.formData
        if (valid === true) {
          baseSaveData.value = {
            ...baseSaveData.value,
            retreat: {
              ...baseSaveData.value.retreat,
              otherApplyInfo: {
                name: value.name,
                idCardNo: value.idCardNo,
                sex: value.sex,
                birthdate: value.birthdate,
                age: value.age,
                phone: value.phone,
                address: value.address,
                nationality: value.nationality,
                politicStatus: value.politicStatus,
                religion: value.religion,
                maritalStatus: value.maritalStatus,
                education: value.education,
                sourceFinance: value.sourceFinance,
                hobby: value.hobby,
                medicalSecurity: value.medicalSecurity,
                medicineCard: value.medicineCard
              },
              elderDto: {
                idCardNo: value.idCardNo,
                name: value.name,
                phone: value.phone
              }
            },
            updateTime: new Date().getTime()
          }
          const isCard = validateIdentityNum(Number(value.medicineCard))
          if (!isCard && value.medicineCard !== undefined) {
            MessagePlugin.error('医保卡号格式错误，请重新输入')
            isSave.value = false
            infoActive.value = 0
          } else {
            isSave.value = true // 是否触发了保存按钮
            infoActive.value = 1 // 跳到下一步
            userStore.setEnterBaseData(baseSaveData.value)
          }
        }
      })
      userStore.setIsShowTab(false)
    } else if (infoActive.value === 1) {
      // 家属信息
      // 查询数据有没有填写完整
      applyForm.value.onRowValidate()
      userStore.setIsShowTab(true)
    }
  } else if (defaultCurrent.value === 1) {
    // 入住评估信息保存
    // 健康评估保存
    if (infoActive.value === 0) {
      // 校验孙子组件的表单：需要注意的是这块是父组件嵌套子组件、子组件又嵌套了一个子组件 父->子->孙
      assessmentRef.value.assessmentForm1.form.validate().then((valid) => {
        if (valid === true) {
          let value = {}
          const userData = assessmentRef.value.assessmentForm1.familyUserData
          const newUserData = []
          userData.forEach((ele) => {
            if (ele.name !== '' || ele.method !== '' || ele.dosage !== '') {
              newUserData.push(ele)
            }
          })
          value = {
            ...assessmentRef.value.assessmentForm1.formData,
            familyUserData: newUserData
          }

          baseSaveData.value = {
            ...baseSaveData.value,
            retreat: {
              ...baseSaveData.value.retreat,
              reviewInfo: value
            },
            updateTime: new Date().getTime()
          }
          // 存入缓存
          isSave.value = true // 是否触发了保存按钮
          infoActive.value = 1 // 跳到下一步
          userStore.setEnterBaseData(baseSaveData.value)
        } else {
          MessagePlugin.error('信息不完整，请重新输入')
        }
        userStore.setIsShowTab(false)
      })
    } else if (infoActive.value === 1) {
      // 能力评估保存
      // 校验孙子组件的表单：需要注意的是这块是父组件嵌套子组件、子组件又嵌套了一个子组件 父->子->孙

      assessmentRef.value.assessmentForm2.form.validate().then((valid) => {
        if (valid === true) {
          baseSaveData.value = {
            retreat: {
              ...baseSaveData.value.retreat,
              reviewInfo1: assessmentRef.value.assessmentForm2.formData
            },
            updateTime: new Date().getTime()
          }
          // 存入缓存
          isSave.value = true // 是否触发了保存按钮
          isShowSave.value = true
          infoActive.value = 2 // 跳到下一步
          userStore.setEnterBaseData(baseSaveData.value)
          userStore.setIsShowTab(true)
          MessagePlugin.success('保存成功')
        }
      })
    }
  }
}
// 设置家属信息
const setFamily = (val) => {
  baseSaveData.value = {
    ...baseSaveData.value,
    retreat: {
      ...baseSaveData.value.retreat,
      memberElderDtos: val
    },
    updateTime: new Date().getTime()
  }
  infoActive.value = 2
  isShowSave.value = true
  userStore.setEnterBaseData(baseSaveData.value)
}
// 获取最新的费用期限
const getNewCostTime = (time) => {
  approveData.value.retreat.checkInConfigVo.costStartTime = `${time[0]} 00:00:00`
  approveData.value.retreat.checkInConfigVo.costEndTime = `${time[1]} 23:59:59`
}
// 返回
const handleReturn = () => {
  if (
    checkInCode.value === '' ||
    (approveData.value.isShow === 1 &&
      defaultCurrent.value === 0 &&
      approveData.value.retreat.status === 1 &&
      (checkInCode.value === '' ||
        approveData.value.retreat.flowStatus === 0)) ||
    (defaultCurrent.value === 1 &&
      approveData.value.isShow === 1 &&
      approveData.value.retreat.status === 1 &&
      approveData.value.retreat.flowStatus === 1) ||
    (defaultCurrent.value === 2 &&
      approveData.value.isShow === 1 &&
      approveData.value.retreat.flowStatus === 2 &&
      approveData.value.retreat.status === 1) ||
    (defaultCurrent.value === 3 &&
      approveData.value.isShow === 1 &&
      approveData.value.retreat.flowStatus === 3 &&
      approveData.value.retreat.status === 1) ||
    (defaultCurrent.value === 4 &&
      approveData.value.isShow === 1 &&
      approveData.value.retreat.flowStatus === 4 &&
      approveData.value.retreat.status === 1)
  ) {
    isBack.value = true
    dialogVisible.value = true
    operateTitle.value = '确认返回'
  } else {
    router.go(-1)
  }
}
</script>
<style lang="less" scoped src="./../index.less"></style>
