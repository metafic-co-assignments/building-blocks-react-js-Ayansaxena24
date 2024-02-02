import React from "react";

// Customizable Area Start
import { Container, Box, Typography, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { userProfileImg } from "./assets";
import QualificationBlock from "./QualificationBlock";
import Projects from "./Projects";
import Awards from "./Awards";
import Patents from "./Patents";

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
};
// Customizable Area End

import EducationalUserProfileController, {
  Props,
} from "./EducationalUserProfileController";

export default class EducationalUserProfile extends EducationalUserProfileController {
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
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 0px",
            }}
          >
            <Box>
              <img src={userProfileImg} style={webStyle.imageStyle} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">User name</Typography>
              <Typography>Gujarat, India</Typography>
            </Box>
          </Box>
          <QualificationBlock navigation={undefined} id={""} />

          <TabContext value={this.state.newValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={this.handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Projects" value="1" />
                <Tab label="Awards" value="2" />
                <Tab label="Publication Patents" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Projects navigation={undefined} id={""} />
            </TabPanel>
            <TabPanel value="2">
              <Awards navigation={undefined} id={""} />
            </TabPanel>
            <TabPanel value="3">
              <Patents navigation={undefined} id={""} />
            </TabPanel>
          </TabContext>
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}
