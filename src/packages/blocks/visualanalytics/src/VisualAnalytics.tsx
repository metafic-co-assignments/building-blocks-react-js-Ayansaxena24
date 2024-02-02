import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Text,
  Platform,
} from "react-native";

import scale, { verticalScale } from "../../../components/src/Scale";
import { StackedBarChart } from "react-native-chart-kit";
// Customizable Area End

import VisualAnalyticsController, {
  Props,
  configJSON,
} from "./VisualAnalyticsController";

export default class VisualAnalytics extends VisualAnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          {this.state.info.data ? (
            <StackedBarChart
              style={styles.chart}
              data={this.state.info}
              width={Dimensions.get("window").width * 0.9}
              height={scale(300)}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              hideLegend={true}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 0) => `rgba(0, 0, 0,${opacity})`,
                labelColor: (opacity = 0) => `rgba(0, 0 , 0, ${opacity})`,
                barPercentage: 1.5,
              }}
            />
          ) : (
            <View>
              <Text style={styles.body}>
                Invaild data.{JSON.stringify(this.state.info)}
              </Text>
            </View>
          )}
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
    flex: 1,
  },
});
// Customizable Area End
