<!-- 数字动态组件 -->

<template>
  <span :style="getStyle">{{ outPut.toFixed(2) }}</span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";

const props = defineProps({
  startVal: {
    type: Number,
    default: 0,
  },
  entVal: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: "#000000",
  },
  size: {
    type: Number,
    default: 16,
  },
});

const source = ref(props.startVal); // 初始值

const outPut = useTransition(source, {
  duration: 2000, //时长
  transition: TransitionPresets.linear, //动画类型
});
const getStyle = computed(() => ({
  color: props.color,
  fontSize: props.size + "px",
}));
// 触发改变
const setVal = () => {
  source.value = props.entVal;
};
watch([() => props.startVal, () => props.entVal], () => {
  setVal();
});

// 抛出给父组件实例调用(目前没有用到)
defineExpose({
  setVal,
});
</script>

<style lang="scss" scoped></style>
