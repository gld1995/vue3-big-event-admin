<script setup>
import { artGetChannelsService } from '@/api/article.ts'
import { Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'

const tableData = ref([])
const loading = ref(false)

const getTableData = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  loading.value = false
  tableData.value = res.data.data || []
}

const onEditChannel = (row) => {
  console.log(row)
}
const onDelChannel = (row) => {
  console.log(row)
}

onMounted(() => getTableData())
</script>
<template>
  <page-container title="文章分类">
    <template #extra> <el-button type="primary">添加分类</el-button></template>
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
</template>
<style scoped lang="scss"></style>
