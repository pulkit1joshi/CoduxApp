import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
  decimalPlaces: 0,
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
  labelColor: (opacity = 1) => `grey`,
  padding: 0,
  propsForDots: {
    r: "2"
  }
};

export default class LineG extends React.Component {
  componentDidMount() {
    //console.log(this.props.data);
  }

  getdata = () => {
    var data2 = [];
    var labels = [];
    this.props.data.map((datapoint, index) => {
      data2.push(datapoint);
      labels.push(index);
      return 0;
    });
    //console.log(data2);
    if (!data2) {
      data2 = [1, 2, 3];
    }
    let data = {
      labels: [],
      datasets: [
        {
          data: data2,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        }
      ]
    };

    return data;
  };

  render() {
    //console.log(this.props.data);
    const screenWidth = Math.round(Dimensions.get("window").width - 30);
    if (!screenWidth) screenWidth = 370;
    return (
      <ScrollView horizontal={true}>
        <View style={style.card}>
          <LineChart
            segments={7}
            withInnerLines={true}
            withOuterLines={true}
            withShadow={true}
            data={this.getdata()}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            yLabelsOffset={10}
            style={{
              paddingLeft: 0,
              padding: 0,
              fontSize: 10
            }}
            yAxisInterval={10}
          />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  card: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 0,
    paddingRight: 15,
    paddingTop: 10,
    elevation: 10
  }
});
