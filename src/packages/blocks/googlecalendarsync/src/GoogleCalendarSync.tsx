import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Linking,
} from "react-native";
import { GoogleSignin } from "@react-native-community/google-signin";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//@ts-ignore
import { Dropdown } from "react-native-material-dropdown";
// Customizable Area End

import GoogleCalendarSyncController, {
  Props,
  configJSON,
} from "./GoogleCalendarSyncController";

export default class GoogleCalendarSync extends GoogleCalendarSyncController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.configureGoogleSignin();
  }
  async configureGoogleSignin() {
    GoogleSignin.configure({
      webClientId:
        "649592030497-8j35bcju899d74nhbldq65e4r6vf6trh.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
    const isSigned = await GoogleSignin.isSignedIn();
    if (isSigned) {
      const token = await GoogleSignin.getTokens();
      this.setState({ authDetails: token.accessToken, isSingedIn: true });
      this.getEvents(token.accessToken);
    }
  }

  signIn = async () => {
    try {
      if (this.state.isSingedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        this.setState({ isSingedIn: false, authDetails: null, events: [] });
      } else {
        GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        const token = await GoogleSignin.getTokens();
        this.setState({ authDetails: token.accessToken, isSingedIn: true });
        if (token?.accessToken) {
          this.getEvents(token.accessToken);
        }
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  handleClick = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  changeTextHandler = (name: string, value: string) => {
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        [name]: value,
      },
    });
  };

  confirmDateHandler = (value: any) => {
    this.state.openDatePicker &&
      this.changeTextHandler(
        this.state.openDatePicker,
        new Date(value).toISOString()
      );
    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({ openDatePicker: null });
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                testID="btnSignIn"
                onPress={this.signIn}
                style={styles.googleBtn}
              >
                <View style={styles.googleBtnIconWrap}>
                  <Image
                    {...this.googleIconProps}
                    style={styles.googleBtnIcon}
                  />
                </View>
                <Text style={styles.googleBtnText}>
                  {this.state.isSingedIn
                    ? configJSON.signOut
                    : configJSON.syncWithGoogleCalendar}
                </Text>
              </TouchableOpacity>
              {this.state.isSingedIn && (
                <TouchableOpacity
                  onPress={() => this.setState({ openAddModal: true })}
                  testID="btnOpenModal"
                >
                  <Text style={styles.addEventBtn}>
                    {configJSON.addEventText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Calendar
              markingType={"period"}
              markedDates={this.generateEvent()}
              onDayPress={this.dayPress}
            />

            <View style={styles.eventLists}>
              <Text style={styles.eventHeading}>{configJSON.eventList}</Text>
              {this.state.events
                ?.filter((i: any) => {
                  return (
                    this.formatDate(i.start) ===
                    this.formatDate(this.state.selectedDay)
                  );
                })
                ?.map((item: any) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.eventContainer}
                      onPress={() => this.setState({ selectedEvent: item })}
                    >
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.eventTitle}>{item.title}</Text>
                      </View>
                      <Text style={styles.eventDesc}>{item.description}</Text>
                      <Text style={styles.eventDate}>
                        {configJSON.date}
                        {this.getDate(item.start, item.end)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>

            {this.state.selectedEvent && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.selectedEvent !== null}
                onRequestClose={this.closeModalHandle}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>
                      {this.state.selectedEvent?.title}
                    </Text>
                    <Text style={styles.modalDate}>
                      {configJSON.date}
                      {this.getDate(
                        this.state.selectedEvent?.start,
                        this.state.selectedEvent?.end
                      )}
                    </Text>
                    <Text style={styles.modalDesc}>
                      {this.state.selectedEvent?.description}
                    </Text>
                    {this.state.selectedEvent?.conferenceData?.entryPoints[0]
                      ?.uri && (
                      <TouchableOpacity
                        onPress={() =>
                          this.handleClick(
                            this.state.selectedEvent?.conferenceData
                              ?.entryPoints[0]?.uri
                          )
                        }
                      >
                        <Text style={styles.link}>
                          {
                            this.state.selectedEvent?.conferenceData
                              ?.entryPoints[0]?.uri
                          }
                        </Text>
                      </TouchableOpacity>
                    )}
                    <View>
                      <Text style={styles.guestTitle}>
                        {configJSON.guestText}
                      </Text>
                      {this.state.selectedEvent?.attendees?.map(
                        (item: any, index: number) => {
                          return (
                            <View key={index} style={styles.attendeedWrapper}>
                              <Image
                                source={this.attendeesIcon(item.responseStatus)}
                                style={styles.statusIcon}
                              />
                              <Text style={styles.guestEmail}>
                                {item.email}
                              </Text>
                            </View>
                          );
                        }
                      )}
                    </View>
                    <View style={styles.modalAction}>
                      <TouchableOpacity onPress={this.closeModalHandle}>
                        <Text style={styles.cancelBtn}>
                          {configJSON.cancelText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}

            {this.state.openAddModal && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.openAddModal}
                onRequestClose={this.closeModalHandle}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>
                      {configJSON.addEventText}
                    </Text>
                    <View>
                      <TextInput
                        style={styles.textInput}
                        placeholder={configJSON.summaryPlaceholder}
                        onChangeText={(value) =>
                          this.changeTextHandler("summary", value)
                        }
                        value={this.state.inputFields.summary}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ openDatePicker: "start" })
                        }
                      >
                        <Text style={styles.textInput}>
                          {this.state.inputFields.start
                            ? this.state.inputFields.start
                            : configJSON.startDatePlaceholder}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ openDatePicker: "end" })}
                      >
                        <Text style={styles.textInput}>
                          {this.state.inputFields.end
                            ? this.state.inputFields.end
                            : configJSON.endDatePlaceholder}
                        </Text>
                      </TouchableOpacity>
                      <Dropdown
                        rippleInsets={{ top: -10 }}
                        containerStyle={styles.textInput}
                        style={{ marginTop: -35 }}
                        value={this.state.inputFields.timezone}
                        data={this.timeZone}
                      />
                      <TextInput
                        style={styles.textInput}
                        testID="txtInputLocation"
                        placeholder={configJSON.locationPlaceholder}
                        onChangeText={(value) =>
                          this.changeTextHandler("location", value)
                        }
                        value={this.state.inputFields.location}
                      />
                      <TextInput
                        style={styles.textInput}
                        testID="txtInputDescription"
                        placeholder={configJSON.descriptionPlaceholder}
                        multiline={true}
                        onChangeText={(value) =>
                          this.changeTextHandler("description", value)
                        }
                        value={this.state.inputFields.description}
                      />
                      <TextInput
                        style={styles.textInput}
                        testID="txtInputAttendees"
                        placeholder={configJSON.attendeesPlaceholder}
                        onChangeText={(value) =>
                          this.changeTextHandler("attendees", value)
                        }
                        value={this.state.inputFields.attendees}
                      />
                      <Text style={styles.helperText}>
                        {configJSON.attendeesHelperText}
                      </Text>
                      <DateTimePickerModal
                        isVisible={this.state.openDatePicker !== null}
                        mode="datetime"
                        onConfirm={this.confirmDateHandler}
                        onCancel={this.hideDatePicker}
                      />
                    </View>
                    <View style={styles.modalAction}>
                      <TouchableOpacity
                        onPress={this.closeModalHandle}
                        testID="btnCloseModal"
                      >
                        <Text style={styles.cancelBtn}>
                          {configJSON.cancelText}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.addEvent}>
                        <Text style={styles.createBtn}>
                          {configJSON.saveText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
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
  btnWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  googleBtn: {
    padding: 2,
    backgroundColor: "#4285F4",
    alignSelf: "center",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  googleBtnText: {
    color: "#FFF",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  googleBtnIconWrap: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 2,
  },
  googleBtnIcon: {
    height: 20,
    width: 20,
  },
  addEventBtn: {
    backgroundColor: "#4285F4",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 10,
    color: "#fff",
    fontWeight: "bold",
    padding: 11,
    borderRadius: 2,
    overflow: "hidden",
  },
  eventHeading: {
    fontSize: 20,
    marginTop: 30,
    fontWeight: "700",
  },
  eventContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  eventTitle: {
    fontSize: 16,
    flex: 1,
  },
  eventDesc: {
    color: "#808080",
    marginTop: 5,
  },
  eventDate: {
    color: "#808080",
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
  },
  modalDesc: {
    fontSize: 16,
    color: "#808080",
    marginTop: 10,
  },
  modalDate: {
    fontSize: 16,
    color: "#808080",
    marginTop: 10,
  },
  modalAction: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
    overflow: "hidden",
  },
  createBtn: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
    overflow: "hidden",
  },
  link: {
    color: "#3f51b5",
  },
  guestTitle: {
    marginTop: 20,
    color: "#808080",
  },
  attendeedWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  guestEmail: {
    color: "#808080",
    flex: 1,
  },
  statusIcon: {
    marginRight: 10,
    height: 18,
    width: 18,
  },
  eventLists: {
    paddingBottom: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15,
    height: 40,
    overflow: "hidden",
  },
  helperText: {
    fontSize: 12,
    color: "#808080",
    marginTop: 8,
  },
});
// Customizable Area End
