import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { googleIcon, cancelIcon, checkIcon, circleIcon } from "./assets";
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
  events: any;
  selectedEvent: any;
  authDetails: any;
  openAddModal: boolean;
  inputFields: {
    summary: string;
    start: string;
    end: string;
    location: string;
    description: string;
    timezone: string;
    attendees: string;
  };
  isSingedIn: boolean;
  selectedDay: string | null;
  openDatePicker: string | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoogleCalendarSyncController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  addEventCallId: string = "";
  getEventCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      events: [],
      selectedEvent: null,
      authDetails: null,
      openAddModal: false,
      inputFields: {
        summary: "",
        start: "",
        end: "",
        location: "",
        description: "",
        timezone: this.timeZone[0].value,
        attendees: "",
      },
      isSingedIn: false,
      selectedDay: null,
      openDatePicker: null,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.addEventCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        alert(error);
      } else {
        var responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        if (responseJson && responseJson.error) {
          alert(configJSON.errorMsg);
        } else {
          alert(configJSON.successMsg);
          this.closeModalHandle();
          this.getEvents(this.state.authDetails);
        }
      }
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getEventCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let temp: any = [];
      responseJson &&
        responseJson?.items?.map((item: any) => {
          temp.push({
            ...item,
            title: item?.summary,
            start: item?.start?.dateTime
              ? item?.start?.dateTime
              : item?.start?.date,
            end: item?.end?.dateTime ? item?.end?.dateTime : item?.end?.date,
          });
        });
      this.setState({ events: temp });
    }

    // Customizable Area End
  }

  // Customizable Area Start
  getEvents = (access_token: any) => {
    const header = {
      "Content-Type": configJSON.googleEventApiContentType,
      Authorization: `Bearer ${access_token}`,
    };

    const getEventMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getEventCallId = getEventMessage.messageId;

    getEventMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleEventEntPoint
    );

    getEventMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    getEventMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getEventApiMethod
    );

    runEngine.sendMessage(getEventMessage.id, getEventMessage);
    return true;
  };

  googleLoginSuccess = (res: any) => {
    // this.setState({authDetails: res});
    this.getEvents(res.accessToken);
  };

  googleIconWebProps = {
    src: googleIcon,
  };

  googleIconProps = {
    source: googleIcon,
  };

  attendeesIcon = (status: string) => {
    return status === "accepted"
      ? checkIcon
      : status === "declined"
      ? cancelIcon
      : circleIcon;
  };

  closeModalHandle = () => {
    this.setState({ selectedEvent: null, openAddModal: false });
  };

  getDate = (d1: any, d2: any) => {
    let sDate = new Date(d1);
    let eDate = new Date(d2);
    if (Math.abs(sDate.getTime() - eDate.getTime()) / 36e5 === 24) {
      return sDate.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      });
    }
    let startDate = sDate.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    });
    let endDate = eDate.toLocaleString(undefined, {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    });
    return startDate + " - " + endDate;
  };

  addEvent = () => {
    let attendees: any = [];
    if (this.state.inputFields.attendees?.length > 0) {
      this.state.inputFields.attendees
        .replace(/\s/g, "")
        .split(",")
        ?.map((i: any) => {
          attendees.push({ email: i });
        });
    }
    var event = {
      summary: this.state.inputFields.summary,
      location: this.state.inputFields.location,
      description: this.state.inputFields.description,
      start: {
        dateTime: new Date(this.state.inputFields.start).toISOString(),
        timeZone: this.state.inputFields.timezone,
      },
      end: {
        dateTime: new Date(this.state.inputFields.end).toISOString(),
        timeZone: this.state.inputFields.timezone,
      },
      attendees: attendees,
    };

    const header = {
      "Content-Type": configJSON.googleEventApiContentType,
      Authorization: `Bearer ${this.state.authDetails}`,
    };

    const addEventMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addEventCallId = addEventMessage.messageId;

    addEventMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleEventEntPoint
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.addEventApiMethod
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(event)
    );

    runEngine.sendMessage(addEventMessage.id, addEventMessage);
    return true;
  };

  formatDate = (date: any = null) => {
    let dt = date ? new Date(date) : new Date();
    let year = dt.toLocaleString("en-US", { year: "numeric" });
    let month = dt.toLocaleString("en-US", { month: "2-digit" });
    let day = dt.toLocaleString("en-US", { day: "2-digit" });
    return `${year}-${month}-${day}`;
  };

  generateEvent = () => {
    let eventObj: any = {};
    this.state.events.map((i: any) => {
      eventObj[this.formatDate(i.start)] = {
        color: "#89CFF0",
        startingDay: true,
        endingDay: true,
      };
    });
    return eventObj;
  };

  dayPress = (day: any) => {
    this.setState({ selectedDay: day.dateString });
  };

  timeZone = [
    {
      label: "(GMT+01:00) United Kingdom Time",
      value: "Europe/London",
    },
    {
      label: "(GMT-04:00) Eastern Time - New York",
      value: "America/New_York",
    },
    {
      label: "(GMT+05:30) India Standard Time - Kolkata",
      value: "Asia/Kolkata",
    },
  ];
  // Customizable Area End
}
