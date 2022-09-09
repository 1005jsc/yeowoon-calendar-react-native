import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import renderMonthDate, { addCurrentDate } from '../renderDate';
import { Props as InputProps, InputSize } from '../../Input';

import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import Typography from '../../Typography';
import { dateFormatter } from '../../../../helper/formatter/dateFormatter';
import { useOnClickOutside } from 'usehooks-ts';
import { isBefore } from 'date-fns';

type Props = {
  value: any;
  onChange: (data: any) => void;
  calendarFormat?: string;
  compareDate?: Date;
  minDateDisabled?: boolean;
  renderLabel?: (
    labelValue: string | undefined | JSX.Element
  ) => JSX.Element | undefined;
  renderErrorMsg?: () => JSX.Element;
  defaultValue?: Date | string;
  placeholder?: string;
} & Pick<
  InputProps,
  'variantSize' | 'label' | 'disabled' | 'isRequired' | 'placeholder' | 'width'
>;

type DayItemProps = {
  isCurrentMonth?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
};

const Component: FC<Props> = ({
  renderLabel,
  renderErrorMsg,
  calendarFormat = 'yyyy. MM. dd',
  minDateDisabled,
  compareDate,
  onChange,
  label,
  value,
  disabled,
  width,
  variantSize,
  defaultValue,
  placeholder,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [data, startDate, endDate] = renderMonthDate(currentDate)();

  const handleChangeCurrentDate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  useOnClickOutside(ref, () => setIsOpenCalendar(false));

  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const today = new Date(year, month, day);

  const handleCalendarValue = (value: any) => {
    if (placeholder && !defaultValue && !value) {
      return <PlaceholderTypo>{placeholder}</PlaceholderTypo>;
    }

    if (!value && defaultValue) {
      return dateFormatter(defaultValue, calendarFormat);
    }

    return value && dateFormatter(value, calendarFormat);
  };

  const isBeforeMinDate = (compared: Date) => {
    if (minDateDisabled) {
      if (!compareDate) {
        return isBefore(compared, today);
      } else {
        return isBefore(compared, compareDate);
      }
    }
  };

  return (
    <Wrapper>
      <Container
        onClick={() => {
          if (!disabled) {
            setIsOpenCalendar(!isOpenCalendar);
          }
        }}
      >
        {renderLabel && renderLabel(label)}
        <Calendar disabled={disabled} width={width} variantSize={variantSize}>
          <InnerContainer variantSize={variantSize}>
            {handleCalendarValue(value)}
          </InnerContainer>
          <IndicatorContainer>
            <CalendarIconWrapper>
              <img src="/icons/calendar-btn.svg" />
            </CalendarIconWrapper>
          </IndicatorContainer>
        </Calendar>
      </Container>
      {isOpenCalendar && (
        <Popper ref={ref}>
          <CalendarHeader>
            <Flex>
              <IconBox
                onClick={() => {
                  return handleChangeCurrentDate(
                    addCurrentDate(currentDate, { years: -1 })
                  );
                }}
              >
                <FiChevronsLeft />
              </IconBox>
              <IconBox
                onClick={() =>
                  handleChangeCurrentDate(
                    addCurrentDate(currentDate, { months: -1 })
                  )
                }
              >
                <FiChevronLeft />
              </IconBox>
            </Flex>
            <HeaderDate>{dateFormatter(currentDate, 'yyyy.MM')}</HeaderDate>
            <Flex>
              <IconBox
                onClick={() =>
                  handleChangeCurrentDate(
                    addCurrentDate(currentDate, { months: 1 })
                  )
                }
              >
                <FiChevronRight />
              </IconBox>
              <IconBox
                onClick={() =>
                  handleChangeCurrentDate(
                    addCurrentDate(currentDate, { years: 1 })
                  )
                }
              >
                <FiChevronsRight />
              </IconBox>
            </Flex>
          </CalendarHeader>
          <CalendarDays>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
              <WeekdayItem key={idx}>{day}</WeekdayItem>
            ))}
            {(data as Date[][]).map((week, index) => (
              <Flex key={index}>
                {week.map((day) => {
                  return (
                    <div
                      key={day.toString()}
                      onClick={() => {
                        if (minDateDisabled) {
                          if (!isBeforeMinDate(day)) {
                            if (onChange) {
                              onChange(day);
                              setIsOpenCalendar(false);
                            }
                          }
                        } else {
                          if (onChange) {
                            onChange(day);
                            setIsOpenCalendar(false);
                          }
                        }
                      }}
                    >
                      <DayItem
                        isSelected={
                          value
                            ? startDate <= day &&
                              day <= endDate &&
                              value.getDate() === day.getDate()
                            : false
                        }
                        disabled={isBeforeMinDate(day)}
                        isCurrentMonth={startDate <= day && day <= endDate}
                      >
                        {dateFormatter(day, 'dd')}
                      </DayItem>
                    </div>
                  );
                })}
              </Flex>
            ))}
          </CalendarDays>
        </Popper>
      )}
      {renderErrorMsg && renderErrorMsg()}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  position: relative;
