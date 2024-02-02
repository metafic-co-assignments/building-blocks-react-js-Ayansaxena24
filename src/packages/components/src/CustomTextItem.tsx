import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";


interface Props {
  onPress: any;
  content: string;
}

interface S {
}

interface SS {
}

export default class CustomTextItem extends BlockComponent<Props, S, SS> {
  static propTypes = {
    content: PropTypes.string.isRequired
  };

  render() {
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text onPress={this.props.onPress} style={styles.item}>
            {this.props.content}
          </Text>
          <Image
            style={{
              height: 20,
              width: 20,
              marginRight: 10
            }}
            source={require("./arrow_right.png")}
          />
        </View>

        <View style={styles.seprator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#00000000",
    padding: 18,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    flexDirection: "row"
  },
  seprator: {
    backgroundColor: "#6200EE",
    color: "#6200EE",
    height: 1
  }
});
