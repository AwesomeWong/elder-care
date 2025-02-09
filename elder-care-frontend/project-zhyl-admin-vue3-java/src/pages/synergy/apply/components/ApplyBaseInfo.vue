<!-- 申请退住-详细信息 -->
<template>
  <!-- 基本信息 -->
  <t-card title="基本信息">
    <div class="info-block">
      <div class="info-item">
        <h1 class="label-wt-long">单据编号：</h1>
        <span>{{ baseData.retreat.retreatCode }}</span>
      </div>
      <div class="info-item">
        <h1>老人姓名：</h1>
        <span>{{ baseData.retreat.name }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">老人身份证号：</h1>
        <span>{{ baseData.retreat.idCardNo }}</span>
      </div>
      <div class="info-item">
        <h1>联系方式：</h1>
        <span>{{ baseData.retreat.phone }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">费用期限：</h1>
        <span
          >{{ getDateInfo(baseData.retreat.checkInStartTime) }} ~
          {{ getDateInfo(baseData.retreat.checkInEndTime) }}</span
        >
      </div>
      <div class="info-item">
        <h1>护理等级：</h1>
        <span>{{ baseData.retreat.nursingLevelName }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">入住床位：</h1>
        <span>{{ baseData.retreat.bedNo }}床位</span>
      </div>
      <div class="info-item">
        <h1>签约合同：</h1>
        <span
          >{{ baseData.retreat.contractName
          }}<i class="font-bt"
            ><a
              class="font-bt"
              :href="baseData.retreat.contractUrl"
              target="black"
              >查看</a
            ></i
          >
          <!-- <i
            class="font-bt"
            @click="
              handleDown(
                baseData.retreat.contractUrl,
                baseData.retreat.contractName
              )
            "
            >下载</i
          > -->
        </span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">养老顾问：</h1>
        <span>{{
          baseData.retreat.counselor ? baseData.retreat.counselor : '无'
        }}</span>
      </div>
      <div class="info-item">
        <h1>护理员：</h1>
        <span>{{
          baseData.retreat.nursingName ? baseData.retreat.nursingName : '无'
        }}</span>
      </div>
    </div>
  </t-card>
  <!-- end -->
  <!-- 申请信息 -->
  <t-card title="申请信息">
    <div class="info-block">
      <div class="info-item">
        <h1>退住日期：</h1>
        <span>{{ getDateInfo(baseData.retreat.checkOutTime) }}</span>
      </div>
      <div class="info-item">
        <h1>退住原因：</h1>
        <span>{{ baseData.retreat.reason }}</span>
      </div>
      <div class="info-item">
        <h1>申请人：</h1>
        <span>{{ baseData.retreat.applicat }}</span>
      </div>
      <div class="info-item">
        <h1>申请时间：</h1>
        <span>{{ baseData.retreat.createTime }}</span>
      </div>
      <div class="info-item wt-100">
        <h1>备注：</h1>
        <span>{{ baseData.retreat.remark }}</span>
      </div>
    </div>
  </t-card>
  <!-- end -->
  <!-- 解除记录 -->
  <t-card
    v-if="
      active >= 2 &&
      (baseData.retreat.flowStatus === 3 ||
        baseData.retreat.flowStatus === 4 ||
        baseData.retreat.flowStatus === 5 ||
        baseData.retreat.flowStatus === 6 ||
        baseData.retreat.status === 3)
    "
    title="解除记录"
  >
    <div class="info-block">
      <div class="info-item">
        <h1>提交人：</h1>
        <span>{{ baseData.rescissionContract.commitor }}</span>
      </div>
      <div class="info-item">
        <h1>解除时间：</h1>
        <span>{{ getDateInfo(baseData.rescissionContract.relieveTime) }}</span>
      </div>

      <div class="info-item">
        <h1>解除协议：</h1>
        <span
          >{{ baseData.rescissionContract.rescissionContractName
          }}<i class="font-bt"
            ><a
              class="font-bt"
              :href="baseData.rescissionContract.contractUrl"
              target="black"
              >查看</a
            ></i
          >
          <!-- <i
            class="font-bt"
            @click="
              handleDown(
                baseData.rescissionContract.contractUrl,
                baseData.rescissionContract.rescissionContractName
              )
            "
            >下载</i
          > -->
        </span>
      </div>
    </div>
  </t-card>
  <!-- end -->
  <!-- 账单明细 -->
  <ApproveBill
    v-if="
      (active === 3 || active === 4 || active === 5) &&
      baseData.retreat.flowStatus !== 3 &&
      (baseData.retreatBillVo.arrearageList.length > 0 ||
        baseData.retreatBillVo.balanceVo ||
        baseData.retreatBillVo.dueBackList.length > 0 ||
        baseData.retreatBillVo.unpaidList.length > 0)
    "
    :active="active"
    :base-data="baseData"
  ></ApproveBill>
  <!-- end -->
  <!-- 完成账单清算 -->
  <t-card
    v-if="
      active === 6 &&
      baseData.retreatBill &&
      baseData.retreat.flowStatus === 6 &&
      baseData.retreat.status === 2
    "
    title="完成账单清算"
  >
    <div class="fillCon">
      <div class="titleInfo">
        <div class="lText">退款信息</div>
      </div>
      <div class="info-block">
        <div class="info-item">
          <h1 class="">剩余预缴款：</h1>
          <span
            >{{ decimalsReplenish(baseData.retreatBill.refundAmount) }}元</span
          >
        </div>
      </div>
    </div>
    <div
      v-if="baseData.retreatBill.refundVoucherUrl !== undefined"
      class="fillCon conBpd"
    >
      <div class="titleInfo">
        <div class="lText">退款凭证</div>
      </div>
      <div class="info-block">
        <div class="info-item">
          <h1>提交人：</h1>
          <span>{{ baseData.retreat.applicat }}</span>
        </div>
        <div class="info-item">
          <h1>提交时间：</h1>
          <span>{{ baseData.retreat.createTime }}</span>
        </div>
        <div class="info-item">
          <h1>退款方式：</h1>
          <span>{{ baseData.retreatBill.tradingChannel }}</span>
        </div>
        <div class="info-item wt-100">
          <h1>退款凭证：</h1>
          <span>
            <t-upload
              ref="uploadRef"
              v-model="photoFile"
              action=""
              theme="image"
              :disabled="true"
            ></t-upload>
          </span>
        </div>
        <div class="info-item wt-100">
          <h1>退款备注：</h1>
          <span>{{ baseData.retreatBill.remark }}</span>
        </div>
      </div>
    </div>
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { download, decimalsReplenish } from '@/utils/index'
import { getDateInfo } from '@/utils/date'

// 账单明细
import ApproveBill from './ApproveBill.vue'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  active: {
    type: Number,
    default: 0
  }
})
// ------定义变量------
const photoFile = ref([
  {
    url: ''
  }
]) // 绑定上传的文件
onMounted(() => {
  const data = props.baseData.retreatBill
  if (data) {
    photoFile.value[0].url = data.refundVoucherUrl
  }
})
const form = ref() // 表单
// TODO 暂时保留
// const downType = ref('application/pdf') // pdf格式
// // 合同下载文件
// const handleDown = (url, name) => {
//   download(url, downType.value, name)
// }
// 向父组件暴露数据与方法
defineExpose({
  form
})
</script>
