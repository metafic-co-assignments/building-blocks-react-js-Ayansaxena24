import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

// @ts-ignore
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { facebookImage } from "./assets";
import { configJSON } from "./SocialMediaAccountWebController";

type Props = {
  testID: string;
  appId: string;
  loginFacebookButtonText: string;
  callback: (response: any) => void;
  onPress: () => void;
  // Customizable Area Start
  // Customizable Area End
};

export default class CustomFacebookLogInButton extends Component<Props> {
  static propTypes = {
    testID: PropTypes.string,
    appId: PropTypes.string,
    loginFacebookButtonText: PropTypes.string,
    callback: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired
    // Customizable Area Start
    // Customizable Area End
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <FacebookLogin
        // Customizable Area Start
        fields="name,email,picture"
        scope="email,public_profile"
        // Customizable Area End
        appId={this.props.appId}
        callback={this.props.callback}
        render={(renderProps: any) => (
          <TouchableOpacity
            onPress={() => {
              renderProps.onClick();
              this.props.onPress();
            }}
            style={styles.facebookStyle}
          >
            <Image style={styles.facebookImageStyle} source={facebookImage} />
            <Text style={styles.facebookTextStyle}>
              {this.props.loginFacebookButtonText}
            </Text>
          </TouchableOpacity>
        )}
      />
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
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
  }
});
// Customizable Area End
