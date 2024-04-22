/***********Echats配置***********/
import { EChartsOption, graphic } from "echarts";

export const barOptions: EChartsOption = {
  // title: {
  //   text: "输入与输出的关系图",
  //   show: true,
  // }, //标题
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross" } //坐标点
  }, //鼠标hover的效果
  // tooltip: {
  //   trigger: "axis",
  //   axisPointer: {
  //     type: "shadow",
  //     shadowStyle: {
  //       color: "rgba(74, 211, 164, 0.15)",
  //     },
  //   },
  // }, //鼠标hover的效果
  grid: {
    left: 50
  }, //网格所在的位置
  legend: {
    data: ["输入量", "其他量", "输出量"]
  }, //标志
  xAxis: {
    type: "category",
    name: "日期",
    data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]

    //  formatter: '{value} 元',
  }, //x轴
  yAxis: {
    axisLabel: {
      formatter: "{value}元"
    }
  }, //y轴
  series: [
    {
      type: "bar",
      name: "输入量",
      data: [100, 200, 300, 200, 100, 300, 100],
      barWidth: "10", //柱状图的宽度
      itemStyle: {
        // color:'red',//柱颜色
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { color: "#5171fd", offset: 0 },
          { color: "#c97afd", offset: 1 }
        ]),
        borderRadius: 10, //圆角
        shadowBlur: 10, //阴影宽度
        shadowColor: "rgba(120, 36, 50, 0.5)" //阴影颜色
      }
      // showBackground: true, //是否显示柱背景
      // backgroundStyle: {
      //   color: "rgba(180,180,180,0.1)",
      // }, //设置背景颜色
    },
    {
      type: "bar",
      name: "其他量",
      data: [200, 100, 120, 130, 80, 220, 90],
      barWidth: "10", //柱状图的宽度
      itemStyle: {
        // color:'red',//柱颜色
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { color: "#ea677c", offset: 0 },
          { color: "#ef9b5f", offset: 1 }
        ]),
        borderRadius: 10, //圆角
        shadowBlur: 10, //阴影宽度
        shadowColor: "rgba(120, 36, 50, 0.5)" //阴影颜色
      }
      // showBackground: true, //是否显示柱背景(一直显示背景)
      // backgroundStyle: {
      //   color: "rgba(180,180,180,0.1)",
      // }, //设置背景颜色
    },
    {
      type: "line",
      name: "输出量",
      data: [50, 150, 150, 100, 80, 200, 200],
      smooth: true //平滑曲线
    }
  ] //数据系列
};
export const lineOptions: EChartsOption = {
  xAxis: {
    type: "category",
    data: ["10-1", "10-2", "10-3", "10-4", "10-5", "10-6", "10-7", "10-8"]
  },
  yAxis: {
    type: "value"
  },
  legend: {
    data: ["最高气温", "最低气温"]
  },
  grid: {
    left: 30
  }, //网格所在的位置
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line"
    }
    // backgroundColor: "#ff0000",
    // borderColor?: ColorString;
    // borderRadius?: number;
  },
  series: [
    {
      name: "最高气温",
      type: "line",
      data: [32, 34, 39, 35, 38, 36, 34, 30],
      smooth: true,
      lineStyle: {
        width: 3, //线条宽度
        color: "#F6D06F", //线条颜色
        shadowBlur: 10, //阴影模糊
        shadowOffsetY: 6 //阴影垂直方向的偏移量
      },
      itemStyle: {
        color: "#F6D06F" //标记点的颜色
      },
      symbol: "emptyCircle", //标记点形状
      symbolSize: 6 //标记点大小
      // showSymbol: true,//显示标记点
    },
    {
      name: "最低气温",
      type: "line",
      data: [25, 22, 26, 28, 27, 26, 23, 18],
      smooth: true,
      symbol: "circle",
      showSymbol: true,
      lineStyle: {
        width: 3,
        color: "#5171fd", // 线条颜色
        shadowColor: "rgba(66,102,247, 0.55)",
        shadowBlur: 10,
        shadowOffsetY: 6
      },
      itemStyle: {
        color: "#5171fd",
        borderColor: "#5171fd",
        borderWidth: 2
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#5171fd"
          },
          {
            offset: 0.3,
            color: "#5171fd"
          },
          {
            offset: 1,
            color: "rgba(127,153,255,0.1)"
          }
        ])
      } //背景色
    }
  ]
};
export const pieOptions: EChartsOption = {
  title: [
    {
      text: "消费",
      textStyle: {
        color: "#5171fd",
        fontSize: 25
      },
      top: "center",
      left: "center"
    }
  ], //标题的位置
  legend: {
    show: true,
    left: "center",
    top: 0,
    type: "scroll",
    itemWidth: 18,
    itemHeight: 11
  }, //设置浮标样式
  tooltip: {
    // formatter: "{b}:{c}, {d}% ",
  },

  series: [
    {
      name: "消费类型",
      type: "pie",
      radius: ["40%", "60%"], //圆环的半径
      center: ["50%", "50%"],
      itemStyle: {
        borderRadius: 4,
        borderColor: "#fff",
        borderWidth: 1
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 25,
          fontWeight: "bold"
        }
      }, //高亮状态
      data: [
        {
          name: "炸鸡",
          value: 18
        },
        {
          name: "火锅",
          value: 35
        },
        {
          name: "烤肉",
          value: 37
        },
        {
          name: "料理",
          value: 20
        },
        {
          name: "热干面",
          value: 36
        }
      ]
      // label: {
      //   show: false,
      //   position: "center",
      // }, //名称的显示
    }
  ]
};
// 因为EChartsOption的type类中中没有"liquidFill",所以去掉类型，否则编译失败！
export const waterOptions = {
  series: [
    {
      // @ts-ignore
      type: "liquidFill",
      radius: "75%",
      data: [
        0.6,
        // {
        //   value: 0.5,
        //   itemStyle: {
        //     color: "red", //第二个波浪将为红色
        //   },
        // },
        0.6, 0.6
      ]
    }
  ]
};
