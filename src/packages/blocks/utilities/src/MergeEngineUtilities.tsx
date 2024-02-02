// Customizable Area Start
import { Dimensions, PixelRatio, Platform } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";

import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";


export default class MergeEngineUtilities {
  static _screenWidth = Dimensions.get("window").width;
  static _screenHeight = Dimensions.get("window").height;
  //Artboard Dimension
  static _artBoardHeightOrg = 667;
  static _artBoardWidthOrg = 375;
  //Re calculated Artboard Dimension
  static _artBoardWidth = MergeEngineUtilities.isSameRatio()
    ? MergeEngineUtilities._artBoardWidthOrg
    : MergeEngineUtilities._screenWidth;
  static _artBoardHeight = MergeEngineUtilities.isSameRatio()
    ? MergeEngineUtilities._artBoardHeightOrg
    : MergeEngineUtilities._screenHeight;
  //Top or Bottom nav spaces or any extra space occupied by os e.g Status bar, Notch
  static _extraSpace = 0;
  // To check if Artboard and Device screen has same ratio
  static isSameRatio(): boolean {
    return (
      MergeEngineUtilities._artBoardWidthOrg /
        MergeEngineUtilities._artBoardHeightOrg <
        1 &&
      MergeEngineUtilities._screenWidth / MergeEngineUtilities._screenHeight < 1
    );
  }

  static init(
    artBoardHeightOrg: number,
    artBoardWidthOrg: number,
    screenHeight: number,
    screenWidth: number
  ) {
    MergeEngineUtilities._artBoardHeightOrg = artBoardHeightOrg;
    MergeEngineUtilities._artBoardWidthOrg = artBoardWidthOrg;
    MergeEngineUtilities._screenHeight = screenHeight;
    MergeEngineUtilities._screenWidth = screenWidth;
  }

  static deviceBasedDynamicDimension(
    originalDimen: number,
    compareWithWidth: boolean,
    resizeFactor: number
  ): number {
    if (originalDimen != null) {
      if (resizeFactor != null) {
        originalDimen *= resizeFactor;
      }
      const compareArtBoardDimenValue = compareWithWidth
        ? MergeEngineUtilities._artBoardWidth
        : MergeEngineUtilities._artBoardHeight;
      const artBoardScreenDimenRatio =
        (originalDimen * 100) / compareArtBoardDimenValue;
      let compareCurrentScreenDimenValue = compareWithWidth
        ? MergeEngineUtilities._screenWidth
        : MergeEngineUtilities._screenHeight - MergeEngineUtilities._extraSpace;
      if (Platform.OS === "web") {
        if (originalDimen > responsiveWidth(originalDimen/compareCurrentScreenDimenValue) ) {
          return(responsiveWidth(originalDimen/compareCurrentScreenDimenValue)*100); 
        } else{
            return(originalDimen);
        }
      }
      return PixelRatio.roundToNearestPixel(
        (artBoardScreenDimenRatio * compareCurrentScreenDimenValue) / 100
      );
    }
    return 0;
  }

  static navigateToScreen(screenName:string, props:any) {
    const navigationMessage = new Message(getName(MessageEnum.NavigationMessage));
    navigationMessage.addData(getName(MessageEnum.NavigationTargetMessage), screenName);
    navigationMessage.addData(
    getName(MessageEnum.NavigationPropsMessage), props);
    runEngine.sendMessage("MergeEngineUtilities", navigationMessage);
  }

}
// Customizable Area End
