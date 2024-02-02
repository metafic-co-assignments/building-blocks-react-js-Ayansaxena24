import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import {
  onBoardingOne,
  onboardingThree,
  onBoardingTwo,
  onboardingFour
} from "../src/assets";
import Onboarding from "react-native-onboarding-swiper";
// Customizable Area End
import OnboardingguideController, {
  Props,
  configJSON
} from "./OnboardingguideController";

export default class Onboardingguide extends OnboardingguideController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  Done = () => (
    <TouchableOpacity
      testID="btnDone"
      onPress={() => this.exitOnboarding()}
      style={{ alignSelf: "flex-end", marginRight: 20 }}
    >
      <Text style={{ fontSize: 16, fontWeight: "100" }}>Done</Text>
    </TouchableOpacity>
  );
  // Customizable Area Done

  render() {
    return (
      // Customizable Area Start
      <Onboarding
        onSkip={() => this.skipOnboarding()}
        onDone={() => this.exitOnboarding()}
        DoneButtonComponent={this.Done}
        containerStyles={{
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
        pages={[
          {
            backgroundColor: "white",
            image: (
              <SafeAreaView style={styles.container}>
                <View style={styles.parent}>
                  <Image
                    source={onBoardingOne}
                    resizeMode={"contain"}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.ovalShape} />
              </SafeAreaView>
            ),
            title: (
              <View style={styles.title}>
                <Text style={styles.textStyle}>{configJSON.title1}</Text>
              </View>
            ),

            subtitle: configJSON.subtitle1,
            titleStyles: { color: "black", fontSize: 20 }
          },
          {
            backgroundColor: "white",
            image: (
              <SafeAreaView style={styles.container}>
                <View style={styles.parent}>
                  <Image
                    source={onBoardingTwo}
                    resizeMode={"contain"}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.ovalShape} />
              </SafeAreaView>
            ),
            title: (
              <View style={styles.title}>
                <Text style={styles.textStyle}>{configJSON.title2}</Text>
              </View>
            ),
            subtitle: configJSON.subtitle2,
            titleStyles: { color: "black", fontSize: 20 }
          },

          {
            backgroundColor: "white",
            image: (
              <SafeAreaView style={styles.container}>
                <View style={styles.parent}>
                  <Image
                    source={onboardingThree}
                    resizeMode={"contain"}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.ovalShape} />
              </SafeAreaView>
            ),
            title: (
              <View style={styles.title}>
                <Text style={styles.textStyle}>{configJSON.title3}</Text>
              </View>
            ),
            subtitle: configJSON.subtitle3,
            titleStyles: { color: "black", fontSize: 20 }
          },

          {
            backgroundColor: "white",
            image: (
              <SafeAreaView style={styles.container}>
                <View style={styles.parent}>
                  <Image
                    source={onboardingFour}
                    resizeMode={"contain"}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.ovalShape} />
              </SafeAreaView>
            ),
            title: (
              <View style={styles.title}>
                <Text style={styles.textStyle}>{configJSON.title4}</Text>
              </View>
            ),
            subtitle: configJSON.subtitle4,
            titleStyles: { color: "black", fontSize: 20 }
          }
        ]}
      />
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "blue"
  },

  title: {
    alignSelf: "center",
    padding: 15
  },

  parent: {
    backgroundColor: "cornflowerblue",
    width: "100%",
    alignSelf: "center"
  },

  imageStyle: {
    height: 280,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    marginTop: 40
  },

  ovalShape: {
    width: 200,
    height: 200,
    backgroundColor: "cornflowerblue",
    borderRadius: 100,
    alignSelf: "center",
    transform: [{ scaleX: 3 }],
    position: "absolute",
    bottom: -50,
    zIndex: -1
  },

  textStyle: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
// Customizable Area End
