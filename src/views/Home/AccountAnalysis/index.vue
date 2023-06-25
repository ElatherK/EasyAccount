<template>
  <div class="container">
    <div class="header">
      <span>账单分析</span>
      <a-month-picker placeholder="选择时间" @change="handleMounthChange" />
    </div>
    <div class="preview">
      <span>月预览</span>
      <div class="content">
        <div>
          <span>支出</span>
          <span class="num">0</span>
        </div>
        <div>
          <span>收入</span>
          <span class="num">0</span>
        </div>
        <div :style="{ marginTop: '8px' }">
          <span>结余</span>
          <span class="num">0</span>
        </div>
        <div :style="{ marginTop: '8px' }">
          <span>记账次数</span>
          <span class="num">0</span>
        </div>
      </div>
    </div>
    <div class="contribution">
      <div class="header">
        <span>支出分布</span>
        <div>
          <span>对比上月</span>
          <a-checkbox @change="handleChange" />
        </div>
      </div>
      <div class="body" v-show="currentMounth">
        <div class="pie-chart" ref="pieChart"></div>
        <div class="bar-chart" ref="barChart"></div>
      </div>
      <div v-show="!currentMounth">
        <!-- <NoDataSpace>
          <template v-slot:title> 请选择时间 </template>
        </NoDataSpace> -->
        <a-empty description="请选择时间~"></a-empty>
      </div>
    </div>
    <div class="time">
      <span>时序分布</span>
      <div ref="timeLine" class="timeLine" v-show="currentMounth"></div>
      <div v-show="!currentMounth">
        <a-empty description="请选择时间~"></a-empty>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { categories } from "@/utils/const";
