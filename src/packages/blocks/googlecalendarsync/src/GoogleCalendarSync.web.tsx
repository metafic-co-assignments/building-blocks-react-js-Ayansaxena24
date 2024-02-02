import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  TextField,
  Select,
  MenuItem,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End

import GoogleCalendarSyncController, {
  Props,
  configJSON,
} from "./GoogleCalendarSyncController";

export default class GoogleCalendarSync extends GoogleCalendarSyncController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEventContent = (eventInfo: any) => {
    return (
      <Box
        style={webStyle.event}
        onClick={() => this.setState({ selectedEvent: eventInfo })}
      >
        <Typography style={webStyle.eventTitle}>
          {eventInfo.event.title}
        </Typography>
      </Box>
    );
  };

  googleSignIn = async () => {
    gapi.auth2.getAuthInstance().then((auth2) => {
      auth2
        .signIn()
        .then(async (res) => {
          const user = res.getAuthResponse(true);
          this.setState({ authDetails: user.access_token });
          this.getEvents(user.access_token);
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    });
  };

  onChangeHandler = (e: any) => {
    this.setState({
      inputFields: {
        ...this.state.inputFields,
        [e.target.name]: e.target.value,
      },
    });
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"}>
          <Box sx={webStyle.mainWrapper}>
            {this.state.authDetails ? (
              <Button
                style={webStyle.googleSigninButton}
                onClick={() => this.setState({ openAddModal: true })}
                data-test-id="btnAddEvent"
              >
                {configJSON.addEventText}
              </Button>
            ) : (
              <Button
                style={webStyle.googleSigninButton}
                onClick={this.googleSignIn}
                data-test-id="btnSignIn"
              >
                <img {...this.googleIconWebProps} style={webStyle.googleIcon} />
                {configJSON.syncWithGoogleCalendar}
              </Button>
            )}

            <Box style={webStyle.calendarWrapper}>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                eventContent={this.renderEventContent}
                events={this.state.events}
              />
            </Box>
          </Box>
        </Container>

        <Dialog
          open={this.state.selectedEvent !== null}
          onClose={this.closeModalHandle}
        >
          <DialogContent>
            <Typography variant="h6">
              {this.state.selectedEvent?.event.title}
            </Typography>
            <Typography>
              {this.getDate(
                this.state.selectedEvent?.event?.start,
                this.state.selectedEvent?.event?.end
              )}
            </Typography>
            <Typography style={{}}>
              {this.state.selectedEvent?.event?.extendedProps?.description}
            </Typography>
            <Typography style={{}}>
              {this.state.selectedEvent?.event?.extendedProps?.conferenceData
                ?.entryPoints[0]?.uri && (
                <Link
                  style={webStyle.link}
                  target="_blank"
                  href={
                    this.state.selectedEvent?.event?.extendedProps
                      ?.conferenceData?.entryPoints[0]?.uri
                  }
                >
                  {
                    this.state.selectedEvent?.event?.extendedProps
                      ?.conferenceData?.entryPoints[0]?.uri
                  }
                </Link>
              )}
            </Typography>
            <Box>
              <Typography style={webStyle.guestTitle}>
                {configJSON.guestText}
              </Typography>
              {this.state.selectedEvent?.event?.extendedProps?.attendees?.map(
                (item: any, index: number) => {
                  return (
                    <Box key={index} style={webStyle.attendeedWrapper}>
                      {item.responseStatus === "accepted" ? (
                        <CheckIcon
                          style={webStyle.attendeedIcon}
                          fontSize={"small"}
                        />
                      ) : item.responseStatus === "declined" ? (
                        <CancelIcon
                          style={webStyle.attendeedIcon}
                          fontSize={"small"}
                        />
                      ) : (
                        <CircleIcon
                          style={webStyle.attendeedIcon}
                          fontSize={"small"}
                        />
                      )}
                      <Typography>{item.email}</Typography>
                    </Box>
                  );
                }
              )}
            </Box>
            {/* <Typography style={{}}>{configJSON.date} {this.state.selectedEvent?.event.start}</Typography> */}
          </DialogContent>
          <DialogActions>
            <Button
              style={{ backgroundColor: "#3f51b5" }}
              onClick={this.closeModalHandle}
              color="primary"
              variant="contained"
            >
              {configJSON.cancelText}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.openAddModal} onClose={this.closeModalHandle}>
          <DialogTitle>{configJSON.addEventText}</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              label={configJSON.summaryPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.summary}
              name="summary"
              onChange={this.onChangeHandler}
            />
            <TextField
              variant="outlined"
              label={configJSON.startDatePlaceholder}
              fullWidth
              style={webStyle.textField}
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={this.state.inputFields.start}
              name="start"
              onChange={this.onChangeHandler}
            />
            <TextField
              variant="outlined"
              label={configJSON.endDatePlaceholder}
              fullWidth
              style={webStyle.textField}
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={this.state.inputFields.end}
              name="end"
              onChange={this.onChangeHandler}
            />
            <Select
              variant="outlined"
              name="timezone"
              value={this.state.inputFields.timezone}
              onChange={this.onChangeHandler}
              fullWidth
              style={webStyle.textField}
            >
              {this.timeZone.map((zone) => (
                <MenuItem key={zone.value} value={zone.value}>
                  {zone.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              variant="outlined"
              label={configJSON.locationPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.location}
              name="location"
              onChange={this.onChangeHandler}
            />
            <TextField
              variant="outlined"
              label={configJSON.descriptionPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.description}
              name="description"
              onChange={this.onChangeHandler}
            />
            <TextField
              variant="outlined"
              label={configJSON.attendeesPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.attendees}
              name="attendees"
              onChange={this.onChangeHandler}
              helperText={configJSON.attendeesHelperText}
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ backgroundColor: "#3f51b5" }}
              onClick={this.closeModalHandle}
              color="primary"
              variant="contained"
            >
              {configJSON.cancelText}
            </Button>
            <Button
              style={{ backgroundColor: "#3f51b5" }}
              onClick={this.addEvent}
              color="primary"
              variant="contained"
            >
              {configJSON.saveText}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  googleSigninButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
    boxShadow:
      "rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px",
    borderRadius: 2,
    border: "1px solid transparent",
    fontSize: 14,
    fontWeight: 500,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50,
  },
  googleIcon: {
    height: 18,
    marginRight: 10,
  },
  calendarWrapper: {
    width: "100%",
    marginTop: 40,
  },
  event: {
    backgroundColor: "#3f51b5",
    padding: 5,
    borderRadius: 4,
    width: "100%",
    overflow: "hidden",
    cursor: "pointer",
  },
  eventTitle: {
    color: "#fff",
    fontSize: 12,
  },
  link: {
    color: "#3f51b5",
  },
  guestTitle: {
    marginTop: 20,
    marginBottom: 5,
  },
  attendeedWrapper: {
    display: "flex",
    flexDirection: "row" as "row",
    padding: 2,
  },
  attendeedIcon: {
    marginTop: 3,
    marginRight: 10,
  },
  textField: {
    marginBottom: 15,
  },
};
// Customizable Area End
