import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const Colors = {
  inputLabel: "rgba(31, 31, 34, 0.6)",
  inputTextColor: "rgb(31, 31, 34)",
  borderGrey: "rgba(28, 28, 30, 0.3)",
  borderYellow: "rgb(205, 149, 12)",
  white: "#FFFFFF",
  modalBg: "rgb(243, 243, 243)",
};

const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  getSellerDetailsMessageId: any;
  postSellerDetailsMessageId: any;
  sellerID: any;
  shopName: string;
  address: string;
  gstin: string;
  selectedServices: number[];
  showSuccessModal: boolean;
  token: string;
  lat: any;
  long: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];
    this.state = {
      getSellerDetailsMessageId: "",
      postSellerDetailsMessageId: "",
      sellerID: "",
      shopName: "",
      address: "",
      gstin: "",
      selectedServices: [],
      token: "",
      showSuccessModal: false,
      lat: 0,
      long: 0,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getSellerDetail(token)
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      console.log("API REQUEST CALL ID: ", apiRequestCallId);

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.state.postSellerDetailsMessageId) {
          this.showModal();
          console.log("Received from post API: ", responseJson);
        }

        if (apiRequestCallId === this.state.getSellerDetailsMessageId) {          
          console.log("Received from get API: ", responseJson);
          if (responseJson.data && responseJson.data.attributes) {
            console.log(
              "responseJson.data.attributes ",
              responseJson.data.attributes
            );
            let isWholesalerSelected =
              responseJson.data.attributes.wholesaler != undefined
                ? responseJson.data.attributes.wholesaler
                : false;
            let isRetailerSelected =
              responseJson.data.attributes.retailer != undefined
                ? responseJson.data.attributes.retailer
                : false;
            let isManufacturerSelected =
              responseJson.data.attributes.manufacturer != undefined
                ? responseJson.data.attributes.manufacturer
                : false;
            let isHallmarking_centerSelected =
              responseJson.data.attributes.hallmarking_center != undefined
                ? responseJson.data.attributes.hallmarking_center
                : false;

            let selectedServices = [];

            if (isWholesalerSelected) {
              selectedServices.push(1);
            }
            if (isManufacturerSelected) {
              selectedServices.push(2);
            }
            if (isHallmarking_centerSelected) {
              selectedServices.push(3);
            }
            if (isRetailerSelected) {
              selectedServices.push(4);
            }

            this.setState({
              sellerID: responseJson.data.id,
              shopName: responseJson.data.attributes.firm_name
                ? responseJson.data.attributes.firm_name
                : "",
              address: responseJson.data.attributes.location
                ? responseJson.data.attributes.location
                : "",
              gstin: responseJson.data.attributes.gstin_number
                ? responseJson.data.attributes.gstin_number
                : "",
              selectedServices: selectedServices,
            });
          }
        }
      }
    } 
    // Customizable Area End
  }

  // Customizable Area Start
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


  labelShopName: string = "Name of Shop";
  labelAddress: string = "Address";
  labelGstin: string = "GSTIN";
  labelAbout: string = "About Us";
  labelServiceProvided: string = "Services Provided";
  labelDealsIn: string = "Deals in";
  labelShopPhotos: string = "Shop Photos(Min 1 - Max 8)";
  labelVisitingCard: string = "Upload Visiting Card";
  btnLabel: string = "Submit";
  btnContinueLabel: string = "Continue";

  services = [
    { label: "Wholesaler", value: 1 },
    { label: "Manufacturer", value: 2 },
    { label: "Hallmarker", value: 3 },
    { label: "Retailer", value: 4 },
  ];

  getSellerDetail = async (token:string) => {
   
    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.setState({
      getSellerDetailsMessageId: requestMessage.messageId,
    });

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sellersAPIEndPoint + "/1"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSellersAPIMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  submitSellerDetails = async () => {

    let token = this.state.token;

    if (!token || token.length === 0 ) {
      this.showAlert("Error", "Invaild Token. Plese log in.")
      return;
    }
    if (
      this.state.shopName.trim() == ""
    ) {
      this.showAlert("Error", configJSON.errorMessageShopName);
      return;
    }

    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
    };

    let isWholesalerSelected = false;
    let isRetailerSelected = false;
    let isManufacturerSelected = false;
    let isHallmarking_centerSelected = false;

    this.state.selectedServices.forEach((value) => {
      switch (value) {
        case 1:
          isWholesalerSelected = true;
          break;
        case 2:
          isManufacturerSelected = true;
          break;
        case 3:
          isHallmarking_centerSelected = true;
          break;
        case 4:
          isRetailerSelected = true;
          break;
      }
    });

    const httpBody = {
      token: token,
      seller_account: {
        firm_name: this.state.shopName,
        location: this.state.address,
        gstin_number: this.state.gstin,
        wholesaler: isWholesalerSelected,
        retailer: isRetailerSelected,
        manufacturer: isManufacturerSelected,
        hallmarking_center: isHallmarking_centerSelected,
        lat: this.state.lat,
        long: this.state.long,
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.setState({
      postSellerDetailsMessageId: requestMessage.messageId,
    });

    
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      this.state.sellerID.length > 1 ? configJSON.sellersAPIEndPoint + "/" + this.state.sellerID : configJSON.sellersAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      this.state.sellerID.length > 1 ? configJSON.sellerDetailsAPIMethodPUT : configJSON.sellerDetailsAPIMethodPOST
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onChangeInput = (name: string, value: any) => {
    // @ts-ignore
    this.setState({ [name]: value });
  };

  txtInputProps = (key: string) => ({
    // @ts-ignore
    value: this.state[key],
    onChangeText: (text: string) => {
      this.onChangeInput(key, text);
    },
  });

  inputLabelProps = {
    fontSize: 14,
    color: Colors.inputLabel,
    lineHeight: 16,
  };

  onServiceSelected = (serviceId: number) => {
    if (!this.state.selectedServices.includes(serviceId)) {
      this.setState({
        selectedServices: this.state.selectedServices.concat(serviceId),
      });
    }
  };

  onServiceUnSelected = (serviceId: number) => {
    this.setState({
      selectedServices: this.state.selectedServices.filter(
        (selectedService) => selectedService !== serviceId
      ),
    });
  };

  showModal = () => {
    this.setState({ showSuccessModal: true });
  };

  hideModal = () => {
    this.setState({ showSuccessModal: false }, () => {
    });
  };
  // Customizable Area End
}
