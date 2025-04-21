<template>
    <div>
      <header class="header-title"> 应用技术气泡图 </header>
    <div class="Bubble" ref="BubbleChart" :style="{ width: '100%', height: '420px' }"></div>
    </div>
</template>

  <script>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts/core';
  import { GraphChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { TooltipComponent } from 'echarts/components';

  echarts.use([GraphChart, CanvasRenderer, TooltipComponent]);

  export default {
    name: 'BubbleChart',
    setup() {
      const BubbleChart = ref(null);
      const BubbleOption = {
        tooltip: {
          formatter: function(params) {
            const { name, value } = params.data;
            // 计算动态宽度和高度
            const contentWidth = Math.min(300, 10 * value.length); // 宽度最大为 300px 或者根据文字长度计算
            const contentHeight = Math.ceil((value.length * 10) / contentWidth) * 20 + 40; // 根据宽度计算高度

            // 返回自定义的 HTML 字符串作为 tooltip 的内容
            return `<div style="width: ${contentWidth}px; min-height: ${contentHeight}px; max-width: 300px; background-color: rgba(255,255,255,1); border: 1px solid #ccc; padding: 10px;
            /overflow-wrap: break-word; word-wrap: break-word; white-space: normal;">
                      <div><strong>${name}</strong></div>
                      <div>${value}</div>
                    </div>`;
          },
          backgroundColor: 'transparent', // 设置为透明背景
        },
        animationDurationUpdate: function(idx) {
          return idx * 100;
        },
        animationEasingUpdate: 'bounceIn',
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 200,
              edgeLength: 10,
            },
            label: {
              show: true,
              formatter: '{b}',
              // fontWeight: 'bold',
              fontSize: '14',
              align: 'center',
              verticalAlign: 'middle',
              color: 'rgb(3,169,169)',
            },
            data: [
              {
                name: '频域增强信息表示',
                value: "采用了时域中长期时间序列的多尺度层次表示法，利用窗口切片，将数据分解为多个尺度的子序列，对每个子序列进行特征提取和表示。这不仅可以利用不同时间尺度的信息逐步建立对时间序列的全局理解和表示，还可以以较低的计算复杂度和内存开销处理长时间序列数据。",
                symbol: 'circle',
                symbolSize: 140,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: 'rgba(36,36,255,0.2)' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: 'rgba(36,36,255,0.2)',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: '多尺度时域特征提取',
                value: "采用了时域中长期时间序列的多尺度层次表示法，利用窗口切片，将数据分解为多个尺度的子序列，对每个子序列进行特征提取和表示。这不仅可以利用不同时间尺度的信息逐步建立对时间序列的全局理解和表示，还可以以较低的计算复杂度和内存开销处理长时间序列数据。",
                symbol: 'circle',
                symbolSize: 140,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: 'rgba(36,36,255,0.2)' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: 'rgba(36,36,255,0.2)',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: '电力负荷预测',
                value: "通过对电力市场机理分析得到十个主要影响因子，并构建预测模型MHNet进行短期电力负荷预测，模型预测准确度达98.9%。",
                symbol: 'circle',
                symbolSize: 90,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: 'rgba(36,36,255,0.2)' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: 'rgba(36,36,255,0.2)',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: 'MHNet',
                value: "基于多尺度分层Transformer的时间序列预测模型MHNet，由频域增强信息表示模块和多尺度时域特征提取模块组成。",
                symbol: 'circle',
                symbolSize: 105,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: '#6EFFFFFF' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: '#6EFFFFFF',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: '多尺度窗口机制',
                value: "捕获不同分辨率的时间模式，实现了长期时间序列中时域和频域的联合建模，用于稳健高效的长期时间序列预测；此外，通过引入多尺度分层表示法和傅里叶分量随机选择机制，模型的计算复杂度和内存需求大大降低。",
                symbol: 'circle',
                symbolSize: 120,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: '#6EFFFFFF' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: '#6EFFFFFF',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: 'Transformer',
                value: "基于多尺度分层Transformer的时间序列预测模型",
                symbol: 'circle',
                symbolSize: 110,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: '#6EFFFFFF' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: '#6EFFFFFF',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: '机器学习',
                value: "应用了LSTM,LGB,GRU,CNN,Attention等模型，涵盖了神经网络和机器学习领域。",
                symbol: 'circle',
                symbolSize: 90,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: '#3580FF99' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: '#3580FF99',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: '数据分析',
                value: "从电力现货市场的角度出发进行机理分析，对大量的多种数据进行数据分析，研究影响申报电量的因素，根据影响因素结合时序特征建立预测模型。",
                symbol: 'circle',
                symbolSize: 90,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: '#3580FF99' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: '#3580FF99',
                  borderWidth: 2,
                },
                draggable: true,
              },
              {
                name: 'WEB',
                value: "运用vue3技术实现成果可视化",
                symbol: 'circle',
                symbolSize: 90,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: 'rgba(238,238,255,0.2)' }, // 0% 处的颜色
                      { offset: 1, color: '#3580FF99' } // 100% 处的颜色
                    ],
                    global: false // 缺省为 false
                  },
                  borderColor: '#3580FF99',
                  borderWidth: 2,
                },
                draggable: true,
              },
            ],
          },
        ],
      };

      onMounted(() => {
        const chart = echarts.init(BubbleChart.value);
        chart.setOption(BubbleOption);
      });

      return {
        BubbleChart,
      };
    },
  };
  </script>


<style scoped>
.Bubble {
  margin-top: 10px;  /* 设置顶部间距，调整气泡图与标题之间的距离 */
}
</style>
