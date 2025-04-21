<template>
	<div>
        <header class="header-title"> 江苏省间供电线路示意图及通道月调度负荷 </header>
		<div ref="target" class="w-full h-full"></div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import mapJson from '@/assets/MapData/china.json'
import elecData from '@/assets/data/elec2223.json'
import axios from 'axios'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})
const target = ref(null)
let mChart = null
onMounted(() => {
	mChart = echarts.init(target.value)
	renderChart()
})
const renderChart = () => {
  echarts.registerMap('china', mapJson)// echarts 渲染
  const channel = ["锡泰直流", "雁淮直流", "建苏直流", "锦苏直流", "龙政直流"];
  const channel1 = [
    {
      type: 'lines',
      coordinateSystem: 'geo',
      //polyline: true,
      smooth: true,
      data: [
        // 锡泰直流
        {
          Name:'锡泰直流',
          fromName: '内蒙古自治旗锡盟',
          toName: '江苏泰州',
          coords: [
            [115.48829, 44.19456],
            [119.91224, 32.48142]
          ],
          values: 1
        },
        // 雁淮直流
        {
          Name:'雁淮直流',
          fromName: '山西朔州雁门关',
          toName: '江苏淮安',
          coords: [
            [112.42250, 39.31583],
            [119.10758, 33.55248]
          ],
          values: 2
        },
        //建苏直流
        {
          Name:'建苏直流',
          fromName: '四川凉山州建昌',
          toName: '苏州姑苏',
          coords: [
            [102.08068, 27.88579],
            [120.61301, 31.33951]
          ],
          values: 3
        },
      ],
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.8)', // 线条颜色
        width: 3, // 线条宽度
        type: 'solid', // 线条类型，可选为：'solid', 'dashed', 'dotted'
        curveness: 0.2
      },
      emphasis: {
        lineStyle: {
          color: 'rgba(5, 255, 255, 0.8)', // 高亮时的线条颜色
          width: 10 // 高亮时的线条宽度
        },
      },
      effect: {
        show: true,
        constantSpeed: 50, // 圆点沿线移动的速度，值越大速度越快
        trailLength: 0.1, // 圆点移动的轨迹长度，取值范围为 0 到 1
        symbol: 'circle', // 圆点的形状
        symbolSize: 10, // 圆点的大小
        color: 'rgba(255, 255, 255, 0.8)' // 圆点的颜色
      },
    },
  ]
  const channel2 = [
    {
      type: 'lines',
      coordinateSystem: 'geo',
      //polyline: true,
      smooth: true,
      data: [
        // 锦苏直流
        {
          Name:'锦苏直流',
          fromName: '四川锦屏',
          toName: '江苏苏州',
          coords: [
            [101.79178, 28.13861],
            [120.58110, 31.30170]
          ],
          values: 4
        },
        //龙政直流
        {
          Name:'龙政直流',
          fromName: '宜昌龙泉',
          toName: '常州政平',
          coords: [
            [111.49023, 30.73095],
            [120.99134, 31.60327]
          ],
          values: 5
        },
      ],
      lineStyle: {
        color: 'rgb(255,255,255)', // 线条颜色
        width: 3, // 线条宽度
        type: 'solid', // 线条类型，可选为：'solid', 'dashed', 'dotted'
        curveness: 0.5
      },
      emphasis: {
        lineStyle: {
          color: 'rgba(0, 255, 255, 0.8)', // 高亮时的线条颜色
          width: 10 // 高亮时的线条宽度
        },
      },
      effect: {
        show: true,
        constantSpeed: 50, // 圆点沿线移动的速度，值越大速度越快
        trailLength: 0.1, // 圆点移动的轨迹长度，取值范围为 0 到 1
        symbol: 'circle', // 圆点的形状
        symbolSize: 10, // 圆点的大小
        color: 'rgba(255,255,255)' // 圆点的颜色
      },

    },
  ];
  const series = channel1.concat(channel2);
  let options = {// 创建 options 对象并设置基本选项
    // 时间线，提供了在多个 ECharts option 间进行切换
    timeline: {
      // 数据
      data: elecData.map(item => item.date),
      // 类目轴
      axisType: 'category',
      // 自动切换
      autoPlay: true,
      // 间隔时间
      playInterval: 3000,
      // 位置
      left: '2%',
      right: '10%',
      bottom: '48%',
      width: '90%',
      // 轴的文本标签
      label: {
        // 默认状态
        normal: {
          textStyle: {
            color: 'rgb(153,153,155)'
          }
        },
        // 高亮状态
        emphasis: {
          textStyle: {
            color: 'rgba(186,248,255,0.89)'
          }
        }
      },
      // 文字大小
      symbolSize: 10,
      // 线的样式
      lineStyle: {
        color: '#07cfc2'
      },
      // 选中点的样式
      checkpointStyle: {
        color: '#07cfc2',
        borderColor: '#07cfc2',
        borderWidth: 2
      },
      // 控件样式
      controlStyle: {
        // 上一步按钮
        showNextBtn: true,
        // 下一步按钮
        showPrevBtn: true,
        // 默认样式
        normal: {
          color: '#07cfc2',
          borderColor: '#07cfc2'
        },
        // 高亮样式
        emphasis: {
          color: '#07cfc2',
          borderColor: '#07cfc2'
        }
      }
    },
    options: []
  }
  elecData.forEach((item) => {
    let optionItem = {
      grid: {
        left: '10%',
        right: '10%',
        bottom: '5%',
        width: '80%',
        height: '35%'
      },
      xAxis: {
        type: 'category',
        data: ["锡泰直流", "雁淮直流", "建苏直流", "锦苏直流", "龙政直流"],
      },
      yAxis: {
        type: 'value',
      },
      color: [
        {
          type: 'linear',
          x: 1,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {offset: 0, color: '#0000FF33'},
            {offset: 1, color: '#6EFFFFFF'}
          ]
        }
      ],
      series: [{
        type: 'bar',
        barWidth: '39%',
        label: {
          show: false,
          position: 'top',
        },
        data: item.data
      }]
    };
    options.options.push(optionItem);
  });

  options.baseOption = {
    grid: {
      right: '2%',
      top: '15%',
      bottom: '10%',
      width: '20%'
    },
    geo: {
      show: true,
      map: 'china',
      roam: false,
      center: [106.195397, 14.5],
      zoom: 0.75,
      itemStyle: {
        normal: {
          borderColor: 'rgb(46,236,255)',
          borderWidth: 1,
          areaColor: 'rgba(0,235,248,0.37)',
        },
        emphasis: {
          areaColor: 'rgba(176,242,250,0.45)',
          borderWidth: 0
        }
      },
    },
    series: series.concat(channel1),
    tooltip: {
      trigger: 'item', // 鼠标悬停时触发提示框
      formatter: function (params) {
        // 如果是柱状图的悬停
        if (params.seriesType === 'bar' && params.data) {
          return `${params.name}：${params.value}`;
        }
        // 如果是地图弧线的悬停
        if (params.seriesType === 'lines' && params.data) {
          const data = params.data;
          if (data.fromName && data.toName) {
            return `${data.Name}：${data.fromName} → ${data.toName}`;
          }
        }
        return '';
      }
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    graphic: [
      {
        type: 'group',
        id: 'lineNameGroup',
        children: [
          {
            type: 'text',
            id: 'lineNameText',
            z: 100,
            style: {
              fill: 'rgba(192,192,192,0.8)',
              fontSize: 14,
              fontWeight: 'bold'
            }
          }
        ]
      }
    ],
  };

  mChart.setOption(options);
};
</script>
<style lang="scss" scoped></style>
