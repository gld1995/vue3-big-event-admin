<script setup>
import { artGetChannelsService, artDelChannelService } from '@/api/article.ts'
import { Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import ArticleEdit from '@/components/ArticleEdit.vue'

const tableData = ref([])
const loading = ref(false)
const drawer = ref()
const formModel = ref({
  cato: undefined,
  status: undefined
})

const getTableData = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  loading.value = false
  tableData.value = res.data.data || []
}

const onAddChannel = () => {
  drawer.value.open({})
}

const onEditChannel = (row) => {
  console.log(row)
  drawer.value.open(row)
}

const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  onSuccess()
}

const onSuccess = () => {
  getTableData()
}

onMounted(() => getTableData())
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"
        >发布文章</el-button
      ></template
    >
    <el-form :inline="true" :model="formModel">
      <el-form-item label="文章分类">
        <el-select
          v-model="formModel.cato"
          placeholder="Activity zone"
          clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select
          v-model="formModel.status"
          placeholder="Activity zone"
          clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="cate_name" label="分类" width="180" />
      <el-table-column prop="pub_date" label="发表时间" width="180" />
      <el-table-column prop="state" label="状态" width="180" />
      <el-table-column label="操作">
        <el-button
          plain
          type="primary"
          :icon="Edit"
          circle
          @click="onEditChannel"
        />
        <el-button
          plain
          type="danger"
          :icon="Delete"
          circle
          @click="onDelChannel"
        />
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </page-container>
  <article-edit ref="drawer" @success="onSuccess"></article-edit>
</template>
<style scoped lang="scss"></style>
