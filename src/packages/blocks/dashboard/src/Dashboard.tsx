import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
  ActivityIndicator
} from "react-native";
// Customizable Area End
import DashboardController, { Props } from "./DashboardController";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import moment from "moment";
export default class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  renderDashboardItems = ({ item }: any) => {
    return (
      <View style={styles.dashboardItemView}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row", height: hp("7%") }}
        >
          <View
            style={{
              flex: 2,
              marginLeft: wp("6%"),
              justifyContent: "space-evenly",
              alignItems: "flex-start"
            }}
          >
            <Text style={{ fontSize: this.isPlatformWeb() ? 18 : RFValue(18), textAlign: "center" }}>
              {item.attributes.title}
            </Text>
            <Text style={{ fontSize: this.isPlatformWeb() ? 12 : RFValue(12), textAlign: "center" }}>
              {moment(item.attributes.created_at).format("DD MMM YYYY")}
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: this.isPlatformWeb() ? 14 : RFValue(14), textAlign: "center" }}>
              {item.attributes.value}/-
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  // Customizable Area End
    
  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={{ flex: 1, marginHorizontal: wp("2%") }}>
            {this.state.loading ? (
              <ActivityIndicator style={{ flex: 1, opacity: 1 }} size="large" />
            ) : null}
            {this.state.errorMsg === "" ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <FlatList
                  data={this.state.dashboardData}
                  showsVerticalScrollIndicator={false}
                  extraData={this.state}
                  renderItem={this.renderDashboardItems}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{fontSize: this.isPlatformWeb() ? 18 : RFValue(18)}}>
                  {this.state.errorMsg}
                </Text>
              </View>
            )}
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffff"
  },
  dashboardItemView: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: hp("2%"),
    width: Platform.OS === "web" ? "80vw" : wp("90%"),
    maxWidth: Platform.OS === "web" ? 600 : wp("90%"),
    borderRadius: hp("3%"),
    backgroundColor: "#ffffff",
    shadowColor: "#c3c3c3",
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.62,
    elevation: 6
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}
});
// Customizable Area End
