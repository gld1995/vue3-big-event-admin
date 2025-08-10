<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'

const { user } = useUserStore()

// 表单数据
const formData = reactive({ ...user })

// 表单校验规则
const formRules = reactive({
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入有效的邮箱地址',
      trigger: ['blur', 'change']
    }
  ]
})

// 表单引用
const formRef = ref(null)

// 提交处理
const handleSubmit = () => {
  if (!formRef.value) return

  formRef.value.validate(async (valid) => {
    if (valid) {
      // 这里处理提交逻辑
      await userUpdateInfoService(formData)

      console.log('表单数据:', formData)
      ElMessage.success('修改提交成功！')
      // 实际开发中这里可以添加API请求
    } else {
      ElMessage.warning('请检查表单输入')
      return false
    }
  })
}
</script>
<template>
  <page-container title="基本资料">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="80px"
      label-position="left"
      style="max-width: 500px"
    >
      <!-- 登录名称 (禁用) -->
      <el-form-item label="登录名称" prop="userName">
        <el-input v-model="formData.username" disabled />
      </el-form-item>

      <!-- 用户昵称 (带校验) -->
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="请输入2-10位昵称" />
      </el-form-item>

      <!-- 用户邮箱 (带校验) -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入有效邮箱" />
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
<style scoped lang="scss"></style>
