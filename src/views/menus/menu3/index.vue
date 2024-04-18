<template>
  <div class="menu3">
    <h3>页面未缓存</h3>
    <el-input-number v-model="count"></el-input-number>
    <el-card>
      <base-count v-bind="option1" ref="refBaseCount"></base-count>
      <el-button type="primary" @click="handleBtn"> 滚动</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import BaseCount from "@/components/BaseCount/index.vue";
const count = ref(0);
const refBaseCount = ref();

const option1 = reactive({
  starVal: 0,
  entVal: 0,
  color: "red",
  size: 30,
});
onMounted(() => {
  // setTimeout(() => {
  //   option1.entVal = 3000;
  // }, 1000);
});
// 测试手动触发
// 触发改变
const handleBtn = () => {
  option1.entVal === 0 ? (option1.entVal = 3000) : (option1.entVal = 0);
  // refBaseCount?.value?.setVal();
};
</script>

<style lang="scss" scoped></style>
