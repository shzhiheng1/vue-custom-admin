<template>
  <div class="logo">
    <Transition name="fade">
      <div class="shrink" v-if="isCollapse">
        <el-avatar :src="circleUrl"></el-avatar>
      </div>
      <div class="unfold" v-else>
        <el-avatar size="large" :src="circleUrl" shape="square" />
        <p class="unfold-admin">Admin</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
const { circleUrl } = toRefs(state);
const loyoutStore = useLayoutStore();
const isCollapse = computed(() => {
  return loyoutStore.isCollapse;
});
</script>

<style lang="scss" scoped>
.logo {
  height: 86px;
  background-color: #f0f0aa;
  .unfold {
    width: 100%;
    height: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
    .unfold-admin {
      margin: 0 10px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .shrink {
    height: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-from {
    transition: opacity 2s 0.3s ease;
  }
}
</style>
