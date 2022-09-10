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
        <DayNumberRectangle
          everyDate={everyDate}
          clickedDate1={clickedDate1}
          clickedDate2={clickedDate2}
        ></DayNumberRectangle>
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
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  position: relative;
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

type DayNumberRectangleProps = {
  clickedDate1: DateType | undefined;
  clickedDate2: DateType | undefined;
  everyDate: EveryDateType;
};

const DayNumberRectangle = styled.View`
  position: absolute;
  /* left: 50%; */

  ${({ everyDate, clickedDate1, clickedDate2 }: DayNumberRectangleProps) => {
    if (clickedDate1 && clickedDate2) {
      if (clickedDate1.date && clickedDate2.date && everyDate.date) {
        if (
          new Date(clickedDate1.year, clickedDate1.month, clickedDate1.date) <
          new Date(clickedDate2.year, clickedDate2.month, clickedDate2.date)
        ) {
          // 정방향
          if (checkClickedDate(clickedDate1, everyDate.date)) {
            return 'left: 50%; width: 50%;';
          } else if (checkClickedDate(clickedDate2, everyDate.date)) {
            return 'right: 50%; width: 50%;';
          } else if (
            new Date(clickedDate1.year, clickedDate1.month, clickedDate1.date) <
              new Date(
                everyDate.date.year,
                everyDate.date.month,
                everyDate.date.date
              ) &&
            new Date(clickedDate2.year, clickedDate2.month, clickedDate2.date) >
              new Date(
                everyDate.date.year,
                everyDate.date.month,
                everyDate.date.date
              )
          ) {
            return 'width: 100%;';
          } else {
            return 'display:none';
          }
        } else {
          // 역방향
          if (checkClickedDate(clickedDate2, everyDate.date)) {
            return 'left: 50%; width: 50%;';
          } else if (checkClickedDate(clickedDate1, everyDate.date)) {
            return 'right: 50%; width: 50%;';
          } else if (
            new Date(clickedDate2.year, clickedDate2.month, clickedDate2.date) <
              new Date(
                everyDate.date.year,
                everyDate.date.month,
                everyDate.date.date
              ) &&
            new Date(clickedDate1.year, clickedDate1.month, clickedDate1.date) >
              new Date(
                everyDate.date.year,
                everyDate.date.month,
                everyDate.date.date
              )
          ) {
            return 'width: 100%;';
          } else {
            return 'display:none';
          }
        }
      }
    } else {
      return 'display:none;';
    }
  }}
  height: 27px;
  margin: auto;
  background-color: #cadaed;
`;
