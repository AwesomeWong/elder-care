<!-- 完成签约办理 -->
<template>
  <div class="detail-base">
    <!-- 完成签约办理 -->
    <t-card title="完成签约办理">
      <div class="info-block">
        <div class="info-item">
          <h1>合同编号：</h1>
          <span> {{ formData.contractNo }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">合同名称：</h1>
          <span> {{ formData.name }}</span>
        </div>
        <div class="info-item">
          <h1>合同期限：</h1>
          <span
            >{{ getDateInfo(formData.startTime) }}
            ~
            {{ getDateInfo(formData.endTime) }}</span
          >
        </div>
        <div class="info-item">
          <h1 class="label-wt">签约日期：</h1>
          <span> {{ getDateInfo(formData.signDate) }}</span>
        </div>
        <div class="info-item">
          <h1>丙方姓名：</h1>
          <span> {{ formData.memberName ? formData.memberName : '--' }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">丙方联系方式：</h1>
          <span> {{ formData.memberPhone ? formData.memberPhone : '--' }}</span>
        </div>
        <div class="info-item">
          <h1>入住合同：</h1>
          <span
            >{{ oldManName }}的入住合同.pdf
            <i
              ><a class="font-bt" :href="formData.pdfUrl" target="black"
                >查看</a
              ></i
            >
            <!-- <i
              class="font-bt"
              @click="handleDown(formData.pdfUrl, '体检报告文件')"
              >下载</i
            > -->
          </span>
        </div>
      </div>
    </t-card>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { download } from '@/utils/index'
import { getDateInfo } from '@/utils/date'
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
// ------定义变量------
const formData = ref({})
const oldManName = ref('') // 老人姓名
onMounted(() => {
  const data = props.baseData
  if (data.retreat.contractVo !== undefined) {
    formData.value = data.retreat.contractVo
  }
  if (data.retreat.elderDto !== undefined) {
    oldManName.value = data.retreat.elderDto.name
  }
})
// TODO 暂时保留
// // 合同下载文件
// const handleDown = (url, name) => {
//   download(url, downType.value, name)
// }
</script>
