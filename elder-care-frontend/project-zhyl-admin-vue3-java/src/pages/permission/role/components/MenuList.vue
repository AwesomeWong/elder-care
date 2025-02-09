<!-- 基础表格组件 -->
<template>
  <div class="menuCont">
    <div
      v-for="item in data.filter(
        (n) => n.resourceType === 'm' || n.resourceType === 'c'
      )"
      :key="item.resourceNo"
      class="menuContContent"
    >
      <t-checkbox-group
        v-model="checkList"
        @change="(val) => activeHandle(val, [item.resourceNo])"
      >
        <div class="treeRow fx">
          <div class="icon" @click="openAllOption(item)">
            <t-icon
              name="chevron-right-circle"
              :class="{ open: defaultOpenKey.includes(item.resourceNo) }"
            />
          </div>
          <div
            class="fx-1"
            :class="{ pt: item.children.length > 0 }"
            @click="openAllOption(item)"
          >
            <div>{{ item.resourceName }}</div>
            <div
              v-show="defaultOpenKey.includes(item.resourceNo)"
              class="cont"
              :class="item.children.length > 3 ? 'active' : ''"
            >
              <!-- {{ getCheckList(item) }} -->
              <t-checkbox-group
                :value="checkList"
                @change="
                  (val) =>
                    activeHandle(
                      val,
                      item.children
                        .filter((n) => n.resourceType === 'r')
                        .map((item) => item.resourceNo)
                    )
                "
              >
                <!-- <t-checkbox
                  v-if="item.children.some((n) => n.resourceType === 'r')"
                  key="all"
                  :check-all="true"
                  label="全选"
                  :disabled="!pageType"
                /> -->
                <t-checkbox
                  v-for="it in item.children.filter(
                    (n) => n.resourceType === 'r'
                  )"
                  :key="it.resourceNo"
                  :value="it.resourceNo"
                  :disabled="!pageType"
                  >{{ it.resourceName }}</t-checkbox
                >
                <span
                  v-if="item.children.every((n) => n.resourceType !== 'r')"
                  class="noBut"
                >
                  暂无按钮！
                </span>
              </t-checkbox-group>
            </div>
          </div>
          <div>
            <t-checkbox
              :disabled="!pageType"
              :value="String(item.resourceNo)"
            ></t-checkbox>
          </div>
        </div>
      </t-checkbox-group>
      <div
        v-show="defaultMenuOpenKey.includes(item.resourceNo)"
        class="childCont"
      >
        <MenuList
          :isChildren="true"
          :type="type"
          :data="item.children"
          :defaultData="defaultData"
          @changeHandle="menuChangeHandle"
        ></MenuList>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array<any>,
    default: () => {
      return []
    }
  },
  isChildren: {
    type: Boolean,
    default: false
  },
  type: {
    type: String
  },
  defaultData: {
    type: Array<any>,
    default: () => {
      return []
    }
  }
})
watch(
  () => props.defaultData,
  (val) => {
    checkList.value = val || []
    // console.log(val, 'defaultData变化了么')
  },
  { deep: true }
)
watch(
  () => props.data,
  (val) => {
    console.log(val, 'data')
  },
  { deep: true }
)
watch(
  () => props.type,
  (val) => {
    pageType.value = val
  }
)
const pageType = ref('')
const defaultOpenKey = ref([]) // 默认展开选项
// 所有展开
const openAllOption = (row) => {
  defaultOpenKey.value = defaultOpenKey.value.includes(row.resourceNo)
    ? []
    : [row.resourceNo]
  if (row.children.length > 0) {
    defaultMenuOpenKey.value = defaultMenuOpenKey.value.includes(row.resourceNo)
      ? []
      : [row.resourceNo]
  }
}
const defaultMenuOpenKey = ref([]) // 默认展开菜单选项
const btnCheckList = ref([])
const emit = defineEmits(['changeHandle'])
const checkList = ref([]) as any

const activeHandle = (val, All) => {
  let noSelectList = []
  noSelectList = All.filter(
    (item) => val.findIndex((item1) => item1 === item) === -1
  )
  btnCheckList.value = All.filter((item) => noSelectList.includes(item))
  emit('changeHandle', val, noSelectList)
}

// 保存子集提上来的数据 - 并上传给父级
const menuChangeHandle = (val, noSelectList) => {
  emit('changeHandle', val, noSelectList)
}
</script>

<style lang="less" scoped>
.menuCont {
  .treeRow {
    line-height: 50px;
    border-bottom: solid 1px var(--color-border);
    .icon {
      width: 30px;
      font-size: 16px;
      color: var(--color-bk4);
      transform: rotate(0deg);
      cursor: pointer;
    }
    .arrow {
      width: 20px;
      height: 20px;
      position: relative;
      top: 5px;
    }
    .open {
      transform: rotate(90deg);
    }
    .noBut {
      color: var(--color-bk3);
    }
  }
  .childCont {
    margin-left: 20px;
  }
  :deep(.t-checkbox-group) {
    flex-direction: column;
    width: 100%;
  }
  :deep(.cont .t-checkbox-group) {
    flex-direction: row;
    width: 100%;
    // border-bottom: ;
  }
  .cont.active {
    padding-bottom: 20px;
  }
}
</style>
