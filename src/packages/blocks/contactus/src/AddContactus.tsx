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
// Customizable Area End

import ContactusController, { Props, configJSON } from "./ContactusController";

export default class AddContactus extends ContactusController {
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

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>{configJSON.nameTitle}</Text>
                <TextInput
                  testID="txtName" //Merge Engine::From BDS
                  style={styles.bgMobileInput} //UI Engine::From Sketch
                  placeholder={configJSON.namePlaceHolder} //UI Engine::From Sketch
                  {...this.txtNameProps} //Merge Engine::From BDS - {...this.testIDProps}
                />
              </View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>{configJSON.emailTitle}</Text>
                <TextInput
                  testID="txtEmail" //Merge Engine::From BDS
                  style={styles.bgMobileInput} //UI Engine::From Sketch
                  placeholder={configJSON.emailPlaceHolder} //UI Engine::From Sketch
                  keyboardType="email-address"
                  {...this.txtEmailProps} //Merge Engine::From BDS - {...this.testIDProps}
                />
              </View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>{configJSON.numberTitle}</Text>
                <TextInput
                  testID="txtPhoneNumber" //Merge Engine::From BDS
                  style={styles.bgMobileInput} //UI Engine::From Sketch
                  placeholder={configJSON.numberPlaceHolder} //UI Engine::From Sketch
                  keyboardType="phone-pad"
                  maxLength={13}
                  {...this.txtPhoneNumberProps} //Merge Engine::From BDS - {...this.testIDProps}
                />
              </View>

              <Text style={styles.titleInput}>{configJSON.commentsTitle}</Text>
              <TextInput
                placeholder={configJSON.commentsPlaceHolder}
                testID="txtComments" //Merge Engine::From BDS
                style={styles.bgMobileInputMessage} //UI Engine::From Sketch
                {...this.txtCommentsProps} //Merge Engine::From BDS - {...this.testIDProps}
              />
              <TouchableOpacity
                style={styles.viewBtn}
                testID="btnSubmit" //Merge Engine::From BDS
                onPress={() => {
                  this.addQueryApi();
                }}
              >
                <Text style={styles.viewBtnText}>Add New/Query</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  keyboardPadding: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  goBack: {
    marginLeft: 16,
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
  titleInput: {
    color: "#000",
  },
  bgInputContainer: {
    marginBottom: 25,
  },
  bgMobileInput: {
    height: 45,
    borderBottomWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#c9c9c9",
  },
  bgMobileInputMessage: {
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#c9c9c9",
    height: 100,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
});
// Customizable Area End
