<template>
  <div class="count-to">
    数字滚动:{{ outPut.toFixed(2) }},
    <el-button type="primary" @click="handleBtn"> 滚动</el-button>
  </div>
</template>

<script setup lang="ts">
import { useTransition, TransitionPresets } from "@vueuse/core";
import { ref } from "vue";

const source = ref(0); // 初始值

const outPut = useTransition(source, {
  duration: 2000, //时长
  transition: TransitionPresets.linear, //动画类型
});
// 触发改变
const handleBtn = () => {
  source.value === 0 ? (source.value = 3000) : (source.value = 0);
};
</script>

<style lang="scss" scoped></style>
