<!-- 权限管理 - 用户管理 -->
<template>
  <div class="userAdmin min-h bg-wt fx br-2">
    <!-- 左半部分树 -->
    <div class="left"> 
      <Tree :treeData="treeData" @getTreeData="getTableData" />
    </div>
    <!-- end -->
    <!-- 右半部分列表 -->
    <div class="right">
      <div>
        <div class="baseList">
          <!-- 搜索表单 -->
          <searchFormBox
            :pagination="pagination"
            @handleSearch="handleSearch"
            @handleReset="handleReset"
          ></searchFormBox>
          <!-- end -->
          <!-- 表格 -->
          <tableList
            :list-data="userData"
            :pagination="pagination"
            @handleSetupContract="handleSetupContract"
            @handleBulid="handleBulid"
            @handleClickDelete="handleClickDelete"
            @handleClickDisable="handleClickDisable"
            @handleRestPassword="handleRestPassword"
            @getTreeData="getTreeData"
            @get-current="getCurrent"
          ></tableList>
          <!-- end -->
          <!-- 新增，编辑弹窗 -->
          <dialog-form
            ref="dialog"
            :visible="visible"
            :title="title"
            :data="DialogFormdata"
            :form-data="formData"
            :dialogData="dialogData"
            @handleClose="handleClose"
            @addUserDeta="addUserDeta"
          />
          <!-- end -->
          <!-- 删除弹层 -->
          <Delete
            :visible="dialogDeleteVisible"
            :delete-text="deleteText"
            @handle-delete="handleDelete"
            @handle-close="handleClose"
          ></Delete>
          <!-- end -->
          <!-- 禁用启用弹层 -->
          <Disable
            :visible="dialogDisableVisible"
            :dataState="currrentData.dataState"
            :confirmText="confirmText"
            @handle-click="handleDisable"
            @handle-close="handleClose"
          ></Disable>
          <!-- end -->
          <!-- end -->
          <!-- 重置密码成功弹层 -->
          <ResetPassword
            :visible="dialogResetPasswordVisible"
            @handle-close="handleClose"
          ></ResetPassword>
        </div>
      </div>
    </div>
    <!-- end -->
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import {
  getUserList,
  getDeptTree,
  addUser,
  editUser,
  delUser,
  restPassword
} from '@/api/permission'
import Tree from './components/Tree.vue' // 左侧树
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import Delete from '@/components/OperateDialog/index.vue' // 删除弹层
import Disable from '@/components/OperateDialog/disable.vue' // 禁用启用弹窗
import ResetPassword from '@/components/OperateDialog/ResetPassword.vue' // 禁用启用弹窗
import tableList from './components/TableList.vue' // 表格
import searchFormBox from './components/SearchForm.vue' // 搜索框表单
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()
const visible = ref(false) // 新增，编辑弹窗
const dataLoading = ref(false)
const DialogFormdata = ref({}) as any // 弹窗表单内容
const title = ref('新建') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogDisableVisible = ref(false) // 控制禁用/启用弹层显示隐藏
const dialogResetPasswordVisible = ref(false) // 控制重置密码成功弹窗
const deleteText = ref('用户') // 删除的内容
const currrentData = ref({} as any)
const dialogData = ref([] as any) // 传给新增编辑弹窗的部门数据
const dialog = ref(null)
const confirmText = ref('确定启用')
// 获取树列表数据
const treeData = ref()
// 分页
type paginationTp = {
  pageNum: number
  total: number
  pageSize: number
  startTime?: string
  endTime?: string[] | string
}
let pagination: paginationTp = reactive({
  pageNum: 1,
  total: 0,
  pageSize: 10 // 默认当前页
})

// 生命周期
onMounted(() => {
  setTimeout(() => {
    getTreeData() // 获取树列表数据
  }, 100)
})
const handleRestPassword = (val) => {
  restPassword(val)
    .then(() => {
      dialogResetPasswordVisible.value = true
    })
    .catch((err) => {
      MessagePlugin.error(err.msg || '重置失败')
    })
  //
}
const userData = ref()
const deptId = ref()
// 获取用户列表数据
const getTableData = async (val?: Array<string>) => {
  // console.log('getTableData')
  dataLoading.value = true
  if (val && val.length > 0) {
    deptId.value = val[0]
    DialogFormdata.value = {
      mobile: '',
      realName: '',
      deptNo: deptId,
      postNo: '',
      email: '',
      sex: '',
      dataState: '',
      roleVoIds: [] // 角色
    }
  }
  const params = { deptNo: deptId.value, ...pagination }
  getUserList(params)
    .then((res) => {
      dataLoading.value = false
      if (res.code === 200) {
        const { data } = res
        dataLoading.value = false
        userData.value = data.records ?? []
        pagination.total = Number(data.total)
      } else {
        dataLoading.value = false
      }
    })
    .catch((err) => {
      console.log(err, 'err')
    })
}

