import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, Image, TouchableOpacity } from "react-native";

import { googleImage } from "./assets";

type Props = {
  testID: string;
  loginGoogleButtonText: string;
  style: any;
  googleButtonImageStyle: any;
  googleButtonTextStyle: any;
  onPress: () => void;
  // Customizable Area Start
  // Customizable Area End
};

export default class CustomGoogleLogInButton extends Component<Props> {
  static propTypes = {
    testID: PropTypes.string,
    style: PropTypes.any,
    googleButtonImageStyle: PropTypes.any,
    googleButtonTextStyle: PropTypes.any,
    loginGoogleButtonText: PropTypes.string,
    onPress: PropTypes.func.isRequired
    // Customizable Area Start
    // Customizable Area End
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
        }}
        style={this.props.style}
      >
        <Image style={this.props.googleButtonImageStyle} source={googleImage} />
        <Text style={this.props.googleButtonTextStyle}>
          {this.props.loginGoogleButtonText}
        </Text>
      </TouchableOpacity>
    );
  }
}
