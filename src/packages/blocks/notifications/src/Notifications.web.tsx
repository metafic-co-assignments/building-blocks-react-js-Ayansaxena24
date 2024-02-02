import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { imgBell } from "./assets";
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notifications extends NotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Box style={{ width: "70%" }}>
              <Typography variant="h6" style={{ marginTop: 12 }}>
                {configJSON.notifications}
              </Typography>
            </Box>
            {this.state.data
              ?.sort((a: any, b: any) => a.attributes.id - b.attributes.id)
              ?.map((item: any) => {
                return (
                  <Box
                    key={item.attributes.id}
                    style={webStyle.itemWrapper}
                    onClick={() => {
                      this.setState({ selectedData: item });
                      !item.attributes.is_read &&
                        this.markAsRead(item.attributes.id);
                    }}
                  >
                    <img src={imgBell} style={webStyle.iconStyle} />
                    <Box style={{ marginLeft: 16, flex: 1 }}>
                      <Box style={webStyle.itemHeadingWrapper}>
                        <Typography
                          variant="h6"
                          style={
                            item.attributes.is_read
                              ? webStyle.itemHeading
                              : webStyle.itemHeadingRead
                          }
                        >
                          {item.attributes.headings}
                        </Typography>
                        <Typography variant="h6" style={webStyle.contents}>
                          {this.timeSince(item.attributes.created_at)}
                        </Typography>
                      </Box>
                      <Typography variant="h6" style={webStyle.contents}>
                        {item.attributes.contents}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            <Dialog
              maxWidth={"md"}
              open={!!this.state.selectedData}
              onClose={() => this.setState({ selectedData: null })}
            >
              <DialogContent>
                <Typography
                  variant="h6"
                  style={
                    this.state.selectedData?.attributes.is_read
                      ? webStyle.itemHeading
                      : webStyle.itemHeadingRead
                  }
                >
                  {this.state.selectedData?.attributes.headings}
                </Typography>
                <Typography variant="h6" style={webStyle.contents}>
                  {this.convertDate(
                    this.state.selectedData?.attributes.created_at
                  )}
                </Typography>
                <Typography variant="h6" style={webStyle.contents}>
                  {this.state.selectedData?.attributes.contents}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setState({ selectedData: null })}
                  color="primary"
                  style={webStyle.okButton}
                >
                  {configJSON.okText}
                </Button>
                <Button
                  onClick={() =>
                    this.deleteNotifications(
                      this.state.selectedData?.attributes.id
                    )
                  }
                  variant="contained"
                  color="primary"
                  style={webStyle.deleteButton}
                >
                  {configJSON.deleteText}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
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

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  itemWrapper: {
    border: "1px solid #767676",
    display: "flex",
    width: "70%",
    flexDirection: "row" as "row",
    marginTop: 10,
    padding: 16,
    paddingTop: 10,
    cursor: "pointer",
  },
  itemHeadingWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "row" as "row",
  },
  iconStyle: {
    width: 20,
    height: 26,
    marginTop: 6,
  },
  itemHeading: {
    color: "#000",
    flex: 1,
    fontWeight: 700,
  },
  itemHeadingRead: {
    color: "#6200EE",
    flex: 1,
    fontWeight: 700,
  },
  contents: {
    fontSize: 16,
    color: "#767676",
  },
  okButton: {
    backgroundColor: "#ccc",
    color: "#000",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
  },
};
// Customizable Area End
