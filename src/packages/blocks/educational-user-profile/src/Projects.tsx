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

export default class Projects extends EducationalUserProfileController {
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
        <Typography variant="h5">Projects :</Typography>
        {this.state.projectList.length > 0 ? (
          this.state.projectList.map((project: any) => {
            console.log(project);
            return (
              <Box>
                <Box style={webStyle.qualificationBlock}>
                  <Typography>{project?.attributes?.project_name}</Typography>
                  <Typography>{`${project?.attributes?.start_date} to ${project?.attributes?.end_date}`}</Typography>
                  <Typography
                    style={webStyle.learnMore}
                    onClick={this.showModal.bind(this, project)}
                  >
                    show more
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <p>No projects</p>
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
                  Project Details
                </Typography>{" "}
                {/* {this.state.activeId} */}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Project name: ${this.state?.modalProject?.attributes?.project_name}`}
                </Typography>{" "}
                {/* {this.state.activeName} */}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Description: ${this.state?.modalProject?.attributes?.description}`}
                </Typography>{" "}
                {/* {this.state.activeEmail} */}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`Project Duration: ${this.state?.modalProject?.attributes?.start_date} to ${this.state?.modalProject?.attributes?.end_date}`}
                </Typography>
                {/* {this.state.activePhoneNumber} */}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  Url:{" "}
                  <a href={this.state?.modalProject?.attributes?.url}>
                    {`${this.state?.modalProject?.attributes?.url}`}
                  </a>
                </Typography>
                {/* {this.state.activeDescription} */}
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
