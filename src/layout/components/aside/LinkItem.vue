<template>
  <!-- 判断是否为外链接，如果是外链接使用a,否则使用路由 -->
  <a v-if="isLink" :href="props.to" target="_blank">
    <slot />
  </a>
  <template v-else>
    <slot />
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isExternal } from "@/utils/validate";
interface Props {
  to: string;
}
const props = defineProps<Props>();
const isLink = computed(() => {
  // console.log('-----path----',props.to)
  return isExternal(props.to);
});
</script>

<style lang="scss" scoped></style>
