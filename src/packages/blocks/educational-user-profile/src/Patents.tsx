import React from "react";

// Customizable Area Start
import { Box, Button, Typography, Modal } from "@material-ui/core";
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

export default class Patents extends EducationalUserProfileController {
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
        <Typography variant="h5">Publication Patents :</Typography>
        {this.state.patentList.length > 0 ? (
          this.state.patentList.map((patent: any) => {
            return (
              <Box>
                <Box style={webStyle.qualificationBlock}>
                  <Typography>{`Title: ${patent?.attributes?.title}`}</Typography>
                  <Typography>{`Publications: ${patent?.attributes?.publication}`}</Typography>
                  <Typography>{`Author: ${patent?.attributes?.authors}`}</Typography>
                  <Typography
                    style={webStyle.learnMore}
                    onClick={this.showModal.bind(this, patent)}
                  >
                    show more
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <p>No publication patents found</p>
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
                  Patent Details
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Title: ${this.state?.modalProject?.attributes?.title}`}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Publication: ${this.state?.modalProject?.attributes?.publication}`}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Author: ${this.state?.modalProject?.attributes?.authors}`}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Description: ${this.state?.modalProject?.attributes?.description}`}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  Url:{" "}
                  <a href={this.state?.modalProject?.attributes?.url}>
                    {`${this.state?.modalProject?.attributes?.url}`}
                  </a>
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
