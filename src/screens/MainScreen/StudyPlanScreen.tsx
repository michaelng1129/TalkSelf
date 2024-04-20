import React, { memo, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SvgChart } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';

// Register components
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart]);

// 定義 option 物件的結構
interface ChartOption {
  xAxis: {
    type: 'category',
    data: string[],
  };
  yAxis: {
    type: 'value',
  };
  series: {
    data: number[],
    type: 'bar',
  }[];
}

const E_HEIGHT = 250;
const E_WIDTH = 300;

function StudyPlanScreen({ option }: { option: ChartOption }) {
//   const chartRef = useRef<any>(null);

//   useEffect(() => {
//     let chart: any;
//     if (chartRef.current) {
//       chart = echarts.init(chartRef.current, 'light', {
//         renderer: 'svg',
//         width: E_WIDTH,
//         height: E_HEIGHT,
//       });
//       chart.setOption(option);
//     }
//     return () => chart?.dispose();
//   }, [option]);

//   return <SvgChart ref={chartRef} />;
// }

// const StudyPlanScreen = () => {
//   const option: ChartOption = {
//     xAxis: {
//       type: 'category',
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     },
//     yAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: 'bar',
//       },
//     ],
//   }

  return (
    <View style={styles.container}>
      {/* <ChartComponent option={option} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(StudyPlanScreen);

