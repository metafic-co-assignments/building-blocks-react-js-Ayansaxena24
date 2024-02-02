import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
// Customizable Area End

import PhoneNumberInputController, {
  Props,
} from "./PhoneNumberInputController";

export default class PhoneNumberInput extends PhoneNumberInputController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const { navigation } = this.props;

    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={
          Platform.OS === "web" ? styles.containerWeb : styles.containerMobile
        }
      >
        <TouchableWithoutFeedback
          testID="Background"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            <Text style={styles.titleWhySignUp}>{this.bodyText}</Text>
            <Text style={styles.titleOtpInfo}>{this.labelInfo}</Text>

            <View style={styles.areaMobileContainer}>
              <View style={styles.scrollViewContainer}>
                <CountryCodeSelector
                  navigation={this.isPlatformWeb() ? null : navigation}
                  id={"CountryCodeSelector"}
                  placeHolder={this.placeHolderSelectCountry}
                  style={styles.bgRectBorder}
                  disable={false}
                  value={this.getState("CountryCodeSelector")}
                />
              </View>

              <TextInput
                testID="txtInputPhoneNumber"
                style={
                  Platform.OS === "web"
                    ? styles.phoneInputWeb
                    : styles.bgMobileInput
                }
                placeholder={this.placeHolderMobile}
                onChangeText={(text) =>
                  this.changeState("txtInputPhoneNumber", text)
                }
                autoCompleteType="tel"
                keyboardType="phone-pad"
                value={String(this.getState("txtInputPhoneNumber"))}
              />
            </View>

            <View style={styles.viewContainer}>
              <Button
                testID={"btnSendOtp"}
                title={this.btnTxtSendOtp}
                color="#6200EE"
                onPress={() => this.processOnClickMessage("btnSendOtp")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create(
  {
    // Customizable Area Start
    containerMobile: {
      flex: 1,
      padding: 16,
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      maxWidth: 650,
      backgroundColor: "#fff",
    },
    containerWeb: {
      padding: 16,
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 650,
    },
    titleWhySignUp: {
      marginBottom: 32,
      fontSize: 16,
      textAlign: "left",
      marginVertical: 8,
    },
    titleOtpInfo: {
      marginBottom: 32,
      fontSize: 16,
      textAlign: "left",
      marginVertical: 8,
    },

    bgMobileInput: {
      flexDirection: "row",
      fontSize: 16,
      textAlign: "left",
      backgroundColor: "#00000000",
      marginBottom: 64,
      borderWidth: 1,
      borderColor: "#767676",
      borderRadius: 2,
      includeFontPadding: true,
      padding: 10,
    },

    phoneInputWeb: {
      flex: 1,
      flexDirection: "row",
      marginBottom: 64,
      fontSize: 18,
      padding: 10,
      borderBottomColor: "#767676",
      borderBottomWidth: 1,
    },

    bgRectBorder: {
      borderWidth: 1,
      borderColor: "#767676",
      borderRadius: 2,
      marginBottom: 10,
      padding: 10,
      zIndex: 999,
    },
    viewContainer: {
      zIndex: -1,
    },
    scrollViewContainer: {
      flex: 1,
      marginRight: Platform.OS === "web" ? 16 : 0,
    },
    areaMobileContainer:
      Platform.OS === "web" ? { flex: 1, flexDirection: "column" } : {},
  }
  // Customizable Area End
);
