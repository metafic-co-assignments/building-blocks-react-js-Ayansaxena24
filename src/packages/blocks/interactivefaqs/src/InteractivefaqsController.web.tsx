import React from "react";

// Customizable Area Start
import RichTextEditor from 'react-rte';
import Parser from 'html-react-parser';

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    {label: 'Bold', style: 'BOLD', className: 'c<ustom-css-class>'},
    {label: 'Italic', style: 'ITALIC'}
  ],
  BLOCK_TYPE_DROPDOWN: [
    {label: 'Normal', style: 'unstyled'},
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'}
  ],
  BLOCK_TYPE_BUTTONS: [
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'}
  ]
};
// Customizable Area End

export const configJSON = require("./config");

import InteractivefaqsSharedController, {Props} from "./InteractivefaqsSharedController"

export default class InteractivefaqsController extends InteractivefaqsSharedController {
  
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.value = RichTextEditor.createEmptyValue();
    // Customizable Area End
  }

  // Customizable Area Start
  renderEditor() {
    if (this.value) {
      return(
        <RichTextEditor
          //@ts-ignore
          toolbarConfig={toolbarConfig}
          value={this.value}
          onChange={this.onChange}
          placeholder={configJSON.contentPlaceHolder}
        />)
    } else {
       return null;
    }
  }

  renderHTMLContent() {
    return(<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>{Parser(this.state.activeContent)}</html>)
  }
  // Customizable Area End

}