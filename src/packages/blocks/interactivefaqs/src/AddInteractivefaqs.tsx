import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
// Customizable Area End

import {
  Props,
  configJSON
} from "./InteractivefaqsSharedController";

import InteractivefaqsController from "./InteractivefaqsController";

export default class AddInteractivefaqs extends InteractivefaqsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <KeyboardAvoidingView
      behavior={this.isPlatformiOS() ? "padding" : undefined}
      style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback
              testID={"Background"}
              onPress={() => {
                this.hideKeyboard();
              }}
            >
          {/* Customizable Area Start */}
              <View style={styles.innerView}>
              
                <Text style={styles.txtStyle}>Title</Text>

                <TextInput
                    testID="txtInputTitle" //Merge Engine::From BDS
                    style={styles.bgMobileInput} //UI Engine::From Sketch
                    placeholder={configJSON.textInputPlaceHolder} //UI Engine::From Sketch
                    onChangeText={(txt)=>{this.setTitle(txt)}}
                />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={styles.txtStyle}>Content</Text>
                    {this.renderEditor()}
                    </KeyboardAvoidingView>
                <TouchableOpacity testID={"btnAddFaqTxt"} style={styles.viewBtn} onPress={async()=>{this.setState({content: this.value ? this.value.toString("html") : await this.richtext.getContentHtml()},()=>{this.addFaqCall()}) }}>
                  <Text style={styles.viewBtnText}>Add Faq</Text>
                </TouchableOpacity>
              </View>
          {/* Customizable Area End  */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
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
     backgroundColor: "#ffffffff"
  },
  innerView:{
    marginBottom:30
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
  txtStyle: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgMobileInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: Platform.OS === "web" ? 0 : 1,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10
  },
  rich: {
    height: 20,
    flex: 1,
},
tib: {
    textAlign: 'center',
    color: '#515156',
},
 
});
// Customizable Area End
