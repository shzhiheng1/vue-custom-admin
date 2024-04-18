<template>
  <RouterView></RouterView>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import { useThemeHook } from "@/hooks/useTheme";
// 初始化主题
const { initTheme } = useThemeHook();
initTheme();
</script>

<style scoped></style>
