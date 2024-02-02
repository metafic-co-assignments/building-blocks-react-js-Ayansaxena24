import React from "react";
// Customizable Area Start
import { 
  StyleSheet, 
  Text, 
  Image, 
  View, 
  SafeAreaView 
} from "react-native";
// Customizable Area End

import SplashscreenController, { Props } from "./SplashscreenController";

import { imgSplash } from "./assets";

export default class Splashscreen extends SplashscreenController {
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
        <View style={styles.logoView}>
          <Image source={imgSplash} style={{width:300, height:150}}/>
          <Text testID="txtLogo" style={styles.logoText}>
            YLanes1
          </Text>
        </View>
      {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
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
