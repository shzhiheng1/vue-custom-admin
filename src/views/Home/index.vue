<template>
  <div class="home">
    <h2>home页面</h2>
    <div :style="{ fontStyle: variables.fontOblique }">
      测试.module.scss导出js模块
    </div>
    <div class="test-root">测试:root定义变量全局可用。</div>
    <div class="test-global">测试scss全局注册变量</div>
    <el-button type="primary">你好</el-button>
    <div class="line">测试element-plus,自定义的样式变量</div>
    <div>
      测试element-plus的自带Icon
      <Edit style="width: 1em; height: 1em; margin-right: 8px" />
      <el-icon color="#409EFC" :size="20">
        <Share />
      </el-icon>
    </div>
    <div class="custom-svg">
      测试自定义SvgIcon标签：
      <SvgIcon name="smile"></SvgIcon>
    </div>
    <div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
        size="default"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import variables from "@/styles/variables.module.scss";
const value1 = ref("");
// 页面缓存需要定义name
defineOptions({
  name: "Home",
});
</script>

<style lang="scss" scoped>
.home {
  .test-root {
    background-color: var(--color-accent);
  }
  .test-global {
    font-size: $large-size;
  }
  .line {
    // 使用element-plus定义的变量
    border-bottom: 1px solid var(--el-border-color);
  }
  .custom-svg {
    .svg-icon {
      color: red;
    }
  }
}
</style>
