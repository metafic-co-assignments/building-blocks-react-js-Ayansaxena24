import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Platform,
} from "react-native";

import ContactusController, { Props } from "./ContactusController";

export default class Contactus extends ContactusController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Customizable Area Start */}
        <View
          style={this.state.isVisible ? styles.modalBox : { display: "none" }}
        >
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.isVisible}
          >
            <View style={styles.modal}>
              <ScrollView>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Id:{"  "}</Text>
                  {this.state.activeId}
                </Text>
                <Text numberOfLines={2} style={styles.infoText}>
                  <Text style={styles.labelText}>Name:{"  "}</Text>
                  {this.state.activeName}
                </Text>
                <Text numberOfLines={2} style={styles.infoText}>
                  <Text style={styles.labelText}>Email:{"  "}</Text>
                  {this.state.activeEmail}
                </Text>
                <Text numberOfLines={2} style={styles.infoText}>
                  <Text style={styles.labelText}>Phone Number:{"  "}</Text>
                  {this.state.activePhoneNumber}
                </Text>
                <Text numberOfLines={10} style={styles.infoText}>
                  <Text style={styles.labelText}>Description:{"  "}</Text>
                  {this.state.activeDescription}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Created At:{"  "}</Text>
                  {this.state.activeCreatedAt}
                </Text>
              </ScrollView>
              <View style={styles.buttonBox}>
                <TouchableOpacity
                  style={[styles.viewBtn, styles.viewBtnWidth]}
                  onPress={() => {
                    this.deleteContactUs(this.state.activeId);
                  }}
                >
                  <Text style={styles.viewBtnText}>delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.viewBtnWidth, styles.closeBtn]}
                  onPress={() => {
                    this.hideModal();
                  }}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          testID={"btnSubmit"}
          style={this.state.isVisible ? { display: "none" } : styles.addBtn}
          onPress={() => {
            this.addQuery();
          }}
        >
          <Text style={styles.addtext}>Add New/Query</Text>
        </TouchableOpacity>
        {!this.state.isVisible &&
          this.state.contactUsList.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.tableBox}>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Id:{"  "}</Text>
                  {item.id}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Name:{"  "}</Text>
                  {item.attributes.name}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Email:{"  "}</Text>
                  {item.attributes.email}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Phone Number:{"  "}</Text>
                  {item.attributes.phone_number}
                </Text>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => {
                    this.setModal(item);
                  }}
                >
                  <Text style={styles.viewBtnText}>View</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        {/* Customizable End Start */}
      </ScrollView>
      //Merge Engine End DefaultContainer
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
  tableBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginBottom: 30,
  },
  webviewStyle: {
    height: 200,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  labelText: {
    fontWeight: "bold",
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue",
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: "blue",
    marginBottom: 10,
    width: 120,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end",
  },
  addtext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  buttonTop: {
    display: "flex",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  closeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15,
  },
  viewBtnWidth: {
    width: "48%",
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
});
