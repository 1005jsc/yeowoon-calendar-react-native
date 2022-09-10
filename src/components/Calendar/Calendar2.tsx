import { useState } from 'react';
import {
  checkClickedDate,
  compareDates,
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
import BackwardIcon from '../../../assets/icons/BackwardIcon';
import ForwardIcon from '../../../assets/icons/ForwardIcon';

const Calendar2 = () => {
  const dispatch = useAppDispatch();
  const { determineChosenDates } = calendarActions;

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

  const moveMonthLeft = () => {
    if (dateState.month > 0) {
      setEveryDates(
        returnFirstDates({ ...dateState, month: dateState.month - 1 })
      );
      setDateState({ ...dateState, month: dateState.month - 1 });
    } else {
      setEveryDates(
        returnFirstDates({ ...dateState, year: dateState.year - 1, month: 11 })
      );
      setDateState({ ...dateState, year: dateState.year - 1, month: 11 });
    }
  };
  const moveMonthRight = () => {
    if (dateState.month < 11) {
      setEveryDates(
        returnFirstDates({ ...dateState, month: dateState.month + 1 })
      );
      setDateState({ ...dateState, month: dateState.month + 1 });
    } else {
      setEveryDates(
        returnFirstDates({
          ...dateState,
          year: dateState.year + 1,
          month: 0,
        })
      );
      setDateState({
        ...dateState,
        year: dateState.year + 1,
        month: 0,
      });
    }
  };

  const dayNumberViewOnClick = (date: DateType) => {
    if (clickedDate1 === undefined) {
      setClickedDate1(date);
    } else {
      if (checkClickedDate(clickedDate1, date)) {
        setClickedDate1(undefined);
      } else {
        if (clickedDate2 === undefined) {
          setClickedDate2(date);
        } else if (checkClickedDate(clickedDate2, date)) {
          setClickedDate2(undefined);
        } else {
          setClickedDate2(date);
        }
      }
    }
  };

  const handleScheduleOnPress = () => {
    if (compareDates(clickedDate1!, clickedDate2!)[0]) {
      dispatch(determineChosenDates([clickedDate1!, clickedDate2!]));
    } else {
      dispatch(determineChosenDates([clickedDate2!, clickedDate1!]));
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
            onPress={() => {
              moveMonthLeft();
            }}
          >
            <BackwardIcon />
          </MonthButton>
          <MonthButton
            onPress={() => {
              moveMonthRight();
            }}
          >
            <ForwardIcon />
          </MonthButton>
        </ButtonContainer>
      </Header>
      <WeekContainer>
        {days.map((day, index) => {
          return <DayName key={index}>{day}</DayName>;
        })}
      </WeekContainer>

      <Dates
        dateOnClick={dayNumberViewOnClick}
        clickedDate1={clickedDate1}
        clickedDate2={clickedDate2}
        everyDates={everyDates}
      />

      {clickedDate1 &&
        clickedDate2 &&
        (compareDates(clickedDate1, clickedDate2)[0] ? (
          <>
            <SetScheduleButton onPress={handleScheduleOnPress}>
              <SetScheduleText>
                {clickedDate1.year}.{clickedDate1.month}.{clickedDate1.date} -{' '}
                {clickedDate2.year}.{clickedDate2.month}.{clickedDate2.date}{' '}
                등록하기
              </SetScheduleText>
            </SetScheduleButton>
          </>
        ) : (
          <SetScheduleButton onPress={handleScheduleOnPress}>
            <SetScheduleText>
              {clickedDate2.year}.{clickedDate2.month}.{clickedDate2.date} -{' '}
              {clickedDate1.year}.{clickedDate1.month}.{clickedDate1.date}{' '}
              등록하기
            </SetScheduleText>
          </SetScheduleButton>
        ))}
    </CalenderContainer>
  );
};
export default Calendar2;

const CalenderContainer = styled.View`
  position: relative;
  width: 86%;
  height: 440px;
  padding-top: 30px;
  background-color: aliceblue;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Header = styled.View`
  flex-flow: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
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
const MonthButton = styled.TouchableOpacity`
  margin-left: 11px;
  margin-right: 11px;
`;

const WeekContainer = styled.View`
  flex-flow: row;
  padding-top: 10px;
`;

const DayName = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 9px;
  color: #818080;
`;

const SetScheduleButton = styled.TouchableOpacity`
  width: 96%;
  height: 56px;
  border-radius: 4px;
  background-color: #6290c8;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const SetScheduleText = styled.Text`
  color: white;
  font-size: 19px;
`;
