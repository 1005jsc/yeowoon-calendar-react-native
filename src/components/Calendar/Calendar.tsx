import { useState } from 'react';
import {
  DateType,
  days,
  EveryDateType,
  months,
  returnFirstDates,
} from '../../logics/CalendarLogics';
import { calendarActions } from '../../modules/calendar';
import { useAppDispatch } from '../../store';
import styled from 'styled-components/native';
import Dates from './Dates';

const Calendar = ({}) => {
  const dispatch = useAppDispatch();
  const { determineChosenDate } = calendarActions;

  const [clickedDate1, setClickedDate1] = useState<DateType | undefined>(
    undefined
  );
  const [clickedDate2, setClickedDate2] = useState<DateType | undefined>(
    undefined
  );

  const newDate = new Date();

  const [dateState, setDateState] = useState({
    year: newDate.getFullYear(),
    month: newDate.getMonth(),
    date: newDate.getDate(),
  });

  const [everyDates, setEveryDates] = useState<EveryDateType[]>(
    returnFirstDates({ ...dateState })
  );

  const moveMonthLeft = () => {};
  const moveMonthRight = () => {};

  const dayNumberViewOnClick = (date: DateType) => {
    if (clickedDate1 === undefined) {
      setClickedDate1(date);
      console.log(1);
    } else {
      if (
        clickedDate1.year === date.year &&
        clickedDate1.month === date.month &&
        clickedDate1.date === date.date
      ) {
        console.log(2);

        setClickedDate1(undefined);
      } else {
        if (clickedDate2 === undefined) {
          setClickedDate2(date);
          console.log(3);
        } else if (
          clickedDate2.year === date.year &&
          clickedDate2.month === date.month &&
          clickedDate2.date === date.date
        ) {
          console.log(4);

          setClickedDate2(undefined);
        } else {
          setClickedDate2(date);
          console.log(5);
        }
      }
    }
  };

  return (
    <CalenderContainer>
      <Header>
        <HeaderLeft>
          <MonthAndYear>{months[dateState.month]}</MonthAndYear>
          <MonthAndYear>{dateState.year}</MonthAndYear>
        </HeaderLeft>
        <ButtonContainer>
          <MonthButton
            title='left'
            onPress={() => {
              moveMonthLeft();
            }}
          />
          <MonthButton
            title='right'
            onPress={() => {
              moveMonthRight();
            }}
          />
        </ButtonContainer>
      </Header>
      <WeekContainer>
        {days.map((day, index) => {
          return <DayName key={index}>{day}</DayName>;
        })}
      </WeekContainer>

      <Dates dateOnClick={dayNumberViewOnClick} everyDates={everyDates} />

      {}
    </CalenderContainer>
  );
};
export default Calendar;

const CalenderContainer = styled.View`
  position: relative;
  width: 86%;
  height: 360px;
  border: 1px solid black;
`;

const Header = styled.View`
  flex-flow: row;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;
`;

const HeaderLeft = styled.View`
  flex-flow: row;
`;
const MonthAndYear = styled.Text`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 16px;
  font-weight: 800;
`;

const ButtonContainer = styled.View`
  flex-flow: row;
`;
const MonthButton = styled.Button`
  margin-left: 7px;
  margin-right: 7px;
  /* height: 60%; */
`;

const WeekContainer = styled.View`
  flex-flow: row;
  padding-top: 10px;
`;

const DayName = styled.Text`
  flex: 1;
  /* border: 1px solid black; */
  text-align: center;
  font-size: 9px;
  color: #818080;
`;

const DaysContainer = styled.View`
  width: 100%;
  flex-flow: row;
  flex-wrap: wrap;
`;

const ConfirmButtonContainer1 = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row-reverse;
  align-items: center;
  position: relative;
  align-items: center;
`;

const ConfirmButtonContainer2 = styled.View`
  width: 80px;
  justify-content: space-between;
  flex-flow: row;
  margin-right: 12px;
`;

const CancelButton = styled.TouchableOpacity`
  width: 32px;
  background-color: transparent;
`;

const CancelButtonText = styled.Text`
  font-size: 15px;
  color: #9a9a9a;
`;
const ConfirmButton = styled.TouchableOpacity`
  width: 32px;
  background-color: transparent;
`;

const ConfirmButtonText = styled.Text`
  font-size: 15px;

  color: #6290c8;
`;
