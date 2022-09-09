import { DateType, EveryDateType } from '../../logics/CalendarLogics';
import styled from 'styled-components/native';
import Day from './Day';

type DatesProps = {
  dateOnClick: (date: DateType) => void;
  everyDates: EveryDateType[];
};

const Dates = ({ everyDates, dateOnClick }: DatesProps) => {
  return (
    <>
      <DatesContainer>
        {everyDates.map((everyDate, index) => {
          return (
            <Day
              key={index}
              everyDate={everyDate}
              dateOnClick={dateOnClick}
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
