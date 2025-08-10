<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Lock, Key, Refresh } from '@element-plus/icons-vue'
import { userUpdatePassService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 表单数据
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单引用
const formRef = ref(null)
const submitting = ref(false)

// 自定义校验规则：检查原密码和新密码是否相同
const validateDifferentPassword = (rule, value, callback) => {
  if (value === formData.oldPassword) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

// 自定义校验规则：检查两次新密码是否一致
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== formData.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 表单校验规则
const formRules = reactive({
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在6-15位之间', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在6-15位之间', trigger: 'blur' },
    { validator: validateDifferentPassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
})

// 提交处理
const handleSubmit = () => {
  if (!formRef.value) return

  formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      await userUpdatePassService(formData)

      submitting.value = false
      userStore.setToken('')
      userStore.setUser({})
      ElMessage.success('密码修改成功！')
      router.push('/login')
    } else {
      ElMessage.warning('请检查表单输入')
    }
  })
}

// 重置表单
const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields()
    ElMessage.info('表单已重置')
  }
}
</script>

<template>
  <page-container title="修改密码">
    <el-row>
      <el-col :span="12">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              size="large"
              v-model="formData.oldPassword"
              type="password"
              placeholder="请输入原密码"
              show-password
              clearable
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- 新密码 -->
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              size="large"
              v-model="formData.newPassword"
              type="password"
              placeholder="6-15位字母、数字或符号"
              show-password
              clearable
            >
              <template #prefix>
                <el-icon><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input
              size="large"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="请再次输入新密码"
              show-password
              clearable
            >
              <template #prefix>
                <el-icon><Refresh /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- 按钮组 -->
          <el-form-item class="button-group">
            <el-button
              type="primary"
              @click="handleSubmit"
              :loading="submitting"
            >
              修改密码
            </el-button>
            <el-button @click="handleReset" :disabled="submitting">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>

<style scoped></style>
