<template>
    <div id="main" :style="{ width: '600px', height: '400px' }"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts/core';
  import { LegendComponent } from 'echarts/components';
  import { GraphChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import axios from 'axios'; // 使用 axios 替代 jQuery 的 $.get
  
  echarts.use([LegendComponent, GraphChart, CanvasRenderer]);
  
  export default {
    name: 'EChartComponent',
    mounted() {
      var ROOT_PATH = 'https://echarts.apache.org/examples';
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;
  
      myChart.showLoading();
  
      axios.get(ROOT_PATH + '/data/asset/data/webkit-dep.json')
        .then(response => {
          myChart.hideLoading();
          var webkitDep = response.data;
          option = {
            legend: {
              data: ['BIGRU', 'CNN', 'Attention', 'LSTM', 'LGB', 'Vue3', 'JS']
            },
            series: [
              {
                type: 'graph',
                layout: 'force',
                animation: false,
                label: {
                  position: 'right',
                  formatter: '{b}'
                },
                draggable: true,
                data: webkitDep.nodes.map(function (node, idx) {
                  node.id = idx;
                  return node;
                }),
                categories: webkitDep.categories,
                force: {
                  edgeLength: 5,
                  repulsion: 20,
                  gravity: 0.2
                },
                edges: webkitDep.links
              }
            ]
          };
          myChart.setOption(option);
        })
        .catch(error => {
          console.error('Error fetching the data: ', error);
        });
  
      option && myChart.setOption(option);
    }
  };
  </script>
  
  <style scoped>
  #main {
    width: 100%;
    height: 100%;
  }
  </style>
  