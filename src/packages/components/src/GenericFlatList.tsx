import React, { Component } from "react";
import { FlatList } from "react-native";

interface Props {
  data: any;
  keyExtractor: any;
  render: any;
  itemSeparatorComponent: any;
  listHeaderComponent: any;
  stickyHeaderIndices: any;
}

interface S {
  data: any;
  keyExtractor: any;
  render: any;
  itemSeparatorComponent: any;
  listHeaderComponent: any;
  stickyHeaderIndices: any;
}

export default class GenericFlatList  extends Component <Props, S> {

  constructor(props: Props) {
    super(props);
     this.state = {
      data: props.data,
      keyExtractor: props.keyExtractor,
      render: props.render,
      itemSeparatorComponent: props.itemSeparatorComponent,
      listHeaderComponent: props.listHeaderComponent,
      stickyHeaderIndices: props.stickyHeaderIndices
    };
  }
  
  render() {
    return(
        <FlatList
            keyboardShouldPersistTaps="always"
            data = {this.props.data}
            renderItem = {({ item }) => (
              this.props.render(item)
            )}
            keyExtractor = {item => this.state.keyExtractor(item)}
            ItemSeparatorComponent={this.props.itemSeparatorComponent}
            ListHeaderComponent={this.props.listHeaderComponent}
            stickyHeaderIndices={this.props.stickyHeaderIndices}
        /> 
    )
  }
}

