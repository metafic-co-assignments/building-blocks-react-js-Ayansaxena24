import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

import AdditionalDetailFormController, {
  Props,
} from "./AdditionalDetailFormController";

export default class AdditionalDetailForm extends AdditionalDetailFormController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
              <Text style={styles.titleWhySignUp}>{this.labelHeader}</Text>

              <TextInput
                testID={"txtInputFirstName"}
                style={Platform.OS === "web" ? styles.inputWeb : styles.bgInput}
                placeholder={this.labelFirstName}
                onChangeText={(text) =>
                  this.changeState("txtInputFirstName", text)
                }
              />

              <TextInput
                testID={"txtInputLastName"}
                style={Platform.OS === "web" ? styles.inputWeb : styles.bgInput}
                placeholder={this.lastName}
                onChangeText={(text) =>
                  this.changeState("txtInputLastName", text)
                }
              />

              <TextInput
                testID={"txtInputEmail"}
                style={Platform.OS === "web" ? styles.inputWeb : styles.bgInput}
                placeholder={this.labelEmail}
                onChangeText={(text) => this.changeState("txtInputEmail", text)}
                keyboardType="email-address"
              />

              <View style={styles.bgPasswordContainer}>
                <TextInput
                  testID={"txtInputPassword"}
                  style={styles.bgPasswordInput}
                  placeholder={this.labelPassword}
                  onChangeText={(text) =>
                    this.changeState("txtInputPassword", text)
                  }
                  secureTextEntry={Boolean(this.getState("txtInputPassword"))}
                />

                <TouchableOpacity
                  testID={"btnPasswordShowHide"}
                  style={styles.passwordShowHide}
                  onPress={() => {
                    this.toggleState("btnPasswordShowHide");
                  }}
                >
                  <Image
                    testID={"imgEnablePasswordField"}
                    style={styles.imgPasswordShowhide}
                    source={
                      this.getState("imgEnablePasswordField")
                        ? imgPasswordVisible
                        : imgPasswordInVisible
                    }
                  />
                </TouchableOpacity>
              </View>

              <Text>{this.state.passwordHelperText}</Text>
              <View style={styles.bgPasswordContainer}>
                <TextInput
                  testID={"txtInputConfirmPassword"}
                  style={styles.bgPasswordInput}
                  placeholder={this.labelRePassword}
                  onChangeText={(text) =>
                    this.changeState("txtInputConfirmPassword", text)
                  }
                  secureTextEntry={Boolean(
                    this.getState("txtInputConfirmPassword")
                  )}
                />

                <TouchableOpacity
                  testID={"btnConfirmPasswordShowHide"}
                  style={styles.passwordShowHide}
                  onPress={() => {
                    this.toggleState("btnConfirmPasswordShowHide");
                  }}
                >
                  <Image
                    testID={"imgEnableRePasswordField"}
                    style={styles.imgPasswordShowhide}
                    source={
                      this.getState("imgEnableRePasswordField")
                        ? imgPasswordVisible
                        : imgPasswordInVisible
                    }
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.leagalText}>{this.labelLegalText}</Text>

              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: 30,
                }}
              >
                <Text
                  testID={"btnLegalTermsAndCondition"}
                  style={styles.btnLegalTermsAndCondition}
                  onPress={() =>
                    this.processOnClickMessage("btnLegalTermsAndCondition")
                  }
                >
                  {this.labelLegalTermCondition}
                </Text>
                <Text
                  testID={"btnLegalPrivacyPolicy"}
                  onPress={() =>
                    this.processOnClickMessage("btnLegalPrivacyPolicy")
                  }
                  style={styles.btnLegalPrivacyPolicy}
                >
                  {this.labelLegalPrivacyPolicy}
                </Text>
              </View>

              <Button
                testID={"btnSignUp"}
                title={this.btnTextSignUp}
                color="#6200EE"
                onPress={() => this.processOnClickMessage("btnSignUp")}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    // Customizable Area End
  }
}
const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#fff",
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
  bgInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
  },

  inputWeb: {
    flex: 1,
    flexDirection: "row",
    marginTop: 24,
    fontSize: 18,
    padding: 10,
    borderBottomColor: "#767676",
    includeFontPadding: true,
    borderBottomWidth: 1,
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 10,
  },
  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    marginTop: 10,
    paddingLeft: 0,
  },
  passwordShowHide: {
    alignSelf: "center",
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
    zIndex: -1,
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  keyboardPadding: { flex: 1 },
  btnLegalTermsAndCondition: { color: "#6200EE" },
  btnLegalPrivacyPolicy: { color: "#6200EE", marginLeft: "auto" },
  leagalText: { marginTop: 10 },
  // Customizable Area End
});
