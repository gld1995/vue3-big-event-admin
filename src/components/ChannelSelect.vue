<script setup>
import { onMounted, ref } from 'vue'
import { artGetChannelsService } from '@/api/article'

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: [Number, String],
    default: '200px'
  }
})
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])

const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}

onMounted(() => getChannelList())
</script>
<template>
  <el-select
    style="width: width"
    clearable
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    />
  </el-select>
</template>
<style scoped lang="scss"></style>
