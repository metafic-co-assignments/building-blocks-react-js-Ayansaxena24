import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  PixelRatio,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  TouchableOpacity,
  CheckBox,
  Switch,
  Platform,
  Image,
  TextInput,
  Picker,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
  Linking,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

import { userProfileImg } from "./assets";
// Customizable Area End

import EducationalUserProfileController, {
  Props,
  configJSON,
} from "./EducationalUserProfileController";
import moment from "moment";

export default class EducationalUserProfile extends EducationalUserProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  educationalQualification = () => {
    if (this.state.loadingEQ) {
      return <ActivityIndicator />;
    }
    return (
      <>
        {this.state.educationQualification.length > 0 ? (
          this.state.educationQualification.map(
            (educationQualification: any, index: number) => {
              return (
                <View key={index}>
                  <Text>{educationQualification?.attributes?.school_name}</Text>
                  <Text>
                    {
                      educationQualification?.attributes
                        ?.degree_educational_qualifications[0]?.degree_name
                    }
                  </Text>
                  <Text>{`Grades: ${educationQualification?.attributes?.grades}`}</Text>
                  <Text>{`Duration: ${educationQualification?.attributes?.start_date} to ${educationQualification?.attributes?.end_date}`}</Text>
                </View>
              );
            }
          )
        ) : (
          <Text>{configJSON.noQualiText}</Text>
        )}
      </>
    );
  };

  renderProject = () => {
    if (this.state.loadingProject) {
      return <ActivityIndicator />;
    }
    return (
      <>
        {this.state.projectList.length > 0 ? (
          this.state.projectList.map((project: any, index: number) => {
            return (
              <View style={styles.listsWrapper} key={index}>
                <Text style={styles.listTitle}>
                  {project?.attributes?.project_name}
                </Text>
                <Text>{`${project?.attributes?.start_date} to ${project?.attributes?.end_date}`}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isModalOpen: true,
                      modalItem: {
                        ...project,
                        type: "project",
                      },
                    })
                  }
                >
                  <Text style={styles.showMore}>{configJSON.showMore}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text>{configJSON.noProjectText}</Text>
        )}
      </>
    );
  };

  renderAwards = () => {
    if (this.state.loadingAwards) {
      return <ActivityIndicator />;
    }

    return (
      <>
        {this.state.awardList.length > 0 ? (
          this.state.awardList.map((award: any, index: number) => {
            return (
              <View style={styles.listsWrapper} key={index}>
                <Text
                  style={styles.listTitle}
                >{`Title: ${award?.attributes?.title}`}</Text>
                <Text>{`Issue date: ${moment
                  .utc(award?.attributes?.issue_date)
                  .format("YYYY-DD-MM")}`}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isModalOpen: true,
                      modalItem: {
                        ...award,
                        type: "award",
                      },
                    })
                  }
                >
                  <Text style={styles.showMore}>{configJSON.showMore}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text>{configJSON.noAwards}</Text>
        )}
      </>
    );
  };

  renderPublicationPatents = () => {
    if (this.state.loadingPub) {
      return <ActivityIndicator />;
    }

    return (
      <>
        {this.state.patentList.length > 0 ? (
          this.state.patentList.map((patent: any, index: number) => {
            return (
              <View style={styles.listsWrapper} key={index}>
                <Text
                  style={styles.listTitle}
                >{`Title: ${patent?.attributes?.title}`}</Text>
                <Text>{`Publications: ${patent?.attributes?.publication}`}</Text>
                <Text>{`Author: ${patent?.attributes?.authors}`}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isModalOpen: true,
                      modalItem: {
                        ...patent,
                        type: "patent",
                      },
                    })
                  }
                >
                  <Text style={styles.showMore}>{configJSON.showMore}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text>{configJSON.noPublicationPatents}</Text>
        )}
      </>
    );
  };

  openUrl = (url: any) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            <View style={styles.profileHeaderWrapper}>
              <Image
                source={userProfileImg}
                style={{ height: 100, width: 100 }}
              />
              <View style={styles.nameWrapper}>
                <Text style={styles.name}>User name</Text>
                <Text style={styles.address}>Gujarat, India</Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>{configJSON.educationalTitle}</Text>
              {this.educationalQualification()}
            </View>

            <View>
              <View style={styles.tabWrapper}>
                <TouchableOpacity
                  style={
                    this.state.activeTab === 1 ? styles.activeTab : styles.tab
                  }
                  onPress={() => this.setState({ activeTab: 1 })}
                >
                  <Text style={styles.tabTitle}>{configJSON.projectLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.activeTab === 2 ? styles.activeTab : styles.tab
                  }
                  onPress={() => this.setState({ activeTab: 2 })}
                >
                  <Text style={styles.tabTitle}>{configJSON.awardsLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.activeTab === 3 ? styles.activeTab : styles.tab
                  }
                  onPress={() => this.setState({ activeTab: 3 })}
                >
                  <Text style={styles.tabTitle}>
                    {configJSON.publicationPatentLabel}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {this.state.activeTab === 1 && this.renderProject()}
              {this.state.activeTab === 2 && this.renderAwards()}
              {this.state.activeTab === 3 && this.renderPublicationPatents()}
            </View>

            <Modal
              transparent={true}
              onRequestClose={this.handleMobileModalClose}
              visible={this.state.isModalOpen}
            >
              <TouchableOpacity
                onPressOut={this.handleMobileModalClose}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: "rgba(0,0,0,.4)",
                }}
              >
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      flexDirection: "column",
                      backgroundColor: "#fff",
                      width: "80%",
                      borderRadius: 20,
                      padding: 15,
                    }}
                  >
                    {this.state.modalItem?.type === "project" && (
                      <>
                        <Text style={styles.listTitle}>Project Details</Text>
                        <Text style={styles.modalText}>
                          Project name:{" "}
                          {this.state?.modalItem?.attributes?.project_name}
                        </Text>
                        <Text style={styles.modalText}>
                          Description:{" "}
                          {this.state?.modalItem?.attributes?.description}
                        </Text>
                        <Text style={styles.modalText}>
                          Project Duration:{" "}
                          {this.state?.modalItem?.attributes?.start_date} to{" "}
                          {this.state?.modalProject?.attributes?.end_date}
                        </Text>
                        <Text style={styles.modalText}>
                          Url:
                          <Text
                            style={{ color: "#6200ee" }}
                            onPress={() =>
                              this.openUrl(
                                this.state?.modalItem?.attributes?.url
                              )
                            }
                          >
                            {this.state?.modalItem?.attributes?.url}
                          </Text>
                        </Text>
                      </>
                    )}
                    {this.state.modalItem?.type === "award" && (
                      <>
                        <Text style={styles.listTitle}>Award Details</Text>
                        <Text style={styles.modalText}>
                          Title: {this.state.modalItem.attributes?.title}
                        </Text>
                        <Text style={styles.modalText}>
                          Associated with:{" "}
                          {this.state.modalItem.attributes?.associated_with}
                        </Text>
                        <Text style={styles.modalText}>
                          Issuer: {this.state.modalItem.attributes?.issuer}
                        </Text>
                        <Text style={styles.modalText}>
                          Description:{" "}
                          {this.state.modalItem.attributes?.description}
                        </Text>
                        <Text style={styles.modalText}>
                          Issue date:{" "}
                          {moment
                            .utc(this.state.modalItem.attributes?.issue_date)
                            .format("YYYY-DD-MM")}
                        </Text>
                      </>
                    )}
                    {this.state.modalItem?.type === "patent" && (
                      <>
                        <Text style={styles.listTitle}>Patent Details</Text>
                        <Text style={styles.modalText}>
                          Title: {this.state?.modalItem?.attributes?.title}
                        </Text>
                        <Text style={styles.modalText}>
                          Associated with:{" "}
                          {this.state?.modalItem?.attributes?.publication}
                        </Text>
                        <Text style={styles.modalText}>
                          Issuer: {this.state?.modalItem?.attributes?.authors}
                        </Text>
                        <Text style={styles.modalText}>
                          Description:{" "}
                          {this.state?.modalItem?.attributes?.description}
                        </Text>
                        <Text style={styles.modalText}>
                          Url:
                          <Text
                            style={{ color: "#6200ee" }}
                            onPress={() =>
                              this.openUrl(
                                this.state?.modalItem?.attributes?.url
                              )
                            }
                          >
                            {this.state?.modalItem?.attributes?.url}
                          </Text>
                        </Text>
                      </>
                    )}

                    <TouchableOpacity onPress={this.handleMobileModalClose}>
                      <Text style={{ color: "#498ECC", marginTop: 5 }}>
                        {configJSON.closeText}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
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
  profileHeaderWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  nameWrapper: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  address: {
    fontSize: 16,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  tabWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "#6200ee",
    borderBottomWidth: 2,
    fontWeight: "bold",
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: "500",
  },

  listsWrapper: {
    paddingBottom: 15,
  },
  showMore: {
    color: "#6200ee",
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  modalText: {
    marginVertical: 5,
  },
});
// Customizable Area End
