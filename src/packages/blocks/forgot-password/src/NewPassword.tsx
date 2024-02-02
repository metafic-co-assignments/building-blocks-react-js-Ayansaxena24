import React from "react";

// Customizable Area Start
import {
  View,
  Button,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Formik } from "formik";

import * as Yup from "yup";
// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

export default class NewPassword extends ForgotPasswordController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            Platform.OS === "web" ? styles.containerWeb : styles.containerMobile
          }
        >
          {/* ------------------- HEADER ---------------------- */}
          {/* Customizable Area Start */}
          <View>
            <View style={styles.headline}>
              <Text style={styles.titleText}>
                {this.labelTextIsAccountRecovery}
              </Text>

              {/* ChangePassword */}
              {this.state.accountStatus === "ChangePassword" ? (
                <Text style={styles.stepText}>
                  {this.labelTextIsPleaseEnterYourNewPassword}
                </Text>
              ) : null}

              {/* Confirmation status  */}
              {this.state.accountStatus === "Confirmation" ? (
                <Text style={styles.stepText}>
                  {this.labelTextIsYourPasswordHasBeenSuccessfullyChanged}
                </Text>
              ) : null}
            </View>
          </View>
          {/* -------------------- BODY ----------------------- */}
          <View>
            {this.state.accountStatus === "ChangePassword" ? (
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={Yup.object().shape(this.state.passwordSchema)}
                validateOnMount={true}
                validateOnChange={true}
                onSubmit={(values, actions) => {
                  this.goToConfirmationAfterPasswordChange(values);
                  actions.setSubmitting(false);
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  errors,
                  setFieldTouched,
                  touched
                }) => (
                  <View>
                    <View
                      style={
                        Platform.OS === "web"
                          ? styles.passwordContainerWeb
                          : styles.bgPasswordContainer
                      }
                    >
                      <TextInput
                        testID={"txtInputPassword"}
                        style={
                          Platform.OS === "web"
                            ? styles.passwordInputWeb
                            : styles.bgPasswordInput
                        }
                        placeholder={this.placeholderIsPassword}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password")}
                        secureTextEntry={
                          this.state.enablePasswordField ? true : false
                        }
                      />

                      <TouchableOpacity
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
                              ? this.imgPasswordVisible 
                              : this.imgPasswordInVisible 
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      {touched.password && errors.password ? (
                        <Text style={styles.errorStyle}>{errors.password}</Text>
                      ) : null}
                      <Text
                        style={
                          Platform.OS === "web" ? styles.passwordRulesStyle : {}
                        }
                      >
                        {this.state.passwordRules}
                      </Text>
                    </View>

                    <View
                      style={
                        Platform.OS === "web"
                          ? styles.passwordContainerWeb
                          : styles.bgPasswordContainer
                      }
                    >
                      <TextInput
                        testID={"txtInputConfirmPassword"}
                        style={
                          Platform.OS === "web"
                            ? styles.passwordInputWeb
                            : styles.bgPasswordInput
                        }
                        placeholder={this.placeholderIsReTypePassword}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={() => setFieldTouched("confirmPassword")}
                        secureTextEntry={
                          this.state.btnConfirmPasswordShowHide ? true : false
                        }
                      />

                      <TouchableOpacity
                        style={styles.passwordShowHide}
                        onPress={() => {
                          this.setState({
                            btnConfirmPasswordShowHide: !this.state
                              .btnConfirmPasswordShowHide
                          });
                        }}
                      >
                        <Image
                          style={styles.imgPasswordShowhide}
                          source={
                            this.state.btnConfirmPasswordShowHide
                              ? this.imgPasswordVisible 
                              : this.imgPasswordInVisible 
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <Text style={styles.errorStyle}>
                          {errors.confirmPassword}
                        </Text>
                      ) : null}
                    </View>

                    <View style={{ zIndex: -1, padding: 15 }}>
                      <Button
                        testID={"changePasswordButton"}
                        title={this.buttonTextIsNext}
                        color={this.buttonColorForNextButton}
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            ) : null}

            {this.state.accountStatus === "Confirmation" ? (
              <View style={{ zIndex: -1, padding: 15 }}>
                <Button
                  testID={"goToHomeButton"}
                  title={this.buttonTitleIsOk}
                  color={this.buttonColorForOkButton}
                  onPress={() => this.goToHome()}
                />
              </View>
            ) : null}
          </View>
          {/* Customizable Area End */}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650
  },
  countryCodeSelector: {
    flex: 3,
    marginTop: 20,
    textAlign: "left",
    textAlignVertical: "center"
  },
  button: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    zIndex: -1
  },

  flexContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "100%"
  },

  headline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  webInput: {
    marginTop: 20,
    width: "100%",
    zIndex: -1
  },

  inputAfterCountryCode: {
    width: "100%",
    zIndex: -1
  },

  mobileInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true
  },

  codeInput: {
    marginTop: 20,
    width: "30%"
  },

  phoneInput: {
    flex: 3,
    marginTop: 20
  },

  noBorder: {
    borderBottomWidth: 0
  },

  titleText: {
    fontSize: 32,
    color: "#6200EE",
    fontWeight: "bold"
  },

  stepText: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },

  emailText: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
    fontWeight: "bold"
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginTop: 20,
    minHeight: 40,
    fontSize: 18,
    textAlignVertical: "center",
    padding: 10
  },

  bgRectWeb: {
    marginTop: 40
  },

  errorStyle: {
    color: "red",
    textAlign: "center"
  },

  passwordShowHide: {
    alignSelf: "center"
  },

  passwordRulesStyle: {
    padding: 15
  },

  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5
  },

  passwordContainerWeb: {
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "#00000000",
    borderColor: "#767676",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true
  },
  passwordInputWeb: {
    flex: 1,
    fontSize: 18,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    borderColor: "#767676",
    borderRadius: 2
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}
});
// Customizable Area End
