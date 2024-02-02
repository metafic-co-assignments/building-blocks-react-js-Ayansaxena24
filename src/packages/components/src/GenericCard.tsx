import React, { FunctionComponent, ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import GenericLabel from "./GenericLabel";

interface Props {
  children: ReactNode;
  title?: string;
}

const GenericCard: FunctionComponent<Props> = (props) => {
  return (
    <View style={styles.container}>
      {props.title ? (
        <View style={styles.titleWrapper}>
          <GenericLabel fontSize={15} lineHeight={18} fontWeight='700'>
            {props.title}
          </GenericLabel>
        </View>
      ) : null}
      {props.children}
    </View>
  );
};

export default GenericCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#FFF",
    padding: 12,
    width: "100%",
    marginBottom: 16,
  },
  titleWrapper: {
    marginBottom: 15,
  },
});
