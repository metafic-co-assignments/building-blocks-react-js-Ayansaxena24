import React, { Fragment } from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  ScrollView,
  Platform,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { bellIcon, circleIcon, crossIcon } from "./assets";
// Customizable Area End

import PushnotificationsController, {
  Props,
  configJSON,
} from "./PushnotificationsController";

export default class Pushnotifications extends PushnotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderNotificationRow = (notification: any) => {
    return (
      <TouchableOpacity
        testID={'notificationItem'}
        activeOpacity={0.7}
        key={notification.id}
        onPress={() => this.handleRedirection(notification)}
      >
        <View style={styles.notificationRowContainer}>
          <View style={styles.notificationRowHeaderContainer}>
            <View style={styles.notificationRowTitleContainer}>
              <Image style={styles.bellIcon} source={bellIcon} />
            </View>
            <Text style={styles.notificationDate}>
              {notification.attributes.created_at
                ? moment(notification.attributes.created_at).format("DD/MM/yyy")
                : "N/A"}
            </Text>
          </View>
          <View style={styles.notificationRowBodyContainer}>
            <Text style={styles.notificationBody}>
              {
                notification.attributes?.remarks ?? "N/A"
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderNoNotification() {
    return (
      <View style={styles.noNotificationContainer}>
        <ImageBackground
          style={styles.noNotificationCircleContainer}
          source={circleIcon}
        >
          <Image style={styles.noNotificationCrossIcon} source={crossIcon} />
        </ImageBackground>
        <Text style={styles.noNotificationSorryText}>Sorry!</Text>
        <Text style={styles.noNotificationText}>No Notifications</Text>
      </View>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { loading, notifications } = this.state;
    console.log("[Pushnotifications::render] notifications=", notifications);
    if (loading && notifications && notifications.length === 0) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={50} color="#7266d0" />
        </View>
      );
    }

    return (
      //Merge Engine DefaultContainer
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#7266d0"
          translucent={false}
        />
        {notifications && notifications.length > 0 ? (
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.container}
          >
            {notifications.map((notification) =>
              this.renderNotificationRow(notification)
            )}
          </ScrollView>
        ) : (
          this.renderNoNotification()
        )}
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  notificationRowContainer: {
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 13,
    paddingVertical: 10,
    minHeight: 80,
    borderColor: "#e4e4e4",
  },
  notificationRowHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationRowBodyContainer: {
    paddingRight: 30,
    marginTop: 6,
  },
  notificationRowTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    width: 14,
    height: 14,
  },
  notificationTitle: {
    marginLeft: 11,
    fontSize: 12,
    color: "#000000",
    fontWeight: "700"
  },
  notificationDate: {
    marginLeft: 11,
    fontSize: 12,
    color: "#000000",
    opacity: 0.3
  },
  notificationBody: {
    lineHeight: 20,
    fontSize: 12,
    color: "#000000",
    opacity: 0.7,
  },
  noNotificationContainer: {
    height: responsiveHeight(80),
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationCircleContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationCrossIcon: {
    width: 25,
    height: 25,
  },
  noNotificationSorryText: {
    marginTop: 12,
    fontSize: 16,
    color: "#2f2a2b",
    fontWeight: "700"
  },
  noNotificationText: {
    marginTop: 6,
    fontSize: 12,
    color: "#2f2a2b",
  },
  continueShoppingText: {
    fontSize: 14,
  },
  continueShoppingBtnContainer: {
    width: responsiveWidth(90),
    marginTop: 18,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
// Customizable Area End
