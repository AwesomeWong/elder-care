<!--穿梭框组件 -->
<template>
  <div class="bg-wt">
    <div class="transferBox">
      <t-transfer
        :data="transferItemData"
        :checked="checked"
        :keys="{
          label: 'name',
          value: 'id'
        }"
        @change="onChange"
        @checked-change="handleCheckedChange"
      >
        <template #title="props">
          <div>{{ props.type === 'target' ? '目标' : '来源' }}</div>
        </template>
        <!-- 标题hover -->
        <!-- transferItem 是自定义渲染节点与提示语相关联，slotProps是需要显示的内容 -->
        <template #transferItem="slotProps">
          <t-tooltip placement="bottom" v-bind="slotProps">
            <template #content>{{ slotProps.data.name }}</template>
            {{ slotProps.data.name }}
          </t-tooltip>
        </template>
        <!-- end -->
      </t-transfer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  // 获取穿梭框数据
  transferItemData: {
    type: Array,
    default: () => []
  }
})
// ------定义变量------
const checked = ref(['2'])
// ------生命周期------
// 选中的数据
const handleCheckedChange = ({ checked: checkedVal }) => {
  checked.value = checkedVal
}
// 目标数据
const onChange = (newTargetValue) => {}
</script>
