import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  View
} from "react-native";
// Customizable Area End

import LandingPageController, {
  Props,
  configJSON
} from "./LandingPageController";

export default class LandingPage extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
      {/* Customizable Area Start */}
        <View style={styles.landingPageView}>
          <Text style={styles.landingPageText}>
            Landing Page
          </Text>
          <View style={{ zIndex: -1, padding: 15 }}>
            <Button
              testID={"goToHomeButton"}
              title={"Go Home"}
              color={"#6200EE"}
              onPress={() => this.goToHome()}
            />
          </View>
        </View>
      {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  landingPageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  landingPageText: {
    fontSize: 42,
    letterSpacing: 2,
    fontWeight: "bold",
    color: "#323441",
    marginTop: 15
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
// Customizable Area End
