<!-- 申请审批提示  -->
<template>
  <div class="applyTipInfo">
    <div v-if="baseData.type === 1">
      <!-- 退住审批 -->
      <!-- 审批中 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 1 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">审批中</div>
        <p>
          稍等，退住申请单正在审批中，若该申请单长时间未处理，<br />请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>

      <!-- end -->
      <!-- 解除合同审批中 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 2 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">处理中</div>
        <p>
          稍等，解除合同正在处理中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 调整账单处理中 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 3 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">处理中</div>
        <p>
          稍等，账单调整正在处理中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 调整账单审批中 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 4 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">审批中</div>
        <p>
          稍等，账单调整正在审批中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 退住审批中 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 5 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">审批中</div>
        <p>
          稍等，退住审批正在审批中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 费用清算 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 6 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">处理中</div>
        <p>
          稍等，费用清算正在处理中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 审批撤回 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 1 && baseData.retreat.status === 3
        "
        class="applyRevocation"
      >
        <div class="iconTip"></div>
        <div class="tit">已撤销</div>
        <p>哎呀，退住申请单已撤销，如需发起退住申请，请重新填写表单！</p>
      </div>
      <!-- end -->
    </div>
    <!-- 入住 -->
    <div v-else>
      <!-- 入住评估 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 1 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">处理中</div>
        <p>
          稍等，入住评估正在处理中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 入住审批中 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 2 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">审批中</div>
        <p>
          稍等，入住申请单正在审批中，若该申请单长时间未处理，<br />请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 入住配置 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 3 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">处理中</div>
        <p>
          稍等，入住配置正在处理中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
      <!-- 签约办理 -->
      <div
        v-if="
          baseData.retreat.flowStatus === 4 && baseData.retreat.status === 1
        "
        class="applyCourse"
      >
        <div class="iconTip"></div>
        <div class="tit">处理中</div>
        <p>
          稍等，签约办理正在处理中，若该申请单长时间未处理，请联系{{
            baseData.nextApprover
          }}！
        </p>
      </div>
      <!-- end -->
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
