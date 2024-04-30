import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { BarChart, PieChart } from "react-native-gifted-charts";


const PerformanceScreen = () => {
  const pieData = [
    { value: 90, color: '#009FFF', gradientCenterColor: '#006DFF', focused: true },
    { value: 80, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
    { value: 70, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
    { value: 80, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
  ];
  const barData = [
    { value: 90, label: 'R' },
    { value: 80, label: 'W', frontColor: '#177AD5' },
    { value: 70, label: 'L' },
    { value: 80, label: 'S', frontColor: '#177AD5' },
  ];


  return (
    <View style={{ paddingVertical: 30, flex: 1 }}>
      <View style={{ margin: 20, padding: 16, borderRadius: 20, backgroundColor: '#232B5D' }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Performance</Text>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>85</Text>
                  <Text style={{ fontSize: 14, color: 'white' }}>Score</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
      <View>
        <BarChart
          horizontal
          noOfSections={2}
          barWidth={22}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          shiftX={50}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
    </View>
  );
}

const renderDot = (color: any) => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};


const renderLegendComponent = () => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
          {renderDot('#006DFF')}
          <Text style={{ color: 'white' }}>Reading</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
          {renderDot('#8F80F3')}
          <Text style={{ color: 'white' }}>Writing</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20 }}>
          {renderDot('#3BE9DE')}
          <Text style={{ color: 'white' }}>Listening</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
          {renderDot('#FF7F97')}
          <Text style={{ color: 'white' }}>Speaking</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(PerformanceScreen);
