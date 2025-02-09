<!-- 个人中心 -->
<template>
  <div class="bg-wt contentBox">
    <div class="headbox">个人中心</div>
    <div class="bodybox">
      <t-form ref="form" :rules="rules" :data="formData" :label-width="88">
        <div class="leftBox">
          <t-form-item label="姓名：" name="realName">
            <t-input
              v-model="formData.realName"
              placeholder="请输入"
              class="wt-300"
              clearable
              show-limit-number
              :maxlength="10"
            />
          </t-form-item>
          <t-form-item label="邮箱：" name="nickname">
            {{ formData.email }}
          </t-form-item>
          <t-form-item label="所属部门：" name="description">
            {{ formData.dept }}
          </t-form-item>
          <t-form-item label="所属职位：" name="region">{{
            formData.post
          }}</t-form-item>
          <t-form-item label="角色：" name="address">
            <span
              v-for="(item, index) in formData.roleList"
              :key="index"
              class="role"
              >{{ item.roleName }}<span>,</span></span
            >
          </t-form-item>
          <t-form-item label="手机号：" name="mobile">
            <t-input
              v-model="formData.mobile"
              placeholder="请输入"
              class="wt-300"
              clearable
              show-limit-number
              :maxlength="11"
              @change="handlePhone"
            >
            </t-input>
          </t-form-item>
          <t-form-item label="性别：" name="sex">
            <t-radio-group v-model="formData.sex">
              <t-radio
                v-for="(item, index) in sexData"
                :key="index"
                :value="item.id"
                >{{ item.value }}</t-radio
              >
            </t-radio-group>
          </t-form-item>
        </div>
        <div class="rightBox">
          <t-form-item name="avatar">
            <div class="t-form__label file">头像</div>
            <t-upload
              ref="uploadRef1"
              v-model="file"
              action="api/common/upload"
              :is-batch-upload="true"
              :autoUpload="autoUpload"
              :size-limit="sizeLimit"
              tips="图片大小不超过2M,仅支持上传PNG JPG JPEG类型图片"
              theme="image"
              accept=".jpg,.jpeg,.png"
              :before-upload="beforeUpload"
              @remove="remove"
              @success="handleSuccess"
            >
            </t-upload>
            <!-- 外部也可点击触发上传功能 -->
            <button class="upbtn" @click="uploadImg">
              <!-- 使用svg图 -->
              <span>
                <svg
                  t="1674963121719"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2386"
                  width="128"
                  height="128"
                >
                  <path
                    d="M544 736a32 32 0 0 1-64 0V288a32 32 0 0 1 64 0z"
                    p-id="2387"
                  ></path>
                  <path
                    d="M800 832V672a32 32 0 0 1 64 0v192a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V672a32 32 0 0 1 64 0v160zM496 271.36l-152.32 166.4a32 32 0 1 1-47.36-43.52l176-192a32 32 0 0 1 47.36 0l176 192a32 32 0 0 1-47.36 43.52z"
                    p-id="2388"
                  ></path>
                </svg>
              </span>
              <!-- 判断头像框内是否有内容，有内容显示重新上传，没有内容显示上传文件 -->
              {{ file[0].url !== files[0].url ? '重新上传' : '上传文件' }}
            </button>
          </t-form-item>
        </div>
      </t-form>
      <div class="boxBottom fx fx-ct bg-wt">
        <button class="bt wt-60" theme="primary" @click="updatepersonalData">
          保存
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'UserIndex'
}
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import { sexData } from '@/utils/commonData'
import { useUserStore } from '@/store'
// 引入接口
import { getpersonal, updatepersonal } from '@/api/user'
// 引用正则
import { validatePhone, validateIdentityNum } from '@/utils/validate'

const userStore = useUserStore()
const formData = ref({})
const form = ref(null) // 表单
const autoUpload = ref(true) // 是否在选择文件后自动发起请求上传文件
const sizeLimit = ref({
  size: 60,
  unit: 'MB',
  message: '图片大小超过60m，请重新上传'
}) // 图片的大小限制
const isChick = ref(false) // 是否触发了保存按钮
const router = useRouter() // 获取全局
// 显示的图片
const file = ref([
  {
    url: ''
  }
])
// 默认图片
const files = ref([
  {
    url: 'https://yjy-oss-videos.oss-accelerate.aliyuncs.com/grzxhz.jpg'
  }
])
const uploadRef1 = ref() // 上传图片
// 移除图片时将图片设置为默认图片
const remove = () => {
  file.value = files.value
}
// 获取接口数据
const getpersonalData = async () => {
  const res = await getpersonal()
  formData.value = res.data
  formData.value.sex = Number(formData.value.sex)

  if (formData.value.avatar !== undefined) {
    file.value[0].avatar = formData.value.avatar
    file.value[0].url = formData.value.avatar
  } else {
    file.value[0].url = files.value[0].url
    formData.value.avatar = files.value[0].url
  }
}
// 更新信息
const updatepersonalData = () => {
  if (isChick.value) {
    return true
  }

  form.value.validate().then(async (valid) => {
    if (valid === true) {
      isChick.value = true
      const parent = {
        realName: formData.value.realName,
        mobile: formData.value.mobile,
        avatar: file.value[0].url,
        sex: formData.value.sex,
        id: formData.value.id
      }
      const isPhone = validatePhone(parent.mobile)
      if (!isPhone) {
        MessagePlugin.error('手机号格式错误，请重新输入')
        isChick.value = false
        return false
      }
      const res: any = await updatepersonal(parent)
      if (res.code === 200) {
        MessagePlugin.success('操作成功')
        userStore.setUserAvatar(parent)
        getpersonalData()
        setTimeout(() => {
          isChick.value = false
          clearTimeout()
        }, 3000)
      }
    }
  })
}
// 上传图片按钮
const uploadImg = () => {
  // 执行triggerUpload方法
  uploadRef1.value.triggerUpload()
}
// 限制图片的大小
const beforeUpload = (file) => {
  if (file.size > 2 * 1024 * 1024) {
    MessagePlugin.error('图片大小超过2M，请重新上传')
    return false
  }
  return true
}
// 上传成功后触发。
const handleSuccess = (params, val) => {
  const avatar = params.response.data
  formData.value.avatar = avatar
  file.value[0].response.url = avatar
  file.value[0].url = avatar
}
// 判断是否填写的数字
const handlePhone = (val) => {
  const isNumber = validateIdentityNum(val)
  if (!isNumber) {
    formData.value.mobile = ''
  }
}
// 生命周期
onMounted(() => {
  getpersonalData()
})
// 校验
const rules = ref({
  realName: [
    {
      required: true,
      message: '姓名为空,请输入姓名',
      trigger: 'blur'
    }
  ],
  avatar: [
    {
      required: true,
      message: '头像为空，请上传头像',
      type: 'error',
      trigger: 'change'
    }
  ]
})
</script>
<style lang="less" src="./index.less"></style>
