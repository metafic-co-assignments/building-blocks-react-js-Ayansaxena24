import React from "react";

// Customizable Area Start
import { WebView } from 'react-native-webview';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {
  StyleSheet,
  View,
  Text
} from "react-native";

const contentStyle = {
  backgroundColor: '#000033',
  color: '#fff',
  placeholderColor: 'gray',
  paddingBottom:50,
  contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;', // initial valid
};
// Customizable Area End

export const configJSON = require("./config");

import InteractivefaqsSharedController, {Props} from "./InteractivefaqsSharedController"

export default class InteractivefaqsController extends InteractivefaqsSharedController {
 
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEditor() {
    const {color} = contentStyle;
    return(
      <View>
        <RichEditor
          disabled={false}
          editorStyle={contentStyle}
          style={[styles.rich]}
          ref={(r:any) => this.richtext = r}
          placeholder={configJSON.contentPlaceHolder}
          onHeightChange={()=>{}}
        />
        <RichToolbar 
            getEditor={() => this.richtext}
            iconTint={color}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#8b8b8b'}
            
            actions={[
                'bold',
                'italic',
                'unorderedList',
                'orderedList',
                'heading1',
                'heading2',
                'heading3',
                'heading4',
                'heading5',
                'heading6'
            ]}
            
        iconMap={{
            //@ts-ignore  
            ["heading1"]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
            ),
            //@ts-ignore 
            ["heading2"]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H2</Text>
            ),
            //@ts-ignore 
            ["heading3"]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H3</Text>
            ),
            //@ts-ignore 
            ["heading4"]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H4</Text>
            ),
            //@ts-ignore 
            ["heading5"]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H5</Text>
            ),
            //@ts-ignore 
            ["heading6"]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H6</Text>
            ),
        }}
        />       
      </View>
     )  
  }

  renderHTMLContent() {
    return (
      <WebView
        source={{ html:`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>${this.state.activeContent}</html>`}}
      />
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  rich: {
    height: 20,
    flex: 1,
    },
  tib: {
      textAlign: 'center',
      color: '#515156',
  }
});
// Customizable Area End