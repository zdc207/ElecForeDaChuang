<template>
  <div
      class="bg-[#f9f9f9] bg-cover bg-center text-white p-2 flex flex-col overflow-hidden bg-opacity-50"
      v-if="data"
      style="height: 100vh;"
  >
    <bg></bg>
    <h1 class="text-4xl font-bold mt-4 text-center" style="color: #01a69c;">
      边缘环境下基于多尺度信息融合的长期电力负荷预测方法MHNet
    </h1>

    <!-- 全屏按钮 -->
    <button
        class="absolute top-2 right-2 z-50 bg-[#01a69c] text-white p-2 rounded hover:bg-[#018f84]"
        @click="toggleFullscreen"
    >
      {{ isFullscreen ? '退出全屏' : '全屏' }}
    </button>

    <!-- 应用边框样式到大容器 -->
    <div class="container-border flex-1 flex justify-between pb-20 mt-0  mt-2">
      <div class="w-1/3 dv-border-box12 bg-slate-800 flex flex-col">
        <SalesOfElectricityAndLineLoss class="h-1/2"/>
        <PredictionModel class="h-1/2"/>
      </div>
      <!-- 左侧部分，地图可视化 -->
      <div class="w-1/2 flex flex-col">
        <MapChart
            class="dv-border-box12 bg-opacity-10 bg-slate-800 pb-4 mt-0 flex-1"
            :data="data.mapData"
        />
      </div>
      <!-- 右侧部分，折线图和切换按钮 -->
      <div class="w-1/3 dv-border-box12 bg-slate-800 flex flex-col">
        <Bubble class="box-border h-2/3" />
        <LoadChart class=" box-border" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MapChart from './components/MapChart.vue';
import { ref } from 'vue';
import LoadChart from './components/LoadChart.vue';
import Bubble from './components/Bubble.vue';
import SalesOfElectricityAndLineLoss from "./components/SalesOfElectricityAndLineLoss.vue";
import PredictionModel from "@/components/PredictionModel.vue";
import DeclareChart from "@/components/DeclareChart.vue";
const data = ref({
  mapData: {
    locations: [
      { name: '地区1', value: 100 },
      { name: '地区2', value: 150 },
      { name: '地区3', value: 200 },
    ],
  },
});

const isLoadChartVisible = ref(true); // 控制显示的折线图状态
const isFullscreen = ref(false); // 控制是否处于全屏状态

// 切换折线图的显示与隐藏
const toggleChart = () => {
  isLoadChartVisible.value = !isLoadChartVisible.value;
};

// 切换全屏
const toggleFullscreen = () => {
  const element = document.documentElement; // 页面根元素
  if (!isFullscreen.value) {
    element.requestFullscreen().then(() => {
      isFullscreen.value = true;
    });
  } else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false;
    });
  }
};

// 监听全屏状态变化，退出全屏时更新状态
document.addEventListener('fullscreenchange', () => {
  isFullscreen.value = !!document.fullscreenElement;
});
</script>

<style scoped>
button {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 1000;
  cursor: pointer;
  font-size: 14px;
}
</style>
