import React from "react";

//Customizable Area Start
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";

import { Formik } from "formik";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            this.isPlatformWeb() ? styles.containerWeb : styles.containerMobile
          }
        >
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            {/* Customizable Area Start */}
            <View>
              {/* headline */}
              <View style={styles.headline}>
                <Text style={styles.titleText}>
                  {this.labelTextIsAccountRecovery}
                  {/* ----------------------------------------------------CHOOSE ACCOUNT TEXT---------------------------------------------------------------------- */}
                </Text>
                {this.state.accountStatus === "ChooseAccountType" ? (
                  <Text style={styles.stepText}>{this.secondLabelText}</Text>
                ) : null}

                {/* ---------------------------------------------------------EMAIL TEXT-------------------------------------------------------------------------- */}

                {/* EnterEmail status */}
                {this.state.accountStatus === "EnterEmail" ? (
                  <Text style={styles.stepText}>{this.thirdLabelText}</Text>
                ) : null}

                {/* EnterOTP status */}
                {this.state.accountStatus === "EnterEmailOTP" ? (
                  <Text style={styles.stepText}>{this.forthLabelText}</Text>
                ) : null}
                {/* EnterOTP status */}
                {this.state.accountStatus === "EnterEmailOTP" ? (
                  <Text style={styles.emailText}>{this.state.emailValue}</Text>
                ) : null}

                {/* ---------------------------------------------------------PHONE TEXT----------------------------------------------------------------------- */}

                {/* EnterEmail status */}
                {this.state.accountStatus === "EnterPhone" ? (
                  <Text style={styles.stepText}>{this.fifthLabelText}</Text>
                ) : null}

                {/* EnterOTP status */}
                {this.state.accountStatus === "EnterPhoneOTP" ? (
                  <Text style={styles.stepText}>{this.sixthLabelText}</Text>
                ) : null}
                {/* EnterOTP status */}
                {this.state.accountStatus === "EnterPhoneOTP" ? (
                  <Text style={styles.emailText}>{this.state.phoneValue}</Text>
                ) : null}
              </View>

              {/* ---------------------------------------------------------ENTER EMAIL---------------------------------------------------------------------- */}

              {this.state.accountStatus === "EnterEmail" ? (
                <Formik
                  initialValues={{ accountType: "email_account", email: "" }}
                  validationSchema={Yup.object().shape(this.state.emailSchema)}
                  validateOnMount={true}
                  validateOnChange={true}
                  onSubmit={(values, actions) => {
                    this.goToOtpAfterEmailValidation(values);
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
                          this.isPlatformWeb()
                            ? styles.webInput
                            : styles.mobileInput
                        }
                      >
                        <Input
                          testID={"txtInputEmail"}
                          autoCompleteType={this.firstInputAutoCompleteType}
                          keyboardType={this.firstInputKeyboardStyle}
                          inputContainerStyle={
                            this.isPlatformWeb()
                              ? styles.webInput
                              : styles.noBorder
                          }
                          placeholder={this.firstInputPlaceholder}
                          onChangeText={handleChange("email")}
                          onBlur={() => setFieldTouched("email")}
                          errorStyle={{ color: this.firstInputErrorColor }}
                        />
                        {touched.email && errors.email ? (
                          <Text style={styles.errorStyle}>{errors.email}</Text>
                        ) : null}
                      </View>

                      <View style={{ zIndex: -1, padding: 15 }}>
                        <Button
                          testID={"btnGetOtpForEmailButton"}
                          title={this.buttonTextIsNext}
                          color={this.buttonColorForNextButton}
                          onPress={() => handleSubmit()}
                        />
                      </View>
                    </View>
                  )}
                </Formik>
              ) : null}
              {/* ---------------------------------------------------------ENTER PHONE #---------------------------------------------------------------------- */}

              {this.state.accountStatus === "EnterPhone" ? (
                <Formik
                  initialValues={{ countryCode: "", phone: "" }}
                  validationSchema={Yup.object().shape(this.state.phoneSchema)}
                  validateOnMount={true}
                  validateOnChange={true}
                  onSubmit={(values, actions) => {
                    this.goToOtpAfterPhoneValidation(values);
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
                          this.isPlatformWeb()
                            ? styles.bgRectWeb
                            : styles.bgRectBorder
                        }
                      >
                        <CountryCodeSelector
                          style={{}}
                          navigation={this.isPlatformWeb() ? null : navigation}
                          id={"CountryCodeSelector"}
                          placeHolder={this.countryCodeSelectorPlaceholder}
                          disable={false}
                          value={this.state.countryCodeSelected}
                        />
                      </View>

                      <View
                        style={
                          this.isPlatformWeb()
                            ? styles.webInput
                            : styles.mobileInput
                        }
                      >
                        <Input
                          testID={"txtInputPhoneNumber"}
                          autoCompleteType={this.secondInputAutoCompleteType}
                          keyboardType={this.secondInputKeyboardType}
                          inputContainerStyle={
                            this.isPlatformWeb()
                              ? styles.webInput
                              : styles.noBorder
                          }
                          placeholder={this.secondInputPlaceholder}
                          onChangeText={handleChange("phone")}
                          onBlur={() => setFieldTouched("phone")}
                          errorStyle={{ color: this.secondInputErrorColor }}
                        />
                        {this.isPlatformWeb() &&
                        touched.phone &&
                        errors.phone ? (
                          <Text style={styles.errorStyle}>{errors.phone}</Text>
                        ) : null}
                      </View>

                      <View style={{ zIndex: -1, padding: 15 }}>
                        <Button
                          testID={"btnOtpForPhoneNumberButton"}
                          title={this.buttonTextIsNext}
                          color={this.buttonColorForNextButton}
                          onPress={() => handleSubmit()}
                        />
                      </View>
                    </View>
                  )}
                </Formik>
              ) : null}
              {/* -------------------------------------------------------ENTER OTP-------------------------------------------------------------------- */}

              {this.state.accountStatus === "EnterPhoneOTP" ||
              this.state.accountStatus === "EnterEmailOTP" ? (
                <Formik
                  initialValues={{ otpCode: "" }}
                  validationSchema={Yup.object().shape(this.state.otpSchema)}
                  validateOnMount={true}
                  validateOnChange={true}
                  onSubmit={(values, actions) => {
                    this.goToChangePasswordAfterOtp(values);
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
                          this.isPlatformWeb()
                            ? styles.webInput
                            : styles.mobileInput
                        }
                      >
                        <Input
                          testID={"txtInputOtpCode"}
                          inputContainerStyle={
                            this.isPlatformWeb()
                              ? styles.webInput
                              : styles.noBorder
                          }
                          placeholder={this.thirdInputPlaceholder}
                          onChangeText={handleChange("otpCode")}
                          onBlur={() => setFieldTouched("otpCode")}
                          errorStyle={{ color: this.thirdInputErrorColor }}
                        />
                        {this.isPlatformWeb() &&
                        touched.otpCode &&
                        errors.otpCode ? (
                          <Text style={styles.errorStyle}>
                            {errors.otpCode}
                          </Text>
                        ) : null}
                      </View>

                      <View style={{ zIndex: -1, padding: 15 }}>
                        <Button
                          testID={"handleSubmitButtonForOtpCode"}
                          title={this.buttonTextIsNext}
                          color={this.buttonColorForNextButton}
                          onPress={() => handleSubmit()}
                        />
                      </View>
                    </View>
                  )}
                </Formik>
              ) : null}
              {/* -----------------------------------------------------CHOOSE ACCOUNT----------------------------------------------------------------------- */}

              {this.state.accountStatus === "ChooseAccountType" ? (
                <View style={{ zIndex: -1, padding: 15 }}>
                  <Button
                    testID={"startForgotPasswordButtonForForgotPasswordSMS"}
                    title={this.buttonTitleIsSMSPhoneAccount}
                    color={this.buttonColorForNextButton}
                    onPress={() => this.startForgotPassword("sms")}
                  />
                  <View style={{ zIndex: -1, padding: 15 }} />
                  <Button
                    testID={"startForgotPasswordButtonForForgotEmail"}
                    title={this.buttonTitleIsEmailAccount}
                    color={this.buttonColorForNextButton}
                    onPress={() => this.startForgotPassword("email")}
                  />
                </View>
              ) : null}
            </View>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
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
    flexDirection: "column",
    alignItems: "stretch",
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
  }
});
