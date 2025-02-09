<!-- 详情 -->
<template>
  <div class="apply detail-base">
    <div class="bg-wt stepContainer mb-24">
      <!-- step -->
      <!-- 退住步骤条 0申请退住、1申请审批、2解除合同、3调整账单、4账单审批、5退住审批、6费用清算-->
      <t-steps :current="defaultCurrent" @change="handleStep">
        <t-step-item
          v-for="(item, index) in quitStepsData"
          :key="index"
          :class="index <= approveData.retreat.flowStatus ? 'flowStatus' : ''"
          :title="item.value"
        />
      </t-steps>
      <!-- 步骤条 -->
    </div>
    <!-- end -->
    <div ref="mainHeight" class="bg-wt min-steph height">
      <!-- 驳回后可编辑、申请审批、解除合同、调整账单、账单审批、退住审批显示提交按钮 -->
      <!-- status 1审批中2完成3关闭 -->
      <!-- flowStatus 0申请退住、1申请审批、2解除合同、3调整账单、4账单审批、5退住审批、6费用清算 -->
      <!-- defaultCurrent当前的step步骤条状态 -->
      <div>
        <!-- 第一步：申请退住-申请信息 -->
        <div v-if="defaultCurrent === 0" id="menuFlag0">
          <div v-if="retreatCode !== ''" class="baseCon">
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
                  :data="oldManData"
                  :base-data="approveData"
                  @getVallidate="getVallidate"
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
              :data="oldManData"
              @getVallidate="getVallidate"
            ></ApplyForm>
          </div>
        </div>
        <!-- end -->
        <div v-if="defaultCurrent === 1" id="menuFlag1">
          <!-- 第二步：申请审批-审批基本信息-操作人页面 -->
          <div
            v-if="
              approveData.isShow === 1 ||
              (approveData.retreat.status !== 3 &&
                approveData.retreat.status !== 1)
            "
            class="baseCon"
          >
            <div class="baseL">
              <ApplyBaseInfo
                :base-data="approveData"
                :active="defaultCurrent"
              ></ApplyBaseInfo>
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
          <!-- 操作记录-非操作人看到的界面 -->
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
        <!-- 第三步：解除合同-操作人页面 -->
        <div v-if="defaultCurrent === 2" id="menuFlag2">
          <div v-if="approveData.isShow === 1" class="baseCon">
            <div class="baseL">
              <!-- 基本信息 -->
              <ApplyBaseInfo
                :base-data="approveData"
                :active="defaultCurrent"
              ></ApplyBaseInfo>
              <!-- end -->
              <!-- 解除合同 -->
              <ContractForm
                v-if="
                  approveData.retreat.flowStatus === 2 &&
                  approveData.retreat.status === 1
                "
                ref="contract"
                :base-data="approveData"
                @getVallidate="getConVallidate"
              ></ContractForm>
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
          <!-- 操作记录-非操作人看到的界面 -->
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
        <!-- 第四步：调整账单-操作人页面 -->
        <div v-if="defaultCurrent === 3" id="menuFlag3">
          <div v-if="approveData.isShow === 1" class="baseCon">
            <div class="baseL">
              <!-- 基本信息 -->
              <ApplyBaseInfo
                :base-data="approveData"
                :active="defaultCurrent"
              ></ApplyBaseInfo>
              <!-- end -->
              <AdjustBill
                v-if="approveData.retreat.flowStatus === 3"
                ref="adjustBillRef"
                :base-data="approveData"
              ></AdjustBill>
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
          <!-- 操作记录-非操作人看到的界面 -->
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
        <!-- 第五步/第六步：账单审批/退住审批 -->
        <div
          v-if="defaultCurrent === 4 || defaultCurrent === 5"
          :id="defaultCurrent === 4 ? 'menuFlag4' : 'menuFlag5'"
        >
          <div
            v-if="approveData.isShow === 1 || approveData.retreat.status === 3"
            class="baseCon"
          >
            <div class="baseL">
              <!-- 基本信息 -->
              <ApplyBaseInfo
                :base-data="approveData"
                :active="defaultCurrent"
              ></ApplyBaseInfo>
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
          <!-- 操作记录-非操作人看到的界面 -->
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
        <!-- 第七步：费用清算 -->
        <div v-if="defaultCurrent === 6" id="menuFlag6">
          <div
            v-if="
              (approveData.isShow === 1 && approveData.retreat.status === 2) ||
              (approveData.isShow === 1 && approveData.retreat.status === 1)
            "
            class="baseCon"
          >
            <div class="baseL">
              <!-- 基本信息 -->
              <ApplyBaseInfo
                :base-data="approveData"
                :active="defaultCurrent"
              ></ApplyBaseInfo>
              <!-- end -->
              <Liquidation
                v-if="
                  approveData.retreat.flowStatus === 6 &&
                  approveData.retreat.status === 1
                "
                ref="liquidation"
                :is-vallidate="isVallidate"
                :base-data="approveData"
                @upLoad-success="upLoadSuccess"
              ></Liquidation>
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
          <!-- 操作记录-非操作人看到的界面 -->
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
      </div>
    </div>
  </div>
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
    <!-- 当前操作的人可以撤回自己申请 -->
    <button
      v-if="
        (approveData.retreat.flowStatus === 1
          ? approveData.retreat.flowStatus
          : approveData.retreat.flowStatus - 1) && approveData.isRevocation
      "
      theme="primary"
      class="bt wt-60"
      @click="handleRevocation"
    >
      撤回
    </button>
    <!-- 驳回后可编辑、申请审批、解除合同、调整账单、账单审批、退住审批显示提交按钮 -->
    <!-- status 1审批中2完成3关闭 -->
    <!-- flowStatus 0申请退住、1申请审批、2解除合同、3调整账单、4账单审批、5退住审批、6费用清算 -->
    <!-- defaultCurrent当前的step步骤条状态 -->
    <button
      v-if="
        retreatCode === '' ||
        (defaultCurrent === 0 &&
          approveData.retreat.status === 1 &&
          approveData.retreat.flowStatus === 0 &&
          approveData.isShow === 1) ||
        (approveData.retreat.flowStatus === 1 &&
          defaultCurrent === 1 &&
          approveData.isShow === 1 &&
          approveData.retreat.status !== 3) ||
        (approveData.retreat.flowStatus === 2 &&
          defaultCurrent === 2 &&
          approveData.isShow === 1) ||
        (approveData.retreat.flowStatus === 3 &&
          defaultCurrent === 3 &&
          approveData.isShow === 1 &&
          approveData.retreat.status !== 3) ||
        (approveData.retreat.flowStatus === 4 &&
          defaultCurrent === 4 &&
          approveData.isShow === 1) ||
        (approveData.retreat.flowStatus === 5 &&
          defaultCurrent === 5 &&
          approveData.isShow === 1 &&
          approveData.retreat.status !== 3) ||
        (approveData.retreat.flowStatus === 6 &&
          approveData.retreat.status === 1 &&
          defaultCurrent === 6 &&
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

// 基本数据
import { quitStepsData } from '@/utils/commonData'
// 接口
import {
  applyBack,
  getRetreatCode,
  examineSubmit,
  rejectSubmit,
  turnSubmit,
  revocationSubmit
} from '@/api/synergy'
// 组件
// 操作弹层
import OperateDialog from '@/components/OperateDialog/index.vue'
// 申请退住
import ApplyForm from './components/ApplyForm.vue'
// 申请审批
import ApplyApproval from './components/ApplyApproval.vue'
// 基本信息
import ApplyBaseInfo from './components/ApplyBaseInfo.vue'
// 上传解除合同
import ContractForm from './components/ContractForm.vue'
// 调整账单
import AdjustBill from './components/AdjustBill.vue'
// 费用清算
import Liquidation from './components/Liquidation.vue'
// 左侧操作记录
import RightApply from './components/RightApply.vue'
// 接口
import { getOldManList } from '@/api/oldMan'

// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const defaultCurrent = ref(0) // step 当前的选择
const oldManData = ref([]) // 所有老人的数据
const applyForm = ref(null) // 申请表单的ref
const rightApply = ref(null) // 第二部，申请审批
const contract = ref(null) // 合同ref
const adjustBillRef = ref(null) // 调整账单ref
const isVallidate = ref(true) // 是否校验完成
const resultTitle = ref('') // 是审批结果还是处理结果
const dialogVisible = ref(false) // 控制操作弹层显示隐藏
const operateTitle = ref('') // 操作弹层标题
const operateText = ref('') // 要操作的内容提示
const retreatCode = ref('') // 获取待办编号
const assigneeId = ref('') // 代理人id
const approveData = ref<Object | any>({
  retreat: {}, // 老人信息
  accraditationRecords: [], // 操作记录
  retreatBillVo: {
    // 账单信息
    unpaidList: [],
    dueBackList: [],
    arrearageList: [],
    balanceVo: {}
  }
}) // 获取的审批信息
const isChickStep = ref(false) // 是否触发了tab步骤
const defaultActive = ref(-1) // 需要传给后端的当前状态
const isRevocation = ref(false) // 是否触发了撤回按钮
const isTurn = ref(false) // 是否驳回
const isRefuse = ref(false) // 是否拒绝
const mainHeight = ref(null) // 页面高度
const footFlex = ref(false) // 底部受否定位
const contractVal = ref({})
const isBill = ref(false)
const taskId = ref('') // 待办任务id或者申请任务id
const isChick = ref(false) // 是否触发了提交按钮，触发3秒后才可以再次触发
// 生命周期
onMounted(() => {
  getAllOldMan()
  // 如果是从待办列表中进来的，利用待办编号来获取申请表单查询
  if (route.query.code !== undefined) {
    retreatCode.value = route.query.code
    assigneeId.value = route.query.assigneeId
    taskId.value = route.query.taskId
    getFromData()
  } else {
    defaultCurrent.value = 0
    isVallidate.value = false
  }

  nextTick(() => {
    window.addEventListener('scroll', scrollToTop, true)
  })
})
// 根据元素的高度判断是否显示 版权
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
      isBill.value = false
    } else {
      footFlex.value = false
      isBill.value = true
    }
  })
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
// // 获取列表数据
const getAllOldMan = async () => {
  const res: any = await getOldManList() // 获取列表数据
  if (res.code === 200) {
    oldManData.value = res.data
  }
}
// 获取退住表单查询
const getFromData = async () => {
  const parent = {
    retreatCode: retreatCode.value,
    assigneeId: assigneeId.value,
    flowStatus: defaultActive.value,
    taskId: taskId.value
  }
  const res: any = await getRetreatCode(parent)
  if (res.code === 200) {
    approveData.value = res.data
    approveData.value.retreat = res.data.retreat // 老人信息
    approveData.value.rescissionContract = res.data.rescissionContract // 合同信息
    approveData.value.accraditationRecords = res.data.accraditationRecords // 审批记录
    approveData.value.retreatBillVo = res.data.retreatBillVo // 账单
    // 申请审批、账单审批、退住审批显示(审批结果)字段,其他的界面显示(处理结果)
    if (
      approveData.value.retreat.flowStatus === 1 ||
      approveData.value.retreat.flowStatus === 4 ||
      approveData.value.retreat.flowStatus === 5
    ) {
      resultTitle.value = '审批结果'
    } else {
      resultTitle.value = '处理结果'
    }
    // 账单-是否校验完成
    if (
      approveData.value.retreatBillVo &&
      approveData.value.retreat.flowStatus === 3
    ) {
      if (
        approveData.value.retreatBillVo.unpaidList.length === 0 &&
        approveData.value.retreatBillVo.balanceVo &&
        approveData.value.retreatBillVo
      ) {
        isVallidate.value = false
      } else {
        isVallidate.value = true
      }
    }
    // 驳回的数据，是否显示提交按钮
    if (approveData.value.retreat) {
      isVallidate.value = false
    }
    if (
      approveData.value.retreatBillVo &&
      approveData.value.retreatBillVo.unpaidList.length > 0
    ) {
      isVallidate.value = true
    }
    // 费用清单，欠费有数据，提交按钮和上传凭证按钮置灰
    // 首次加载数据设置默认的step步骤，显示当前的处理著状态
    if (!isChickStep.value) {
      defaultCurrent.value = res.data.retreat.flowStatus
    }
    if (
      approveData.value.retreatBillVo &&
      approveData.value.retreat.flowStatus === 6 &&
      defaultCurrent.value === 6
    ) {
      // 欠费没数据、余额没数据
      if (
        approveData.value.retreatBillVo &&
        approveData.value.retreatBillVo.arrearageList.length === 0
      ) {
        isVallidate.value = false
        // 余额有数据
        if (
          approveData.value.retreatBillVo &&
          approveData.value.retreatBillVo.balanceVo.prepaidBalance > 0
        ) {
          isVallidate.value = true
        }
      } else {
        isVallidate.value = true
      }
    }
  }
  height()
}
// 按钮触发3秒后才可以再次触发-防止连续触发操作按钮
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
    applyForm.value.form.validate().then((valid) => {
      if (valid === true) {
        getIsOpenChick()
        applayForm()
        applyForm.value.handleClear()
      }
    })
  }
  // 第二部申请审批或者第五、六步审批
  if (
    defaultCurrent.value === 1 ||
    defaultCurrent.value === 5 ||
    defaultCurrent.value === 4
  ) {
    rightApply.value.form.validate().then((valid) => {
      if (valid === true) {
        getIsOpenChick()
        approveSub()
      }
    })
  }
  // 第三步合同提交
  if (defaultCurrent.value === 2) {
    contract.value.form.validate().then((valid) => {
      if (valid === true) {
        getIsOpenChick()
        const parent = {
          code: retreatCode.value,
          assigneeId: assigneeId.value,
          taskId: taskId.value,
          accraditationRecord: {
            auditStatus: 1,
            opinion: '同意'
          },
          rescissionContract: {
            ...contract.value.formData,
            relieveTime: `${dayjs(contract.value.formData.time).format(
              'YYYY-MM-DD'
            )} 00:00:00`,
            retreatId: approveData.value.retreat.id
          }
        }
        applyApproval(parent)
      }
    })
  }
  // 第四步账单
  // 账单调整确认弹层
  if (
    defaultCurrent.value === 3 &&
    approveData.value.retreat.status === 1 &&
    approveData.value.retreatBillVo.unpaidList.length === 0
  ) {
    operateTitle.value = '确认提交'
    dialogVisible.value = true
  }
  // 账单提交
  if (defaultCurrent.value === 3) {
    const parent = {
      code: retreatCode.value,
      assigneeId: assigneeId.value,
      taskId: taskId.value,
      accraditationRecord: {
        auditStatus: 1,
        opinion: '同意'
      },
      billJson: JSON.stringify({
        arrearageList: adjustBillRef.value.arrearageList,
        balanceVo: adjustBillRef.value.balanceVo,
        dueBackList: adjustBillRef.value.dueBackList,
        unpaidList: adjustBillRef.value.unpaidList,
        moneySum: Number(adjustBillRef.value.moneySum),
        balanceSum: adjustBillRef.value.balanceSum, // 余额小计
        dueBackSum: adjustBillRef.value.dueBackSum, // 应退小计
        arrearageSum: adjustBillRef.value.arrearageSum // 欠费小计
      })
    }
    contractVal.value = parent
  }
  if (defaultCurrent.value === 6 && !isVallidate.value) {
    getIsOpenChick()
    const parent = {
      code: retreatCode.value,
      assigneeId: assigneeId.value,
      taskId: taskId.value,
      accraditationRecord: {
        auditStatus: 1,
        opinion: '同意'
      }
    }
    applyApproval(parent)
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
      code: retreatCode.value,
      assigneeId: assigneeId.value,
      taskId: taskId.value,
      accraditationRecord: {
        ...rightApply.value.formData
      }
    }
    if (approveData.value.retreat.flowStatus !== 3) {
      applyApproval(parent)
    }
  } else if (auditStatus === 2) {
    // 拒绝
    operateTitle.value = '确认拒绝'
    operateText.value = '拒绝审批后，此流程将自动结束，无法进行流转'
    dialogVisible.value = true
    isRefuse.value = true
  } else {
    // 驳回时候先弹出确认弹层
    operateTitle.value = '确认驳回'
    operateText.value = '驳回申请后，该流程将自动驳回至发起人'
    dialogVisible.value = true
    isTurn.value = true
  }
}

