// Customizable Area Start
import React, { Component } from "react";
import {
  Container,
  Box,
  Button,
  Input,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  Modal,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

const webStyle = {
  imageStyle: {
    width: 100,
  },
  qualificationBlock: {
    marginTop: 40,
  },
  learnMore: {
    color: "#0000FF",
    cursor: "pointer",
  },
};
// Customizable Area End

import EducationalUserProfileController, {
  Props,
} from "./EducationalUserProfileController";

export default class Awards extends EducationalUserProfileController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h5">Awards :</Typography>
        {this.state.awardList.length > 0 ? (
          this.state.awardList.map((award: any) => {
            return (
              <Box style={webStyle.qualificationBlock}>
                <Typography>{`Title: ${award?.attributes?.title}`}</Typography>
                <Typography>{`Issue date: ${moment
                  .utc(award?.attributes?.issue_date)
                  .format("YYYY-DD-MM")}`}</Typography>
                <Typography
                  style={webStyle.learnMore}
                  onClick={this.showModal.bind(this, award)}
                >
                  show more
                </Typography>
              </Box>
            );
          })
        ) : (
          <p>No Awards</p>
        )}
        <Modal
          open={this.state.isVisible}
          onClose={this.hideModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box sx={{ minHeight: 250 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                align="center"
              >
                <Typography variant="h5" gutterBottom display="inline">
                  Award Details
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Title: ${this.state.modalProject.attributes?.title}`}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Associated with: ${this.state.modalProject.attributes?.associated_with}`}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Issuer: ${this.state.modalProject.attributes?.issuer}`}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Description: ${this.state.modalProject.attributes?.description}`}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Issue date: ${moment
                    .utc(this.state.modalProject.attributes?.issue_date)
                    .format("YYYY-DD-MM")}`}
                </Typography>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0px",
              }}
            >
              <Button
                data-test-id="btnCloseModal"
                variant="contained"
                onClick={() => this.hideModal()}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// Customizable Area End
