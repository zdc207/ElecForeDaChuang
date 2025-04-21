 <template>
  <el-row>
    <el-button type="primary" round @click="toggleChart" class="move-right"
               :style="{ backgroundColor: '#07cfc2', borderColor: '#07cfc2' }">
      {{ buttonText }}
    </el-button>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      isLoadChartVisible: true,
    };
  },
  computed: {
    buttonText() {
      return this.isLoadChartVisible ? '点击切换申报电量预测图' : '点击切换电力负荷预测图';
    },
  },
  methods: {
    toggleChart() {
      this.isLoadChartVisible = !this.isLoadChartVisible;
      this.$emit('toggle', this.isLoadChartVisible);
    },
  }
};
</script>

