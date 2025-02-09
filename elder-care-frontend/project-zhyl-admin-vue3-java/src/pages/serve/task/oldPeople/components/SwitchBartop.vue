<!-- tab栏切换组件 -->
<template>
  <div class="headBox">
    <div class="sw-box" :class="routeType === 'config' ? 'configTpye' : ''">
      <span
        v-for="(item, index) in data"
        :key="index"
        :class="{ title: true, line: currentId == index }"
        @click.stop="changeId(item.id, index)"
        >{{ item.name
        }}<span v-if="item.value" class="value">{{ item.value }}</span></span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 父组件传值
defineProps({
  data: {
    type: Array<any>,
    default: []
  },
  routeType: {
    type: String,
    default: null
  },
  bedSelectData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// 触发父组件事件
const emit: Function = defineEmits(['changeId', 'handleFloorEdit'])
// 当前选中id
const currentId = ref(0)
const isTabCheck = ref(false)
// 点击切换
const changeId = (id, i) => {
  isTabCheck.value = true
  currentId.value = i
  emit('changeId', id, i, true)
}
// 传给父级
defineExpose({
  currentId
})
</script>
<style lang="less" scoped>
.headBox {
  padding-bottom: 14px;
  border-bottom: 1px solid #e8e8e8;
  line-height: 22px;
  position: relative;
  padding-top: 20px;
  padding-right: 80px;
  .sw-box {
    font-family: PingFangSC-SNaNpxibold;
    font-weight: 400;
    font-size: 16px;
    color: var(--color-black);
    height: 22px;
    // // 超过分辨率宽度给元素添加横向滚动条
    // overflow: hidden;
    // height: 36px;
    // overflow-x: auto;
    // white-space: nowrap;
    // // 滚动条样式
    // &::-webkit-scrollbar {
    //   height: 8px;
    //   background: #fafafa;
    // }

    // &::-webkit-scrollbar-thumb {
    //   border-radius: 4px;
    //   border: 2px solid transparent;
    //   background-clip: content-box;
    //   background-color: var(--color-border);
    // }
    &.configTpye .title {
      &:hover {
        i {
          display: none;
        }
      }
    }
    .title {
      color: var(--color-black);
      font-size: 14px;
      text-align: center;
      display: inline-block;
      min-width: 64px;
      //  文字左右居中
      text-align: center;
      cursor: pointer;
      position: relative;
      padding: 0 18px;
      &:hover {
        color: var(--color-main);
        i {
          position: absolute;
          display: inline-block;
          width: 16px;
          height: 16px;
          top: 2px;
          z-index: 9;
        }
        .delect {
          right: -2px;
        }
        .edit {
          right: -2px;
        }
      }
    }
    .line {
      color: var(--color-main);
      font-weight: 500;
      position: relative;
      cursor: pointer;
      &::before {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        content: '';
        width: 100%;
        height: 2px;
        border-radius: 4px;
        bottom: -15px;
        background: var(--color-main);
      }
    }
  }
  .rText {
    position: absolute;
    right: 0;
    top: 20px;
    color: var(--color-link);
    font-size: 14px;
    cursor: pointer;
  }
}
.value {
  margin-left: 5px;
}
</style>
