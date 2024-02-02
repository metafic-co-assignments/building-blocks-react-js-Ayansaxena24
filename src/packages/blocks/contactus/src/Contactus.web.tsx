import React from "react";
import {
  Modal,
  Container,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  Typography,
  Input,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import ContactusController, { Props } from "./ContactusController";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class Contactus extends ContactusController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          {/* Customizable Area Start */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 0px",
            }}
          >
            <Button
              data-test-id="btnAddNewQuery"
              variant="contained"
              color="primary"
              onClick={() => this.addQuery()}
            >
              Add New/Query
            </Button>
          </Box>

          <Paper style={{ width: "100%", overflow: "hidden" }}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.contactUsList &&
                    this.state.contactUsList.map((item: any, index: number) => {
                      return (
                        <TableRow key={item.id}>
                          {/* @ts-ignore */}
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{item.attributes.name}</TableCell>
                          <TableCell>{item.attributes.email}</TableCell>
                          <TableCell>{item.attributes.phone_number}</TableCell>
                          <TableCell align="right">
                            <Button
                              data-test-id={"btnViewContactItem"}
                              variant="text"
                              color="primary"
                              onClick={() => this.setModal(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Modal
            open={this.state.isVisible}
            onClose={this.hideModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box sx={{ minHeight: 250 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  <Typography variant="h6" gutterBottom display="inline">
                    Id:
                  </Typography>{" "}
                  {this.state.activeId}
                </Typography>

                <Typography variant="subtitle1" gutterBottom component="div">
                  <Typography variant="h6" gutterBottom display="inline">
                    Name:
                  </Typography>{" "}
                  {this.state.activeName}
                </Typography>

                <Typography variant="subtitle1" gutterBottom component="div">
                  <Typography variant="h6" gutterBottom display="inline">
                    Email:
                  </Typography>{" "}
                  {this.state.activeEmail}
                </Typography>

                <Typography variant="subtitle1" gutterBottom component="div">
                  <Typography variant="h6" gutterBottom display="inline">
                    Phone Number:
                  </Typography>
                  {this.state.activePhoneNumber}
                </Typography>

                <Typography variant="subtitle1" gutterBottom component="div">
                  <Typography variant="h6" gutterBottom display="inline">
                    Description:
                  </Typography>
                  {this.state.activeDescription}
                </Typography>

                <Typography variant="subtitle1" gutterBottom component="div">
                  <Typography variant="h6" gutterBottom display="inline">
                    Created At:
                  </Typography>
                  {this.state.activeCreatedAt}
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
                  data-test-id="btnDeleteContactUs"
                  variant="contained"
                  color="primary"
                  onClick={() => this.deleteContactUs(this.state.activeId)}
                >
                  Delete
                </Button>
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
          {/* Customizable End Start */}
        </Container>
      </ThemeProvider>
      //Merge Engine End DefaultContainer
    );
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
