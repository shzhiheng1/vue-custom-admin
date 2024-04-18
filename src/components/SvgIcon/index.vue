<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Prop {
  prefix?: string;
  name: string;
}
const prop = withDefaults(defineProps<Prop>(), {
  prefix: "icon",
});

const symbolId = computed(() => `#${prop.prefix}-${prop.name}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
