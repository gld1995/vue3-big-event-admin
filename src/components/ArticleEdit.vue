<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const drawer = ref(false)
// const loading = ref(false)
const formModel = ref({})

const open = (row) => {
  console.log(row)
  drawer.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="drawer" title="添加文章" :before-close="handleClose">
    <el-form :model="formInline">
      <el-form-item label="文章标题">
        <el-input v-model="formModel.title" />
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="formModel.cato" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item label="文章封面">
        <el-upload
          style="
            width: 178px;
            height: 178px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" />
          <el-icon v-else
            ><Plus style="width: 178px; height: 178px; font-size: 48px"
          /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章标题">
        <div>符文布编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
