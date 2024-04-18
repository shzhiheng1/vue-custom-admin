<template>
  <div class="menu4">
    <h3>测试缓存</h3>
    <el-input v-model="username"></el-input>
    <el-button type="primary" @click="handleMenu2">打开Menu2</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated } from "vue";
import { useRouter } from "vue-router";
const username = ref("");
const router = useRouter();
// 定义name为了缓存
defineOptions({
  name: "Menu4",
});
onActivated(() => {
  console.log("-----调用onActivated----");
});
const handleMenu2 = () => {
  router.push({ path: "/menu/menu2", query: { username: username.value } });
};
</script>

<style lang="scss" scoped></style>
