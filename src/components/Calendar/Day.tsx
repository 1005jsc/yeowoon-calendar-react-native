import { useEffect } from 'react';
import styled from 'styled-components/native';

import { DateType, EveryDateType } from '../../logics/CalendarLogics';

type DayProps = {
  everyDate: EveryDateType;
  dateOnClick: (date: DateType) => void;
};

const Day = ({ everyDate, dateOnClick }: DayProps) => {
  const dayNumberViewOnClick = () => {
    dateOnClick(everyDate.date);
  };

  return (
    <>
      <DayNumberView
        onPress={() => {
          dayNumberViewOnClick();
        }}
      >
        <DayNumberCircle todayYes={everyDate.today}>
          <DayNumber todayYes={everyDate.today} everyDate={everyDate}>
            {everyDate.date.date}
          </DayNumber>
        </DayNumberCircle>
      </DayNumberView>
    </>
  );
};
export default Day;

type DayNumberProps = {
  everyDate: EveryDateType;
};

const DayNumber = styled.Text`
  font-size: 20px;
  line-height: 23px;
  color: ${({ everyDate }: DayNumberProps) => {
    let area = false;

    if (everyDate.date.date !== undefined) {
      if (everyDate.date.date > 10 && everyDate.date.date <= 20) {
        area = true;
      } else {
        area = false;
      }
    }

    if (area) {
      return 'red';
    } else {
      return 'black';
    }
  }};
`;

const DayNumberView = styled.TouchableOpacity`
  height: 50px;
  min-width: 14%;
  flex: 1;
  /* border: 1px solid black; */
  justify-content: center;
  align-items: center;
`;

const DayNumberCircle = styled.View<{ todayYes: boolean; clicked: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50;
  background-color: '#6290C8';

  justify-content: center;
  align-items: center;
`;