`;

const PlaceholderTypo = styled(Typography).attrs({ variant: 'body1' })`
  color: #c8c8d2;
`;

const Container = styled.div`
  display: inline-block;
  width: 100%;
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeekdayItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 3px 6px;
  font-size: 13px;
  color: #000;
  @media screen and (max-width: 520px) {
    width: 25px;
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 12px;
`;

const CalendarIconWrapper = styled(Indicator)`
  padding: 0 4px;
`;

const Popper = styled.div`
  position: absolute;
  width: 344px;
  padding: 0 16px 20px;
  border-radius: 3px;
  background: #fff;
  border: 1px solid grey;
  box-shadow: 0 3px 6px 0 rgba(39, 32, 32, 0.25);
  z-index: 99;
  @media screen and (max-width: 520px) {
    width: 300px;
  }
  @media screen and (max-width: 720px) {
    right: 0;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 8px;
`;

const HeaderDate = styled(Typography).attrs({
  variant: 'h2',
})`
  font-weight: bold;
  margin: 0 auto;
`;

const CalendarDays = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DayItem = styled(WeekdayItem)<DayItemProps>`
  border-radius: 3px;
  cursor: pointer;

  color: ${({ theme, isCurrentMonth, disabled }) =>
    disabled ? theme.colors.gray[300] : isCurrentMonth ? 'black' : 'grey'};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? '#d8d1e9' : theme.colors.neutral[0]};
`;

const Flex = styled.div`
  display: flex;
`;

const IconBox = styled.div`
  cursor: pointer;
`;

const CalendarIcon = styled(FiCalendar)<{ $hasValue?: boolean }>`
  color: ${({ $hasValue }) => !$hasValue && '#AFB1B8'};
`;

const Calendar = styled.div<{
  disabled?: boolean;
  width?: string;
  variantSize?: InputSize;
}>`
  display: flex;
  width: ${({ width }) => (width ? width : '240px')};
  height: ${({ variantSize }) => (variantSize === 'lg' ? '48px' : '40px')};
  align-items: center;

  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  border-radius: 5px;
  outline: none;
  border: 0.5px solid #c8c8d2;
  color: ${({ theme }) => theme.colors.neutral[700]};
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray[100] : '#FFF'};

  ${({ disabled, theme }) =>
    !disabled &&
    `
  &:focus,
  &:hover {
    // animation-timing-function: ease-out;
    // animation-duration: 100ms;
    // box-sizing: border-box;
    // box-shadow: 0px 0px 0px 3px rgba(40, 40, 62, 0.06);
    // border: 1px solid ${theme.colors.neutral[500]};
  }`}

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }
`;

const InnerContainer = styled.div<{ variantSize?: InputSize }>`
  padding: ${({ variantSize }) =>
    variantSize === 'sm' ? '6px 0px 0px 12px' : '10px 0px 10px 12px'};
`;
