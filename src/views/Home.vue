<template>
  <div style="background-color: #dacfcf;height: 100%;">
  <div class="jianbian">
    <router-view></router-view>
    <h1>Welcome to use <br><br>
    Employee Management System</h1>
  </div>
    <el-row>
    <el-col :span="12">
  <div id="main" style="width:600px;height:600px; margin-top: 80px;"></div>
    </el-col>
    <el-col :span="12">
  <div id="pie" style="width: 600px;height: 600px; margin-top: 80px;"></div>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    //折线图
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: 'Number of employees by quarter',
        subtext: 'Trend Chart',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['First quarter','Second quarter','Third Quarter','Fourth Quarter']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        },
        {
          data: [],
          type: 'bar'
        },
      ]
    };
    this.axios.get("/wang/echarts/memeber").then(res => {
      //option.xAxis.data = res.data.x;
      option.series[0].data = res.data;
      option.series[1].data = res.data;
      //数据准备完毕后set
      myChart.setOption(option);
    })

    //饼图
    var pieDom = document.getElementById('pie');
    var pieChart = echarts.init(pieDom);
    var pieoption = {
      title: {
        text: 'Number of employees by quarter',
        subtext: 'Pie Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          label:{
            normal:{
              show:true,
              position:'inner',
              textStyle:{
                fontWeight:300,
                fontSize:16
              },
              formatter:'{d}%'
            }
          },
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.axios.get("/wang/echarts/gender").then(res => {
      pieoption.series[0].data = [
        {name:"woman",value:res.data[0]},
        {name:"man",value:res.data[1]},
      ]
      //数据准备完毕后set
      pieChart.setOption(pieoption);
    })
  },
  methods: {},
};
</script>

<style scoped>
h1 {
  overflow: hidden;
  font-size: 27px;
  width: 0;
  height: 50%;
  line-height: 50%;
  margin: 100px auto;
  color: #fff;
  /* background: lightcoral; */
  white-space: nowrap;
  animation: w 4s steps(13) forwards;
  text-align: center;
  padding-top: 25px;
}
@keyframes w {
  0% {
    width: 0;
  }
  100% {
    width: 1100px;
  }
}
.jianbian {
  height: 100px;
  width: 100%;
  font-family: "montserrat";
  background-image: linear-gradient(
    45deg,
    #2c3e50,
    #27ae60,
    #2980b9,
    #e74c3c,
    #8e44ad
  );
  background-size: 400%;
  animation: bganimation 15s infinite;
  margin-top: -100px;
}
@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>


