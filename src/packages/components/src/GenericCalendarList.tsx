import React, { FunctionComponent, useState } from "react";
//@ts-ignore
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import moment from "moment";

import { COLORS } from "../../framework/src/Globals"

interface Props {
  onSelectDate: (selectedDate: string) => void;
  selectDate?: any;
  testID: string;
}

const DATE_FORMAT = "YYYY-MM-DD";

const GenericCalendarList: FunctionComponent<Props> = ({
  onSelectDate,
  selectDate,
  testID,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    selectDate ? moment(selectDate).format(DATE_FORMAT) : moment().format(DATE_FORMAT)
  );

  const getTheme = () => {
    return {
      // arrows
      arrowColor: COLORS.blueGrey,
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: COLORS.darkBlueGrey,
      textMonthFontSize: 15,
      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: COLORS.blueGrey,
      textDayHeaderFontSize: 12,
      // dates
      dayTextColor: COLORS.darkBlueGrey,
      textDayFontSize: 15,
      // selected date
      selectedDayBackgroundColor: COLORS.TRANSPARENT,
      selectedDayTextColor: COLORS.blue,
      selectedDayBorderRadius: 4,
      // disabled date
      textDisabledColor: COLORS.lightBlueGrey,
    };
  };

  return (
    <CalendarProvider
      onDateChanged={(date: string) => {
        setSelectedDate(date);
        onSelectDate(date);
      }}
      date={""}
    >
      <ExpandableCalendar
        disablePan={true} //we need this
        disableWeekScroll={true}
        markingType="custom"
        minDate={moment().format(DATE_FORMAT)}
        style={{
          elevation: 0,
          shadowOpacity: 0,
        }}
        markedDates={{
          [selectedDate]: {
            marked: true,
            customStyles: {
              container: {
                backgroundColor: COLORS.yellow,
                borderRadius: 8,
              },
              text: {
                color: COLORS.black,
              },
            },
          },
        }}
        hideKnob
        theme={getTheme()}
        testID={testID}
      />
    </CalendarProvider>
  );
};

export default GenericCalendarList;