export default {
  name: "ViewAccount",
  data() {
    return {
      accounts: [
        {
          mounth: 4,
          items: [
            {
              date: "2023-04-01",
              name: "电费",
              type: 0,
              category: 1,
              money: 200,
            },
            {
              date: "2023-04-02",
              name: "电费",
              type: 0,
              category: 2,
              money: 100,
            },
            {
              date: "2023-04-03",
              name: "电费",
              type: 0,
              category: 3,
              money: 100,
            },
            {
              date: "2023-04-05",
              name: "杂费",
              type: 0,
              category: 2,
              money: 200,
            },
            {
              date: "2023-04-04",
              name: "电费",
              type: 0,
              category: 4,
              money: 100,
            },
          ],
        },
        {
          mounth: 5,
          items: [
            {
              date: "2023-05-01",
              name: "电费",
              type: 0,
              category: 1,
              money: 100,
            },
            {
              date: "2023-05-02",
              name: "电费",
              type: 0,
              category: 2,
              money: 100,
            },
            {
              date: "2023-05-03",
              name: "电费",
              type: 0,
              category: 3,
              money: 100,
            },
            {
              date: "2023-05-04",
              name: "电费",
              type: 0,
              category: 4,
              money: 100,
            },
            {
              date: "2023-05-04",
              name: "水费",
              type: 0,
              category: 4,
              money: 200,
            },
          ],
        },
        {
          mounth: 6,
          items: [
            {
              date: "2023-04-01",
              name: "电费",
              type: 0,
              category: 1,
              money: 400,
            },
            {
              date: "2023-04-02",
              name: "电费",
              type: 0,
              category: 2,
              money: 300,
            },
            {
              date: "2023-04-03",
              name: "电费",
              type: 0,
              category: 3,
              money: 200,
            },
            {
              date: "2023-04-04",
              name: "电费",
              type: 0,
              category: 4,
              money: 100,
            },
            {
              date: "2023-04-04",
              name: "收入",
              type: 1,
              category: 9,
              money: 600,
            },
          ],
        },
      ],
      currentMounth: undefined,
      dataToAnalysis: {},
      barOption: {},
    };
  },
  mounted() {
    this.pieChart = echarts.init(this.$refs.pieChart);
    this.barChart = echarts.init(this.$refs.barChart);
    this.lineChart = echarts.init(this.$refs.timeLine);
  },
  methods: {
    handleMounthChange(value) {
      this.currentMounth = value.format("M");
      const mounth = value.format("M");
      // 接口
      this.dataToAnalysis = this.accounts.filter((el) => {
        return el.mounth == mounth;
      })[0];
      console.log(this.dataToAnalysis);
      if (this.dataToAnalysis.mounth) {
        this.formPieChart(this.dataToAnalysis.items);
        this.formBarChart(this.dataToAnalysis.items);
        this.fomTimeLine();
      }
    },
    formPieChart(data) {
      let categoryRecord = [];
      let dataSeries = [];
      data.forEach((element) => {
        const index = categoryRecord.indexOf(element.category);
        if (index > -1) {
          dataSeries[index].value += element.money;
        } else {
          dataSeries.push({
            value: element.money,
            name: categories[element.category],
          });
          categoryRecord.push(element.category);
        }
      });
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: dataSeries,
          },
        ],
      };
      this.pieChart.setOption(option);
    },
    formBarChart(data) {
      let categoryRecord = [];
      let dataSeries = [];
      data.forEach((element) => {
        const index = categoryRecord.indexOf(categories[element.category]);
        console.log(index, element, "????");
        if (index > -1) {
          dataSeries[index] += element.money;
        } else {
          dataSeries.push(element.money);
          categoryRecord.push(categories[element.category]);
        }
      });
      console.log(dataSeries, categoryRecord);
      const currentMounthData = {
        name: "本月",
        type: "bar",
        data: dataSeries,
      };
      this.barOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: categoryRecord,
        },
        barWidth: 20,
        series: [currentMounthData],
      };
      this.barChart.setOption(this.barOption);
    },
    handleChange(e) {
      const checked = e.target.checked;
      if (this.currentMounth!= undefined && checked) {
        const lastMounthData = this.accounts.filter((el) => {
          return el.mounth == this.currentMounth - 1;
        })[0];
        console.log(lastMounthData, "上月数据@@@@");
        if (lastMounthData) {
          let dataSeries = [];
          this.barOption.yAxis.data.forEach((el, index) => {
            const data = lastMounthData.items.filter((e) => {
              return categories[e.category] === el;
            });
            dataSeries[index] = data.length > 0 ? data[0].money : 0;
          });
          this.barOption.series.push({
            name: "上月",
            type: "bar",
            data: dataSeries,
          });
          console.log(this.barOption, "??????");
          this.barChart.setOption(this.barOption);
        }
      } else if (this.barOption['series']!=undefined)  {
        this.barOption.series.splice(1, 1);
        this.barChart.setOption(this.barOption, true);
        console.log(this.barOption, "@@@@baroption");
      }
    },
    fomTimeLine() {
      //接口
      const data = this.accounts.filter((el) => {
        return el.mounth == this.currentMounth;
      })[0];
      let date = [];
      let money = [];
      data.items.forEach((el) => {
        if (el.type === 0) {
          const index = date.indexOf(el.date);
          if (index > -1) {
            money[index] += el.money;
          } else {
            money.push(el.money);
            date.push(el.date);
          }
        }
      });
      const option = {
        xAxis: {
          type: "category",
          data: date,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: money,
            type: "line",
          },
        ],
      };
      this.lineChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 72px;
  padding-right: 72px;

  .header {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .preview {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 16px;
    display: flex;
    gap: 16px;
    flex-direction: column;
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      div {
        width: 40%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        background: #8080801f;
        border: 1px solid #8080801f;
        border-radius: 8px;
        .num {
          color: black;
        }
      }
    }
    span {
      display: inline-block;
      width: 100%;
      text-align: left;
      color: gray;
    }
  }

  .contribution {
    padding:16px;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    .body {
      display: flex;
      justify-content: space-between;
      .pie-chart {
        width: 600px;
        height: 500px;
      }
      .bar-chart {
        width: 600px;
        height: 500px;
      }
    }
    .header {
      display: flex;
      justify-content: space-evenly;
    }
  }
  .timeLine {
    width: 600px;
    height: 500px;
    margin: 0 auto;
  }
  .time{
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width:100%;
    padding:16px;
  }
}
</style>