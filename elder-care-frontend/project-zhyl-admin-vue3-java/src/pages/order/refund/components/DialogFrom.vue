<!-- 查看退款记录弹窗 -->
<template>
  <div class="dialog-form refundDialog">
    <t-dialog
      v-model:visible="formVisible"
      header="查看退款记录"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <template #body>
        <t-card title="">
          <div class="info-block">
            <div class="info-item">
              <h1>退款编号：</h1>
              <span>{{ data.refundNo }}</span>
            </div>
            <div class="info-item">
              <h1>订单编号：</h1>
              <span>{{ data.orderNo }}</span>
            </div>
            <div class="info-item">
              <h1>订单状态：</h1>
              <span
                v-if="data.orderStatus === 0"
                class="status-dot status-dot-5"
                >待支付</span
              >
              <span
                v-if="data.orderStatus === 1"
                class="status-dot status-dot-5"
                >待执行</span
              >
              <span
                v-if="data.orderStatus === 2"
                class="status-dot status-dot-5"
                >已执行</span
              >
              <span
                v-if="data.orderStatus === 3"
                class="status-dot status-dot-5"
                >已完成</span
              >
              <span
                v-if="data.orderStatus === 4"
                class="status-dot status-dot-5"
                >已关闭</span
              >
              <span
                v-if="data.orderStatus === 5"
                class="status-dot status-dot-1"
                >已退款</span
              >
            </div>
            <div class="info-item">
              <h1>退款状态：</h1>
              <span v-if="data.refundStatus === 1" class="ft-cl-warn"
                >退款处理中</span
              >
              <span v-if="data.refundStatus === 2" class="font-bt"
                >退款成功</span
              >
              <span v-if="data.refundStatus === 3" class="ft-cl-err"
                >退款失败</span
              >
            </div>
            <div class="info-item">
              <h1>申请人：</h1>
              <span
                >{{ data.creator ? data.creator : data.adminCreator
                }}<span
                  class="bt-small"
                  :class="data.createType === 1 ? 'warBtn' : ''"
                  >{{ data.createType === 1 ? '前台客户' : '后台用户' }}</span
                ></span
              >
            </div>
            <div class="info-item">
              <h1>申请时间：</h1>
              <span>{{ data.createTime }}</span>
            </div>
            <div class="info-item">
              <h1>退款原因：</h1>
              <span>{{ data.memo }}</span>
            </div>
            <div class="info-item">
              <h1>退款渠道：</h1>
              <span>原路退回</span>
            </div>
            <div class="info-item">
              <h1>退款方式：</h1>
              <span>微信</span>
            </div>
            <!-- 退款失败 -->
            <div v-if="data.refundStatus === 3" class="info-item">
              <h1>失败状态码：</h1>
              <span>{{ data.refundCode }}</span>
            </div>
            <div v-if="data.refundStatus === 3" class="info-item">
              <h1>失败原因：</h1>
              <span>{{ data.refundMsg }}</span>
            </div>
            <!-- end -->
            <!-- 退款成功 -->
            <div v-if="data.refundStatus === 2" class="info-item">
              <h1>退款时间：</h1>
              <span>{{ data.updateTime }}</span>
            </div>
            <div v-if="data.refundStatus === 2" class="info-item">
              <h1>退款金额：</h1>
              <span>{{ decimalsReplenish(data.refundAmount) }}元</span>
            </div>
            <!-- end -->
          </div>
        </t-card>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { decimalsReplenish } from '@/utils/index'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  //   详情数据
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'handleClose',
  'fetchData',
  'handleAdd',
  'handleEditForm'
])
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
  }
)
// -----定义方法------
// 点击取消关闭
const onClickCloseBtn = () => {
  emit('handleClose')
}

defineExpose({})
</script>
<style lang="less" scoped>
.refundDialog {
  :deep(.t-dialog) {
    width: 700px;
    .t-dialog__body {
      padding-top: 24px;
    }
    .t-card__body {
      padding: 0;
    }
  }
  .info-block {
    .info-item {
      & > span {
        display: block;
        width: 190px;
      }
    }
  }
}
</style>
