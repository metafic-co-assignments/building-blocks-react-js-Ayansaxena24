import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
// Customizable Area End
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  // Customizable Area Start
  token:string,
  faq:any,
  isVisible:boolean,
  activeId:number,
  activeTitle:string,
  activeContent:string,
  activeCreatedAt:string,
  activeUpdatedAt:string,
  title:string,
  content:string,
  value: any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class InteractivefaqsSharedController extends BlockComponent<
  Props,
  S,
  SS
> {
  value:any;
  editorState:any;
  faqApiCallId: any;
  deleteFaqApiCallId:any;
  addFaqApiCallId:any;
  richtext:any
  editor: any;
  onChange: (editorState: any) => void;
  setEditor: (editor: any) => void;
  focusEditor: () => void;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.editorState = null;//createEditorStateWithText("");

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      token:"",
      faq:[],
      isVisible:false,
      activeId:0,
      activeTitle:"",
      activeContent:"",
      activeCreatedAt:"",
      activeUpdatedAt:"",
      title:"",
      content:"",
      value: this.value
    };
    this.onChange = (value) => {this.value=value; this.setState({value:value})};
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', () => {
        this.getToken();
      });
    }
  }
  
  getToken=()=>{
    const msg: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(msg);
  }
  
  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived", message);

      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({token:token})
      this.getFaq(token)
    }
    else if(getName(MessageEnum.RestAPIResponceMessage) === message.id){
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
      if (responseJson && responseJson.data) {
        if(apiRequestCallId === this.faqApiCallId){
          // alert(JSON.stringify(responseJson.data.faqs))
          this.setState({faq:responseJson.data.faqs})
        }
        if(apiRequestCallId === this.addFaqApiCallId){
          this.props.navigation.goBack()
        }
      }
      else if(responseJson && !responseJson.data&&apiRequestCallId === this.deleteFaqApiCallId){
        this.setState({isVisible:false})
        // alert(JSON.stringify(responseJson.data.faqs))
        this.getFaq(this.state.token)
      }
      else if(responseJson && responseJson.errors){
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  setModal=(item:any)=>{
    this.setState({
      activeId:item.id,
      activeTitle:item.title,
      activeContent:item.content,
      activeCreatedAt:item.created_at,
      activeUpdatedAt:item.updated_at,
      isVisible:!this.state.isVisible})
  }
  hideModal=()=>{
    this.setState({ isVisible: !this.state.isVisible });
  }
   
  addFaq(){
    //@ts-ignore
    this.props.navigation.navigate("AddInteractivefaqs")
  }

  setTitle=(txt:string)=>{
    this.setState({title:txt})
  }

  deleteFAQ(id:number){
    this.deleteFaqApiCall(configJSON.faqApiEndPoint+`/${id}`)
  }

  addFaqCall = () => {
    if(this.state.title.trim()===""){
      this.showAlert(configJSON.configError,configJSON.configErrorTitle)
      return false;
    }
    else if(this.state.content === ""){
      this.showAlert(configJSON.configError,configJSON.configErrorContent)
      return false;
    }
    else{
      var data={
        "title": this.state.title,
        "content": this.state.content
      }

      const header = {
        "Content-Type": configJSON.faqApiApiContentType,
        "token":this.state.token
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.addFaqApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.faqApiEndPoint
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
        configJSON.httpPostMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
  };
}

  deleteFaqApiCall = (endPointURL:string,) => {
    const header = {
      "Content-Type": configJSON.faqApiApiContentType,
      "token":this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteFaqApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPointURL
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpDeleteMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getFaq = (token:string) => {
    const header = {
      "Content-Type": configJSON.faqApiApiContentType,
      "token":token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.faqApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.faqApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}