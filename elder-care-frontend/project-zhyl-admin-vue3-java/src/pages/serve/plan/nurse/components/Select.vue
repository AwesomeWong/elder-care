<template>
  <div class="selectInput">
    <t-input
      :modelValue="value"
      type="text"
      style="width: 100%"
      placeholder="请选择"
      :class="valueEmpty ? 'errorEmpty' : ''"
      :rules="[{ required: true, message: '请输入' }]"
      @focus="selectFlavor(value)"
      @blur="outSelect"
    >
      <template #suffixIcon
        ><t-icon :name="mak ? 'chevron-up' : 'chevron-down'"></t-icon></template
    ></t-input>
    <div
      v-if="mak && baseData.length"
      class="flavorSelect"
      :class="showPageTip ? 'ptop' : ''"
    >
      <span
        v-for="(it, ind) in baseData"
        :key="ind"
        class="items"
        @click="checkOption(it, ind, $event)"
        >{{ it.label }}</span
      >
      <span v-if="baseData.length === 0" class="none">无数据</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { manifest } from 'tdesign-icons-vue-next'
// 获取父组件值、方法
const props = defineProps({
  // 所有项目
  baseData: {
    type: Array<Object | any>,
    default: () => {
      return []
    }
  },
  value: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
    default: 0
  },
  valueEmpty: {
    type: Boolean,
    default: false
  },
  showPageTip: {
    type: Boolean,
    default: false
  }
})
const mak = ref(false)
// 触发父级事件
const emit = defineEmits(['select', 'getSelectOldData'])
const checkOption = (val: any, ind: any, e) => {
  emit('select', val, props.index, ind)
  mak.value = false
}
const selectFlavor = (st) => {
  emit('getSelectOldData', st)
  mak.value = true
}
const outSelect = (e) => {
  setTimeout(function () {
    mak.value = false
  }, 200)
}
</script>
<style lang="less" scoped>
.selectInput {
  position: relative;
  width: 100px;
  .flavorSelect {
    position: absolute;
    width: 100%;
    border-radius: 6px;
    // border: solid 1px #e4e7ed;
    line-height: 30px;
    text-align: center;
    background: #fff;
    top: 38px;
    z-index: 99;
    padding: 6px;
    height: 150px;
    overflow-y: auto;
    box-shadow: 0 3px 14px 2px rgba(0, 0, 0, 0.05),
      0 8px 10px 1px rgba(0, 0, 0, 6%), 0 5px 5px -3px rgba(0, 0, 0, 10%);
    .items {
      cursor: pointer;
      display: inline-block;
      width: 100%;
      line-height: 28px;
      //   border-bottom: solid 1px #f4f4f4;
      color: #666;
      margin: 0 !important;
      &:hover {
        background: var(--color-tableHeader-bg);
        color: var(--color-main);
      }
      &:active {
        background: var(--color-tableHeader-bg);
        color: var(--color-main);
      }
    }
    .none {
      font-size: 14px;
    }
    &.ptop {
      top: -100px;
      bottom: 0;
    }
  }
}
</style>
