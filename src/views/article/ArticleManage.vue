<script setup>
import { artGetListService, artDelService } from '@/api/article.ts'
import { Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import ArticleEdit from '@/components/ArticleEdit.vue'
import { formatTime } from '@/utils/format'

const articleList = ref([])
const loading = ref(false)
const drawer = ref()
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const total = ref(0)

const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

// const onAddChannel = () => {
//   drawer.value.open({})
// }

const onAddArticle = () => {
  drawer.value.open({})
}

const onEditArticle = (row) => {
  console.log(row)
  drawer.value.open(row)
}

const onSizeChange = (size) => {
  params.value.pagesize = size
  params.value.pagenum = 1
  getArticleList()
}

const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

const onReset = () => {
  params.value = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
  }
  getArticleList()
}

const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  onSuccess()
}

const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}

onMounted(() => getArticleList())
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <el-form :inline="true">
      <el-form-item label="文章分类">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 200px" v-model="params.state" clearable>
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" v-loading="loading" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }"
          ><el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" width="180" />
      <el-table-column prop="pub_date" label="发表时间" width="180">
        <template #default="{ row }"> {{ formatTime(row.pub_date) }} </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="180" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            plain
            type="primary"
            :icon="Edit"
            circle
            @click="onEditArticle(row)" />
          <el-button
            plain
            type="danger"
            :icon="Delete"
            circle
            @click="onDeleteArticle(row)"
        /></template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
  <article-edit ref="drawer" @success="onSuccess"></article-edit>
</template>
<style scoped lang="scss"></style>
