<!-- 合同详情 -->
<template>
  <div class="detail-base">
    <!-- 合同详情 -->
    <t-card title="合同详情">
      <div class="info-block">
        <div class="info-item">
          <h1>合同编号：</h1>
          <span>{{ baseData.contractNo }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">合同名称：</h1>
          <span>{{ baseData.name }}</span>
        </div>
        <div class="info-item">
          <h1>老人姓名：</h1>
          <span>{{ elderVoData.name }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">老人身份证号：</h1>
          <span>{{ elderVoData.idCardNo }}</span>
        </div>
        <div class="info-item">
          <h1>入住单号：</h1>
          <span>{{ baseData.checkInNo }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">合同期限：</h1>
          <span
            >{{ getDateInfo(baseData.startTime) }} -
            {{ getDateInfo(baseData.endTime) }}</span
          >
        </div>
        <div class="info-item">
          <h1>合同状态：</h1>
          <span v-if="baseData.status === 0" class="status-dot status-dot-0"
            >未生效</span
          >
          <span
            v-else-if="baseData.status === 1"
            class="status-dot status-dot-1"
            >生效中</span
          >
          <span
            v-else-if="baseData.status === 2"
            class="status-dot status-dot-2"
            >已过期</span
          >
          <span v-else class="status-dot status-dot-3">已失效</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">签约日期：</h1>
          <span>{{ getDateInfo(baseData.signDate) }}</span>
        </div>
        <div
          v-if="baseData.memberName && baseData.memberPhone"
          class="info-item"
        >
          <h1>丙方姓名：</h1>
          <span>{{ baseData.memberName }}</span>
        </div>
        <div
          v-if="baseData.memberName && baseData.memberPhone"
          class="info-item"
        >
          <h1 class="label-wt">丙方联系方式：</h1>
          <span>{{ baseData.memberPhone }}</span>
        </div>

        <div class="info-item">
          <h1>合同文件：</h1>
          <span
            >签约合同文件<i class="font-bt"
              ><a class="font-bt" :href="baseData.pdfUrl" target="black"
                >查看</a
              ></i
            >
            <!-- <i
              class="font-bt"
              @click="handleDown(baseData.pdfUrl, '签约合同文件')"
              >下载</i
            > -->
          </span>
        </div>
      </div>
    </t-card>
    <!-- end -->
    <!-- 解除记录 -->
    <t-card
      v-if="baseData.releaseSubmitter && baseData.status === 3"
      title="解除记录"
      class="container-base-margin-top"
    >
      <div class="info-block">
        <div class="info-item">
          <h1>提交人：</h1>
          <span>{{ baseData.releaseSubmitter }}</span>
        </div>
        <div class="info-item">
          <h1>解除日期：</h1>
          <span>{{ getDateInfo(baseData.releaseDate) }}</span>
        </div>
        <div class="info-item">
          <h1>解除协议：</h1>
          <span
            ><span
              >解除协议文件<i class="font-bt"
                ><a
                  class="font-bt"
                  :href="baseData.releasePdfUrl"
                  target="black"
                  >查看</a
                ></i
              >
              <!-- <i
                class="font-bt"
                @click="handleDown(baseData.releasePdfUrl, '解除协议文件')"
                >下载</i
              > -->
            </span></span
          >
        </div>
      </div>
    </t-card>
    <!-- end -->
  </div>
  <div class="boxBottom fx fx-ct bg-wt">
    <div class="bt wt-88" @click="handleReturn">返回</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { download } from '@/utils/index'
import { getDateInfo } from '@/utils/date'
// 接口
import { getContractDetails } from '@/api/liveIn'

// ------定义变量------
const baseData: any = ref({}) // 基本数据
const elderVoData = ref<Object | any>({}) // 老人信息
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const downType = ref('application/pdf')
// 生命周期
onMounted(() => {
  getDetail()
})
// ------定义方法------
// 获取列表数据
const getDetail = async () => {
  const res: any = await getContractDetails(route.query.id) // 获取列表数据
  if (res.code === 200) {
    baseData.value = res.data
    elderVoData.value = baseData.value.elderVo
  }
}
// // 合同下载文件
// const handleDown = (url, name) => {
//   download(url, downType.value, name)
// }
// 返回
const handleReturn = () => {
  router.push({
    path: `/liveIn/trackAfter`
  })
}
</script>