// 申请退住提交
const applayForm = async () => {
  const parent = {
    ...applyForm.value.formData,
    checkOutTime: `${dayjs(applyForm.value.formData.checkOutTime).format(
      'YYYY-MM-DD'
    )} 00:00:00`,
    status: 0,
    taskId: taskId.value
  }
  const res: any = await applyBack(parent)
  if (res.code === 200) {
    handleIsChick()
    MessagePlugin.success('操作成功')
    router.go(-1)
  } else {
    getIsChick()
  }
}
// 申请审批通过提交
const applyApproval = async (parent) => {
  const res: any = await examineSubmit(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    router.push({
      path: `/active/backlog`
    })
  } else {
    getIsChick()
  }
}
// 拒绝提交
const refuseSub = async () => {
  const parent = {
    retreatCode: retreatCode.value,
    reject: rightApply.value.formData.opinion,
    taskId: taskId.value
  }
  const res: any = await rejectSubmit(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    router.push({
      path: `/active/backlog`
    })
  } else {
    getIsChick()
  }
}
// 驳回提交
const turnSub = async () => {
  const parent = {
    retreatCode: retreatCode.value,
    message: rightApply.value.formData.opinion,
    taskId: taskId.value
  }
  const res: any = await turnSubmit(parent)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    handleIsChick()
    router.push({
      path: `/active/backlog`
    })
  } else {
    getIsChick()
  }
}
// 确定撤回
// 撤回
const handleRevocationSub = async () => {
  const parent = {
    retreatCode: retreatCode.value,
    flowStatus: approveData.value.retreat.flowStatus,
    taskId: taskId.value
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
// 合同数据是否填写
const getConVallidate = (val) => {
  isVallidate.value = val
}
// 触发步骤条
const handleStep = (val) => {
  if (retreatCode.value === '') {
    return false
  }
  if (approveData.value.retreat.flowStatus >= val) {
    if (val === 1 || val === 4 || val === 5) {
      resultTitle.value = '审批结果'
    } else {
      resultTitle.value = '处理结果'
    }
    if (val > approveData.value.retreat.flowStatus) {
      return false
    }

    isChickStep.value = true
    defaultCurrent.value = val
    defaultActive.value = val
    isVallidate.value = true
    getFromData() // 每次触发步骤条都需要更新详情
    height()
  }
}
// 关闭操作弹层
const handleOperateClose = () => {
  isChick.value = false
  dialogVisible.value = false
}
// 确认操作
const handleOperate = () => {
  // 撤回
  if (isRevocation.value) {
    handleRevocationSub()
  } else if (isTurn.value) {
    // 驳回
    turnSub()
  } else if (isRefuse.value) {
    // 拒绝
    refuseSub()
  } else if (defaultCurrent.value === 3) {
    getIsOpenChick()
    applyApproval(contractVal.value)
  } else {
    const parent = {
      code: retreatCode.value,
      assigneeId: assigneeId.value,
      taskId: taskId.value,
      accraditationRecord: {
        ...rightApply.value.formData
      }
    }
    applyApproval(parent)
  }

  handleOperateClose()
}
// 撤回
const handleRevocation = () => {
  operateTitle.value = '确认撤回'
  operateText.value = '撤回已提交信息'
  isRevocation.value = true
  dialogVisible.value = true
}
// 上传退款凭证是否成功
const upLoadSuccess = (val) => {
  isVallidate.value = val
}
// 返回
const handleReturn = () => {
  router.go(-1)
}
</script>
<style lang="less" scoped src="./../index.less"></style>
