<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import CountUp from 'vue-countup';

// 静态数据
const data = ref({
  data1: [320, 400, 500, 450, 600],
  data2: [200, 300, 400, 350, 450],
  values: [1200, 900, 750],
  increment: [50, -20, 30],
});

const options = ref({
  color: ['#80FFA5', '#00DDFF'],
  title: {
    text: '',
    left: 'center',
    textStyle: {
      fontSize: '16px',
      color: '#aed3dd',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: { show: false },
  grid: {
    left: '1%',
    right: '2%',
    bottom: '5%',
    top: '20%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['福建', '浙江', '安徽', '上海', '江苏'],
    },
  ],
  yAxis: [{ type: 'value' }],
  series: [
    {
      name: '售电量',
      type: 'line',
      smooth: true,
      lineStyle: { width: 0 },
      showSymbol: false,
      stack: 'Total',
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(128, 255, 165)' },
          { offset: 1, color: 'rgb(1, 191, 236)' },
        ]),
      },
      emphasis: { focus: 'series' },
      data: [320, 400, 500, 450, 600],
    },
    {
      name: '线损',
      type: 'line',
      smooth: true,
      lineStyle: { width: 0 },
      showSymbol: false,
      stack: 'Total',
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(0, 221, 255)' },
          { offset: 1, color: 'rgb(77, 119, 255)' },
        ]),
      },
      emphasis: { focus: 'series' },
      data: [200, 300, 400, 350, 450],
    },
  ],
});

onMounted(() => {
  const chart = echarts.init(document.getElementById('chart'));
  chart.setOption(options.value);
});
</script>

<template>
  <div class="container">
    <!-- 标题部分 -->
    <header class="header-title">售电量和线损</header>

    <div class="chart-section">
      <!-- 图表部分 -->
      <div id="chart" class="chart"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}


.chart-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.chart {
  width: 90%;
  height: 300px;
}
</style>
