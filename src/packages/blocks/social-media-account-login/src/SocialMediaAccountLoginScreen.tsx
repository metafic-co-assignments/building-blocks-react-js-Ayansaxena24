import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";

import SocialMediaAccountMobileController, {
  Props,
  configJSON,
  googleIcon,
  facebookIcon
} from "../../social-media-account/src/SocialMediaAccountMobileController";

//@ts-ignore
import ModalActivityIndicator from "react-native-modal-activityindicator";

class SocialMediaAccountLoginScreen extends SocialMediaAccountMobileController {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      isRegistration: false
    };
  }

  render() {
    const { loading } = this.state;

    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.safeAreaContainer}>
        <ModalActivityIndicator visible={loading} size="large" color="white" />
        <View style={styles.mainContainer}>
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <Text
            style={styles.titleWhySignUp} //UI Engine::From Sketch
          >
            {configJSON.logInBodyText} {/*UI Engine::From Sketch*/}
          </Text>

          <TouchableOpacity
            testID={"btnFacebookLogIn"} //Merge Engine::From BDS
            style={styles.facebookButtonContainer} //UI Engine::From Sketch
            {...this.btnFacebookLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
          >
            <Image
              style={styles.facebookButtonImageStyle} //UI Engine::From Sketch
              source={facebookIcon} //UI Engine::From Sketch
            />
            <Text
              style={styles.facebookButtonTextStyle} //UI Engine::From Sketch
            >
              {" "}
              {configJSON.loginFacebookButtonText} {/*UI Engine::From Sketch*/}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnGoogleLogIn"} //Merge Engine::From BDS
            style={styles.googleButtonContainer} //UI Engine::From Sketch
            {...this.btnGoogleLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
          >
            <Image
              style={styles.googleButtonImageStyle} //UI Engine::From Sketch
              source={googleIcon} //UI Engine::From Sketch
            />
            <Text
              style={styles.googleButtonTextStyle} //UI Engine::From Sketch
            >
              {configJSON.loginGoogleButtonText} {/*UI Engine::From Sketch*/}
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.orTextStyle} //UI Engine::From Sketch
          >
            or {/*UI Engine::From Sketch*/}
          </Text>
          <TouchableOpacity
            testID={"btnNavigate"} //Merge Engine::From BDS
            style={styles.logInButtonContainer} //UI Engine::From Sketch
            {...this.btnNavigateProps} //Merge Engine::From BDS - {...this.testIDProps}
          >
            <Text
              style={styles.signUpButtonTextStyle} //UI Engine::From Sketch
            >
              {" "}
              {configJSON.loginButtonText} {/*UI Engine::From Sketch*/}
            </Text>
          </TouchableOpacity>
          {/* Customizable Area End */}
          {/* Merge Engine UI Engine Code */}
        </View>
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
    width: "100%"
  },
  mainContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  facebookButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    width: "91%",
    height: "15%",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8
  },
  facebookButtonTextStyle: {
    paddingLeft: 10,
    fontSize: 20,
    textTransform: "uppercase"
  },
  facebookButtonImageStyle: {
    marginLeft: 48,
    width: 24,
    height: 24
  },
  googleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    width: "91%",
    height: "15%",
    marginTop: 24,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8
  },
  googleButtonTextStyle: {
    paddingLeft: 10,
    fontSize: 20,
    textTransform: "uppercase"
  },
  googleButtonImageStyle: {
    marginLeft: 48,
    width: 24,
    height: 24
  },
  orTextStyle: {
    marginTop: 16
  },
  logInButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "91%",
    height: "15%",
    marginTop: 24,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8
  },
  signUpButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 8,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%"
  },
  signUpButtonTextStyle: {
    color: "#2553b4",
    fontSize: 21,
    zIndex: -1
  },
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  }
});
// Customizable Area End

export default SocialMediaAccountLoginScreen;
