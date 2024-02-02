import React, { Component } from "react";

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";

interface Props {
  navigation: any;
  id: string;
}

interface S {
  message: string;
  title: string;
  buttonText: string;
  buttonMessage: Message;
}

interface SS {
  id: any;
}

export default class InfoPageBlock extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);

    this.state = {
      message: "An error has occured.",
      buttonText: "Ok",
      buttonMessage: new Message(""),
      title: "ERROR"
    };

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  render() {
 
    return (
      <ScrollView style={styles.container}>
        <View>
          {this.isPlatformWeb() ? (
            <Text style={styles.labelTitle}>Information</Text>
          ) : null}

          <Text
            style={{
              fontSize: 20,
              marginTop: 40,
              marginBottom: 40
            }}
          >
            {this.state.message}
          </Text>

          <View
            style={
              this.isPlatformWeb()
                ? styles.btnStyleWebContainer
                : styles.btnStyleMobileContainer
            }
          >
            <TouchableOpacity
              onPress={() => this.send(this.state.buttonMessage)}
              style={
                this.isPlatformWeb()
                  ? styles.btnStyleWeb
                  : styles.btnStyleMobile
              }
            >
              <Button
                onPress={() => this.send(this.state.buttonMessage)}
                title={this.state.buttonText}
                color="#6200EE"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  async receive(from: String, message: Message) {
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const title = message.getData(getName(MessageEnum.InfoPageTitleMessage));
      var content = message.getData(getName(MessageEnum.InfoPageBodyMessage));

      var buttonText = message.getData(
        getName(MessageEnum.InfoPageButtonTextMessage)
      );

      var buttonMessage = message.getData(
        getName(MessageEnum.InfoPageNavigationScreenMessage)
      );

      this.setState({
        message: content,
        title: title,
        buttonMessage: buttonMessage,
        buttonText: buttonText
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    padding: 16,
    backgroundColor: "#fff"
  },
  labelTitle: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 32,
    textAlign: "left",
    marginVertical: 8,
    color: "#6200EE"
  },

  btnStyleWebContainer: { justifyContent: "flex-end", flexDirection: "row" },
  btnStyleMobileContainer: {},

  btnStyleWeb: {
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#6200EE"
  },
  btnStyleMobile: {}
});