// 获取部门树列表数据
const getTreeData = async () => {
  dataLoading.value = true
  const res = await getDeptTree()
  // console.log(res, 'res')
  if (res && res.code === 200) {
    treeData.value = treeProps(res.data.items)
    dialogData.value = res.data.items
    deptId.value = (res.data.items[0] as any).id
    getTableData()
  }
}

// 数据处理
const treeProps = (value) => {
  let data = []
  data = value
    ? value.map((el) => ({
        value: el.id,
        label: el.label,
        children: treeProps(el.children)
      }))
    : []
  return data
}

// 添加，编辑用户
const addUserDeta = async (params?: any, flag?: Boolean) => {
  const userActionFn = title.value === '新增用户' ? addUser : editUser
  await userActionFn(params).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success(`${title.value}成功！`)
      handleClose()
      dialog.value.onClickCloseBtn()
      if (flag) getTableData()
    }
    console.log(res, '1111111')
  })
}
// 点击禁用/启用
const handleClickDisable = (row) => {
  currrentData.value = row
  confirmText.value = row.dataState === '0' ? '确认禁用' : '确认启用'
  dialogDisableVisible.value = true
}
// 确认禁用/启用
const handleDisable = () => {
  dialogDisableVisible.value = false
  disableDeptData()
}
// 禁用/启用部门
const disableDeptData = async () => {
  editUser({
    ...currrentData.value,
    dataState: currrentData.value.dataState === '0' ? '1' : '0'
  })
    .then((res) => {
      console.log(res, 'err')
      if (res.code === 200) {
        MessagePlugin.success(
          `${currrentData.value.dataState === '0' ? '禁用' : '启用'}成功`
        )
        if (
          userStore.userInfo.id === currrentData.value.id &&
          currrentData.value.dataState === '0'
        ) {
          router.push({
            path: '/login',
            query: {
              redirect: encodeURIComponent(router.currentRoute.value.fullPath)
            }
          })
        }
        getTableData()
      }
    })
    .catch((err) => {
      console.log(err, 'err')
      MessagePlugin.error(err.msg || `请求出错了！ 操作失败`)
    })
}
const formData = ref({ ...pagination }) // 表单内容
// 搜索功能
const handleSearch = (val) => {
  pagination = { ...pagination, ...val }
  pagination.pageNum = 1
  // pagination.startTime = pagination.endTime[0]
  // pagination.endTime = pagination.endTime[1]
  // 根据搜索框的内容进行搜索
  getTableData()
}
// 重置，清空搜索框
const handleReset = () => {
  // 清空搜索框的全部内容并且重新获取数据
  pagination.pageNum = 1
  pagination.pageSize = 10
  getTableData()
  // 重新渲染table
}

// 点击新建
const handleBulid = () => {
  // 将弹窗的标题改为新建
  title.value = '新增用户'
  // 显示新建弹窗
  visible.value = true
}
// 点击编辑
const handleSetupContract = (val) => {
  // console.log(val, '编辑用户')
  DialogFormdata.value = JSON.parse(JSON.stringify(val))
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '编辑用户'
}

// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
  dialogDisableVisible.value = false
  dialogResetPasswordVisible.value = false
  dialog.value.onClickCloseBtn()
}

// 点击删除
const delUserId = ref()
const handleClickDelete = (row: { id: number; dataState: String }) => {
  if (row.dataState === '0') {
    MessagePlugin.error('启用状态下不可删除')
  } else {
    delUserId.value = row.id
    dialogDeleteVisible.value = true
  }
}

// 确认删除
const handleDelete = () => {
  dialogDeleteVisible.value = false
  // MessagePlugin.success('删除成功')
  delUserHandle()
}

// 删除用户
const delUserHandle = async () => {
  await delUser(delUserId.value).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('用户删除成功！')
      getTableData()
    }
  })
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.pageNum = val.current
  pagination.pageSize = val.pageSize
  getTableData()
}
</script>

<style lang="less" scoped>
.userAdmin {
  .left {
    width: 223px;
    background: #ffffff;
    padding: var(--space-main);
    border-right: 1px solid var(--color-border);
  }
  .right {
    width: 100%;
    background: #ffffff;
  }
}
</style>
