import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import {
  checkClickedDate,
  DateType,
  EveryDateType,
} from '../../logics/CalendarLogics';

type DayProps = {
  everyDate: EveryDateType;
  dateOnClick: (date: DateType) => void;
  clickedDate1: DateType | undefined;
  clickedDate2: DateType | undefined;
};

const Day = ({
  everyDate,
  dateOnClick,
  clickedDate1,
  clickedDate2,
}: DayProps) => {
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
        <DayNumberCircle
          today={everyDate.today}
          everyDate={everyDate}
          clickedDate1={clickedDate1}
          clickedDate2={clickedDate2}
        >
          <DayNumber
            today={everyDate.today}
            everyDate={everyDate}
            clickedDate1={clickedDate1}
            clickedDate2={clickedDate2}
          >
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
  clickedDate1: DateType;
  clickedDate2: DateType;
  today: boolean;
};

const DayNumber = styled.Text`
  font-size: 20px;
  line-height: 23px;
  color: ${({
    everyDate,
    clickedDate1,
    clickedDate2,
    today,
  }: DayNumberProps) => {
    if (
      checkClickedDate(clickedDate1, everyDate.date) ||
      checkClickedDate(clickedDate2, everyDate.date)
    ) {
      return 'white';
    } else {
      return today ? 'white' : 'black';
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

type DayNumberCircleProps = {
  today: boolean;
  clickedDate1: DateType | undefined;
  clickedDate2: DateType | undefined;
  everyDate: EveryDateType;
};

const DayNumberCircle = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 50;
  background-color: ${({
    everyDate,
    today,
    clickedDate1,
    clickedDate2,
  }: DayNumberCircleProps) => {
    if (
      checkClickedDate(clickedDate1, everyDate.date) ||
      checkClickedDate(clickedDate2, everyDate.date)
    ) {
      return '#6290c8';
    } else {
      return today ? '#dfdfdf' : 'transparent';
    }
  }};

  justify-content: center;
  align-items: center;
`;
