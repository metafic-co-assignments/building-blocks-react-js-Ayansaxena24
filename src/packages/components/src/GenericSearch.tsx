import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";

interface Props {
  containerStyle: any;
  placeholder: any;
  lightTheme: boolean;
  round: boolean;
  showLoading: boolean;
  onChangeText: any;
  autoCorrect: any;
  autoFocus: any;
  value: any;
}

interface S {
  containerStyle: any;
  placeholder: any;
  lightTheme: boolean;
  round: boolean;
  showLoading: boolean;
  onChangeText: any;
  autoCorrect: any;
  autoFocus: any;
  value: any;
}


export default class GenericSearch  extends Component <Props, S> {

  constructor(props: Props) {
    super(props);
    
     this.state = {
      containerStyle: props.containerStyle,
      placeholder: props.placeholder,
      lightTheme: props.lightTheme,
      round: props.round,
      showLoading: props.showLoading,
      onChangeText: props.onChangeText,
      autoCorrect: props.autoCorrect,
      autoFocus: props.autoFocus,
      value: props.value
    };
  }
  


  render() {

    return(
          <View style = {styles.container}>
             <SearchBar
               containerStyle={this.props.containerStyle}
               placeholder={this.props.placeholder}
               lightTheme={this.props.lightTheme}
               round={this.props.round}
               onChangeText={text => this.props.onChangeText(text) }
               autoCorrect={this.props.autoCorrect}
               autoFocus={this.props.autoFocus}
               value={this.props.value}
               showLoading={this.props.showLoading}
              />
          </View>
          )
    }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        paddingLeft: 0
  },
});
