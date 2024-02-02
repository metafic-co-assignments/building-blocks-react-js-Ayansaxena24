import React from "react";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Platform, Alert } from "react-native";
import { Message } from "../../../framework/src/Message";

interface Props {
  navigation: any;
}

interface S {

  title: string;
  body: string;
  btnPositiveText: string;
  btnNegativeText: string;
  btnNeutralText: string;

}

interface SS { }

export default class AlertBlock extends BlockComponent<Props, S, SS> {

  messagePositiveButton: any
  messageNegativeButton: any
  messageNeutralButton: any


  constructor(props: Props) {
    super(props);

    this.subScribedMessages = [
      getName(MessageEnum.AlertMessage),
      getName(MessageEnum.NavigationPayLoadMessage),

    ]
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    this.state = {
      title: "",
      body: "",
      btnPositiveText: "",
      btnNegativeText: "",
      btnNeutralText: "",
    }

    this.GetTitleView = this.GetTitleView.bind(this);
    this.GetMainView = this.GetMainView.bind(this);

    this.receive = this.receive.bind(this);
  }


  render() {

    return (


      

        (this.state.title || this.state.body || this.state.btnNeutralText || this.state.btnNegativeText || this.state.btnPositiveText)
        ?
        <this.GetMainView></this.GetMainView>

        : null

      

     
      );
}



onNegativeButtonPress() {
  if (this.messageNegativeButton) {

    this.send(this.messageNegativeButton)

  } else {
    this.props.navigation.goBack();
  }
}

onPositiveButtonPress() {
  if (this.messagePositiveButton) {

    this.send(this.messagePositiveButton)

  } else {
    this.props.navigation.goBack();
  }
}
onNeutralButtonPress() {
  if (this.messageNeutralButton) {

    this.send(this.messageNeutralButton)

  } else {
    this.props.navigation.goBack();
  }
}


GetTitleView() {

  return (

    this.state.title ?
      <Text style={styles.title}>{this.state.title}</Text> : null

  );
}


GetMainView() {

  return (

    <View
      style={styles.modalParentContainer}
    >


      <this.GetTitleView></this.GetTitleView>

      <Text style={styles.body}>{this.state.body}</Text>


      {(this.state.btnPositiveText || this.state.btnNegativeText || this.state.btnNeutralText) ? <View style={styles.allButtonContainer}>



        {
          //Neutral Button

          this.state.btnNeutralText ? <Button
            onPress={() => {
              this.onNeutralButtonPress()
            }}
            title={this.state.btnNeutralText}
          /> : null
        }



        {
          //Positive & Negative Button Container


          (this.state.btnNegativeText || this.state.btnPositiveText) ?

            <View style={styles.twoButtonContainer}>

              {
                this.state.btnNegativeText ?
                  <Button
                    onPress={() => {
                      this.onNegativeButtonPress()
                    }}
                    title={this.state.btnNegativeText}
                  /> : null
              }
              {

                this.state.btnPositiveText ?
                  <TouchableOpacity
                    style={styles.positiveButton}
                  >

                    <Button
                      onPress={() => {
                        this.onPositiveButtonPress()
                      }}
                      title={this.state.btnPositiveText}
                    />
                  </TouchableOpacity> : null

              }


            </View>

            : null


        }


      </View>

        : null}


    </View>




  );

}


async receive(from: string, message: Message) {

  if (getName(MessageEnum.AlertMessage) === message.id) {
    this.navigateToAlertPage(message);
  } else if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

    let alertType = message.getData(getName(MessageEnum.AlertTypeMessage));
    let title = message.getData(getName(MessageEnum.AlertTitleMessage));
    let body = message.getData(getName(MessageEnum.AlertBodyMessage));

    let btnPositiveText = message.getData(getName(MessageEnum.AlertButtonPositiveText));
    let btnPositiveMessage = message.getData(getName(MessageEnum.AlertButtonPositiveMessage));

    let btnNegativeText = message.getData(getName(MessageEnum.AlertButtonNegativeText));
    let btnNegativeMessage = message.getData(getName(MessageEnum.AlertButtonNegativeMessage));

    let btnNeutralText = message.getData(getName(MessageEnum.AlertButtonNeutralText));
    let btnNeutralMessage = message.getData(getName(MessageEnum.AlertButtonNeutralMessage));

    this.setState({ title: title, body: body, btnPositiveText: btnPositiveText, btnNegativeText: btnNegativeText, btnNeutralText: btnNeutralText })

    this.messagePositiveButton = btnPositiveMessage;
    this.messageNegativeButton = btnNegativeMessage;
    this.messageNeutralButton = btnNeutralMessage;


  }

}


navigateToAlertPage(message: Message) {

  const msg: Message = new Message(getName(MessageEnum.NavigationAlertWebMessage));
  msg.addData(
    getName(MessageEnum.NavigationPropsMessage),
    message.getData(getName(MessageEnum.NavigationPropsMessage))
  )

  msg.copyAllPropertiesOf(message);

  this.send(msg)
}




}



const styles = StyleSheet.create({
  allButtonContainer: { flexDirection: "row", justifyContent: "space-between" },
  body: { padding: 0, fontSize: 24, marginBottom: 15, marginTop: 7 },
  twoButtonContainer: { flexDirection: "row", marginLeft: 40 },
  positiveButton: { marginLeft: 10 },
  modalParentContainer: {
    padding: 10,
    flex: 1
  },
  title: { padding: 0, fontSize: 30, fontWeight: "bold", includeFontPadding: false }
});
