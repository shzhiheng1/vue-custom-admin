<template>
  <div class="map">
    <el-row>
      <el-col :span="24">
        <div class="china" ref="chinaMapEchartsRef"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import chinaJSON from "./china.json";

const chinaMapEchartsRef = ref<HTMLElement>();
const chinaMapEcharts = ref();

const mydata = [
  { name: "北京市", value: 300 },
  { name: "天津市", value: 20 },
  { name: "上海市", value: 20 },
  { name: "重庆市", value: 50 },
  { name: "河北省", value: 50 },
  { name: "河南省", value: 50 },
  { name: "云南省", value: 50 },
  { name: "辽宁省", value: 50 },
  { name: "黑龙江省", value: 50 },
  { name: "湖南省", value: 50 },
  { name: "安徽省", value: 50 },
  { name: "山东省", value: 50 },
  { name: "新疆省", value: 50 },
  { name: "江苏省", value: 50 },
  { name: "浙江省", value: 260 },
  { name: "江西省", value: 50 },
  { name: "湖北省", value: 50 },
  { name: "广西省", value: 50 },
  { name: "甘肃省", value: 50 },
  { name: "山西省", value: 50 },
  { name: "内蒙古自治区", value: 50 },
  { name: "陕西省", value: 50 },
  { name: "吉林省", value: 110 },
  { name: "福建省", value: 50 },
  { name: "贵州省", value: 50 },
  { name: "广东省", value: 80 },
  { name: "青海省", value: 200 },
  { name: "西藏省", value: 50 },
  { name: "四川省", value: 60 },
  { name: "宁夏省", value: 50 },
  { name: "海南省", value: 50 },
  { name: "台湾省", value: 50 },
  { name: "香港", value: 50 },
  { name: "澳门", value: 50 },
  { name: "新疆维吾尔自治区", value: 0 },
  { name: "西藏自治区", value: 50 },
  { name: "广西壮族自治区", value: 100 },
  { name: "宁夏回族自治区", value: 100 },
  { name: "南海诸岛", value: 100 },
];
// 注册中国地图
echarts.registerMap("china", chinaJSON as any);

const chinaMapOptions: EChartsOption = reactive({
  title: {
    text: "中国地图",
  }, //标题框组件
  tooltip: {
    trigger: "item",
    formatter: "{b}<br/>{c}",
  }, //提示框组件
  visualMap: {
    // 可视化映射组件，用于颜色的映射
    min: 0,
    max: 300, // 数据范围，根据实际情况设置
    left: "left", // 组件位置，根据需要设置
    top: "bottom", // 同上
    text: ["高", "低"], // 文本，可根据需要设置
    calculable: true, // 是否开启计算模式，根据需要设置
    inRange: {
      color: ["lightskyblue", "yellow", "orangered"],
    },
  }, //视觉地图
  // geo: {
  //   map: "china",
  //   roam: false, //鼠标缩放
  //   //地图位置
  //   left: 40,
  //   top: 80,
  //   bottom: 20,
  //   right: 20,
  //   // 地图文字设置
  //   label: {
  //     show: true,
  //     color: "white",
  //     fontSize: 12,
  //   },
  //   itemStyle: {
  //     color:
  //       // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
  //       {
  //         type: "linear",
  //         x: 0,
  //         y: 0,
  //         x2: 0,
  //         y2: 1,
  //         // 渐变效果
  //         colorStops: [
  //           {
  //             offset: 0,
  //             color: "#022960", // 0% 处的颜色
  //           },
  //           {
  //             offset: 1,
  //             color: "#023481", // 100% 处的颜色
  //           },
  //         ],
  //         global: false, // 缺省为 false
  //       },
  //     // 边框设置样式
  //     borderColor: "#179FCB",
  //     shadowColor: "rgba(23,159,203, 0.5)",
  //     shadowBlur: 10,
  //   },
  //   //   地图高亮效果
  //   emphasis: {
  //     itemStyle: {
  //       color: "#1369CD",
  //     },
  //     label: {
  //       color: "#82B9F8",
  //     },
  //   },
  // },
  series: [
    {
      name: "中国地图",
      type: "map",
      map: "china", // 此处map的内容与echarts.registerMap中自定义的名字一直
      // left: 80,
      // top: 80,
      // right: 80,
      // bottom: 20,
      width: "60%",
      height: "90%",
      label: {
        show: true,
        color: "white",
        fontSize: 12,
      },
      data: mydata,
      // 未选中的样式
      itemStyle: {
        areaColor:
          // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            // 渐变效果
            colorStops: [
              {
                offset: 0,
                color: "#022960", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#023481", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        // 边框设置样式
        borderWidth: 2,
        borderColor: "#179FCB",
        shadowColor: "rgba(23,159,203, 0.5)",
        shadowBlur: 17,
      },
      //高亮
      emphasis: {
        itemStyle: {
          areaColor: "#1369CD", //填充色
        },
        label: {
          color: "#82B9F8",
        },
      },
    },
  ],
});
onMounted(() => {
  initEchart();
  window.addEventListener("resize", () => {
    chinaMapEcharts.value.resize();
  });
});
// 初始化地图
const initEchart = () => {
  chinaMapEcharts.value = markRaw(
    echarts.init(chinaMapEchartsRef.value, "light")
  );
  chinaMapEcharts.value.setOption(chinaMapOptions);
};
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  .china {
    width: 100%;
    height: calc(100vh);
    background: rgba($color: #000000, $alpha: 0.8);
  }
}
</style>
