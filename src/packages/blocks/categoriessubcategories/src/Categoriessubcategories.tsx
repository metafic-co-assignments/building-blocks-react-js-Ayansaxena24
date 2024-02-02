import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  Image
} from "react-native";
import CategoriessubcategoriesController, {
  Props
} from "./CategoriessubcategoriesController";
import { upArrow, downArrow, Delete, unchecked, checked } from "./assets";
export default class Categoriessubcategories extends CategoriessubcategoriesController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={this.state.isVisible ? styles.modalBox : {"display": "none"}}>
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.isVisible}
          >
            <View style={styles.modal}>
              {this.state.activeModalType === "SubCategory" ? (
                <View>
                  <Text style={styles.addCategoryTitle}>Add a subcategory</Text>
                  <TextInput
                    testID="txtInputCategory"
                    style={styles.bgMobileInput}
                    placeholder="Enter subcategory name"
                    onChangeText={(txt: string) => this.setSubCategoryTxt(txt)}
                  />
                </View>
              ) : (
                <View>
                  <Text style={styles.addCategoryTitle}>Add a category</Text>
                  <TextInput
                    testID="txtInputCategory"
                    style={styles.bgMobileInput}
                    placeholder="Enter category name"
                    onChangeText={(txt: string) => this.setCategoryTxt(txt)}
                  />
                </View>
              )}
              {this.state.activeModalType === "SubCategory" ? (
                <View style={styles.tableBox}>
                  <View style={styles.innerTableBox}>
                    <Text style={styles.infoText}>Choose a category</Text>
                    <TouchableOpacity onPress={() => this.expandCategoryView()}>
                      <Image
                        style={styles.arrow}
                        source={
                          this.state.dropdownCategoryStatus
                            ? upArrow
                            : downArrow
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  {this.state.dropdownCategoryStatus && (
                    <View style={styles.dropdownView}>
                      <ScrollView>
                        {this.state.categoriesArray.map(
                          (item: any, index: number) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={styles.checkbtn}
                                onPress={() => this.clickCategory(item, index)}
                              >
                                <Image
                                  style={styles.arrow}
                                  source={
                                    item.Check === true ? checked : unchecked
                                  }
                                />
                                <Text style={styles.checktxt}>
                                  {item.attributes.name}
                                </Text>
                              </TouchableOpacity>
                            );
                          }
                        )}
                      </ScrollView>
                    </View>
                  )}
                </View>
              ) : null}
              <View style={styles.buttonBox}>
                <TouchableOpacity
                  style={[styles.viewBtn, styles.viewBtnWidth]}
                  onPress={() =>
                    this.state.activeModalType === "SubCategory"
                      ? this.addSubCategory()
                      : this.addCategory()
                  }
                >
                  <Text style={styles.viewBtnText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.viewBtnWidth, styles.closeBtn]}
                  onPress={() => this.toggleModal(this.state.activeModalType)}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            testID={"btnAddFaqTxt"}
            style={this.state.isVisible ? {display: "none"} : styles.addBtn}
            onPress={() => {
              this.toggleModal("Category");
            }}
          >
          <Text style={styles.addtext}>Add Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnAddFaqTxt"}
            style={this.state.isVisible ? {display: "none"} : styles.addBtn}
            onPress={() => {
              this.toggleModal("SubCategory");
            }}
          >
          <Text style={styles.addtext}>Add Sub Category</Text>
          </TouchableOpacity>
        </View>
        {!this.state.isVisible && this.state.categoriesArray.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.tableBox}>
              <View style={styles.innerTableBox}>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>{item.attributes.name}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => this.deleteCategories(item.id)}
                >
                  <Image style={styles.delete} source={Delete} />
                </TouchableOpacity>
                {item.attributes.sub_categories.length > 0 ? (
                  <TouchableOpacity onPress={() => this.expand(item.id)}>
                    <Image
                      style={styles.arrow}
                      source={item.expand ? upArrow : downArrow}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              {item.expand &&
                item.attributes.sub_categories.map(
                  (subItem: any, subIndex: number) => {
                    return (
                      <View style={styles.innerTableBox}>
                        <Text key={subIndex} style={styles.infoText}>
                          {subItem.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.deleteSubCategories(subItem.id)}
                        >
                          <Image style={styles.arrow} source={Delete} />
                        </TouchableOpacity>
                      </View>
                    );
                  }
                )}
            </View>
          );
        })}
      </ScrollView>
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
  tableBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginBottom: 30
  },
  Bottom_Container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
  dropdownView: {
    height: 150
  },
  checkbtn: {
    flexDirection: "row",
    marginVertical: 10
  },
  checktxt: {
    paddingLeft: 10,
    marginLeft: 10
  },
  innerTableBox: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  addCategoryTitle: {
    fontSize: 16,
    marginVertical: 10
  },
  delete: {
    height: 20,
    width: 20,
    resizeMode: "contain"
    //marginLeft:50
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  webviewStyle: {
    height: 200
  },
  infoText: {
    width: "70%",
    fontSize: 16,
    marginVertical: 4
  },
  labelText: {
    fontWeight: "bold"
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue"
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  addBtn: {
    backgroundColor: "blue",
    marginBottom: 10,
    width: 150,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end"
  },
  addtext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonTop: {
    display: "flex",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  closeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15
  },
  viewBtnWidth: {
    width: "48%"
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16
  }
});
