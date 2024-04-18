<template>
  <div class="echarts">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <template #header> 输入与输出关系图 </template>
          <div class="bar" ref="barEchartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header> 折线图 </template>
          <div class="line" ref="lineEchartRef"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb-10">
      <el-col :span="12">
        <el-card>
          <template #header>圆环图</template>
          <div class="pie" ref="pieEchartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>水球图</template>
          <div class="water" ref="waterEchartRef"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw } from "vue";
import * as echarts from "echarts";
import { barOptions, lineOptions, pieOptions, waterOptions } from "../options";
// import "echarts/extension/bmap/bmap";
import "echarts-liquidfill";

const barEchartRef = ref<HTMLElement>(); //ref 对象
const barEchart = ref(); //echart实例
const lineEchartRef = ref<HTMLElement>(); //ref 对象
const lineEchart = ref(); //echart实例
const pieEchartRef = ref<HTMLElement>(); // ref 对象
const pieEchart = ref(); // 圆形的实例
// 水球
const waterEchartRef = ref<HTMLElement>(); //ref dom对象
const waterEchart = ref(); //水球实例

onMounted(() => {
  // // 让响应对象变为非响应对象,//第二参数主题light、dark
  initEchart();
  window.addEventListener("resize", () => {
    barEchart.value.resize();
    lineEchart.value.resize();
    pieEchart.value.resize();
    waterEchart.value.resize();
  });
});
const initEchart = () => {
  // 让响应对象变为非响应对象,//第二参数主题light、dark
  // 1.圆柱图
  barEchart.value = markRaw(echarts.init(barEchartRef.value, "light"));
  barEchart.value.setOption(barOptions);
  // 2.折线图
  lineEchart.value = markRaw(echarts.init(lineEchartRef.value, "light"));
  lineEchart.value.setOption(lineOptions);
  // 3.圆环图
  pieEchart.value = markRaw(echarts.init(pieEchartRef.value, "light"));
  pieEchart.value.setOption(pieOptions);
  // 4.水球图
  waterEchart.value = markRaw(echarts.init(waterEchartRef.value));
  waterEchart.value.setOption(waterOptions);
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  .el-row {
    margin-bottom: 10px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }

  .bar,
  .line,
  .pie,
  .water {
    width: 100%;
    height: 300px;
  }
}
</style>
