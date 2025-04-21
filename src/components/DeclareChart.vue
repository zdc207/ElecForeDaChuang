<template>
  <div class="chart-container">
    <div class="header-title">
      <div>申报电量预测效果</div>
    </div>
    <div ref="target" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import Data from '@/assets/data/zhexian_demo1.json';  // 导入本地存储的数据

const target = ref(null);

const renderChart = () => {
  const chartDom = target.value;
  const myChart = echarts.init(chartDom);
  const x = 15;
  const data1 = Data.slice(0, x);
  const data2 = Data.slice(x);

  const mergedData = data1.concat(data2);

  const option = {
    xAxis: {
      type: 'category',
      data: mergedData.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      data: mergedData.map(item => item.value)
    },
    dataZoom: [
      { type: 'slider', start: 0, end: 100, xAxisIndex: 0 },
      { type: 'inside', xAxisIndex: 0 },
      { type: 'slider', start: 0, end: 100, yAxisIndex: 0 },
      { type: 'inside', yAxisIndex: 0 },
      { type: 'slider', start: 0, end: 100, yAxisIndex: 1 },
      { type: 'inside', yAxisIndex: 1 }
    ],
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
            { offset: 0, color: 'rgba(250, 250, 250, 0.8)' },
            { offset: 0, color: 'rgba(250, 250, 250, 0.5)' },
            { offset: 1, color: 'rgba(250, 250, 250, 0)' }
          ])
        },
        itemStyle: { color: 'orange' },
      },
      {
        data: data1.map(item => item.value),
        symbol: 'none',
        type: 'line',
        lineStyle: { color: 'lightblue' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(250, 250, 90, 0.8)' },
            { offset: 0, color: 'rgba(250, 250, 90, 0.5)' },
            { offset: 1, color: 'rgba(250, 250, 90, 0)' }
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

<style>
.chart-container {
  position: relative;
}

.title {
  position: absolute;
  top: 10px;
  left: 10%;
  transform: translateX(-50%);
}

.chart {
  width: 80%;
  margin: 0 auto;
  height: 250px;
}
</style>
