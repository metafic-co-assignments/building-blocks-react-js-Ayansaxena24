import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  categoriesArray: any;
  category: string;
  subCategory: string;
  isVisible: boolean;
  dropdownCategoryStatus: boolean;
  activeModalType: string;
  selectedCategoryID: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CategoriessubcategoriesController extends BlockComponent<
  Props,
  S,
  SS
> {
  getCategoriesApiCallId: any;
  deleteCategoriesApiCallId: any;
  deleteSubCategoriesApiCallId: any;
  addCategoryApiCallId: any;
  addSubCategoryApiCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      token: "",
      categoriesArray: [],
      category: "",
      subCategory: "",
      isVisible: false,
      dropdownCategoryStatus: false,
      activeModalType: "",
      selectedCategoryID: []
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }
  
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived", message);
      let token = message.getData(getName(MessageEnum.SessionResponseToken));

      this.setState({ token: token }, () => {
        this.getCategories();
      });

    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);
      if (responseJson.data) {
        if (apiRequestCallId === this.getCategoriesApiCallId) {
          let array = responseJson.data;
          for (let i = 0; i < array.length; i++) {
            array[i].expand = false;
            array[i].Check = false;
          }
          this.setState({ categoriesArray: array });
        } else if (apiRequestCallId === this.addCategoryApiCallId) {
          this.setState({ isVisible: false, category: "" }, () => {
            this.getCategories();
          });
        } else if (apiRequestCallId === this.addSubCategoryApiCallId) {
          this.setState(
            {
              isVisible: false,
              category: "",
              subCategory: "",
              selectedCategoryID: []
            },
            () => {
              this.getCategories();
            }
          );
        }
        //this.setState({ isVisible: false });
      } else if (
        apiRequestCallId === this.deleteCategoriesApiCallId && !responseJson.error
      ) {
        this.getCategories();
      } 
      else if( apiRequestCallId === this.deleteCategoriesApiCallId && responseJson.error){
        this.parseApiCatchErrorResponse(responseJson.error.message);
      }
      else if (
        apiRequestCallId === this.deleteSubCategoriesApiCallId && !responseJson.error
      ) {
        this.getCategories();
      } 
      else if (
        apiRequestCallId === this.deleteSubCategoriesApiCallId && responseJson.error
      ) {
        this.parseApiCatchErrorResponse(responseJson.error.message);
      }
      else if (responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  setCategoryTxt = (text: string) => {
    this.setState({ category: text });
  };
  setSubCategoryTxt = (text: string) => {
    this.setState({ subCategory: text });
  };
  clickCategory = (item: any, Index: number) => {
    let array = this.state.categoriesArray;
    let idarray = this.state.selectedCategoryID;
    let index = idarray.indexOf(item.attributes.id);

    if (index > -1) {
      idarray.splice(index, 1);
      array[Index].Check = false;
      this.setState({ categoriesArray: array });
    } else {
      idarray.push(item.attributes.id);
      array[Index].Check = true;
      this.setState({ categoriesArray: array });
      this.setState({ selectedCategoryID: idarray });
    }
  };

  toggleModal = (type: string) => {
    this.setState({ activeModalType: type, isVisible: !this.state.isVisible });
  };

  expandCategoryView = () => {
    this.setState({
      dropdownCategoryStatus: !this.state.dropdownCategoryStatus
    });
  };
  expand = (id: string) => {
    let array = this.state.categoriesArray;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array[i].expand = !array[i].expand;
      }
    }
    this.setState({ categoriesArray: array });
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  addCategory = () => {
    if (this.isStringNullOrBlank(this.state.category)) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    } else {
      let data = {
        categories: [{ name: this.state.category }]
      };
      const header = {
        "Content-Type": configJSON.categoryApiContentType,
        token: this.state.token
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.addCategoryApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.categoryAPIEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpPostType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  };
  addSubCategory = () => {
    if (this.isStringNullOrBlank(this.state.subCategory)) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    } else if (this.state.selectedCategoryID.length === 0) {
      this.showAlert(configJSON.errorTitle, configJSON.errorCategory);
      return false;
    } else {
      let data = {
        sub_category: {
          name: this.state.subCategory
        },
        parent_categories: this.state.selectedCategoryID
      };
      const header = {
        "Content-Type": configJSON.categoryApiContentType,
        token: this.state.token
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.addSubCategoryApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.subCategoryAPIEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpPostType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  };

  deleteCategories = (id: number) => {
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteCategoriesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.categoryAPIEndPoint + `/${id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpDeleteType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  deleteSubCategories = (id: number) => {
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteSubCategoriesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.subCategoryAPIEndPoint + `/${id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpDeleteType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getCategories = () => {

    if (!this.state.token) {
      return;
    }
    
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCategoriesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.categoryAPIEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area End
}
