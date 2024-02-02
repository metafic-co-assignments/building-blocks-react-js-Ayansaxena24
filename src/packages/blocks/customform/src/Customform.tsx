import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Dimensions,
  Text
} from "react-native";

import {
  imgCancel,
  imgSuccessModal
} from "./assets";

import { Colors } from "./CustomformController";

import GenericLabel from "../../../components/src/GenericLabel";

const screenWidth = Math.round(Dimensions.get("window").width);
// Customizable Area End

import CustomformController, {
  Props,
  configJSON,
} from "./CustomformController";

export default class Customform extends CustomformController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderModal = () => {
    return (
      <Modal visible={this.state.showSuccessModal} transparent>
        <View style={styles.modalWapper}>
          <View style={styles.modalContent}>
            <GenericLabel fontSize={24} lineHeight={32} align="center">
              {configJSON.congrats}
            </GenericLabel>
            <GenericLabel fontSize={24} lineHeight={32} align="center">
              {configJSON.formSubmitted}
            </GenericLabel>
            <View style={styles.modalImageWrapper}>
              <Image source={imgSuccessModal} style={styles.successImage} />
            </View>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={this.hideModal}
            >
              <GenericLabel
                fontSize={16}
                color={Colors.white}
                onPress={this.hideModal}
              >
                {this.btnContinueLabel}
              </GenericLabel>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID="btnHideKeyboard"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            <View style={styles.contentContainer}>
              <View style={styles.formInputWrapper}>
                <GenericLabel {...this.inputLabelProps}>
                  {this.labelShopName}
                </GenericLabel>
                <View style={styles.inputWrapper}>
                  <TextInput
                    testID="shopName"
                    style={styles.textInput}
                    {...this.txtInputProps("shopName")}
                  />
                </View>
              </View>
              <View style={styles.formInputWrapper}>
                <GenericLabel {...this.inputLabelProps}>
                  {this.labelServiceProvided}
                </GenericLabel>
                <View style={styles.servicesWrapper}>
                  {this.services.map((service, index) => (
                    <View
                      style={styles.serviceItemWrapper}
                      key={`SERVICES_${index}`}
                    >
                      <SelectionWrapper
                        isSelected={this.state.selectedServices.includes(
                          service.value
                        )}
                        option={service}
                        onPress={() => this.onServiceSelected(service.value)}
                        onClearPress={() =>
                          this.onServiceUnSelected(service.value)
                        }
                      />
                    </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                testID="submitButton"
                style={styles.submitBtn}
                onPress={() => this.submitSellerDetails()}
              >
                <Text>{this.btnLabel}</Text>
              </TouchableOpacity>
              {this.renderModal()}
            </View>
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
// @ts-ignore
const SelectionWrapper = ({ option, isSelected, onPress, onClearPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.selectionWrapper,
          { borderColor: isSelected ? Colors.borderYellow : Colors.borderGrey },
        ]}
      >
        <GenericLabel
          color={isSelected ? Colors.borderYellow : "rgb(46, 58, 89)"}
          onPress={onPress}
        >
          {option.label}
        </GenericLabel>
        {isSelected && (
          <TouchableWithoutFeedback>
            <TouchableOpacity onPress={onClearPress}>
              <Image source={imgCancel} style={styles.clearIcon} />
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  content: {
    width: "100%",
  },
  formInputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    borderBottomColor: Colors.borderGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    height: 48,
    width: "100%",
    flex: 1,
    fontSize: 16,
    color: Colors.inputTextColor,
    fontWeight: "600",
  },
  selectionWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearIcon: {
    width: 16,
    height: 16,
  },
  servicesWrapper: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  serviceItemWrapper: {
    width: "48%",
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: Colors.borderYellow,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: "100%",
    marginBottom: 20,
    borderRadius: 4,
  },
  shopImagePlusWrapper: {
    height: 80,
    width: 80,
    borderWidth: 1,
    borderColor: Colors.borderYellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginRight: 12,
    marginBottom: 12,
  },
  shopImagePlusIcon: {
    height: 20,
    width: 20,
  },
  selectedImageWrapper: {
    height: 80,
    width: 80,
    borderRadius: 3,
    marginRight: 12,
    marginBottom: 12,
  },
  selectedImage: {
    height: 80,
    width: 80,
    borderRadius: 3,
  },
  modalWapper: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  modalContent: {
    backgroundColor: Colors.modalBg,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  successImage: {
    width: 264,
    height: 158,
  },
  modalImageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  continueBtn: {
    backgroundColor: Colors.borderYellow,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: "100%",
    marginTop: 20,
    borderRadius: 4,
  },
});
// Customizable Area End
