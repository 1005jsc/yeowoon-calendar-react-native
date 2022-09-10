import { DateType, EveryDateType } from '../../logics/CalendarLogics';
import styled from 'styled-components/native';
import Day from './Day';

type DatesProps = {
  dateOnClick: (date: DateType) => void;
  everyDates: EveryDateType[];
  clickedDate1: DateType | undefined;
  clickedDate2: DateType | undefined;
};

const Dates = ({
  everyDates,
  dateOnClick,
  clickedDate1,
  clickedDate2,
}: DatesProps) => {
  return (
    <>
      <DatesContainer>
        {everyDates.map((everyDate, index) => {
          return (
            <Day
              key={index}
              everyDate={everyDate}
              dateOnClick={dateOnClick}
              clickedDate1={clickedDate1}
              clickedDate2={clickedDate2}
            ></Day>
          );
        })}
      </DatesContainer>
    </>
  );
};

export default Dates;

const DatesContainer = styled.View`
  width: 100%;
  flex-flow: row;
  flex-wrap: wrap;
`;
