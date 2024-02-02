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
  KeyboardAvoidingView
} from "react-native";

import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
// Customizable Area End

import UserProfileBasicController, {
  Props
} from "./UserProfileBasicController";

export default class UserProfileBasicBlock extends UserProfileBasicController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    return (
      //Required for all blocks
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Required for all blocks */}
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            {/* Merge Engine UI Engine Code */}
            <View>
              <Text style={styles.titleWhySignUp}>{this.labelHeader}</Text>

              <Text style={styles.title}>{this.labelFirstName}</Text>
              <TextInput
                testID={"txtInputFirstName"} //Merge Engine::From BDS
                style={styles.bgInput} //UI Engine::From Sketch
                placeholder={this.labelFirstName} //UI Engine::From Sketch
                {...this.txtInputFirstNameProps} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <Text style={styles.title}>{this.lastName}</Text>
              <TextInput
                testID={"txtInputLastName"} //Merge Engine::From BDS
                style={styles.bgInput} //UI Engine::From Sketch
                placeholder={this.lastName} //UI Engine::From Sketch
                {...this.txtInputLastNameProps} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <Text style={styles.title}>{this.labelArea}</Text>
              <CountryCodeSelector
                allowPropChange={true}     //Merge Engine::From BDS
                navigation={navigation}    //Merge Engine::From BDS
                id={"CountryCodeSelector"} //Merge Engine::From BDS
                placeHolder={this.state.currentCountryCode} //UI Engine::From Sketch
                style={styles.bgRectBorder} //UI Engine::From Sketch
                disable={!this.state.countryCodeEnabled}  //Merge Engine::From BDS
                value={this.state.currentCountryCode} //Merge Engine::From BDS
              /> 

              <Text style={styles.title}>{this.labelMobile}</Text>
              <TextInput
                testID={"txtInputPhoneNumber"} //Merge Engine::From BDS
                style={styles.bgMobileInput} //UI Engine::From Sketch
                placeholder={this.labelMobile} //UI Engine::From Sketch
                {...this.txtInputPhoneNumberProps} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <Text style={styles.title}>{this.labelEmail}</Text>
              <TextInput
                testID={"txtInputEmail"} //Merge Engine::From BDS
                style={styles.bgInput} //UI Engine::From Sketch
                placeholder={this.labelEmail} //UI Engine::From Sketch
                {...this.txtInputEmailProps} //Merge Engine::From BDS - {...this.testIDProps}
              />

              {this.state.llChangePwdDummyShowContainerVisible ? (
                <View>
                  <Text style={styles.title}>{this.labelCurrentPassword}</Text>
                  <Text style={styles.bgDummyPassword}>*********</Text>

                  <View style={{ marginTop: 24, marginBottom: 16 }}>
                    <Button
                      testID={"btnEnableEditPassword"} //Merge Engine::From BDS
                      title={this.btnTextChangePassword}  //UI Engine::From Sketch
                      color="#6200EE"                     //UI Engine::From Sketch
                      {...this.btnEnableEditPasswordProps} //Merge Engine::From BDS - {...this.testIDProps}
                    />
                  </View>
                </View>
              ) : null}

              {this.state.llDoChangePwdContainerVisible ? (
                <View>
                  <Text style={styles.title} //UI Engine::From Sketch
                  >   
                    {this.labelCurrentPassword}
                    {/*UI Engine::From Sketch*/}
                  </Text>
                  <View
                    style={styles.bgPasswordContainer} //UI Engine::From Sketch
                  >
                    <TextInput
                      testID={"txtInputCurrentPassword"} //Merge Engine::From BDS
                      style={styles.bgPasswordInput} //UI Engine::From Sketch
                      placeholder={this.labelCurrentPassword} //UI Engine::From Sketch
                      {...this.txtInputCurrentPasswordProps} //Merge Engine::From BDS - {...this.testIDProps}
                    />

                    <TouchableOpacity
                      testID={"btnPasswordShowHideButton"} //Merge Engine::From BDS
                      style={styles.passwordShowHide} //UI Engine::From Sketch
                      {...this.btnPasswordShowHideButtonProps} //Merge Engine::From BDS - {...this.testIDProps}
                    >
                      <Image
                        testID ={"imgPasswordShowhide"}  //Merge Engine::From BDS
                        style={styles.imgPasswordShowhide} //UI Engine::From Sketch
                        {...this.imgPasswordShowhideProps} //Merge Engine::From BDS - {...this.testIDProps}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text 
                    style={styles.title} //UI Engine::From Sketch
                  >{this.labelNewPassword}
                  {/*UI Engine::From Sketch*/} 
                  </Text>
                  <View style={styles.bgPasswordContainer} //UI Engine::From Sketch
                  >
                    <TextInput
                      testID={"txtInputNewPassword"} //Merge Engine::From BDS
                      style={styles.bgPasswordInput} //UI Engine::From Sketch
                      placeholder={this.labelNewPassword} //UI Engine::From Sketch
                      {...this.txtInputNewPasswordProps}  //Merge Engine::From BDS - {...this.testIDProps}
                    />

                    <TouchableOpacity
                      testID={"btntNewPasswordShowHideButton"} //Merge Engine::From BDS
                      style={styles.passwordShowHide} //UI Engine::From Sketch
                      {...this.btnNewPasswordShowHideButtonProps}
                    >
                      <Image
                        testID ={"imgNewPasswordShowhide"}  //Merge Engine::From BDS
                        style={styles.imgPasswordShowhide} //UI Engine::From Sketch
                        {...this.imgNewPasswordShowhideProps} //Merge Engine::From BDS - {...this.testIDProps}
                
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={styles.helperText} //UI Engine::From Sketch
                  >
                    {this.state.passwordHelperText} {/*UI Engine::From Sketch*/}
                  </Text>

                  <Text
                    style={styles.title} //UI Engine::From Sketch
                  >
                    {this.labelRePassword}
                    {/*UI Engine::From Sketch*/}
                  </Text>
                  <View style={styles.bgPasswordContainer}>
                    <TextInput
                      testID={"txtInputReTypePassword"} //Merge Engine::From BDS
                      style={styles.bgPasswordInput} //UI Engine::From Sketch
                      placeholder={this.labelRePassword} //UI Engine::From Sketch
                      {...this.txtInputReTypePasswordProps} //Merge Engine::From BDS - {...this.testIDProps}
                    />

                    <TouchableOpacity
                      testID={"btnReTypePasswordShowHide"} //Merge Engine::From BDS
                      style={styles.passwordShowHide} //UI Engine::From Sketch
                      {...this.btnReTypePasswordShowHideProps} //Merge Engine::From BDS - {...this.testIDProps}}
                    >
                      <Image
                        testID="imgReTypePasswordShowhide"
                        style={styles.imgPasswordShowhide} //UI Engine::From Sketch
                        {...this.imgReTypePasswordShowhideProps}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 24, marginBottom: 0 }}>
                    <Button
                      testID={"btnDisableEditPassword"} //Merge Engine::From BDS
                      title={this.btnTextCancelPasswordChange} //UI Engine::From Sketch
                      color="#767676" //UI Engine::From Sketch
                      {...this.btnDisableEditPasswordProps}
                    />
                  </View>
                </View>
              ) : null}

              <View style={{ marginTop: 24, marginBottom: 32 }}>
                <Button
                  testID={"btnSubmit"} //Merge Engine::From BDS
                  title={this.btnTextSaveChanges} //UI Engine::From Sketch
                  color="#6200EE"
                  disabled={this.state.saveButtonDisable}
                  onPress={() => this.validateMobileAndThenUpdateUserProfile()}
                />
              </View>
            </View>
            {/* Customizable Area End */}
            {/* Merge Engine UI Engine Code */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    this.requestSessionData();
    // Customizable Area End
  }
  
  // Customizable Area Start
  // Customizable Area End
  
}
// Customizable Area Start
const styles = StyleSheet.create({
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
    marginBottom: 16,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  title: {
    marginBottom: 2,
    fontSize: 14,
    textAlign: "left",
    marginTop: 16
  },

  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    paddingStart: Platform.OS === "web" ? 0 : 10
  },

  bgDummyPassword: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    opacity: 0.4,
    fontWeight: "bold",
    paddingStart: Platform.OS === "web" ? 0 : 10
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 0,
    padding: 12,
    marginTop: 0
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
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    paddingStart: Platform.OS === "web" ? 0 : 10
  },
  bgMobileInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    marginTop: 0,
    paddingStart: Platform.OS === "web" ? 0 : 10
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  helperText: { marginTop: 10 }
});
// Customizable Area End
