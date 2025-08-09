<script setup>
import { artGetChannelsService, artDelChannelService } from '@/api/article.ts'
import { Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import ChannelEdit from '@/components/ChannelEdit.vue'

const tableData = ref([])
const loading = ref(false)
const dialog = ref()

const getTableData = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  loading.value = false
  tableData.value = res.data.data || []
}

const onAddChannel = () => {
  dialog.value.open({})
}

const onEditChannel = (row) => {
  console.log(row)
  dialog.value.open(row)
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
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"
        >添加分类</el-button
      ></template
    >
    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column prop="cate_name" label="分类名称" width="180" />
      <el-table-column prop="cate_alias" label="分类别名" />
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
  </page-container>
  <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
</template>
<style scoped lang="scss"></style>
