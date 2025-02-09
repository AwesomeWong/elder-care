<!--卡片列表组合-->
<template>
  <div class="cradList collapseBox">
    <t-collapse expand-mutex :default-value="defaultValue">
      <t-collapse-panel
        v-for="(item, index) in itemData"
        :key="index"
        :value="index"
      >
        <!-- 左侧标题 -->
        <template #header>
          <div class="titText">
            <span v-if="item.sections.length > 0" class="icon"></span>
            <div class="textL padl">
              <span
                ><span v-if="index + 1 > 9">{{ index + 1 }}</span
                ><span v-else>{{ '0' + (index + 1) }}</span></span
              >
              <span v-if="!item.isEdit" @click.stop="handleEdit(item, index)"
                >{{ item.name }}<i class="editIcon"></i
              ></span>
              <t-input
                v-else
                v-model="item.name"
                clearable
                placeholder="请输入"
                @input="handleTextInput(item)"
                @focus="handleFocusInput(item)"
              ></t-input
              ><span
                v-if="item.name === '' && item.isNameEmpty"
                class="ft-cl-err"
                >章名称为空，请输入章名称</span
              ><button
                v-if="item.isEdit"
                class="bt wt-60"
                @click.stop="handleBlur(item, index)"
              >
                确定
              </button>
            </div>
          </div>
        </template>
        <!-- end -->
        <!-- 右侧标题 -->
        <template #headerRightContent>
          <t-space size="small">
            <span
              class="font-bt"
              :class="!item.canUpdate ? 'text-forbidden' : ''"
              @click.stop="handleSortOpen(item)"
              >排序</span
            ><span class="font-bt" @click.stop="handleAddMinutia(item)"
              >添加</span
            ><span
              class="btn-dl"
              :class="!item.canUpdate ? 'text-forbidden' : ''"
              @click.stop="handleDeleteOpen(item)"
              >删除</span
            >
          </t-space>
        </template>
        <!-- end -->
        <!-- 内容 -->
        <div v-if="item.sections.length > 0" class="itemCon">
          <div class="headTitle">
            <span>序号</span>
            <span class="padl">小节名称</span>
            <span>排序</span>
            <span>操作</span>
          </div>
          <div class="item">
            <ul>
              <li v-for="(val, i) in item.sections" :key="i">
                <div class="leftLine"></div>
                <div class="con">
                  <!-- 序号 -->
                  <div>
                    <span v-if="i + 1 > 9">{{ i + 1 }}</span
                    ><span v-else>{{ '0' + (i + 1) }}</span>
                  </div>
                  <!-- 触发名字编辑 -->

                  <div class="padl">
                    <span v-if="!val.isEdit" @click="handleEdit(val, i)"
                      >{{ val.name }}<i class="editIcon"></i
                    ></span>

                    <t-input
                      v-else
                      v-model="val.name"
                      :autofocus="i === editActive"
                      placeholder="请输入"
                      clearable
                      width="350"
                      @input="handleTextInput(val)"
                      @focus="handleFocusInput(val)"
                    ></t-input
                    ><button
                      v-if="val.isEdit"
                      class="bt wt-60"
                      @click="handleBlur(val, i)"
                    >
                      确定</button
                    ><span
                      v-if="val.name === '' && val.isNameEmpty"
                      class="ft-cl-err"
                      >小节名称不能为空</span
                    >
                  </div>
                  <div class="sortIcon">
                    <span
                      :class="
                        i === 0 || i <= item.maxSectionIndexOnShelf
                          ? 'upforbid'
                          : 'up'
                      "
                      @click="handleUp(val, i, item)"
                    ></span>
                    <span
                      :class="
                        i === item.sections.length - 1 ||
                        i < item.maxSectionIndexOnShelf
                          ? 'downforbid'
                          : 'down'
                      "
                      @click="handleDown(item.sections.length, i, item, val)"
                    ></span>
                  </div>
                  <div
                    :class="
                      !item.canUpdate && !val.canUpdate
                        ? 'text-forbidden'
                        : 'btn-dl'
                    "
                    @click="handleDeleteMinutiaOpen(val)"
                  >
                    删除
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="cover"></div>
        </div>
        <!-- end -->
      </t-collapse-panel>
    </t-collapse>
    <!-- 删除弹层 -->
    <Delete
      :dialog-delete-visible="dialogDeleteVisible"
      :delete-text="deleteText"
      @handleDelete="handleDelete"
      @handleClose="handleClose"
    ></Delete>
    <!-- end -->
    <!-- 章排序弹层 -->
    <sort
      :dialog-sort-visible="dialogSortVisible"
      :sort-value="sortValue"
      :min-num="minNum"
      :item-data="itemData"
      @handleClose="handleSortClose"
      @getSortValue="getSortValue"
    ></sort>
    <!-- end -->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 接口
