import React, { FunctionComponent, ElementType } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

import GenericLabel from "./GenericLabel";

interface Props {
  onPress: (e: GestureResponderEvent) => void;
  children: ElementType | string;
  isSelected: boolean;
  testID: string;
}

const GenericSelectionButton: FunctionComponent<Props> = (props) => {
  const buttonStyles = {
    ...styles.container,
    backgroundColor: props.isSelected ? "rgba(255, 212, 40, 1)" : "#FFF",
    borderColor: props.isSelected ? "rgba(255, 212, 40, 1)" : "rgb(197, 206, 224)",
    borderWidth: 1,
  };

  return (
    <TouchableOpacity style={buttonStyles} onPress={props.onPress} testID={props.testID}>
      <GenericLabel
        fontSize={12}
        color={props.isSelected ? "rgba(11, 11, 11, 1)" : "rgb(143, 155, 179)"}
        onPress={props.onPress}
      >
        {props.children}
      </GenericLabel>
    </TouchableOpacity>
  );
};

export default GenericSelectionButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#000",
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
