// Customizable Area Start
import React from "react";
import { Box, Typography } from "@material-ui/core";
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
};
// Customizable Area End

import EducationalUserProfileController, {
  Props,
} from "./EducationalUserProfileController";

export default class QualificationBlock extends EducationalUserProfileController {
  // Customizable Area Start
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Box>
          <Box style={webStyle.qualificationBlock}>
            <Typography variant="h5">Educational Qualification</Typography>
            {this.state.educationQualification.length > 0 ? (
              this.state.educationQualification.map(
                (educationQualification: any) => {
                  return (
                    <div style={{ marginTop: 20 }}>
                      <Typography>
                        {educationQualification?.attributes?.school_name}
                      </Typography>
                      <Typography>
                        {
                          educationQualification?.attributes
                            ?.degree_educational_qualifications?.degree_name
                        }
                      </Typography>
                      <Typography>{`Grades: ${educationQualification?.attributes?.grades}`}</Typography>
                      <Typography>{`Duration: ${educationQualification?.attributes?.start_date} to ${educationQualification?.attributes?.end_date}`}</Typography>
                    </div>
                  );
                }
              )
            ) : (
              <p>No qualifications</p>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}
// Customizable Area Start
// Customizable Area End
