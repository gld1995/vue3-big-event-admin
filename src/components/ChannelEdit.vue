<script setup>
import { ref } from 'vue'

const dialogVisible = ref()

const open = (row) => {
  dialogVisible.value = true
  console.log(row)
}

const onConfirm = () => {
  dialogVisible.value = false
}

defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
