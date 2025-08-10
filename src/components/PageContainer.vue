<script setup>
const props = defineProps({
  title: String
})

console.log('props', props)
</script>

<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <slot name="extra"> </slot>
      </div>
    </template>
    <slot>默认内容</slot>
  </el-card>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
