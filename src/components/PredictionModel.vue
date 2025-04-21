<template>
  <div class="h-full flex flex-col">
    <header class="header-title">华东地区用电量(亿万千瓦时)</header> <!-- 标题部分，使用了global.scss中的样式 -->
    <div class="h-full w-full flex flex-1 py-4">
      <section-container v-if="data">
        <div class="h-full w-full center">
          <div class="h-60 w-full between flex-col">
            <div class="w-full between">
              <div>
                <div v-ellipsis>电网建设值 1</div>
                <app-count-up :count="data.values[0]" :decimal-places="1" />
              </div>
              <app-count-up :count="data.increment[0]" showfix :decimal-places="1" />
            </div>
            <div class="w-full between">
              <div>
                <div v-ellipsis>电网建设值 2</div>
                <app-count-up :count="data.values[1]" :decimal-places="1" />
              </div>
              <app-count-up :count="data.increment[1]" showfix :decimal-places="1" />
            </div>
          </div>
        </div>
      </section-container>

      <!-- ECharts容器使用grid布局 -->
      <div class="h-full w-full grid-container">
        <div ref="chart" class="echart-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 模拟数据
const data = ref({
  values: [1200, 800],
  increment: [100, 50],
})

// 模拟图表配置
const chartOptions = {
  xAxis: {
    type: 'value',
    show: false,
  },
  yAxis: {
    type: 'category',
    data: ['2024 Q1', '2023', '2022', '2021', '2020','2019'],
    inverse: true,
    axisLabel: {
      color: '#92b1bb',
    },
  },
  series: [
    {
      type: 'bar',
      data: [0.5430, 9.2241, 8.6372, 8.3128, 5.8337,7.23],
      label: {
        show: true,
        position: 'right',
        color: '#92b1bb',
      },
      barWidth: '20px',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#409ef7' },
          { offset: 1, color: '#11ccd6' },
        ]),
        borderRadius: [0, 9999, 9999, 0],
      },
    },
  ],
  tooltip: {
    show: true,
  },
}

// 在 mounted 生命周期中初始化 ECharts
onMounted(() => {
  const chart = echarts.init(document.querySelector('.echart-container'))
  chart.setOption(chartOptions)
})
</script>

<style scoped>
/* 使组件全屏显示 */
.h-full {
  height: 100%;
}

.flex {
  display: flex;
}

.center {
  justify-content: center;
  align-items: center;
}

.between {
  justify-content: space-between;
}

.w-full {
  width: 100%;
}

.w-50 {
  width: 50%;
}

section-container {
  flex: 1;
}

section-header {
  margin-bottom: 20px;
}

/* grid容器的样式 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* 单列布局 */
  grid-template-rows: 1fr;   /* 单行布局 */
  grid-gap: 20px; /* 单元格之间的间距 */
  height: 100%; /* 使容器充满高度 */
}

.echart-container {
  grid-column: 1 / span 1; /* 设置图表占据一列 */
  grid-row: 1 / span 1;     /* 设置图表占据一行 */
  width: 100%;
  height: 100%;
}
</style>
