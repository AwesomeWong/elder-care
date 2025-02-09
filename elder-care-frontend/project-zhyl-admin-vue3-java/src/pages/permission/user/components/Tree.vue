<!-- 树状列表 -->
<template>
  <div class="tdesign-tree-base">
    <t-input v-model="filterText" @change="onInput">
      <template #prefixIcon>
        <t-icon name="search" />
      </template>
    </t-input>
  </div>
  <t-tree
    v-model="TreeValue"
    v-model:actived="actived"
    v-model:expanded="expanded"
    :data="treeData"
    activable
    hover
    transition
    line
    :filter="handleFilterByText"
    @active="onActive"
  >
    <!-- 展开图标 -->
    <template #icon="{ node }">
      <!-- <t-icon v-if="node.getChildren() && !node.expanded" name="caret-right" /> -->
      <img
        v-if="node.getLevel() == 0 && node.getChildren() && !node.expanded"
        src="@/assets/test-img/jia.png"
        alt=""
        class="jia"
      />
      <img
        v-if="node.getLevel() == 0 && node.getChildren() && node.expanded"
        src="@/assets/test-img/jian.png"
        alt=""
        class="jia"
      />
      <img
        v-if="node.getLevel() == 1 && node.getChildren() && node.expanded"
        src="@/assets/test-img/jian2.png"
        alt=""
        class="jia"
      />
      <img
        v-if="node.getLevel() == 1 && node.getChildren() && !node.expanded"
        src="@/assets/test-img/jia2.png"
        alt=""
        class="jia"
      />
      <img
        v-if="node.getLevel() == 2 && node.getChildren() && node.expanded"
        src="@/assets/test-img/jian2.png"
        alt=""
        class="jia2"
      />
      <img
        v-if="node.getLevel() == 2 && node.getChildren() && !node.expanded"
        src="@/assets/test-img/jia2.png"
        alt=""
        class="jia2"
      />
      <img
        v-if="node.getLevel() == 3 && node.getChildren() && node.expanded"
        src="@/assets/test-img/jian2.png"
        alt=""
        class="jia2"
      />
      <img
        v-if="node.getLevel() == 3 && node.getChildren() && !node.expanded"
        src="@/assets/test-img/jia2.png"
        alt=""
        class="jia2"
      />
    </template>
    <!-- end -->
    <!-- 标题 -->
    <template #label="{ node }">
      <span v-if="node.getLevel() == 0" class="title1">{{
        node.data.label
      }}</span>
      <span v-if="node.getLevel() == 1" class="title2">{{
        node.data.label
      }}</span>
      <span v-if="node.getLevel() == 2" class="title3">{{
        node.data.label
      }}</span>
      <span v-if="node.getLevel() == 3" class="title3">{{
        node.data.label
      }}</span>
      <span
        v-if="
          node.getLevel() !== 1 &&
          node.getLevel() !== 0 &&
          node.getLevel() !== 2 &&
          node.getLevel() !== 3
        "
        class="title4 title3"
        >{{ node.data.label }}</span
      >
    </template>

    <template #empty>
      <div class="noDatas">
        <no-data v-if="handleFilterByText" />
      </div>
    </template>
  </t-tree>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import noData from '@/components/noData/index.vue'

const props = defineProps({
  treeData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
// onMounted(()=>{

// })
watch(
  () => props.treeData,
  (newValue: any) => {
    // actived.value = [
    //   newValue.length &&
    //     newValue[0].children.length &&
    //     newValue[0].children[0].value
    // ]
    emit('getTreeData', actived.value)
    // console.log(newValue, 'newValue')
  }
)
// 筛选数据
const filterText = ref('')
const handleFilterByText = ref(null) // 过滤数据
// 触发父组件方法
const emit = defineEmits(['getTreeData'])
// 当前选中得值
const TreeValue = ref([])
const actived = ref(['100001000000000']) // 默认选中的值
// 默认展开的节点
const expanded = ref(['100001000000000'])
const onActive = (val, node) => {
  emit('getTreeData', val)
}
// 输入框的值改变时触发
const onInput = () => {
  handleFilterByText.value = (node) =>
    node.data.label.indexOf(filterText.value) >= 0
}
</script>

<style lang="less" scoped>
:deep(.t-input__wrap) {
  width: 174px;
}
:deep(.t-input__inner) {
  width: 125px !important;
}
.jia {
  width: 14px;
  height: 14px;
}
.jia2 {
  width: 12px;
  height: 12px;
  margin-left: 1.2px;
}
.title1 {
  font-size: 14px;
  line-height: 14px;
  color: var(--color-bk2);
}
.title2 {
  font-size: 14px;
  line-height: 14px;
  color: var(--color-bk3);
}
.title3 {
  font-size: 12px;
  line-height: 12px;
  color: var(--color-bk3);
}
// 搜索icon图表
:deep(.t-input .t-input__prefix > .t-icon) {
  color: var(--color-bk4);
  font-size: 18.5px;
}
// 连接线
:deep(.t-tree__line::before) {
  // border-color: var(--color-bk4);
  // border-bottom: none;
  width: 8px !important;
}
:deep(.t-tree__item) {
  height: 24px;
  margin-top: 10px;
}
:deep(.t-tree__line) {
  bottom: 10px;
  left: calc(var(--td-comp-margin-xxl) * var(--level) - 17.5px);
  height: calc(100% + 10px);
}
.title4 {
  position: relative;
  right: 23.5px;
}
.noDatas {
  .noData {
    :deep(img) {
      width: 104px;
      height: 95px;
      margin-top: 50px;
      margin-bottom: 14px;
    }
  }
}
</style>
