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

const Calendar1 = () => {
  const dispatch = useAppDispatch();
  const { determineChosenDate } = calendarActions;

  const [clickedDate, setClickedDate] = useState<DateType | undefined>(
    undefined
  );
  // const [clickedDate2, setClickedDate2] = useState<DateType | undefined>(
  //   undefined
  // );

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
    if (clickedDate === undefined) {
      setClickedDate(date);
    } else {
      if (checkClickedDate(clickedDate, date)) {
        setClickedDate(undefined);
      } else {
        setClickedDate(date);
      }
    }
  };

  const handleCancel = () => {
    setClickedDate(undefined);
    dispatch(determineChosenDate(undefined));
  };
  const handleConfirm = () => {
    dispatch(determineChosenDate(clickedDate));
    setClickedDate(undefined);
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
        clickedDate1={clickedDate}
        clickedDate2={undefined}
        everyDates={everyDates}
      />

      {clickedDate && (
        <ConfirmButtonContainer1>
          <ConfirmButtonContainer2>
            <CancelButton
              onPress={() => {
                handleCancel();
              }}
            >
              <CancelButtonText>취소</CancelButtonText>
            </CancelButton>
            <ConfirmButton
              onPress={() => {
                handleConfirm();
              }}
            >
              <ConfirmButtonText>확인</ConfirmButtonText>
            </ConfirmButton>
          </ConfirmButtonContainer2>
        </ConfirmButtonContainer1>
      )}
    </CalenderContainer>
  );
};
export default Calendar1;

const CalenderContainer = styled.View`
  position: relative;
  width: 86%;
  height: 440px;
  padding-top: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid black;
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
