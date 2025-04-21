<template>
  <div>
    <header class="header-title">MHNet电力负荷预测效果 </header>
    <div ref="target" class="chart"  style="width: 420px; height: 270px;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import Data from '@/assets/data/demo2.json';  // 导入本地存储的数据

const target = ref(null);

const renderChart = () => {
  const chartDom = target.value;
  if (!chartDom) {
    console.error('chartDom not found!');
    return;  // 如果 DOM 元素不存在，直接退出函数
  }
  const myChart = echarts.init(chartDom);
  const x = 70;
  const data1 = Data.slice(0, x);
  const data2 = Data.slice(x);

  const mergedData = data1.concat(data2);

  const option = {
    grid: {
      top: '20%',  // 控制图表上方距离（减小此值会让图表离标题更近）
      bottom: '20%',  // 控制图表下方距离
      left: '9%',  // 控制左边距离
      right: '3%',  // 控制右边距离
      containLabel: true,  // 确保标签不被裁切
    },
    xAxis: {
      type: 'category',
      data: mergedData.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,  // 隐藏所有纵轴标签
      },
      splitLine: {
        show: true,  // 显示纵轴的分割线
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function (params) {
        const date = params[0].axisValue;
        const value = params[0].value;
        return `${date}: ${value}`;
      }
    },
    series: [
      {
        data: mergedData.map(item => ({
          value: item.value,
          symbol: 'none'
        })),
        type: 'line',
        lineStyle: { color: 'orange' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(36,36,255,0.73)' },
            { offset: 1, color: 'rgba(250, 50, 90, 0)' }
          ])
        },
        itemStyle: { color: 'orange' },
      },
      {
        data: data1.map(item => item.value),
        symbol: 'none',
        type: 'line',
        lineStyle: { color: 'rgba(117,218,255,0.52)' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,250,250,0.64)' },
            { offset: 1, color: 'rgba(0, 250, 250, 0)' }
          ])
        },
        itemStyle: { color: 'lightblue' },
      }
    ]
  };

  myChart.setOption(option);
};

onMounted(() => {
  renderChart();
});
</script>
