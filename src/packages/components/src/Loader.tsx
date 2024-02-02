import { ActivityIndicator, View } from "react-native";

import React from "react";

interface myProps {
  loading: boolean;
}
export default function Loader(props: myProps) {
  return props.loading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  ) : (
    <View />
  );
}
