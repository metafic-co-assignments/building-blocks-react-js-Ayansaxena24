import React from "react";

import {
  Modal,
  Container,
  Box,
  Button,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import ContactusController, { Props, configJSON } from "./ContactusController";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class AddContactus extends ContactusController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0px",
            }}
          >
            <Typography variant="h4" component="h2">
              Add New/Query
            </Typography>
            <Box sx={{ width: "100%", maxWidth: 500, paddingTop: "20px" }}>
              <Box>
                <Typography variant="h6" gutterBottom id="modal-modal-title">
                  {configJSON.nameTitle}
                </Typography>
                <Input
                  data-test-id={"txtName"}
                  placeholder={configJSON.namePlaceHolder}
                  fullWidth={true}
                  onChange={(e) => this.setName(e.target.value)}
                />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom id="modal-modal-title">
                  {configJSON.emailTitle}
                </Typography>
                <Input
                  data-test-id={"txtEmail"}
                  placeholder={configJSON.emailPlaceHolder}
                  fullWidth={true}
                  onChange={(e) => this.setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom id="modal-modal-title">
                  {configJSON.numberTitle}
                </Typography>
                <Input
                  data-test-id={"txtPhoneNumber"}
                  placeholder={configJSON.numberPlaceHolder}
                  fullWidth={true}
                  onChange={(e) => this.setPhoneNumber(e.target.value)}
                />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom id="modal-modal-title">
                  {configJSON.commentsTitle}
                </Typography>
                <TextField
                  data-test-id={"txtComments"}
                  id="standard-multiline-static"
                  multiline
                  fullWidth
                  rows={4}
                  variant="standard"
                  onChange={(e) => this.setComments(e.target.value)}
                />
              </Box>
              <Box sx={{ paddingTop: "20px" }}>
                <Button
                  data-test-id={"btnSubmit"}
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={() => {
                    this.addQueryApi();
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
