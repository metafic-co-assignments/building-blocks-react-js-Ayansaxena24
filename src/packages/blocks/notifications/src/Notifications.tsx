import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  FlatList,
  Modal,
} from "react-native";
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notifications extends NotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItems(item: any) {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          this.setState({ selectedData: item });
          !item.attributes.is_read && this.markAsRead(item.attributes.id);
        }}
      >
        <View>
          <Image {...this.iconBellProps} style={styles.iconStyle} />
        </View>
        <View style={{ flex: 1, marginLeft: 16, paddingTop: 12 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text
              style={
                item.attributes.is_read
                  ? styles.itemHeading
                  : styles.itemHeadingRead
              }
            >
              {item.attributes.headings}
            </Text>
            <Text style={styles.date}>
              {this.timeSince(item.attributes.created_at)}
            </Text>
          </View>
          <Text style={styles.content}>{item.attributes.contents}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      {/* Customizable Area Start */}
      {/* Merge Engine UI Engine Code */}
      <>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{configJSON.notifications}</Text>
          </View>
          <FlatList
            // data={this.state.data}
            data={this.state.data?.sort(
              (a: any, b: any) => a.attributes.id - b.attributes.id
            )}
            renderItem={(item) => this.renderItems(item.item)}
            keyExtractor={(item: any) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!this.state.selectedData}
          onRequestClose={() => {
            this.setState({ selectedData: null });
          }}
        >
          {console.log(this.state.selectedData)}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeading}>
                {this.state.selectedData?.attributes.headings}
              </Text>
              <Text style={styles.content}>
                {this.convertDate(
                  this.state.selectedData?.attributes.created_at
                )}
              </Text>
              <Text style={styles.content}>
                {this.state.selectedData?.attributes.contents}
              </Text>
              <View style={styles.modalAction}>
                <TouchableOpacity
                  onPress={() => this.setState({ selectedData: null })}
                >
                  <Text style={styles.okButton}>{configJSON.okText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.deleteNotifications(
                      this.state.selectedData?.attributes.id
                    )
                  }
                >
                  <Text style={styles.deleteButton}>
                    {configJSON.deleteText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
      {/* Merge Engine UI Engine Code */}
      {/* Customizable Area End */}
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemWrapper: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
    flexDirection: "row",
    marginTop: 16,
  },
  iconStyle: {
    width: 18,
    height: 22,
    marginTop: 16,
  },
  itemHeading: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    color: "#000",
  },
  itemHeadingRead: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    color: "#6200EE",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
    color: "#000",
  },
  date: {
    color: "#767676",
    fontSize: 14,
  },
  content: {
    fontSize: 14,
    color: "#767676",
    marginTop: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalAction: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  okButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    color: "#FFF",
  },
});
// Customizable Area End
