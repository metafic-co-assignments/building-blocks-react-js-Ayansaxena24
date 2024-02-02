import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Categoriessubcategories from "../../src/Categoriessubcategories";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Categoriessubcategories"
};

const feature = loadFeature(
  "./__tests__/features/categoriessubcategories-scenario.feature"
);

const unitTest = {
  data: [
    {
      id: "4",
      type: "category",
      attributes: {
        id: 4,
        name: "category_3",
        created_at: "2020-10-07T06:56:28.270Z",
        updated_at: "2020-10-07T06:56:28.270Z",
        sub_categories: [
          {
            id: 4,
            name: "sub_category_1",
            created_at: "2020-10-07T06:57:11.436Z",
            updated_at: "2020-10-07T06:57:11.436Z"
          }
        ]
      }
    }
  ]
}

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to categoriessubcategories", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let instance: Categoriessubcategories;

    given("I am a User loading categoriessubcategories", () => {
      categoryWrapper = shallow(<Categoriessubcategories {...screenProps} />);
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

      instance = categoryWrapper.instance() as Categoriessubcategories;

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const getCategoriesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoriesAPI.messageId
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        unitTest
      );
      instance.getCategoriesApiCallId = getCategoriesAPI.messageId;
      runEngine.sendMessage("Unit Test", getCategoriesAPI);
    });

    when("I navigate to the categoriessubcategories", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;
      instance.getCategories();
    });

    then("categoriessubcategories will load with out errors", () => {
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();
    });
  });

  test("User can delete any category", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let instance: Categoriessubcategories;

    given("I am a User attempting to delete a category", () => {
      categoryWrapper = shallow(<Categoriessubcategories {...screenProps} />);
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    when("I navigate to category screen", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    then("delete category should succeed", () => {
      expect(instance.deleteCategories(2)).toBe(true);
      const deleteCategoryAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteCategoryAPI
      );
      deleteCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          success: true
        }
      );

      deleteCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteCategoryAPI.messageId
      );
      instance.deleteCategoriesApiCallId = deleteCategoryAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteCategoryAPI);
    });
  });

  test("User can delete any subcategory", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let instance: Categoriessubcategories;

    given("I am a User attempting to delete a subcategory", () => {
      categoryWrapper = shallow(<Categoriessubcategories {...screenProps} />);
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    when("I navigate to category screen", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    then("delete subcategory should succeed", () => {
      expect(instance.deleteSubCategories(2)).toBe(true);
      const deleteSubCategoryAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteSubCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteSubCategoryAPI
      );
      deleteSubCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          success: true
        }
      );

      deleteSubCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteSubCategoryAPI.messageId
      );
      instance.deleteSubCategoriesApiCallId = deleteSubCategoryAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteSubCategoryAPI);
    });

  });

  test("User can add a category", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let instance: Categoriessubcategories;

    given("I am a User attempting to add a category", () => {
      categoryWrapper = shallow(<Categoriessubcategories {...screenProps} />);
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    when("I click on add category", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;
      instance.setState({ isVisible: true, category: "Test" });
      instance.setCategoryTxt("Test");
    });

    then("add category should succeed", () => {
      expect(instance.addCategory()).toBe(true);
    });

    then("RestAPI will return successfull response", () => {
      const addCategoryAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "24",
              type: "category",
              attributes: {
                id: 24,
                name: "test",
                created_at: "2020-10-26T07:51:17.704Z",
                updated_at: "2020-10-26T07:51:17.704Z",
                sub_categories: []
              }
            }
          ]
        }
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI.messageId
      );
      instance.addCategoryApiCallId = addCategoryAPI.messageId;
      runEngine.sendMessage("Unit Test", addCategoryAPI);
    });
  });

  test("User adding a empty category", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let instance: Categoriessubcategories;

    given("I am a User attempting to add an empty category", () => {
      categoryWrapper = shallow(<Categoriessubcategories {...screenProps} />);
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    when("I click on add category", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;
      instance.setState({ isVisible: true, category: "" });
    });

    then("add category should failed", () => {
      expect(instance.addCategory()).toBe(false);
    });
  });

  test("User can add a subcategory", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let instance: Categoriessubcategories;

    given("I am a User attempting to add a subcategory", () => {
      categoryWrapper = shallow(<Categoriessubcategories {...screenProps} />);
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    when("I click on add subcategory", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;
      instance.setState({
        isVisible: true,
        subCategory: "Test",
        activeModalType: "SubCategory",
        selectedCategoryID: [1, 2]
      });
    });


    then("I can expand and select the categories to add the subcategory", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;

      const getCategoriesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoriesAPI.messageId
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        unitTest
      );
      
      instance.getCategoriesApiCallId = getCategoriesAPI.messageId;
      instance.setState({categoriesArray: unitTest.data});

      instance.expand("Test")
      instance.clickCategory(unitTest.data[0], 0);

      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

    });

    then("add subcategory should succeed", () => {
      instance.setSubCategoryTxt("test");
      expect(instance.addSubCategory()).toBe(true);
    });
    then("RestAPI will return successfull response", () => {
      const addCategoryAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "22",
            type: "sub_category",
            attributes: {
              id: 22,
              name: "test",
              created_at: "2020-10-26T08:01:24.037Z",
              updated_at: "2020-10-26T08:01:24.037Z",
              categories: [
                {
                  id: 25,
                  name: "",
                  created_at: "2020-10-26T07:56:13.640Z",
                  updated_at: "2020-10-26T07:56:13.640Z"
                }
              ]
            }
          }
        }
      );
      addCategoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addCategoryAPI.messageId
      );
      instance.addSubCategoryApiCallId = addCategoryAPI.messageId;
      runEngine.sendMessage("Unit Test", addCategoryAPI);
    });
  });

  test("User adding a empty subcategory", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let instance: Categoriessubcategories;

    given("I am a User attempting to add an empty subcategory", () => {
      categoryWrapper = shallow(<Categoriessubcategories {...screenProps} />);
      expect(categoryWrapper).toBeTruthy();
      expect(categoryWrapper).toMatchSnapshot();

      instance = categoryWrapper.instance() as Categoriessubcategories;
    });

    when("I click on add subcategory", () => {
      instance = categoryWrapper.instance() as Categoriessubcategories;
      instance.setState({ subCategory: "" });
    });

    then("add subcategory should failed", () => {
      expect(instance.addSubCategory()).toBe(false);
    });
  });

});
