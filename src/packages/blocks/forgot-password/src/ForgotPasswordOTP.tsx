import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
// Customizable Area End

import OTPInputAuthController, {
  Props
} from "../../otp-input-confirmation/src/OTPInputAuthController";

export default class ForgotPasswordOTP extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          <View>
            <Text style={styles.titleWhySignUp}>{this.state.labelInfo}</Text>
            <TextInput
              testID="txtMobilePhoneOTP"
              style={
                Platform.OS === "web"
                  ? styles.phoneInputWeb
                  : styles.phoneInputMobile
              }
              placeholder={this.placeHolderOtp}
              onChangeText={text => this.setState({ otp: text })}
              keyboardType="numeric"
            />

            <Button
              testID="btnSubmitOTP"
              title={this.btnTxtSubmitOtp}
              color={this.submitButtonColor}
              onPress={() => this.submitOtp()}
            />
          </View>
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: Platform.OS === "web" ? "75%" : "100%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },

  phoneInputMobile: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginBottom: 64,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10
  },

  phoneInputWeb: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 64,
    fontSize: 18,
    padding: 10,
    borderBottomColor: "#767676",
    borderBottomWidth: 1
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 10,
    padding: 10
  }
});
// Customizable Area End
