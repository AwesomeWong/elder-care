<!-- 需要展示的基本信息 -->
<template>
  <div class="detail-base">
    <!-- 基本信息 -->
    <t-card title="基本信息">
      <div class="info-block">
        <div class="info-item">
          <h1>老人姓名：</h1>
          <span>{{ checkInfo.name }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">老人身份证号：</h1>
          <span>{{ checkInfo.idCardNo }}</span>
        </div>
        <div class="info-item">
          <h1>性别：</h1>
          <span>{{ checkInfo.sex === 0 ? '男' : '女' }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">出生日期：</h1>
          <span>{{ checkInfo.birthdate }}</span>
        </div>
        <div class="info-item">
          <h1>详细住址：</h1>
          <span>{{ checkInfo.address }}</span>
        </div>
      </div>
    </t-card>
    <!-- end -->
    <!-- 健康状况 -->
    <t-card v-if="active >= 1" title="健康状况" class="baseInfoBox">
      <h1 class="tit">疾病和用药情况</h1>
      <div class="info-block">
        <div class="info-item">
          <h1 class="label-wt-130">疾病诊断：</h1>
          <div class="con">
            <span
              v-for="(item, index) in reviewInfo.diagnoseArr"
              :key="index"
              class="bt-small"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">用药情况：</h1>
          <div class="con">
            <t-table
              ref="tableRef"
              row-key="key"
              :columns="FROMCOLUMNS"
              :data="reviewInfo.familyUserData"
              table-layout="auto"
            >
            </t-table>
          </div>
        </div>
      </div>
      <h1 class="tit">近30天内风险事件</h1>
      <div class="info-block">
        <div class="info-item">
          <h1 class="label-wt-130">跌倒：</h1>
          <div class="con">
            <span class="bt-small">{{ reviewInfo.tumble }}</span>
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">走失：</h1>
          <div class="con">
            <span class="bt-small">{{ reviewInfo.beLost }}</span>
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">噎食：</h1>
          <div class="con">
            <span class="bt-small">{{ reviewInfo.hiccought }}</span>
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">自杀：</h1>
          <div class="con">
            <span class="bt-small">{{ reviewInfo.suicide }}</span>
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">昏迷：</h1>
          <div class="con">
            <span class="bt-small">{{ reviewInfo.conk }}</span>
          </div>
        </div>
      </div>
      <h1 class="tit">身体健康情况</h1>
      <div class="info-block">
        <div class="info-item">
          <h1 class="label-wt-130">伤口情况：</h1>
          <div class="con">
            <span
              v-for="(item, index) in reviewInfo.woundArr"
              :key="index"
              class="bt-small"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">特殊医疗照护情况：</h1>
          <div class="con">
            <span
              v-for="(item, index) in reviewInfo.lookAfterArr"
              :key="index"
              class="bt-small"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">自理能力：</h1>
          <div class="con">
            <span class="bt-small">{{ reviewInfo.selfAbility }}</span>
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">痴呆前兆：</h1>
          <div class="con">
            <span
              v-for="(item, index) in reviewInfo.sdementiaArr"
              :key="index"
              class="bt-small"
              >{{ item }}</span
            >
          </div>
        </div>
        <div v-if="reviewInfo.fitnessOther" class="info-item">
          <h1 class="label-wt-130">其他：</h1>
          <div class="con">
            <span>{{ reviewInfo.fitnessOther }}</span>
          </div>
        </div>
      </div>
      <h1 class="tit">近期体检报告</h1>
      <div class="info-block">
        <div class="info-item">
          <h1 class="label-wt-130">体检报告：</h1>
          <div class="con">
            <span
              >{{ checkInfo.name }}的体检报告.pdf
              <i class="font-bt"
                ><a class="" :href="reviewInfo.reportUrl" target="black"
                  >查看</a
                ></i
              >
              <!-- <i
                class="font-bt"
                @click="handleDown(reviewInfo.reportUrl, '体检报告文件')"
                >下载</i
              > -->
            </span>
          </div>
        </div>
      </div>
    </t-card>
    <!-- end -->
    <t-card v-if="active >= 2" title="能力状况" class="baseInfoBox">
      <h1 class="tit">能力评估结果</h1>
      <div class="info-block">
        <div class="info-item">
          <h1 class="label-wt-130">各指标分数（分）：</h1>
          <div class="con">
            <span>自理能力得分：{{ reviewInfo2.selfScore }}</span
            ><span>精神状态得分：{{ reviewInfo2.spiritScore }}</span
            ><span
              >感知觉与社会参与得分：{{ reviewInfo2.participationScore }}</span
            >
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">评估总分（分）：</h1>
          <div class="con">
            <span>{{ reviewInfo2.assessmentTotal }}</span>
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">能力初步等级：</h1>
          <div class="con">
            <span>{{ reviewInfo2.grade }}</span>
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">能力等级变更依据：</h1>
          <div class="con">
            <span
              v-for="(item, index) in reviewInfo2.alteration"
              :key="index"
              class="bt-small"
              >{{ item }}</span
            >
          </div>
        </div>
        <div v-if="reviewInfo2.other" class="info-item">
          <h1 class="label-wt-130"></h1>
          <div class="con">
            <span class="bt-small">其他</span>{{ reviewInfo2.other }}
          </div>
        </div>
        <div class="info-item">
          <h1 class="label-wt-130">能力最终等级：</h1>
          <div class="con">
            <span class="bt-small">{{ reviewInfo2.lastGrade }}</span>
          </div>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { download } from '@/utils/index'
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
    }
  ]
})
const checkInfo = ref<Object | any>({}) // 用户信息
const reviewInfo = ref<Object | any>({}) // 健康状况
const reviewInfo1 = ref<Object | any>({}) // 能力评估
const reviewInfo2 = ref<Object | any>({}) // 评估报告
onMounted(() => {
  const data = props.baseData
  console.log(data.retreat)
  if (data.retreat.otherApplyInfo !== undefined) {
    checkInfo.value = data.retreat.otherApplyInfo
  }
  if (data.retreat.reviewInfo !== undefined) {
    reviewInfo.value = data.retreat.reviewInfo
    reviewInfo.value.familyUserData =
      reviewInfo.value.familyUserData.length > 0 &&
      reviewInfo.value.familyUserData[0].name === ''
        ? []
        : reviewInfo.value.familyUserData
  }
  if (data.retreat.reviewInfo1 !== undefined) {
    reviewInfo1.value = data.retreat.reviewInfo1
  }
  if (data.retreat.reviewInfo2 !== undefined) {
    reviewInfo2.value = data.retreat.reviewInfo2
  }
})
const form = ref() // 表单
// TODO 暂时保留
// const downType = ref('application/pdf')
// // 合同下载文件
// const handleDown = (url, name) => {
//   download(url, downType.value, name)
// }
// 向父组件暴露数据与方法
defineExpose({
  form
})
</script>
