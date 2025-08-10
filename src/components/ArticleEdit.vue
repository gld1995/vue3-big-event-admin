<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import {
  artPublishService,
  artGetDetailService,
  artEditService
} from '@/api/article'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request'
import { urlToFile } from '@/utils/urlToFIle'

const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}

const emit = defineEmits('success')
const visibleDrawer = ref(false)
const imageUrl = ref()
const editorRef = ref()
const formModel = ref({ ...defaultForm })

const open = async (row) => {
  visibleDrawer.value = true

  if (row.id) {
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img
    formModel.value.cover_img = await urlToFile(
      imageUrl.value,
      formModel.value.cover_img
    )
  } else {
    formModel.value = { ...defaultForm }
    imageUrl.value = ''
    editorRef.value.setHTML('')
  }
}

const onPublish = async (state) => {
  formModel.value.state = state
  // eslint-disable-next-line no-undef
  const formData = new FormData()
  for (const key in formModel.value) {
    formData.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    await artEditService(formData)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await artPublishService(formData)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

const onImageChange = (uploadFile) => {
  console.log(uploadFile, uploadFile.raw)

  // eslint-disable-next-line no-undef
  imageUrl.value = window.URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visibleDrawer" title="添加文章" size="50%">
    <el-form :model="formModel">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" />
      </el-form-item>
      <el-form-item label="文章分类">
        <channel-select v-model="formModel.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onImageChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
