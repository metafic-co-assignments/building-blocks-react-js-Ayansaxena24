import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CheckBox as CheckBoxIos } from 'react-native-elements';
import {Platform, Switch } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
type MyProps = { testID:string, isChecked: boolean; onChangeValue?: (value: boolean) => void };
type MyState = { isChecked: boolean; onChangeValue?: (value: boolean) => void };

export default class CustomCheckBox extends Component<MyProps, MyState> {
  static propTypes = {
    testID: PropTypes.string, 
    isChecked: PropTypes.bool.isRequired,
    onChangeValue: PropTypes.func.isRequired
  };

  constructor(props: any) {
    super(props);

    this.state = {
      isChecked: this.props.isChecked
    };
  }

  render() {
   
    const { testID } = this.props;

    if (Platform.OS === 'ios') {
      return (
        /* <CheckBoxIos
            checked={this.state.isChecked}
            onPress={() => {
              const value = !this.state.isChecked;
              this.setState({ isChecked: value });
              this.props.onChangeValue(value);
            }}
          /> */

        <Switch
          testID={testID}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginRight: 5, marginLeft: 5 }}
          value={this.state.isChecked}
          onValueChange={value => this.handleValueChange(value)}
        />
      );
    } else {
      return (
        <CheckBox
          testID={testID}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginRight: Platform.OS === "web" ? 5 : 0,
            marginLeft: Platform.OS === "web" ? 5 : 0 }}
          value={this.state.isChecked}
          onValueChange={value => this.handleValueChange(value)}
        />
      );
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (true) {
      this.setState({
        isChecked: nextProps.isChecked
      });
    }
  }

  handleValueChange(value: boolean) {
    this.setState({
      isChecked: value
    });
    if (this.props.onChangeValue) {
      this.props.onChangeValue(value);
    }
  }
}