// import { getCollapseList } from '@/api/list'
// 控制字节数
import { validateTextLength } from '@/utils/validate'
import type { PurchaseListResult } from './index'
// 导入组件
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// 章排序
import Sort from './components/sort.vue'
// ------定义变量------
const text = ref('新增章')
const deleteText = ref('') // 删除提示
const editActive = ref(0) // 当前小节的下标值
const isEdit = ref(false) // 是否编辑当前章节的小节
const dialogDeleteVisible = ref(false) // 控制删除弹层
const dialogSortVisible = ref(false) // 章排序弹层
const chapterItem = reactive<Object | any>({}) // 章内容
const knobData = reactive<Object | any>({}) // 节内容
const sortValue = ref(null) // 当前的排序值
const chapterId = ref(null) // 章节id
const minNum = ref(null)
const itemData: PurchaseListResult[] = reactive([]) // 目录数据
const defaultValue = ref([0])
const isShowName = ref(false)
// ------生命周期------
onMounted(() => {
  getList()
})
// ------定义方法------
// 获取列表
const getList = async () => {
  // const res: any = await getCollapseList() // 获取列表数据,当前为mock接口，后续会替换为真实接口，并接受真实数据传值
  // itemData = res.data.list
}
// 打开章排序弹层
const handleSortOpen = (item) => {
  if (item.canUpdate) {
    sortValue.value = item.index
    minNum.value = item.maxIndexOnShelf + 1
    if (item.id) {
      chapterId.value = item.id // 后传传的id
    } else {
      chapterId.value = item.subId // 获取章的前端自定义id
    }
    dialogSortVisible.value = true
  }
}
// 关闭章排序弹层
const handleSortClose = () => {
  dialogSortVisible.value = false
}
// 删除章内容
const handleDelete = async () => {
  const knob = knobData.value // 要删除的小节
  // 删除小节逻辑
  if (knob !== undefined && (knob.id || knob.subId)) {
    // 遍历章节
    itemData.map((val, index) => {
      val.sections.map((obj, i) => {
        if (
          (obj.id === knob.id && obj.id && knob.id) ||
          (obj.subId === knob.subId && obj.subId && knob.subId)
        ) {
          val.sections.splice(i, 1)
          MessagePlugin.error({
            content: '删除失败'
          })
        }
      })
    })
  } else {
    // 章删除逻辑
    const chapter = chapterItem.value // 临时要删除的章
    itemData.map((val, index) => {
      // 没有保存数据之前前端需要自定义一个subId，用自定义的id来判断要删除的数据
      // id不能为空的情况下删除章
      if (
        (val.subId === chapter.subId && val.subId && chapter.subId) ||
        (val.id === chapter.id && val.id && chapter.id)
      ) {
        itemData.splice(index, 1)
        MessagePlugin.success({
          content: '删除成功'
        })
      }
    })
  }
  // 关闭弹层
  handleClose()
}
// 删除改章，判断改章节是否有小节，如果有，显示删除弹层，如果没有，直接删除改章
const handleDeleteOpen = (item) => {
  if (item.canUpdate) {
    chapterItem.value = item
    // 遍历章节
    itemData.map((val, index) => {
      // 没有保存数据之前前端需要自定义一个subId
      if (
        val.subId === item.subId ||
        (val.id === item.id && val.id && item.id)
      ) {
        if (item.sections.length > 0) {
          dialogDeleteVisible.value = true
          deleteText.value = `此信息下包含${item.sections.length}内容，是否继续删除？`
        } else {
          itemData.splice(index, 1)
          MessagePlugin.success({
            content: '删除成功'
          })
        }
      }
    })
  }
}
// 打开删除小节弹层
const handleDeleteMinutiaOpen = (item) => {
  if (item.canUpdate) {
    if (item.id || item.subId) {
      knobData.value = item
      dialogDeleteVisible.value = true
      deleteText.value = `若删除该小节，阶段三、四中的小节将一同删除，是否继续删除？`
    }
  }
}
// 添加小节
const handleAddMinutia = (item) => {
  itemData.map((val) => {
    // 此处有两种情况，第一种是从后端获取的数据有id，第二种是没保存数据的时候前端添加数据自定义的subId
    if (
      (val.id && val.id === item.id) ||
      (val.subId && val.subId === item.subId)
    ) {
      let obj = {}
      obj = {
        id: null,
        subId: val.sections.length + 1, // 给小节添加临时id
        index: null,
        name: '小节名称',
        isEdit: false,
        type: 2,
        canUpdate: true,
        isNameEmpty: false
      }
      val.sections.push(obj)
    }
  })
}
// 编辑章、小节
const handleEdit = (item, i) => {
  item.isEdit = true
  editActive.value = i
}
const handleBlur = (item, i) => {
  if (item.name !== '') {
    item.isEdit = false
  } else {
    item.isNameEmpty = true
  }
}
// 关闭删除弹层
const handleClose = () => {
  dialogDeleteVisible.value = false
}
// 获取设置的配许值
const getSortValue = (num) => {
  itemData.forEach((val, index) => {
    if (val.id === chapterId.value || val.subId === chapterId.value) {
      // 此处减1，原因是num是从1开始的，数组索引值是从0开始的
      const obj = val // 先把当前的要排序的对象用变量保存，然后删除当前触发的对象
      itemData.splice(index, 1)
      itemData.splice(num - 1, 0, obj)
    }
  })
}
// 章小节的字数控制
const handleTextInput = (obj) => {
  const value = validateTextLength(obj.name, 30)
  obj.name = value.val
}
// 焦点离开时input章名称或者小节名称清空
const handleFocusInput = (obj) => {
  if (obj.name === '章名称') {
    obj.name = ''
  }
  if (obj.name === '小节名称') {
    obj.name = ''
  }
}
// 排序向上
const handleUp = (val, index, item) => {
  if (index <= item.maxSectionIndexOnShelf) {
    return false
  }
  itemData.forEach((obj) => {
    if (obj.id === item.id) {
      if (index != 0) {
        obj.sections[index] = obj.sections.splice(
          index - 1,
          1,
          obj.sections[index]
        )[0]
      } else {
        obj.sections.push(obj.sections.shift())
      }
    }
  })
}
// 排序向下
const handleDown = (length, index, item, val) => {
  if (index === length - 1 || index < item.maxSectionIndexOnShelf) {
    return false
  }
  itemData.forEach((obj) => {
    if (obj.id === item.id) {
      if (index != obj.sections.length - 1) {
        obj.sections[index] = obj.sections.splice(
          index + 1,
          1,
          obj.sections[index]
        )[0]
      } else {
        obj.sections.unshift(obj.sections.splice(index, 1)[0])
      }
      obj.sections.forEach((val) => {})
    }
  })
}
</script>
<style lang="less" src="./index.less"></style>
