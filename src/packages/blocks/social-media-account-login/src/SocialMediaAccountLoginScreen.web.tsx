import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import Loader from "../../../components/src/Loader";
import SocialMediaAccountWebController, {
  Props,
  configJSON
} from "../../social-media-account/src/SocialMediaAccountWebController";

import CustomFacebookLogInButton from "../../social-media-account/src/CustomFacebookLogInButton";
import CustomGoogleLogInButton from "../../social-media-account/src/CustomGoogleLogInButton";

class SocialMediaAccountLoginScreen extends SocialMediaAccountWebController {
  static SocialMediaAccountLoginScreen: SocialMediaAccountLoginScreen;

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
      <View style={styles.container}>
        <Loader loading={loading} />
        {/* Customizable Area Start */}
        <Text
          style={styles.labelTitle} //UI Engine::From Sketch
        >
          {configJSON.logInTitleText} {/*UI Engine::From Sketch*/}
        </Text>

        <Text
          style={styles.titleWhySignUp} //UI Engine::From Sketch
        >
          {configJSON.logInBodyText} {/*UI Engine::From Sketch*/}
        </Text>

        <CustomFacebookLogInButton
          testID="btnFacebookLogIn" //Merge Engine::From BDS
          appId="170982444234877" //Merge Engine::From SDS
          loginFacebookButtonText={configJSON.loginFacebookButtonText} //UI Engine::From Sketch
          {...this.btnFacebookLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
        />

        <CustomGoogleLogInButton
          testID="btnGoogleLogIn" //Merge Engine::From BDS
          style={styles.googleStyle} //UI Engine::From Sketch
          loginGoogleButtonText={configJSON.loginGoogleButtonText} //UI Engine::From Sketch
          googleButtonImageStyle={styles.googleButtonImageStyle} //UI Engine::From Sketch
          googleButtonTextStyle={styles.googleButtonTextStyle} //UI Engine::From Sketch
          {...this.btnGoogleLogInProps} //Merge Engine::From BDS - {...this.testIDProps}
        />

        <Text
          style={styles.orTextStyle} //UI Engine::From Sketch
        >
          or {/*UI Engine::From Sketch*/}
        </Text>

        <View
          style={styles.logInButtonContainer} //UI Engine::From Sketch
        >
          <TouchableOpacity
            testID="btnNavigate" //Merge Engine::From BDS
            style={styles.signUpButtonStyle} //UI Engine::From Sketch
            {...this.btnNavigateProps} //Merge Engine::From BDS - {...this.testIDProps}
          >
            <Text
              style={styles.signUpButtonTextStyle} //UI Engine::From Sketch
            >
              {configJSON.loginButtonText} {/*UI Engine::From Sketch*/}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Customizable Area Start */}
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logInButtonContainer: {
    overflow: "hidden",
    display: undefined,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    height: 40,
    width: 205,
    marginTop: 16,
    elevation: 6,
    backgroundColor: "#ffffff"
  },
  facebookStyle: {
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
    padding: "11px"
  },
  facebookImageStyle: {
    marginRight: 10,
    width: 20,
    height: 20
  },
  facebookTextStyle: {
    color: "#2553b4",
    fontFamily: "Helvetica-Bold, sans-serif",
    paddingLeft: 7
  },
  googleStyle: {
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
    padding: "11px",
    marginTop: 32
  },
  googleButtonImageStyle: {
    marginRight: 15,
    width: 20,
    height: 20
  },
  googleButtonTextStyle: {
    paddingLeft: 6,
    paddingRight: 3,
    fontSize: 14,
    color: "#2553b4",
    fontFamily: "Helvetica-Bold, sans-serif",
    marginLeft: 8
  },
  orTextStyle: {
    color: "#00000",
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20
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
    padding: "11px",
    height: "100%",
    width: "100%"
  },
  signUpButtonTextStyle: {
    color: "#2553b4",
    fontSize: 11,
    fontFamily: "Helvetica-Bold, sans-serif"
  },
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  labelTitle: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 32,
    textAlign: "left",
    marginVertical: 8,
    color: "#6200EE"
  }
});
// Customizable Area End

export default SocialMediaAccountLoginScreen;
