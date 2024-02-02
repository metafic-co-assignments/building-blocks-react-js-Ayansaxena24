import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  ScrollView,
  Platform,
  TouchableWithoutFeedback
} from "react-native";

import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import CustomCheckBox from "../../../components/src/CustomCheckBox";
// Customizable Area End

import MobileAccountLoginController, {
  Props
} from "./MobileAccountLoginController";

export default class MobileAccountLoginBlock extends MobileAccountLoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID="Background"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            {this.isPlatformWeb() ? (
              <Text style={styles.labelTitle}>{this.labelTitle}</Text>
            ) : null}

            <Text style={styles.titleWhySignUp}>{this.state.labelHeader}</Text>
            <View style={styles.areaMobileContainer}>
              <View style={styles.scrollViewContainer}>
                <CountryCodeSelector
                  navigation={this.isPlatformWeb() ? null : navigation}
                  id={"CountryCodeSelector"}
                  placeHolder={this.state.placeHolderCountryCode}
                  style={styles.bgRectBorder}
                  disable={false}
                  value={this.state.countryCodeSelected}
                />
              </View>

              <TextInput
                testID="txtInputPhoneNumber"
                style={styles.bgMobileInput}
                placeholder={this.state.placeHolderMobile}
                onChangeText={text => this.setState({ mobileNo: text })}
                autoCompleteType="tel"
                keyboardType="phone-pad"
                value={this.state.mobileNo}
              />
            </View>

            <View style={styles.bgPasswordContainer}>
              <TextInput
                testID="txtInputPassword"
                style={styles.bgPasswordInput}
                placeholder={this.state.placeHolderPassword}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry={this.state.enablePasswordField}
                value={this.state.password}
              />

              <TouchableOpacity
                testID="btnPasswordShowHide"
                style={styles.passwordShowHide}
                onPress={() => {
                  this.setState({
                    enablePasswordField: !this.state.enablePasswordField
                  });
                }}
              >
                <Image
                  style={styles.imgPasswordShowhide}
                  source={
                    this.state.enablePasswordField
                      ? this.state.imgPasswordVisible
                      : this.state.imgPasswordInVisible
                  }
                />
              </TouchableOpacity>
            </View>
            <Text
              testID="btnForgotPassword"
              style={styles.forgotPassword}
              onPress={() => this.goToForgotPassword()}
            >
              {this.state.labelForgotPassword}
            </Text>

            <View style={styles.checkBoxContainerView}>
              <CustomCheckBox
                testID={"CustomCheckBox"}
                isChecked={this.state.checkedRememberMe}
                onChangeValue={value => {
                  this.setState({
                    checkedRememberMe: value
                  });
                }}
              />

              <Text
                testID="btnRememberMe"
                onPress={() => {
                  this.setState({
                    checkedRememberMe: !this.state.checkedRememberMe
                  });
                }}
                style={styles.rememberMe}
              >
                {this.state.labelRememberMe}
              </Text>
            </View>

            <View style={styles.btnLogInContainer}>
              <Button
                testID="btnMobileLogIn"
                title={this.state.btnTxtLogin}
                color="#6200EE"
                onPress={() => this.doMobileLogIn()}
              />
            </View>

            <Text style={styles.orLabel}>{this.getState("labelOr")}</Text>
            <Text
              testID="btnSocialLogin"
              style={styles.bgOtherLoginButton}
              onPress={() => this.goToSocialLogin()}
            >
              {this.state.btnTxtSocialLogin}
            </Text>
            <Text
              testID="btnEmailLogin"
              style={styles.bgOtherLoginButton}
              onPress={() => this.goToEmailLogin()}
            >
              {this.state.btnTxtEmailLogin}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  scrollViewContainer: {
    flex: 1,
    marginRight: 0
  },
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
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

  bgOtherLoginButton: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    color: "#6200EE",
    fontWeight: "bold"
  },

  bgMobileInput: {
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    flex: 1
  },

  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true
  },
  passwordShowHide: {
    alignSelf: "center"
  },

  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: -1
  },

  bgRectBorder: {
    borderWidth: 1,
    zIndex: 999,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 10,
    padding: 16,
    flex: 1
  },
  labelTitle: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 32,
    textAlign: "left",
    marginVertical: 8,
    color: "#6200EE"
  },
  forgotPassword: {
    color: "#6200EE",
    fontWeight: "bold",
    marginBottom: 10,
    zIndex: -1
  },
  checkBoxContainerView: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: -7,
    zIndex: -1
  },
  rememberMe: {
    color: "#6200EE",
    fontWeight: "bold",
    alignSelf: "center",
    zIndex: -1
  },
  orLabel: {
    color: "#00000000",
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20
  },
  btnLogInContainer: {
    zIndex: -1
  },
  areaMobileContainer:
    Platform.OS === "web" ? { flex: 1, flexDirection: "column" } : {},

  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}
  // Customizable Area End
});
